/**
 * @module CheckBoxQuestion
 */

const React = require('react');
const { PropTypes } = React;

const InputMixin = require('../mixins/InputMixin');

const CheckBoxQuestion = React.createClass({
	propTypes: {
		defaultValue: PropTypes.bool,
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		dataAnchor: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		children: PropTypes.node,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {};
	},

	getInitialState() {
		return {
			value: this.props.defaultValue,
		};
	},

	onChange(e) {
		this.setState({
			value: e.target.checked,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value);
		});
	},

	// Used by InputMixin
	_inputType: 'checkbox',

	render() {
		return (
			<label htmlFor={this.props.name} className="checkbox-inline" data-anchor={this.props.dataAnchor}>
				<input
					type="checkbox"
					id={this.props.name}
					name={this.props.name}
					defaultChecked={this.state.value}
					onChange={this.onChange}
				/>
				<span dangerouslySetInnerHTML={{ __html: this.props.children }} />
			</label>
		);
	},
});

module.exports = CheckBoxQuestion;
