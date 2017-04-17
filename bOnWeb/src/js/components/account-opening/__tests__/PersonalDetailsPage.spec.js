jest.unmock('../PersonalDetailsPage');
jest.unmock('react-bootstrap-datetimepicker');
jest.unmock('../../common/ComponentHeader');
jest.unmock('../../common/PageColumnWrapper');
jest.unmock('../../common/SectionFullWidth');
jest.unmock('../personalDetails');
jest.unmock('../personalDetails/FirstName');
jest.unmock('../personalDetails/LastName');
jest.unmock('../personalDetails/MiddleName');
jest.unmock('../personalDetails/DateOfBirth');
jest.unmock('../personalDetails/PhoneNumber');
jest.unmock('../personalDetails/EmailAddress');
jest.unmock('../../common/mixins/InputMixin');
jest.unmock('../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../common/questionsets/DropdownQuestion');
jest.unmock('../../common/questionsets/Dropdown');
jest.unmock('../../../config');
jest.unmock('../../../config/FormOptions');
jest.unmock('../../../utils/RegexUtils');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const PersonalDetailsPage = require('../PersonalDetailsPage');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
const CredentialsActions = require('../../../actions/CredentialsActions');
const RegexUtils = require('../../../utils/RegexUtils');

const _ = require('lodash');

