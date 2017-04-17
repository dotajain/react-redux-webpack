/**
 * @module Dropdown
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;

const Dropdown = React.createClass({
	propTypes: {
		dataAnchor: PropTypes.string,
		options: PropTypes.array.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		value: PropTypes.any,
	},

	getDefaultProps() {
		return {
			placeholder: 'Select...',
		};
	},

	componentWillMount() {
		this.normalizer = _.memoize(this.normalizeValue);
	},

	shouldComponentUpdate(nextProps) {
		return this.isValueDifferent(nextProps) || this.areOptionsDifferent(nextProps);
	},

	onChange(e) {
		const value = this.getValue(e.target.value);
		this.props.onChange(value);
	},

	getOptions() {
		return _.map(this.props.options, (option, i) => {
			const label = option.label || option.value;
			const value = this.normalizer(option.value);

			return (<option key={`option-${i}`} value={value}>{label}</option>);
		});
	},

	getValue(value) {
		const map = _.invert(this.map);

		if (value && _.has(map, value)) {
			return map[value];
		}

		return value;
	},

	areOptionsDifferent(props) {
		return !!(props.options && this.props.options && props.options.length !== this.props.options.length);
	},

	isValueDifferent(props) {
		return props.value !== this.props.value;
	},

	map: {},

	/**
	* Normalizes the value used within the internal select.  This is to get around the
	* descrepencies in the data we get.  it upper cases the value, and stores in within the map
	* with the original value as the key.  This allows us to return the original value and maintain
	* consistency internally
	*
	* @param {String} value 	Value to be normalized.  Can be null.
	*
	* @return {String} 	Normalized string
	*
	*/
	normalizeValue(value) {
		if (!value) {
			return '';
		}

		const map = _.extend({}, this.map);
		const normalized = value.toUpperCase();

		if (map[value] || _.values(map).indexOf(normalized) > -1) {
			return map[value] || normalized;
		}

		map[value] = normalized;
		this.map = map;

		return normalized;
	},

	render() {
		return (
			<select
				name={this.props.name}
				id={this.props.name}
				data-anchor={this.props.dataAnchor}
				onChange={this.onChange}
				value={this.normalizer(this.props.value)}
			>
				<option value="" disabled>{this.props.placeholder}</option>
				{this.getOptions()}
			</select>
		);
	},
});

module.exports = Dropdown;
