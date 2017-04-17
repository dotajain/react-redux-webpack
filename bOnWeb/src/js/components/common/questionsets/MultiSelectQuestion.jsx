/**
 * @module MultiSelectQuestion
 */

// Packages
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

// Components
const InputMixin = require('../mixins/InputMixin');
const LoadingSpinner = require('../../LoadingSpinner.jsx');

// Utils
const BrandUtils = require('../../../utils/BrandUtils');

const MultiSelectQuestion = React.createClass({

	propTypes: {
		autoFocus: PropTypes.bool,
		appData: PropTypes.object,
		name: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		onItemSelected: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		selectButtonText: PropTypes.string,
		dataAnchor: PropTypes.string,
		labelText: PropTypes.string.isRequired,
		isLoading: PropTypes.bool,
		buttonDislabled: PropTypes.bool,
	},

	mixins: [InputMixin],

	getDefaultProps() {
		return {
			autoFocus: false,
			selectButtonText: 'Select',
		};
	},

	getInitialState() {
		return {};
	},

	/**
	 * Call the given onItemSelected function with the chosen item.
	 *
	 * @param  {Event} e
	 */
	onChange(e) {
		this.setState({
			selectedLabel: e.target.label,
			selectedValue: e.target.value,
		});
	},

	/**
	 * Call the given onItemSelected function with the chosen item.
	 *
	 */
	onClick() {
		this.props.onItemSelected(this.state.selectedLabel, this.state.selectedValue);
	},

	/**
	 * Get <option> elements for the <select>
	 *
	 * @return {Array} Of ReactElements
	 */
	getItems() {
		const result = [];

		if (this.props.placeholder) {
			result.push(<option key="default" value="" disabled hidden>{this.props.placeholder}</option>);
		}

		return result.concat(_.map(this.props.data, item => {
			return (<option key={item.index} value={item.value} data-anchor={item.dataAnchor}>{item.text}</option>);
		}));
	},

	render() {
		const contentColumnSize = BrandUtils.defaultColumnSize();
		const labelColumnSize = this._columnSizeRemainder(contentColumnSize);

		const isLoading = (this.props.appData && this.props.appData.isApiCallInProgress) || this.props.isLoading;

		// Check to see whether to render a label space
		const label = (<div className={`col-xs-12 col-md-${labelColumnSize} ${labelColumnSize === 12 ? 'screenreader' : ''}`}>
				<label htmlFor={this.props.name}>{this.props.labelText}</label>
			</div>);

		return (
			<div className="row form-spacing">
				{label}
				<div className={`col-xs-12 col-md-${contentColumnSize}`}>
					<div className="form-spacing select-wrapper">
						<select
							autoFocus={this.props.autoFocus}
							name={this.props.name}
							id={this.props.name}
							data-anchor={`${this.props.dataAnchor}-select`}
							onChange={this.onChange}
							defaultValue=""
						>
							{this.getItems()}
						</select>
					</div>

					<button
						onClick={this.onClick}
						className="btn btn-primary btn-lg btn-filled btn-postcode-input"
						role="button"
						data-anchor={`${this.props.dataAnchor}-select-button`}
						disabled={isLoading || _.isUndefined(this.state.selectedValue) || this.props.buttonDislabled}
					>
						{isLoading ? <LoadingSpinner imgSize={30} /> : this.props.selectButtonText }
					</button>
				</div>
			</div>
		);
	},
});

module.exports = MultiSelectQuestion;
