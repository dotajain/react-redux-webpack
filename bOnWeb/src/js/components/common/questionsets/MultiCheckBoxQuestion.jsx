/**
 * @module MultiCheckBoxQuestion
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;

const InputMixin = require('../mixins/InputMixin');

const MultiCheckBoxQuestion = React.createClass({
	propTypes: {
		defaultValue: PropTypes.array,
		name: PropTypes.string,
		data: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
	},

	mixins: [InputMixin],

	getInitialState() {
		return {
			value: this.props.defaultValue || [],
		};
	},

	onChange(event) {
		let newValue;

		// First value entered? Can validate now!
		if (this.state.value.length === 0) {
			this.enableValidation();
		}

		if (event.target.checked) {
			newValue = _.uniq(this.state.value.concat([event.target.name]));
		} else {
			newValue = _.without(this.state.value, event.target.name);
		}

		this.setState({
			value: newValue,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value);
		});
	},

	// Used by InputMixin
	_inputType: 'multiCheckbox',

	render() {
		const options = _.map(this.props.data, (item, index) => {
			return (
				<div className="col-xs-12 col-md-3" key={`${this.props.name}-item-${index}`}>
					<label htmlFor={item.value} className="checkbox-inline">
						<input
							type="checkbox"
							id={item.value}
							name={item.value}
							defaultChecked={this.state.value.indexOf(item.value) >= 0}
							data-anchor={item.anchor}
							onChange={this.onChange}
						/>
							{item.label}
					</label>
				</div>
			);
		});

		return (
			<div className="row form-spacing">
			<fieldset>
			<legend className=".sr-only">{this.props.name}</legend>
			{options}
			{this.getErrorElement()}
			</fieldset>
			</div>
		);
	},
});

module.exports = MultiCheckBoxQuestion;
