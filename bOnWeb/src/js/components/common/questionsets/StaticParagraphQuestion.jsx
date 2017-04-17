/**
 * @module StaticParagraphQuestion
 */

const React = require('react');
const { PropTypes } = React;

const InputMixin = require('../../common/mixins/InputMixin');

const BrandUtils = require('../../../utils/BrandUtils');

const StaticParagraphQuestion = React.createClass({

	propTypes: {
		isInputField: PropTypes.bool,
		dataAnchor: PropTypes.string,
		name: PropTypes.string.isRequired,
		group: PropTypes.string,
		label: PropTypes.string.isRequired,
		defaultValue: PropTypes.any,
		className: PropTypes.string,
		mainColumnSize: PropTypes.number,
		readonlyValue: PropTypes.any,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			className: '',
			mainColumnSize: BrandUtils.defaultColumnSize(),
		};
	},

	getInitialState() {
		return {
			value: this.props.defaultValue,
		};
	},

	getInputField() {
		return (
			<input type="text"
			className="read-only col-xs-12 col-md-12"
			autoFocus="true"
			readOnly="true"
			data-anchor={this.props.dataAnchor}
			value={this.state.value}
			/>
		);
	},

	getParagraph() {
		return <p className="paragraph-question" data-anchor={this.props.dataAnchor}>{this.props.readonlyValue || this.state.value}</p>;
	},

	render() {
		return (
			<div className={`row form-spacing text-question ${this.props.className}`}>

				<div className={`col-xs-${this.props.mainColumnSize}`}>
					<label htmlFor={this.props.name}>{this.props.label}</label>
				</div>
				<div className={`paragraph-question-wrapper col-xs-12 col-md-${this._columnSizeRemainder(this.props.mainColumnSize)}`}>

					{this.props.isInputField ? this.getInputField() : this.getParagraph()}
				</div>
			</div>
		);
	},
});

module.exports = StaticParagraphQuestion;
