const _ = require('lodash');

const GenericMapper = require('./GenericMapperUtils');
const { mapObject, deleteEmptyProperties, keyGenerators } = GenericMapper;

const DateUtils = require('./DateUtils');
const RegexUtils = require('./RegexUtils');
const MaskingUtils = require('./MaskingUtils');

const formatters = {
	domestic: maskPostcode => ({
		keys: () => ['addressPrefix',
			'houseName',
			'houseNumber',
			'streetName',
			'addressLine2',
			'city',
			'county',
			'postcode'],
		value: (key, line) => {
			const maskStartPosition = 3;
			const numberOfMasks = 3;

			if (!_.isString(key) || !_.isString(line)) {
				return '';
			}

			const formatLine = key === 'postcode' ?
				l => !maskPostcode ? l : MaskingUtils.applyMask(l, l.length - maskStartPosition, numberOfMasks) :
				l => _.capitalize(l.toLowerCase());

			return formatLine(line);
		},
	}),
	international: () => ({
		keys: () => ['addressLine1',
			'addressLine2',
			'addressLine3',
			'addressLine4',
			'country'],
		value: (key, line) => _.capitalize(line.toLowerCase()),
	}),
};

const ukAddressType = 'uk_address';
const internationalAddressType = 'international_address';
const map = {
	domestic: ukAddressType,
	international: internationalAddressType,
};

const filterForPost = (addressType, data) => _.omit(data, ['dateMoved', 'addressType', 'isManual', 'addressId', 'town']);

const getAddressLine1 = address => {
	let addressLine = address.streetName;

	if (address.houseNumber) {
		addressLine = `${address.houseNumber} ${addressLine}`;
	}

	if (address.houseName) {
		addressLine = `${address.houseName}, ${addressLine}`;
	}

	if (address.addressPrefix) {
		addressLine = `${address.addressPrefix}, ${addressLine}`;
	}

	return addressLine;
};

const addressLine2Schema = { value: v => v && v.replace(/(, )|(,)/g, ' ') }; // @ticket DGW2AO-375

const firstAddressIsUk = data => !!_.head(data)[ukAddressType];

module.exports = {
	fromPostcodeResult(data, metadata) {
		const schema = {
			// jscs: disable
			'post_code': 'postcode', // TODO: Remove once @DYB-18291 is closed
			'postal_code': 'postcode',
			'street': 'streetName',
			// jscs: enable */
			'suburb': 'county',
			'town': 'city',
			'address_line2': addressLine2Schema,
		};

		return _.flow(
			data => _.extend({}, data, metadata),
			data => mapObject(data, schema, _.camelCase))(data);
	},

	empty() {
		return {
			addressType: null,
		};
	},

	fromGet(data) {
		const schema = {
			'address_reference': ['id', 'address_reference'],
			'city': 'city',
			'postal_code': 'postcode',
			'street': 'streetName',
			'flat_number': ['addressPrefix', 'flatNumber'],
			'address_line2': addressLine2Schema,
		};

		if (!firstAddressIsUk(data)) {
			return [];
		}

		const attachDateMoved = (addr, date) => _.extend({}, addr, {
			dateMoved: DateUtils.getDateStringFromAPI(date),
		});

		const attachAddressType = (addressType, a) => a && _.extend({ addressType }, a);
		const getData = addressData => attachAddressType('domestic', addressData[ukAddressType]) || attachAddressType('international', addressData[internationalAddressType]);

		const mapAddress = _.flow(
			addressData => attachDateMoved(getData(addressData), addressData['effective_period'].from),
			raw => mapObject(raw, schema, _.camelCase),
			mapped => mapped && _.extend({}, mapped, {
				isManual: !mapped.id,
			}),
			deleteEmptyProperties);

		const result = _.chain(data)
			.map(mapAddress)
			.value();

		const currentAddress = _.head(result);

		if (_.isUndefined(currentAddress) || !RegexUtils.isValid(currentAddress.postcode, RegexUtils.regexes.postcode)) {
			// @ticket DYB-20868
			// @ticket DGW2-739
			return [];
		}

		return result;
	},

	toPost(data) {
		const createMapper = addresses => (address, index) => {
			let addressData = address;
			let effectivePeriod = { from: DateUtils.getAPIDateString(addressData.dateMoved) };

			if (index > 0) {
				effectivePeriod = _.extend({}, effectivePeriod, {
					to: DateUtils.getAPIDateString(addresses[index - 1].dateMoved),
				});
			}

			if (!addressData.addressLine1) {
				addressData = _.extend({}, addressData, { addressLine1: '' });
			}

			const newAddress = mapObject(filterForPost(addressData.addressType, addressData), {
				postcode: 'postal_code',
				streetName: 'street',
				id: 'address_reference',
				addressLine1: {
					value: v => addressData.addressType === 'domestic' ? getAddressLine1(addressData) : v,
				},
				addressLine2: addressLine2Schema,
			}, keyGenerators.ignore(/addressLine/, _.snakeCase));

			const toBeMapped = {
				[map[address.addressType]]: newAddress,
				effectivePeriod,
			};

			return toBeMapped;
		};

		const result = _.map(data, createMapper(data));

		return mapObject(result, {}, keyGenerators.num.appender('addressLine', _.snakeCase));
	},

	/**
	 * Format the address into a single line String based on the given address data object
	 *
	 * @param {Object} address 			The address.
	 * @param {Boolean} maskPostcode	Should we partially obscure the postcode? Optional.
	 * @return {String} 				The formatted address.
	 */
	toDisplay(address, maskPostcode) {
		if (!_.isPlainObject(address)) {
			return '';
		}

		const formatter = formatters[address.addressType](maskPostcode);

		const result = _.reduce(formatter.keys(), (addr, key) => {
			if (!address[key]) {
				return addr;
			}

			const val = formatter.value(key, address[key]);

			return addr ? `${addr}, ${val}` : val;
		}, '');

		return result;
	},
};
