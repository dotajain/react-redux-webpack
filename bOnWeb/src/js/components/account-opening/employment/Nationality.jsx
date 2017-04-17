/**
 * @module Nationality
 */

const React = require('react');
const { PropTypes } = React;

const ComponentHeader = require('../../common/ComponentHeader');
const CountryUtils = require('../../../utils/CountryUtils');
const CitizenshipList = require('../sections/CitizenshipList');
const { DropdownQuestion, TextQuestion, RadioQuestion } = require('../../common/questionsets');

const Nationality = props => (

	<ComponentHeader
		title={props.content.nationalityTitle}
		titleLevel={2}
		hasSeparator
	>

		<DropdownQuestion
			name="nationality"
			group={props.group}
			data={CountryUtils.withNationalityLabelsAndCountryNames()}
			onChange={props.onChange}
			defaultValue={props.data.nationality}
			dataAnchor="nationality-country"
			required
		>
			{props.content.nationalityQuestion}
		</DropdownQuestion>

		<TextQuestion
			name="cityBorn"
			group={props.group}
			onChange={props.onChange}
			defaultValue={props.data.cityBorn}
			minLength={2}
			maxLength={40}
			validateType="alpha"
			dataAnchor="nationality-city-born"
			required
		>
			{props.content.cityBorn}
		</TextQuestion>

		<DropdownQuestion
			name="countryBorn"
			group={props.group}
			data={CountryUtils.withCountryNames()}
			onChange={props.onChange}
			defaultValue={props.data.countryBorn}
			dataAnchor="nationality-country-born"
			required
		>
			{props.content.countryBorn}
		</DropdownQuestion>

		<RadioQuestion
			defaultValue={props.data.ukCitizen}
			group={props.group}
			labelText={props.content.ukCitizen}
			name="ukCitizen"
			onChange={props.onChange}
			options={[{
				anchor: 'nationality-uk-no',
				value: 'No',
			}, {
				anchor: 'nationality-uk-yes',
				value: 'Yes',
			}]}
			required
		/>

		{/* Must be "Yes" if you have indicated you are not a UK citizen.*/}
		<RadioQuestion
			defaultValue={props.data.hasAdditionalCitizenships}
			group={props.group}
			labelText={props.content.hasAdditionalCitizenships}
			name="hasAdditionalCitizenships"
			onChange={props.onChange}
			options={[{
				anchor: 'nationality-other-no',
				value: 'No',
			}, {
				anchor: 'nationality-other-yes',
				value: 'Yes',
			}]}
			required
			validateEqualTo={props.data.ukCitizen === 'Yes' ? undefined : 'Yes'}
		/>

		{(props.data.hasAdditionalCitizenships === 'Yes') ?
			<CitizenshipList
				name="citizenshipList"
				group={props.group}
				content={props.content}
				onChange={props.onChange}
				defaultValue={props.data.citizenshipList}
			/> :
			undefined}
	</ComponentHeader>
);


Nationality.propTypes = {
	group: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

module.exports = Nationality;
