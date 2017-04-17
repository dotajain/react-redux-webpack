jest.unmock('../EssentialSpendingsComponent');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');


const EssentialSpendingsComponent = require('../EssentialSpendingsComponent');
const ProjectionStore = require('../../../../stores/ProjectionStore');

let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EssentialSpendingsComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('EssentialSpendingsComponent Test Cases check', () => {

	beforeEach(() => {
		props = {
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"external_notification": true,
				"thresholds": {
					"lower": {
						"amount": {
							"value": -135.75,
							"currency": "GBP"
						}
					}
				},
				"commitments": {
					"standing_orders": [
						{
							"display_name": "Pension",
							"last_known_date": null,
							"frequency": "monthly",
							"amount": {
								"value": 275.00,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Car Insurance",
							"last_known_date": "2015-12-31T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 32.33,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Phone Bill",
							"last_known_date": "2016-01-05T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 29.98,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Child trust fund",
							"last_known_date": "2016-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 50.00,
								"currency": "GBP"
							}
						}
					],
					"direct_debits": [
						{
							"display_name": "Mortgage",
							"last_payment_date": "2015-12-29T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 573.39,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Electricity",
							"last_payment_date": "2015-12-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.75,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gas",
							"last_payment_date": "2015-12-23T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 58.92,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gym Membership",
							"last_payment_date": "2015-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.50,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mobile phone bill",
							"last_payment_date": "2016-01-11T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 49.38,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mail order catalogue",
							"last_payment_date": "2016-02-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 210.12,
								"currency": "GBP"
							}
						}
					]
				},
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"forecasts": [
					{
						"display_name": "New Year Bonus",
						"amount": {
							"value": 934.43,
							"currency": "GBP"
						},
						"when": "2015-01-14T15:14:24.000+00:00"
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": false
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		console.log("HELLO");
		//ProjectionStore.getCategoryTags.mockReturnValue(props.data.essential_spend.categories);
		//ProjectionStore.getCategoryTags.mockClear();
		//console.log(ProjectionStore.getCategoryTags.mockReturnValue(props.data.essential_spend.categories));
		component = shallowRender(props);
	});

	it('Unit Test Case 1 : EssentialSpendingsComponent : toBeDefined', () => {
		expect(component).toBeDefined();
	});


	it('Unit Test Case 2 : EssentialSpendingsComponent : cbTags', () => {
		props = {
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"external_notification": true,
				"thresholds": {
					"lower": {
						"amount": {
							"value": -135.75,
							"currency": "GBP"
						}
					}
				},
				"commitments": {
					"standing_orders": [
						{
							"display_name": "Pension",
							"last_known_date": null,
							"frequency": "monthly",
							"amount": {
								"value": 275.00,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Car Insurance",
							"last_known_date": "2015-12-31T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 32.33,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Phone Bill",
							"last_known_date": "2016-01-05T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 29.98,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Child trust fund",
							"last_known_date": "2016-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 50.00,
								"currency": "GBP"
							}
						}
					],
					"direct_debits": [
						{
							"display_name": "Mortgage",
							"last_payment_date": "2015-12-29T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 573.39,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Electricity",
							"last_payment_date": "2015-12-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.75,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gas",
							"last_payment_date": "2015-12-23T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 58.92,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gym Membership",
							"last_payment_date": "2015-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.50,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mobile phone bill",
							"last_payment_date": "2016-01-11T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 49.38,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mail order catalogue",
							"last_payment_date": "2016-02-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 210.12,
								"currency": "GBP"
							}
						}
					]
				},
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"forecasts": [
					{
						"display_name": "New Year Bonus",
						"amount": {
							"value": 934.43,
							"currency": "GBP"
						},
						"when": "2015-01-14T15:14:24.000+00:00"
					}
				],
				"essential_spend": undefined
			},
		}
		let instance = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		instance.cbTags();
		expect(props.data.commitments.essential_spend).toBe(undefined);
	});

	it('Unit Test Case 3 : EssentialSpendingsComponent : userTags', () => {
		props = {
			modifiedTags: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"external_notification": true,
				"thresholds": {
					"lower": {
						"amount": {
							"value": -135.75,
							"currency": "GBP"
						}
					}
				},
				"commitments": {
					"standing_orders": [
						{
							"display_name": "Pension",
							"last_known_date": null,
							"frequency": "monthly",
							"amount": {
								"value": 275.00,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Car Insurance",
							"last_known_date": "2015-12-31T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 32.33,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Phone Bill",
							"last_known_date": "2016-01-05T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 29.98,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Child trust fund",
							"last_known_date": "2016-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 50.00,
								"currency": "GBP"
							}
						}
					],
					"direct_debits": [
						{
							"display_name": "Mortgage",
							"last_payment_date": "2015-12-29T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 573.39,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Electricity",
							"last_payment_date": "2015-12-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.75,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gas",
							"last_payment_date": "2015-12-23T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 58.92,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Gym Membership",
							"last_payment_date": "2015-01-06T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 45.50,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mobile phone bill",
							"last_payment_date": "2016-01-11T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 49.38,
								"currency": "GBP"
							}
						},
						{
							"display_name": "Mail order catalogue",
							"last_payment_date": "2016-02-21T15:14:24.000+00:00",
							"frequency": "monthly",
							"amount": {
								"value": 210.12,
								"currency": "GBP"
							}
						}
					]
				},
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"forecasts": [
					{
						"display_name": "New Year Bonus",
						"amount": {
							"value": 934.43,
							"currency": "GBP"
						},
						"when": "2015-01-14T15:14:24.000+00:00"
					}
				],
				"essential_spend": undefined
			},
		}
		let instance = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		instance.userTags();
		expect(props.data.essential_spend).toBe(undefined);
	});


	it('Unit Test Case 3 : EssentialSpendingsComponent : modifiedTags', () => {
		props = {
			modifiedTags: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": true
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		let categoryTags = ProjectionStore.getCategoryTags.mockReturnValue(props.data.essential_spend.categories);
		let value = _.indexOf(categoryTags, '1');
		let instance = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		instance.modifiedTags('1');
		expect(value).toBe(-1);
		ProjectionStore.getCategoryTags.mockClear();
	});

	it('Unit Test Case 3 : EssentialSpendingsComponent : modifiedTags for value greater than 0', () => {
		let props = {
			modifiedTags: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": true
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		let data = [4, 2, 3, 1, 1];
		ProjectionStore.getCategoryTags.mockReturnValue(data);

		let component = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		component.modifiedTags(1);

		ProjectionStore.getCategoryTags.mockClear();
	});

	it('Unit Test Case 3 : EssentialSpendingsComponent : modifiedTags for value less than 0', () => {
		let props = {
			modifiedUserTag: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": true
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		let data = [4, 2, 3];
		ProjectionStore.getUserTags.mockReturnValue(data);

		let component = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		component.modifiedUserTag(1);

		ProjectionStore.getUserTags.mockClear();
	});

	it('Unit Test Case 3 : EssentialSpendingsComponent : modifiedTags for value greater than 0', () => {
		let props = {
			modifiedUserTag: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": true
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		let data = [4, 2, 3, 1];
		ProjectionStore.getUserTags.mockReturnValue(data);

		let component = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		component.modifiedUserTag(1);

		ProjectionStore.getUserTags.mockClear();
	});


	it('Unit Test Case 3 : EssentialSpendingsComponent : userTags for value greater than 0', () => {
		let props = {
			modifiedTags: () => {},
			content: {
				projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
				projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of {amount} on',
				projectionSummaryFooter: 'Spin the wheel to find out more',
				projectionTagsHeader: 'You\'ve tagged',
				projectionTagsContent: 'as essential spend. Your top tags are',
				projectionTagsFooter: 'You can change these in Projections Settings',
				projectionCommitmentsHeader: 'You have no Commitments',
				projectionCurrentBalanceHeader: 'Your current balance is',
				projectionCurrentBalanceFooter: 'This might be different to your available balance (you can check this in your account screen)',
				projectionBalanceHeader: 'The next coming into your account should be',
				projectionBalanceFooter: 'This is projected in # days on the # of July See this in projection Settings',
				projectionSettingsCancel: 'Cancel',
				projectionSettingsOptOutOfProjections: 'Opt out of Projections',
				projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
				projectionSettingsEssentialSpending: 'Essential Spending',
				projectionSettingsAlertsAndNotifications: 'Alerts & Notifications',
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
				projectionSettingsDone: 'Done',
				projectionSettingsEssentialSpendingHeader: 'Select the tags you regularly spend money on and they will be included in your Projections',
				projectionSettingsEssentialSpendingOurTags: 'Our Tags',
				projectionSettingsEssentialSpendingYourTags: 'Your Tags',
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
				projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
				projectionLeaveProjectionsSetupPopupContent: 'Are you sure you want to leave projections setup? Your changes will not be saved',
				projectionLeaveProjectionsSetupPopupCancelButton: 'Cancel',
				projectionLeaveProjectionsSetupPopupLeaveSetupButton: 'Leave setup',
				projectionOptOutOfProjectionsPopupHeader: 'Opt out of projections?',
				projectionOptOutOfProjectionsPopupContent: 'Are you sure you want to opt out of projections?',
				projectionOptOutOfProjectionsPopupCancelButton: 'Cancel',
				projectionOptOutOfProjectionsPopupOptOutButton: 'Opt out',
			},
			data: {
				"enabled": true,
				"earnings": [
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2016-01-07T15:14:24.000+00:00",
						"enabled": true
					},
					{
						"id": "18372483874523",
						"display_name": "Child Benefit",
						"amount": {
							"value": 44.43,
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					}
				],
				"essential_spend": {
					"tags": [
						{
							"id": "7f3dad4b-060c-4ea8-afb0-14f1e2c45638",
							"value": "Shoes",
							"enabled": false
						},
						{
							"id": "32032b66-2549-4915-9626-475bce6506e0",
							"value": "Pet Food",
							"enabled": true
						},
						{
							"id": "32632b62-2549-4975-9626-475bcf6f06e0",
							"value": "eBay",
							"enabled": true
						}
					],
					"categories": [
						{
							"id": 1,
							"value": "Groceries",
							"enabled": true
						},
						{
							"id": 2,
							"value": "Home",
							"enabled": false
						},
						{
							"id": 3,
							"value": "Getting around",
							"enabled": false
						},
						{
							"id": 4,
							"value": "Fuel",
							"enabled": true
						},
						{
							"id": 5,
							"value": "Eating out",
							"enabled": false
						},
						{
							"id": 6,
							"value": "Staying away",
							"enabled": false
						},
						{
							"id": 7,
							"value": "Holidays",
							"enabled": false
						},
						{
							"id": 8,
							"value": "Entertainment",
							"enabled": false
						},
						{
							"id": 9,
							"value": "Style",
							"enabled": false
						},
						{
							"id": 10,
							"value": "Tech",
							"enabled": true
						},
						{
							"id": 11,
							"value": "Utilities",
							"enabled": false
						},
						{
							"id": 12,
							"value": "Keeping fit",
							"enabled": false
						},
						{
							"id": 13,
							"value": "Wellbeing",
							"enabled": false
						},
						{
							"id": 14,
							"value": "Pets",
							"enabled": true
						},
						{
							"id": 15,
							"value": "Kids",
							"enabled": false
						},
						{
							"id": 16,
							"value": "School",
							"enabled": false
						},
						{
							"id": 17,
							"value": "Finance",
							"enabled": true
						},
						{
							"id": 18,
							"value": "Untagged",
							"enabled": false
						},
						{
							"id": 19,
							"value": "Mortgage or rent",
							"enabled": true
						},
						{
							"id": 20,
							"value": "Earnings",
							"enabled": false
						},
						{
							"id": 21,
							"value": "Other",
							"enabled": false
						}
					]
				}
			},
		}
		let data = [4, 2, 3, "7f3dad4b-060c-4ea8-afb0-14f1e2c45638"];
		ProjectionStore.getUserTags.mockReturnValue(data);

		let component = TestUtils.renderIntoDocument(<EssentialSpendingsComponent {...props}/>);
		component.userTags(1);

		ProjectionStore.getUserTags.mockClear();
	});
});
