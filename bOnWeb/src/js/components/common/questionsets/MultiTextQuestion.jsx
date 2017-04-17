/**
 * @module MultiTextQuestion
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;

const InputMixin = require('../mixins/InputMixin');

const TextQuestion = require('../../../components/common/questionsets/TextQuestion');

const MultiTextQuestion = React.createClass({

	propTypes: {
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		inputContainerClasses: PropTypes.string,
		inputType: PropTypes.string,
		mainColumnSize: PropTypes.number,
		mainColumnSizeMD: PropTypes.number,
		autoTab: PropTypes.bool,
		inputsMaxLength: PropTypes.number,
		data: PropTypes.array,
		itemPrefix: PropTypes.string,
		children: PropTypes.node,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			inputContainerClasses: 'text-right',
			inputType: 'text',
			autoTab: false,
		};
	},

	getInitialState() {
		return {
			value: [],
		};
	},

	/**
	 * Shared change handler for each of the input elements
	 * @param {string} name     individual text box name value
	 * @param {string} indValue individual text box value as given by textquestion
	 */
	onChange(name, indValue) {
		this.validationCheck(name, indValue, (value, index) => {
			this.props.onChange && this.props.onChange(this.props.name, this.state.value);
			this._autoTab(indValue, index);
		});
	},

	/**
	 * Encapsulates auto tab functionaility.  Checks it should tab/focus,
	 * if so, tries to retieve the next ref to use, checks it can tab/focus,
	 * if so, calls .focus on the next ref
	 * @param  {string} text  value of the current ref/input
	 * @param  {int} index index of the current ref/input
	 */
	_autoTab(text, index) {
		if (!this._shouldAutoTab(text)) {
			return;
		}

		const nextName = this._getRefName(index + 1);
		const ref = this.refs[nextName];

		if (!this._canAutoTab(ref)) {
			return;
		}

		ref.focus();
	},

	/**
	 * Encapsulates checking if we can autotab onto the next ref/input
	 * @param  {object} ref ref/input to check
	 * @return {boolean}     return true when ref if present, and has
	 * a focus method
	 */
	_canAutoTab(ref) {
		return ref && !!(ref.focus);
	},

	/**
	 * Generates string to be used for the child TextQuestion
	 * name and ref
	 * @return {string} string to be used for name/ref
	 */
	_getRefName(index) {
		return `${this.props.name}-${index}`;
	},

	/**
	 * Encapsulates the decision for if we should autotab
	 * @param  {string} text value of the current ref/input
	 * @return {boolean}      Retutns true if autotab is enabled, there is
	 *                        a maxLength value and the current text length is equal or greater
	 *                        than maxLength
	 */
	_shouldAutoTab(text) {
		return this.props.autoTab &&
			this.props.inputsMaxLength &&
			text.length >= this.props.inputsMaxLength;
	},

	/**
	 * Custom validation.
	 */
	customValidator() {
		return (this.props.data.length === this.state.value.length) && _.every(this.state.value, value => {
			return !_.isEmpty(value);
		});
	},

	/**
	 * Functionality used by both the onBlur and onChange handlers
	 * @param {string} name     individual text box name value
	 * @param {string} indValue individual text box value as given by textquestion
	 * @param {Function} callback	Function to be called after the validation is complete
 	 */
	validationCheck(name, indValue, callback) {
		const index = Number(_.last(name.split('-')));

		const value = this.state.value.slice(0);
		value[index] = indValue;

		this.setState({
			value,
		}, () => {
			// Validate once all TextQuestion boxes after the final TextQuestion has been reached.
			if (this.state.value.length === this.props.data.length) {
				this.enableValidation();
			}

			this.updateStateValidation();

			callback && callback(indValue, index);
		});
	},

	render() {
		const excProps = {
			name: null,
			onChange: null,
			onBlur: null,
			inputContainerClasses: null,
			mainColumnSize: null,
			mainColumnSizeMD: null,
		};

		// Props to pass to child TextQuestion are this.props
		// minus ones defined in excProps
		const filteredProps = _.omitBy(this.props, (value, key) => _.has(excProps, key));

		const options = this.props.data.map((item, key) => {
			const refName = this._getRefName(this.props.data.indexOf(item));
			const dataAnchor = this._getRefName(this.props.data.indexOf(item) + 1);

			return (
				<div key={key} className={`col-xs-12 col-md-${this.props.mainColumnSizeMD} col-lg-${this.props.mainColumnSize}`}>
						<TextQuestion
							name={refName}
							id={refName}
							ref={refName}
							mainColumnSize={12}
							mainColumnSizeMD={12}
							disableErrorMessage
							maxLength={this.props.inputsMaxLength}
							onChange={this.onChange}
							dataAnchor={dataAnchor}
							onBlur={this.validationCheck}
							{...filteredProps}
						>
							{`${this.props.itemPrefix + item}`}
						</TextQuestion>
				</div>
			);
		});

		return (
			<div className="row form-spacing multi-text-question">
				<div className="col-xs-12" >
					<label htmlFor={this.props.name} className="question-body">{this.props.children + this.getRequiredQuestionText()}</label>
					{this.getHelpIcon()}
				</div>

				{options}

				{this.getErrorElement()}
				{this.getHelpElement()}
			</div>
		);
	},
});

module.exports = MultiTextQuestion;
