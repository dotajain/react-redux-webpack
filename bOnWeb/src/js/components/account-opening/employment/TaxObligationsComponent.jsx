/**
 * @module TaxObligationsComponent
 * @requires AccountOpeningActions
 * @requires RadioQuestion
 * @requires SectionFullWidth
 * @requires ComponentHeader
 * @requires TaxObligationList
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const RadioQuestion = require('../../common/questionsets/RadioQuestion');
const ComponentHeader = require('../../common/ComponentHeader');
const TaxObligationList = require('../sections/TaxObligationList');

const TaxObligationsComponent = React.createClass({

	propTypes: {
		group: PropTypes.string.isRequired,

		content: PropTypes.shape({
			allTaxObligationsListed: PropTypes.string,
			taxStatusIntro: PropTypes.string,
			taxObligationsTitle: PropTypes.string,
			hasNoTaxOligations: PropTypes.string,
		}),

		data: PropTypes.shape({
			hasNoTaxOligations: PropTypes.string,
			allTaxObligationsListed: PropTypes.string,
		}),

	},

	getDefaultProps() {
		return {
			content: {},
			data: {},
		};
	},

	/**
	 * On change handler for has tax obligations question. Is the answer yes? If so then
	 * render in the tax obligation questions.
	 * @param  {string} name  the name of question
	 * @param  {string} value the value selected
	 */
	onHasNoTaxObligationsChange(name, value) {
		const data = [{ key: name, value }];

		// Clear the saved list if user now says they don't have one.
		if (value === 'Yes') {
			data.push({ key: 'taxObligationList', value: undefined });
		}

		AccountOpeningActions.updateFormValues(data);
	},

	/**
	 * Response for rendering the intro
	 * @return {ReactElement} null when content.taxStatusIntro is not present,
	 * content.taxStatusIntro wrapped otherwise
	 */
	renderIntro() {
		const taxStatusIntro = this.props.content.taxStatusIntro;
		if (!taxStatusIntro) {
			return null;
		}

		return (
			<p>{taxStatusIntro}</p>
			);
	},

	/**
	 * Responsible for rendering the Tax Oblicaion Details
	 * @return {object} Returns null if @prop data.hasNoTaxOligations
	 *     equals 'No', or TaxObligationList otherwise
	 */
	renderTaxObligationDetails() {
		if (this.props.data.hasNoTaxOligations !== 'No') {
			return null;
		}

		return (
			<div>
				<TaxObligationList
					name="taxObligationList"
					group={this.props.group}
					onChange={AccountOpeningActions.updateFormValue}
					data={this.props.data}
					disableAddOrRemove={this.props.data.allTaxObligationsListed === 'Yes'}
					content={this.props.content}
				/>

				<RadioQuestion
					defaultValue={this.props.data.allTaxObligationsListed}
					group={this.props.group}
					labelText={this.props.content.allTaxObligationsListed}
					name="allTaxObligationsListed"
					onChange={AccountOpeningActions.updateFormValue}
					options={[{
						anchor: 'tax-obligations-more-no',
						value: 'No',
					}, {
						anchor: 'tax-obligations-more-yes',
						value: 'Yes',
					}]}
					required
					validateEqualTo="Yes"
				/>
			</div>
		);
	},

	render() {
		return (
				<ComponentHeader
					title={this.props.content.taxObligationsTitle}
					titleLevel={2}
					hasSeparator
				>

					{this.renderIntro()}

					<RadioQuestion
						defaultValue={this.props.data.hasNoTaxOligations}
						group={this.props.group}
						labelText={this.props.content.hasNoTaxOligations}
						name="hasNoTaxOligations"
						onChange={this.onHasNoTaxObligationsChange}
						options={[{
							anchor: 'tax-obligations-no',
							value: 'No',
						}, {
							anchor: 'tax-obligations-yes',
							value: 'Yes',
						}]}
						required
					/>

					{this.renderTaxObligationDetails()}
				</ComponentHeader>
		);
	},
});

module.exports = TaxObligationsComponent;
