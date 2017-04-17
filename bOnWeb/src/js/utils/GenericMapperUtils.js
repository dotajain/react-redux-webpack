/**
 * @class GenericMapperUtils
 *
 * @classdesc Please refer to [map]{@link GenericMapperUtils#mapObject} below or GenericMapperUtils.spec.js for usage examples.
 * @tutorial GenericMapper
 */

/* eslint-disable no-param-reassign*/
const _ = require('lodash');

const hasSchema = (schema, key) => _.has(schema, key);

const keyStrategies = [{
	name: 'schemaAndKeyProperty',
	predicate: (key, schema) => hasSchema(schema, key) && schema[key].key,
	transform: (key, schema) => key => schema[key].key, // can be a func?
}, {
	name: 'schemaAndString',
	predicate: (key, schema) => hasSchema(schema, key) && _.isString(schema[key]),
	transform: (key, schema) => key => schema[key],
}, {
	name: 'schemaAndArray',
	predicate: (key, schema) => hasSchema(schema, key) && _.isArray(schema[key]),
	transform: (key, schema) => key => schema[key],
}, {
	name: 'default',
	predicate: () => true,
	transform: (key, schema, keyCase) => keyCase,
},
];

const valueStrategies = [
	{
		name: 'func',
		predicate: (currentKey, schema) => hasSchema(schema, currentKey) && schema[currentKey].value,
		transform: (currentKey, schema) => (value, source) => schema[currentKey].value(value, source),
	}, {
		name: 'childObjectOrArray',
		predicate: (currentKey, schema, value) => _.isPlainObject(value) || (!_.isString(value) && _.isArray(value)),
		transform: (currentKey, schema, mapper) => value => mapper(value, schema[currentKey] || schema, mapper),
	}, {
		name: 'default',
		predicate: () => true,
		transform: () => value => value,
	},
];


/* @ticket: DYB-23690 */
const _transformSelector = (strategies, picker, key, schema, mapper, value) => {
	const transformer = _.find(strategies, item => picker(key, schema, item, value));

	return transformer.transform(key, schema, mapper);
};

const _picker = (key, schema, item, value) => item.predicate(key, schema, value);
const _pick = _.partial(_transformSelector, _, _picker);
const _pickKey = _.partial(_pick, keyStrategies);
const _pickValue = _.partial(_pick, valueStrategies);
/* Not tested yet, but will be replacing lines 86 and 89
 * var _update = (result, key, valueBuilder, value) => {
	result[key] = valueBuilder(value, key);
};*/

const _transform = (data, schema, keyCase) => {
	schema = schema || {};

	const mapper = (data, schema, mapper) => _.transform(data, (result, value, key) => {
		schema = schema || {};
		let keyBuilder = _pickKey(key, schema, keyCase, value);
		let valueBuilder = _pickValue(key, schema, mapper, value);

		const newKey = keyBuilder(key);
		if (!_.isString(newKey) && _.isArray(newKey)) {
			_.forEach(newKey, currentKey => {
				keyBuilder = _pickKey(currentKey, schema[key], k => k, value);
				valueBuilder = _pickValue(currentKey, schema[key], mapper, value);

				const newCurrentKey = keyBuilder(currentKey);

				result[newCurrentKey] = valueBuilder(value, data);
			});
		} else {
			result[newKey] = valueBuilder(value, data);
		}

		return result;
	});

	const result = mapper(data, schema, mapper);

	return result;
};

const deleteEmptyProperties = (obj, isRecursive) => {
	isRecursive = isRecursive || false;
	for (const i in obj) {
		if (obj[i] === null || obj[i] === undefined || obj[i] === '') {
			delete obj[i];
		} else if (isRecursive && typeof obj[i] === 'object') {
			return deleteEmptyProperties(obj[i], isRecursive);
		}
	}

	return obj;
};

const keyGenerators = {
	num: {
		appender: (k, c) => v => {
			if (!_.startsWith(v, k)) {
				return c(v);
			}

			return [c(k), v.substring(k.length)].join('');
		},
	},
	ignore: (p, c) => v => v.match(p) ? v : c(v),
};

const GenericMapperUtils = {
	/**
	 * GenericMapper entry function.
	 *
	 * @param {Object} source Source object to be mapped
	 * @param {Object} schema The schema to be used to map data.  Optional
	 * @param {Function} keyCase Key case strategy to use.  Generally _.camelCase/snakeCase/kebabCase
	 *
	 * @return {Object} Transformed and mapped object
	 *
	 * @example var schema = {
	 * 		userInfo: {
	 * 			dateOfBirth: 'dob',
	 * 			postcode: 'post_code'
	 * 		}
	 * };
	 *
	 * var source = {
	 * 		userInfo: {
	 * 			firstName: 'John',
	 * 			lastName: 'Smith',
	 * 			dateOfBirth: '17-94-1981',
	 * 			gender: 'Male',
	 * 			addressLine: 'test street',
	 * 			postcode: 'eh6 5lg'
	 * 		}
	 * 	};
	 *
	 * var result = GenericMapperUtils.mapObject(source, schema);
	 *
	 * result === {
	 * 		'user_info': {
	 * 			'first_name': 'John',
	 * 			'last_name': 'Smith',
	 * 			'dob': '17-94-1981',
	 * 			'gender': 'Male',
	 * 			'address_line': 'test street',
	 * 			'post_code': 'eh6 5lg',
	 * 		}
	 * 	}
	 *
	 */
	mapObject(source, schema, keyCase) {
		return _transform(source, schema, keyCase || _.snakeCase);
	},

	deleteEmptyProperties,

	keyGenerators,
};

module.exports = GenericMapperUtils;
