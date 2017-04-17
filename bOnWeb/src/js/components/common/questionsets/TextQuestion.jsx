/**
 * @module TextQuestion
 */

const React = require('react');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const _ = require('lodash');

const InputMixin = require('../mixins/InputMixin');

// Actions
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

// Stores
const ValidationStore = require('../../../stores/ValidationStore');

// Utils
const BrandUtils = require('../../../utils/BrandUtils');

const TextQuestion = React.createClass({

	propTypes: {
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		inputType: PropTypes.string,
		inputClassName: PropTypes.string,
		dataAnchor: PropTypes.string,
		onChange: PropTypes.func,
		validateType: PropTypes.string,
		validateEqualTo: PropTypes.string,
		arrayName: PropTypes.string,
		arrayIndex: PropTypes.number,
		disableErrorMessage: PropTypes.bool,
		valueFormatter: PropTypes.func,
		customValidator: PropTypes.func,
		maskValueOnBlur: PropTypes.bool,
		onBlur: PropTypes.func,
		containerClassName: PropTypes.string,
		mainColumnSizeMD: PropTypes.number,
		mainColumnSize: PropTypes.number,
		labelContainerClassName: PropTypes.string,
		labelClassName: PropTypes.string,
		children: PropTypes.node,
		labelSpan: PropTypes.element,
		inputContainerClassName: PropTypes.string,
		maxLength: PropTypes.number,
		required: PropTypes.bool,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			containerClassName: '',
			labelContainerClassName: '',
			labelClassName: '',
			inputContainerClassName: '',
			inputType: 'text',
			mainColumnSizeMD: BrandUtils.defaultColumnSize(),
			mainColumnSize: BrandUtils.defaultColumnSize(),
			valueFormatter: value => value,
			onBlur: _.noop,
		};
	},

	getInitialState() {
		return {
			value: !_.isUndefined(this.props.defaultValue) ? this.props.defaultValue : '',
		};
	},

	componentDidMount() {
		// This causes incorrect memory leak warnings from React when a page has many text fields shown at once.
		ValidationStore.addChangeListener(this._onStoreChange);
	},

	/**
	 * First value entered? Can validate now!
	 *
	 * @param  {Event} e
	 */
	onBlur(e) {
		const value = this._formatValue(e.target.value);
		this.enableValidation();
		this.updateStateValidation();

		AccountOpeningActions.setUserIsEditingField(false);

			// Do we need to obscure this field if the user is no longer editing it?
		if (this.props.maskValueOnBlur) {
			const realValue = value;

			if (realValue) {
				this.setState({
					value: realValue.replace(/[\S]/g, '*'),
					realValue,
				});
			}
		} else if (value !== e.target.value) {
				// Formatter has changed the value, so run the onChange
				// handler so we do not miss any steps
			this.onChange({ target: { value } });
		}

		this.props.onBlur(this.props.name, value);
	},

	/**
	 * On change, do these things and then call the function this.props.onChange.
	 *
	 * @param  {Event} e
	 */
	onChange(e) {
		const value = this._formatValue(e.target.value);

		this.setState({
			value,
		}, () => {
			this.updateStateValidation();

			if (this.props.onChange) {
				this.props.onChange(this.props.name, value, this.props.arrayName, this.props.arrayIndex);
			}
		});
	},

	/**
	 * Track that the user is editing a field so that
	 * the autosave does not kick in part way through.
	 *
	 */
	onFocus() {
		AccountOpeningActions.setUserIsEditingField(true);

			// Is the real value obscured when not focused?
		if (this.props.maskValueOnBlur) {
			this.setState({
				value: this.state.realValue,
				realValue: undefined,
			});
		}
	},

	_componentWillUnmount() {
		ValidationStore.removeChangeListener(this._onStoreChange);
	},

	_formatValue(value) {
		return this.props.valueFormatter(value);
	},

	/**
	 * Store has been updated.
	 *
	 * @param  {Event} e
	 */
	_onStoreChange() {
		this.forceUpdate();
	},

	customValidator() {
		return _.isFunction(this.props.customValidator) ? this.props.customValidator() : true;
	},

	/**
	 * Public method to allow Parent to tell this component
	 * to focus
	 */
	focus() {
		ReactDOM.findDOMNode(this.refs.textInput).focus();
	},

	render() {
		return (
			<div className={`row form-spacing text-question ${this.props.containerClassName}`}>
				<div className={`col-xs-12 col-md-${this._columnSizeRemainder(this.props.mainColumnSizeMD)} col-lg-${this._columnSizeRemainder(this.props.mainColumnSize)} ${this.props.labelContainerClassName}`}>
					<label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.children + this.getRequiredQuestionText()}</label>
					{this.props.labelSpan}
					{this.getHelpIcon()}
				</div>
				<div className={`col-xs-12 col-md-${this.props.mainColumnSizeMD} col-lg-${this.props.mainColumnSize} ${this.props.inputContainerClassName}`}>
					<input type={this.props.inputType}
						className={this.className(this.props.inputClassName)}
						id={this.props.name}
						name={this.props.name}
						ref="textInput"
						title={this.props.children}
						data-anchor={this.props.dataAnchor}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						maxLength={this.props.maxLength}
						value={this.state.value}
						aria-required={!!this.props.required}
					/>
				</div>

				{this.getErrorElement()}
				{this.getHelpElement()}
			</div>
		);
	},
});

module.exports = TextQuestion;
