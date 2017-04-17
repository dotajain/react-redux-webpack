/**
 * @module CitizenshipList
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');

const CountryUtils = require('../../../utils/CountryUtils');

const DropdownQuestion = require('../../common/questionsets/DropdownQuestion');
const InputMixin = require('../../common/mixins/InputMixin');

const prefix = 'additionalCitizenship';

const CitizenshipList = React.createClass({

	propTypes: {
		defaultValue: PropTypes.array,
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		content: PropTypes.object.isRequired,
	},

	mixins: [InputMixin],

	getInitialState() {
		const defaultVal = this.props.defaultValue || [];

		return {
			numberOfAdditionalCitizenships: Math.max(defaultVal.length, 1),
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

		if (this.state.numberOfAdditionalCitizenships < config.maxAdditionalCitizenships) {
			this.setState({
				numberOfAdditionalCitizenships: this.state.numberOfAdditionalCitizenships + 1,
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
		const index = key.substr(prefix.length);
		const newList = _.clone(this.state.value);
		newList[index] = value;

		this.saveNewList(newList);
	},

	/**
	 * User has requested to delete a citizenship.
	 *
	 * @param  {Event} event
	 */
	onRemoveOne(event) {
		event.preventDefault();

		if (this.state.numberOfAdditionalCitizenships > 1) {
			this.setState({
				numberOfAdditionalCitizenships: this.state.numberOfAdditionalCitizenships - 1,
			}, () => {
				let newList = _.clone(this.state.value);
				newList = newList.slice(0, this.state.numberOfAdditionalCitizenships);
				this.saveNewList(newList);
			});
		}
	},

	/**
	 * Custom validation to ensure that the user enters the number of values they request.
	 */
	customValidator() {
		const equalLength = (this.state.numberOfAdditionalCitizenships === this.state.value.length);

		return (equalLength && _.every(this.state.value, item => {
			return this.isPresent(item);
		}));
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
		// Citizenship dropdowns.
		const range = _.range(this.state.numberOfAdditionalCitizenships);
		const dropdowns = _.map(range, key => {
			const friendlyNumber = key + 1;
			const name = prefix + key;
			return (
				<DropdownQuestion
					name={name}
					key={name}
					group={this.props.group}
					data={CountryUtils.withCountryNames()}
					defaultValue={this.state.value[key]}
					onChange={this.onChange}
					dataAnchor="nationality-other"
					required
				>
					{`${friendlyNumber}. ${this.props.content.citizenshipListQuestion}`}
				</DropdownQuestion>
			);
		});

		// "Add Another" button
		let addAnother;
		if (this.state.numberOfAdditionalCitizenships < config.maxAdditionalCitizenships) {
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
		let removeOne;
		if (this.state.numberOfAdditionalCitizenships > 1) {
			removeOne =
				(<a
					href="#"
					onClick={this.onRemoveOne}
					className="btn btn-primary btn-lg pull-right"
					role="button"
				>
					Remove one
				</a>);
		}

		return (
			<div>
				{dropdowns}

				<fieldset>
					{addAnother}
					{removeOne}
					{this.getErrorElement()}
				</fieldset>
			</div>
		);
	},
});

module.exports = CitizenshipList;
