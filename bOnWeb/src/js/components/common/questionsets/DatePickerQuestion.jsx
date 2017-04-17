/**
 * @module DatePickerQuestion
 */

const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');

const DateTimeField = require('react-bootstrap-datetimepicker');
const InputMixin = require('../mixins/InputMixin');
const modernizr = require('modernizr');

// Utils
const DateUtils = require('../../../utils/DateUtils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const BrandUtils = require('../../../utils/BrandUtils');

const DatePickerQuestion = React.createClass({

	propTypes: {
		defaultValue: PropTypes.string,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		dataAnchor: PropTypes.string,
		validateBeforeToday: PropTypes.bool,
		viewMode: PropTypes.string,
		children: PropTypes.node,
		required: PropTypes.bool,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			validateType: 'date',
			viewMode: 'years',
			helpMessageSuffix: 'datePickerHelpMessageSuffix',
		};
	},

	getInitialState() {
		const defaultValue = DateUtils.getShortString();
		const value = this.props.defaultValue;
		return {
			defaultValue,
			value,
		};
	},

	onChange(value) {
		this._performChange(value);
	},

	onChangeHTML5Input(event) {
		this._performChange(DateUtils.getShortStringFromHTML5Date(event.target.value));
	},

	_performChange(value) {
		this.enableValidation();

		this.setState({
			value,
		}, () => {
			this.updateStateValidation();
			this.props.onChange(this.props.name, this.state.value);
		});
	},

	render() {
		const mainColumnSize = BrandUtils.defaultColumnSize();
		const columnSize = this._columnSizeRemainder(mainColumnSize);

		return (
			<fieldset className="row form-spacing">
				<div className={`col-xs-12 col-md-${columnSize}`}>
					<label htmlFor={this.props.name}>Enter Date Of Birth</label>
					{this.getHelpIcon()}
				</div>

				<div className={`col-xs-12 col-md-${mainColumnSize}`}>
					<div
						className={this.className('datepicker-wrapper')}
						data-anchor={this.props.dataAnchor}
					>
						{ /* Should this be a touch device that supports the date input then render an HTML5 date input, otherwise render the react ported bootstrap component */ }
						{(!BrowserUtils.isMobileBrowser() || !modernizr.inputtypes.date) ?
							<DateTimeField
								defaultText={this.state.value || ''}
								dateTime={this.state.value || this.state.defaultValue}
								format={config.dateFormat}
								inputFormat={config.dateFormat}
								onChange={this.onChange}
								viewMode={this.props.viewMode}
								inputProps={{ title: `${this.props.children} : ${config.dateFormat}`, placeholder: config.dateFormat, id: this.props.name }}
							/>
							:
							<input
								className={this.className()}
								type="date"
								id={this.props.name}
								name={this.props.name}
								value={DateUtils.getAPIDateString(this.state.value)}
								onChange={this.onChangeHTML5Input}
								required={this.props.required}
							/>
						}
					</div>
				</div>

				{this.getErrorElement()}
				{this.getHelpElement()}
			</fieldset>
		);
	},
});

module.exports = DatePickerQuestion;
