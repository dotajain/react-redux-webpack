/**
 * @module DropdownQuestion
 */

// Packages
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

// Components
const Dropdown = require('./Dropdown');
const InputMixin = require('../mixins/InputMixin');

// Utils
const BrandUtils = require('../../../utils/BrandUtils');

const DropdownQuestion = React.createClass({

	propTypes: {
		data: PropTypes.array.isRequired,
		defaultValue: PropTypes.string,
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		arrayName: PropTypes.string,
		arrayIndex: PropTypes.number,
		onChange: PropTypes.func,
		selectedValue: PropTypes.string,
		customValidator: PropTypes.func,
		children: PropTypes.node,
		dataAnchor: PropTypes.string,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			customValidator: () => true,
		};
	},

	getInitialState() {
		return this.getState(this.props);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedValue !== this.props.selectedValue) {
			this.onChange(nextProps.selectedValue);
		}
	},

	onChange(newValue) {
		// First value entered? Can validate now!
		if (_.isUndefined(this.state.value)) {
			this.enableValidation();
		}

		this.setState({
			value: newValue,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value, this.props.arrayName, this.props.arrayIndex);
		});
	},

	getState(props) {
		const behaviour = _.result(_.find(props.data, { value: props.defaultValue }), 'behaviour');
		return {
			value: (!behaviour) ? props.defaultValue : `${props.defaultValue}|${behaviour}`, // Will be undefined if not specified
		};
	},

	_getLabel(data) {
		// If this is just a string there's nothing to do here
		if (_.isString(data)) {
			return data;
		}

		return data.label;
	},

	_getValue(data) {
		// If this is just a string there's nothing to do here
		if (_.isString(data)) {
			return data;
		}

		// If there's a value and a behaviour return them piped
		if (data.value && data.behaviour) {
			return (`${data.value}|${data.behaviour}`);
		}

		// If there's a value specified then return it
		if (data.value) {
			return data.value;
		}

		// If there's a label return that as the value
		if (data.label) {
			return data.label;
		}

		// If we've got to this point don't do anything and let the code fall over. A unique value must be assigned!
	},

	customValidator() {
		return this.props.customValidator();
	},

	render() {
		// Label
		const label = (this.props.children) ? <label htmlFor={this.props.name}>{this.props.children + this.getRequiredQuestionText()}</label> : undefined;

		// Options
		const options = [];
		for (let i = 0; i < this.props.data.length; i++) {
			options.push({ value: this._getValue(this.props.data[i]), label: this._getLabel(this.props.data[i]) });
		}

		const mainColumnSize = BrandUtils.defaultColumnSize();
		const columnSize = this._columnSizeRemainder(mainColumnSize);

		return (
			<div className="row form-spacing">
				<div className={`col-xs-12 col-md-${columnSize}`}>
					{label}
					{this.getHelpIcon()}
				</div>
				<div className={this.className(`col-xs-12 col-md-${mainColumnSize}`)}>
					<Dropdown
						dataAnchor={this.props.dataAnchor}
						name={this.props.name}
						value={this.state.value || this.props.selectedValue}
						options={options}
						onChange={this.onChange}
					/>
				</div>

				{this.getErrorElement()}
				{this.getHelpElement()}
			</div>
		);
	},
});

module.exports = DropdownQuestion;