describe('Personal Details Page', function() {

	const content = {
		firstNameQuestion: 'test',
		lastNameQuestion:  'test',
		middleNameQuestion:  'test',
		dateOfBirthQuestion: 'test',
		phoneNumberQuestion: 'test',
		emailAddressQuestion: 'test',
		emailAddressConfirmationQuestion: 'test',
	};

	const data = {
		productCode: 'IM540',
	};

	// Render an instance of the component
	let instance;

	describe('when there is an access token present', () => {
		describe('and no bank id is present', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					session={{
						accessToken: 'accessToken'
					}}
					appData={{}} />
				);
			});

			it('should not call for credentials', () => {
				expect(CredentialsActions.getCredentials.mock.calls.length).toBe(0);
			});
		});

		describe('and a bank id is present', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{
						bankID: 'DYB'
					}}
					content={content}
					session={{
						accessToken: 'accessToken'
					}}
					appData={{}} />
				);
			});

			it('should call for credentials', () => {
				expect(CredentialsActions.getCredentials.mock.calls.length).toBe(1);
			});
		});
	});

	describe('canEditUsername', () => {
		describe('when no username has been set', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />
				);
			});

			it('should not be possible to edit username', () => {
				expect(instance.canEditUsername(false)).toBe(true);
			});
		});

		describe('when username has been set', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{
						username: 'asdadasd'
					}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit username', () => {
				expect(instance.canEditUsername(false)).toBe(false);
			});
		});

		describe('when case if has been set', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{
						caseId: 'asdadasd'
					}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit username', () => {
				expect(instance.canEditUsername(false)).toBe(false);
			});
		});

		describe('when user is existing customer', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit username', () => {
				expect(instance.canEditUsername(true)).toBe(false);
			});
		});

	});

	describe('canEditPassword', () => {
		describe('when no credentials or password are present', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />
				);
			});

			it('should not be possible to edit password', () => {
				expect(instance.canEditPassword(false, false)).toBe(true);
			});
		});

		describe('when credentials are present and no password is present', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{
						credentials: {
						}
					}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit password', () => {
				expect(instance.canEditPassword(false, false)).toBe(true);
			});
		});

		describe('when credentials and password are present', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{
						credentials: {
							password: 'password'
						}
					}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit password', () => {
				expect(instance.canEditPassword(false, false)).toBe(false);
			});
		});

		describe('when user is existing RIB customer', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />
				);
			});

			it('should not be possible to edit password', () => {
				expect(instance.canEditPassword(true, true)).toBe(false);
			});
		});

		describe('when user is existing not RIB customer', () => {
			beforeEach(() => {
				instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />
				);
			});

			it('should be possible to edit password', () => {
				expect(instance.canEditPassword(true, false)).toBe(true);
			});
		});

	});

	describe('when user enters phone number', () => {
		let expectedPhoneNumber;

		function setupTest(number, dataProp, isPhoneNumber, isMobileNumber) {
			RegexUtils.isValid = jest.fn().mockReturnValueOnce(isPhoneNumber).mockReturnValueOnce(isMobileNumber);

			instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
				data={dataProp}
				content={content}
				appData={{}} />
			);

			AnalyticsActionCreator.track.mockClear();
			expectedPhoneNumber = number;
			instance.onPhoneNumberChange('phoneNumber', expectedPhoneNumber);
		}

		beforeEach(() => {
			setupTest('0141338404', {}, true, false);
		});

		afterEach(() => {
			AnalyticsActionCreator.track.mockClear();
		});

		it('should test phone number against regex utils', () => {
			let [actualPhoneNumber, actualRegex] = RegexUtils.isValid.mock.calls[0];
			expect(RegexUtils.regexes.phone).toBe(actualRegex);
		});

		describe('and it is valid', () => {

			beforeEach(() => {
				setupTest('0141338404', {}, true, false);
			});

			afterEach(() => {
				AnalyticsActionCreator.track.mockClear();
			});

			it('should sucessfully pass validation with RegexUtils', () => {
				let [actualPhoneNumber, actualRegex] = RegexUtils.isValid.mock.calls[0];

				expect(RegexUtils.isValid.mock.calls.length).toBeGreaterThan(0);
				expect(actualPhoneNumber).toEqual(expectedPhoneNumber);
			});

			it('should start track through analytics', () => {
				expect(AnalyticsActionCreator.track.mock.calls.length).toBeGreaterThan(0);
			});

			it('should test for mobile number', () => {
				let [actualPhoneNumber, actualRegex] = RegexUtils.isValid.mock.calls[1];
				expect(actualRegex).toBe(RegexUtils.regexes.mobilePhone);
			});
		});

		describe('and it is invalid', () => {
			beforeEach(() => {
				setupTest('cheese 404', {}, false, false);
			});

			afterEach(() => {
				AnalyticsActionCreator.track.mockClear();
			});

			it('should sucessfully fail validation with RegexUtils', () => {
				let [actualPhoneNumber, actualRegex] = RegexUtils.isValid.mock.calls[0];
				expect(RegexUtils.isValid.mock.calls.length).toBeGreaterThan(0);
				expect(actualPhoneNumber).toEqual(expectedPhoneNumber);
				expect(RegexUtils.regexes.phone).toBe(actualRegex);
				expect(AnalyticsActionCreator.track.mock.calls.length).toEqual(0);
			});
		});

		describe('and it is home phone number', () => {
			beforeEach(() => {
				setupTest('07545338404', {}, true, false);
			});

			it('should set analytics attribute type to phone number', () => {
				let [type, attributes] = AnalyticsActionCreator.track.mock.calls[0];
				expect(attributes.type).toEqual('HomePhone');
			});
		});

		describe('and it is mobile phone number', () => {
			beforeEach(() => {
				setupTest('07545338404', {}, true, true);
			});

			it('should set analytics type to mobile phone', () => {
				let [type, attributes] = AnalyticsActionCreator.track.mock.calls[0];
				expect(attributes.type).toEqual('MobilePhone');
			});
		});

		describe('and it is first entry', () => {

			beforeEach(() => {
				setupTest('0', {}, true, false);
			})

			it('should set analytics attribute event to be created', () => {
				let [type, attributes] = AnalyticsActionCreator.track.mock.calls[0];
				expect(attributes.event).toEqual('created');
			})
		})

		describe('and it is subsequent entry', () => {

			beforeEach(() => {
				setupTest('01', {phoneNumber: '0'}, true, false);
			})

			it('should set analytics attribute event to be created', () => {
				let [type, attributes] = AnalyticsActionCreator.track.mock.calls[0];
				expect(attributes.event).toEqual('updated');
			})
		})
	});

	describe('when user selects option from preferred contact method dropdown', () => {
		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
				data={{}}
				content={content}
				appData={{}} />
			);

			AnalyticsActionCreator.track.mockClear();
			AccountOpeningActions.updateFormValue.mockClear();
			RegexUtils.isValid.mockClear();
			instance.onPreferredContactMethodChange('phone', '01413384040');
		});

		afterEach(() => {
			AnalyticsActionCreator.track.mockClear();
			AccountOpeningActions.updateFormValue.mockClear();
			RegexUtils.isValid.mockClear();
		});

		it('should raise account opening actions update form value action', () => {
			expect(AccountOpeningActions.updateFormValue.mock.calls[0].length).toBeGreaterThan(0);
		});

		it('should track click analytics event', () => {
			let [type, attributes] = AnalyticsActionCreator.track.mock.calls[0];
			expect(attributes.event).toBe('click');
			expect(AnalyticsActionCreator.track.mock.calls[0].length).toBeGreaterThan(0);
		})

		it('should determine which type of contact number we are recoding', () => {
			expect(RegexUtils.isValid.mock.calls[0].length).toBeGreaterThan(0);
		});
	});

	describe('onHasDependantsChange', () => {

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
				data={{}}
				content={content}
				appData={{}} />
			);
		});

		afterEach(() => {
			AccountOpeningActions.updateFormValues.mockClear();
		});

		it('stores the passed in arguments', () => {

			instance.onHasDependantsChange('hasDependants', 'Yes');

			var updateArgs = AccountOpeningActions.updateFormValues.mock.calls[0][0];
			expect(updateArgs[0].key).toBe('hasDependants');
			expect(updateArgs[0].value).toBe('Yes');
		});

		it('sets the number of dependents to 1 when passed in Yes', () => {
			instance.onHasDependantsChange('hasDependants', 'Yes');

			var updateArgs = AccountOpeningActions.updateFormValues.mock.calls[0][0];
			expect(updateArgs[1].key).toBe('dependants');
			expect(updateArgs[1].value).toBe('1');
		});

		it('unsets the number of dependents when passed in No', () => {
			instance.onHasDependantsChange('hasDependants', 'No');

			var updateArgs = AccountOpeningActions.updateFormValues.mock.calls[0][0];
			expect(updateArgs[1].key).toBe('dependants');
			expect(updateArgs[1].value).toBeUndefined();
		});
	});

	describe('validateGender', () => {
		let instance = TestUtils.renderIntoDocument(<PersonalDetailsPage
					data={{}}
					content={content}
					appData={{}} />);

		it('should return false if selected gender does not match the title', () => {
			let result = instance.isTitleGenderValid('Mr', 'Female');
			expect(result).toBe(false);
		});

		it('should return false if selected gender does not match the title', () => {
			let result = instance.isTitleGenderValid('Master', 'Female');
			expect(result).toBe(false);
		});

		it('should return false if selected gender does not match the title', () => {
			let result = instance.isTitleGenderValid('Mrs', 'Male');
			expect(result).toBe(false);
		});

		it('should return false if selected gender does not match the title', () => {
			let result = instance.isTitleGenderValid('Miss', 'Male');
			expect(result).toBe(false);
		});

		it('should return false if selected gender does not match the title', () => {
			let result = instance.isTitleGenderValid('Ms', 'Male');
			expect(result).toBe(false);
		});

		it('should return true if selected gender matches the title', () => {
			let result = instance.isTitleGenderValid('Mr', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if selected gender matches the title', () => {
			let result = instance.isTitleGenderValid('Master', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if selected gender matches the title', () => {
			let result = instance.isTitleGenderValid('Mrs', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if selected gender matches the title', () => {
			let result = instance.isTitleGenderValid('Miss', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if selected gender matches the title', () => {
			let result = instance.isTitleGenderValid('Ms', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Dr', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Lady', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Lord', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Prof', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Rev', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Sir', 'Male');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Dr', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Lady', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Lord', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Prof', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Rev', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is gender neutral in RM', () => {
			let result = instance.isTitleGenderValid('Sir', 'Female');
			expect(result).toBe(true);
		});

		it('should return true if title is undefined', () => {
			let result = instance.isTitleGenderValid(undefined, 'Male');
			expect(result).toBe(true);
		});

		it('should return true if gender is undefined', () => {
			let result = instance.isTitleGenderValid('Mr', undefined);
			expect(result).toBe(true);
		});

		it('should return true if title and gender are undefined', () => {
			let result = instance.isTitleGenderValid(undefined, undefined);
			expect(result).toBe(true);
		});
	});
});
