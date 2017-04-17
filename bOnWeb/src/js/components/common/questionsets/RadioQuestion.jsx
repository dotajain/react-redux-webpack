/**
 * @module RadioQuestion
 */

const _ = require('lodash');
const React = require('react');
const PropTypes = React.PropTypes;

// Components
const InputMixin = require('../mixins/InputMixin');
const RadioButton = require('./RadioButton');

// Utils
const BrandUtils = require('../../../utils/BrandUtils');

const RadioQuestion = React.createClass({

	propTypes: {
		align: PropTypes.oneOf(['left', 'right', 'center']),
		blockList: PropTypes.bool,
		className: PropTypes.string,
		classNameLabelDiv: PropTypes.string,
		defaultValue: PropTypes.string,
		group: PropTypes.string.isRequired,
		labelText: PropTypes.string,
		key: PropTypes.any,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		options: PropTypes.array.isRequired,	// See <RadioButton> for props.
		type: PropTypes.oneOf(['images']),
		labelledBy: PropTypes.string,
		mainColumnSizeMD: PropTypes.number,
		mainColumnSize: PropTypes.number,
		dataAnchor: PropTypes.string,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			align: 'left',
			blockList: false,
			mainColumnSize: BrandUtils.defaultColumnSize(),
			mainColumnSizeMD: BrandUtils.defaultColumnSize(),
		};
	},

	getInitialState() {
		return {
			value: this.props.defaultValue,
		};
	},

	onChange(e) {
		// First value entered? Can validate now!
		if (_.isUndefined(this.state.value)) {
			this.enableValidation();
		}

		this.setState({
			value: e.target.value,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value);
		});
	},

	/**
	 * Get the list of buttons for this question.
	 *
	 * @return {Array} Of React components.
	 */
	getButtons() {
		return _.map(this.props.options, (opt, i) => {
			return (<RadioButton
				blockList={this.props.blockList}
				isChecked={this.state.value === opt.value}
				key={`${this.props.name}-${i}`}
				name={this.props.name}
				onChange={this.onChange}
				question={this.props.labelText + this.getRequiredQuestionText()}
				{...opt}
			/>);
		});
	},

	/**
	 * Get the label element, if any.
	 *
	 * @return {JSX}
	 */
	getLabel() {
		if (!this.props.labelText) {
			!this.props.labelledBy && console.warn(`RadioQuestion ${this.props.name} has no label`);
			return;
		}

		return <label id={this.generateLabelId()}>{this.props.labelText + this.getRequiredQuestionText()}</label>;
	},

	/**
	 * Generates an Id to be used for the label for this control, so we can easily reuse it for aria-labelledby
	 *
	 */
	generateLabelId() {
		return `label-${this.props.name}`;
	},

	render() {
		// Container classes.
		const classNames = ['row', 'radio-button-question', this.props.className];
		this.props.options[0] && this.props.options[0].image && classNames.push('image-radio-button-question'); // Using images?

		const labelColumnSizeMD = `col-md-${this._columnSizeRemainder(this.props.mainColumnSizeMD)}`;
		const labelColumnSize = `col-lg-${this._columnSizeRemainder(this.props.mainColumnSize)}`;

		// Label div
		const labelDivClasses = [
			this.props.classNameLabelDiv,
			'col-xs-12',
			labelColumnSizeMD,
			labelColumnSize,
		];

		const align = `text-${this.props.align}`;
		const buttonColumnSizeMD = `col-md-${this.props.mainColumnSizeMD}`;
		const buttonColumnSize = `col-lg-${this.props.mainColumnSize}`;

		// Radio buttons div
		const buttonsDivClasses = [
			align,
			'radio-button-question-content',
			'col-xs-12',
			buttonColumnSizeMD,
			buttonColumnSize,
		];

		return (
			<fieldset key={this.props.key} className={classNames.join(' ')} role="radiogroup" aria-labelledby={this.props.labelledBy || this.generateLabelId()}>
				<div className={labelDivClasses.join(' ')} data-anchor={this.props.dataAnchor}>
					{this.getLabel()}
					{this.getHelpIcon()}
				</div>

				<div className={buttonsDivClasses.join(' ')}>
					{this.getButtons()}
				</div>

				{this.getErrorElement()}
				{this.getHelpElement()}
			</fieldset>
		);
	},
});

module.exports = RadioQuestion;
