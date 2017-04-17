/**
 * @module TaxObligationList
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');

const CountryUtils = require('../../../utils/CountryUtils');

const DropdownQuestion = require('../../common/questionsets/DropdownQuestion');
const RadioQuestion = require('../../common/questionsets/RadioQuestion');
const TextQuestion = require('../../common/questionsets/TextQuestion');
const InputMixin = require('../../common/mixins/InputMixin');

// Stores
const ContentStore = require('../../../stores/AccountOpeningContentStore');

// Actions
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');

const countryPrefix = 'taxCountry';
const hasTaxNumberPrefix = 'hasTaxNumber';
const taxNumberPrefix = 'taxNumber';

const TaxObligationList = React.createClass({

	propTypes: {
		disableAddOrRemove: PropTypes.bool,
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		content: PropTypes.object.isRequired,
		data: PropTypes.object,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			disableAddOrRemove: false,
		};
	},

	getInitialState() {
		const defaultVal = this.props.data.taxObligationList || [];

		return {
			numberOfAdditionalObligations: Math.max(defaultVal.length, 1),
			value: defaultVal,
		};
	},

	/**
	 * User has requested to add another citizenship.
	 *
	 * @param  {Event} event
	 */
	onAddAnother(event) {
		event.preventDefault();

		if (this.state.numberOfAdditionalObligations < config.maxAdditionalCitizenships) {
			this.setState({
				numberOfAdditionalObligations: this.state.numberOfAdditionalObligations + 1,
			}, () => {
				this.updateStateValidation();
			});
		}
	},

	/**
	 * User has changed a value in a dropdown.
	 *
	 * @param  {String} key   	Which value was changed?
	 * @param  {Any} value 		What is the new value?
	 */
	onChange(key, value) {
		const index = key.slice(-1);
		const actualKey = key.substring(0, key.length - 1);

		const newList = _.cloneDeep(this.state.value);

		if (_.isUndefined(newList[index])) {
			newList[index] = {};
		}

		newList[index][actualKey] = value;

			// If the change was to the "do you have a tax ID?" question, wipe out previous conditional answers
		if (actualKey === hasTaxNumberPrefix) {
			newList[index][taxNumberPrefix] = undefined;
		}

			// if the change is on tax country, then record an analytics event with all selected tex countries
		if (actualKey === countryPrefix) {
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
				value: newList.map(listItem => {
					return listItem[countryPrefix];
				}).toString(),
				description: 'TaxCountrySelected',
				event: 'created',
			});
		}
		this.saveNewList(newList);
	},

	/**
	 * User has requested to delete a citizenship.
	 *
	 * @param  {Event} event
	 */
	onRemoveOne(event) {
		event.preventDefault();

		if (this.state.numberOfAdditionalObligations > 1) {
			this.setState({
				numberOfAdditionalObligations: this.state.numberOfAdditionalObligations - 1,
			}, () => {
				let newList = _.cloneDeep(this.state.value);
				newList = newList.slice(0, this.state.numberOfAdditionalObligations);
				this.saveNewList(newList);
			});
		}
	},

		/**
		 * Custom validation to ensure that the user enters the number of values they request.
		 */
	customValidator() {
		const equalLength = (this.state.numberOfAdditionalObligations === this.state.value.length);

		return equalLength && _.every(this.state.value, item => {
			return this.hasTaxCountry(item) &&
				(this.hasTaxNumber(item)) ||
				(this.doesNotHaveTaxNumber(item));
		});
	},

	doesNotHaveTaxNumber(item) {
		return item[hasTaxNumberPrefix] === 'No';
	},

	hasTaxCountry(item) {
		return item[countryPrefix] && item[countryPrefix].length > 0;
	},

	hasTaxNumber(item) {
		return item[hasTaxNumberPrefix] === 'Yes' && item[taxNumberPrefix] && item[taxNumberPrefix].length > 0;
	},

	/**
	 * List has been changed. Save it.
	 *
	 * @param  {Array} value  	List of citizenships.
	 */
	saveNewList(value) {
		// First value entered? Can validate now!
		if (this.state.value.length === 0) {
			this.enableValidation();
		}

		this.setState({
			value,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value);
		});
	},

	render() {
		// Sets of tax questions.
		const listItems = [];

		for (let i = 0; i < this.state.numberOfAdditionalObligations; i++) {
			const countryFieldName = countryPrefix + i;
			const hasTaxNumberFieldName = hasTaxNumberPrefix + i;
			const taxNumberName = taxNumberPrefix + i;
			let showTaxNumberBox = false;
			const friendlyNumber = i + 1;

			if (this.state.value[i] && this.state.value[i][hasTaxNumberPrefix] === 'Yes') {
				showTaxNumberBox = true;
			}

			listItems.push(
				<div key={i}>
					<DropdownQuestion
						name={countryFieldName}
						key={countryFieldName}
						group={this.props.group}
						data={CountryUtils.withCountryNames()}
						onChange={this.onChange}
						dataAnchor="tax-nationality"
						defaultValue={this.state.value[i] && this.state.value[i].taxCountry}
						helpText={ContentStore.getHelpMessage(countryPrefix)}
					>
						{`${friendlyNumber}. ${this.props.content.taxObligationsListCountryFieldName}`}
					</DropdownQuestion>

					<RadioQuestion
						group={this.props.group}
						helpText={ContentStore.getHelpMessage(hasTaxNumberPrefix)}
						key={hasTaxNumberFieldName}
						labelText={this.props.content.taxObligationsListHasTaxNumberFieldName}
						name={hasTaxNumberFieldName}
						onChange={this.onChange}
						defaultValue={this.state.value[i] && this.state.value[i].hasTaxNumber}
						options={[{
							anchor: 'tax-id-number-no',
							value: 'No',
						}, {
							anchor: 'tax-id-number-yes',
							value: 'Yes',
						}]}
						required
					/>

					{showTaxNumberBox ?
						<TextQuestion
							name={taxNumberName}
							key={taxNumberName}
							group={this.props.group}
							onChange={this.onChange}
							minLength={1}
							maxLength={40}
							dataAnchor="tax-id-number"
							helpText={ContentStore.getHelpMessage(taxNumberPrefix)}
							validateType="alphanumeric"
							defaultValue={this.state.value[i].taxNumber}
							required
						>
							{this.props.content.taxObligationsListTaxNumberName}
						</TextQuestion> : ''}
				</div>
			);
		}

		// "Add Another" button
		let addAnother;
		let removeOne;

		if (!this.props.disableAddOrRemove) {
			if (this.state.numberOfAdditionalObligations < config.maxAdditionalCitizenships) {
				addAnother =
					(<a
						href="#"
						onClick={this.onAddAnother}
						className="btn btn-primary btn-lg pull-right margin-left"
						role="button"
					>
						Add another
					</a>);
			}

			// "Remove One" button
			if (this.state.numberOfAdditionalObligations > 1) {
				removeOne =
					(<a
						href="#" onClick={this.onRemoveOne}
						className="btn btn-primary btn-lg pull-right"
						role="button"
					>
						Remove one
					</a>);
			}
		}

		return (
			<div>
				{listItems}
				<fieldset>
					{addAnother}
					{removeOne}
					{this.getErrorElement()}
				</fieldset>
			</div>
		);
	},
});

module.exports = TaxObligationList;
