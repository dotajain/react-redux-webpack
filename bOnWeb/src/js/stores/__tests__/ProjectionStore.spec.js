'use strict';

jest.unmock('../../constants/ProjectionConstants');
jest.unmock('../ProjectionStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const ProjectionApiUtils = require('../../utils/ProjectionApiUtils');
const ProjectionConstants = require('../../constants/ProjectionConstants');
const ProjectionStore = require('../ProjectionStore');
const ProjectionActionCreator = require('../../actions/ProjectionActionCreator');
describe('ProjectionStore Store test cases', () => {
	let callback = AppDispatcher.register.mock.calls[0][0];
	let result;
	let result1;
	let result2;
	let result3;
	let result4;


	let handleProjectionSummarySuccess = (data) => ({
		action: {
			actionType: ProjectionConstants.GET_PROJECTION_SUMMARY_SUCCESS,
			data
		}
	});

	let getEarningCommitments = () => ({
		action: {
			actionType: ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS,
			data: []
		}
	});

	let handleEarningCommitmentsSuccess = (data) => ({
		action: {
			actionType: ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS_SUCCESS,
			data
		}
	});

	// not yet used
	let doneProjections = (data) => ({
		action: {
			actionType: ProjectionConstants.DONE_PROJECTIONS,
			data
		}
	});

	let handledoneProjectionsSuccess = (data) => ({
		action: {
			actionType: ProjectionConstants.DONE_PROJECTIONS_SUCCESS,
			data
		}
	});


	let categoryTagsForProjectionTabSuccess = (data) => ({
		action: {
			actionType: ProjectionConstants.CATEGORY_TAGS_FOR_PROJECTION_TAB,
			data
		}
	});

	let userTagsForProjectionTabSuccesss = (data) => ({
		action: {
			actionType: ProjectionConstants.USER_TAGS_FOR_PROJECTION_TAB,
			data
		}
	});

	let setAmountForNotificationAlertSuccesss = (data) => ({
		action: {
			actionType: ProjectionConstants.SET_AMOUNT_FOR_NOTIFICATION_ALERT,
			data
		}
	});

	let setEarningId = (value) => ({
		action:{
			actionType: ProjectionConstants.GET_EARNINGS_ID,
			data: value,
		}
	});

	let handleFSProjectionTourDone = () => ({
		action: {
			actionType: ProjectionConstants.PROJECTION_TOUR_DONE_CLICKED,
		}
	});
	let projectionCrunchBackClicked = () => ({
		action: {
			actionType: ProjectionConstants.PROJECTION_CRUNCH_BACK_CLICKED,
		}
	});

	let handleProjectionSettingLeaveSetup = () => ({
		action: {
			actionType: ProjectionConstants.PROJECTION_LEAVE_SETUP,
		}
	})

	describe('Api call to get earnings and commitments', () => {
		callback(getEarningCommitments());

		result = ProjectionStore.getEarningsAndCommitments();
		it('should make api call', () => {
			expect(ProjectionApiUtils.getEarningCommitments.mock.calls.length).toBe(1);
		});
		it('should have isCrunching false', () => {
			expect(ProjectionStore.getCrunching()).toBeFalsy();
		});
	});

	describe('Api call to request earnings and commitments success fxn', () => {
		let _currency = "GBP";
		// let	_projectionAlertsNotificationBoolean  = true;
		// let _projectionAlertsAmountValue = -135.75;
		// let _projectionSettingsFlag  = true;
		let _earningsAndCommitmentsJsonData = {
			"from":'optout',
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
		};
		beforeEach(() => {
			callback(handleEarningCommitmentsSuccess(_earningsAndCommitmentsJsonData));
			result = ProjectionStore.getEarningsAndCommitments();
			result1 = ProjectionStore.getProjectionSettingsFlag();
			result2 = ProjectionStore.getProjectionAlertsAmountValue();
			result3 = ProjectionStore.getProjectionAlertsNotificationBoolean();
			result4 = ProjectionStore.getCurrency();
		});
		it('should have a _earningsAndCommitmentsJsonData', () => {
			expect(result1).toBeDefined(_earningsAndCommitmentsJsonData);
		})
		it('should have a earnings and commitments Data value 1', () => {
			expect(result1).toEqual(true);
		})
		it('should have a earnings and commitments Data value 2', () => {
			expect(result2).toEqual('-135.75');
		})
		it('should have a earnings and commitments Data value 3', () => {
			expect(result3).toEqual(true);
		})
		it('should have a earnings and commitments Data value 4', () => {
			expect(result4).toEqual('GBP');
		})
		it('should have onLoad flag as true', () => {
			expect(ProjectionStore.getOnload()).toBeTruthy();
		})
		it('should have _projectionSettingsFlag flag as true', () => {
			expect(ProjectionStore.getTourFlag()).toBeTruthy();
		})
		it('should have earning id as ', () => {
			expect(ProjectionStore.getEarningId().length).toEqual(2);
		})

		it('should have category tags  as true', () => {
			expect(ProjectionStore.getCategoryTags().length).toEqual(5);
		})
		it('should have user tags flag as true', () => {
			expect(ProjectionStore.getUserTags().length).toEqual(2);
		})
		
		it('should have projection notification flag as true', () => {
			ProjectionStore.setProjectionNotification(true);
		})
		it('should have getProjectionAlertAmount as true', () => {
			ProjectionStore.setProjectionAlertAmount(125);
			expect(ProjectionStore.getProjectionAlertAmount()).toEqual(125);
		})
		it('should have forecasts', () => {
			expect(ProjectionStore.getForecasts().length).toEqual(1);
		})
		it('should have set amount decimal ', () => {
			expect(ProjectionStore.getActualAmountWithDecimal()).toEqual('-135.75');
		})



	});

	describe('Api call for done projection fxn', () => {
		let data = {
			from : 'optout'
		};
		beforeEach(() => {
			callback(doneProjections(data));
			//result = ProjectionStore.getProjectionSummary();
		});
		it('should have a earnings and commitments Data value', () => {
			expect(result.value).toEqual(data.value);
		})
		it('should have a earnings and commitments Data value', () => {
			expect(ProjectionStore.isDemoDoneCliked()).toBeFalsy();
		})
	});

	// ProjectionConstants.DONE_PROJECTIONS

	describe('Api call for done projection success fxn', () => {
		let _projectionSummary = {};
		beforeEach(() => {
			callback(handledoneProjectionsSuccess(_projectionSummary));
			result = ProjectionStore.getProjectionSummary();
		});
		it('should have a done projection Data value', () => {
			let obj = [];
			expect(result).toEqual(obj);
		})
		it('should have a activity indicator value', () => {
			expect(ProjectionStore.getActivityIndicator()).toBeFalsy();
		})
	});

	describe('Api call for CATEGORY TAGS FOR PROJECTION TAB Success', () => {
		let _categoryTagsForProjectionTab = [];
		beforeEach(() => {
			callback(categoryTagsForProjectionTabSuccess(_categoryTagsForProjectionTab));
			result = ProjectionStore.getCategoryTagsForProjectionTab();
		});
		it('should have a CATEGORY TAGS FOR PROJECTION TAB Data value', () => {
			expect(result).toEqual(_categoryTagsForProjectionTab);
		})
	});

	describe('Api call for user Tags For Projection Tab  Success', () => {
		let _userTagsForProjectionTab = [];
		beforeEach(() => {
			callback(userTagsForProjectionTabSuccesss(_userTagsForProjectionTab));
			result = ProjectionStore.getUserTagsForProjectionTab();
		});
		it('should have a user Tags For Projection Tab Data value', () => {
			expect(result).toEqual(_userTagsForProjectionTab);
		})
	});
	describe('Api call for SET AMOUNT FOR NOTIFICATION ALERT', () => {
		let _getNotificationAmount = 0;
		beforeEach(() => {
			callback(setAmountForNotificationAlertSuccesss(_getNotificationAmount));
			result = ProjectionStore.getNotificationAmount();
		});
		it('should have a earnings and commitments Data value', () => {
			expect(result).toEqual([]);
		})
	});
	describe('removeChangeListener', () => {
		const props = {
			content: {

			},
		};
		it('calls for the removeChangeListener', () => {
			let node = document.createElement('div');

			const render = (comp, el) => ReactDOM.render(comp, el);
			//component = ReactDOM.render(<NBAStore />, node);
			ProjectionStore.removeChangeListener(jest.fn())

			expect(EventEmitter.listenerCount.length).toBe(2);
		});
	});

	describe('addChangeListener', () => {
		const props = {
			content: {

			},
		};
		it('calls for the addChangeListener', () => {

			ProjectionStore.addChangeListener(jest.fn())
			expect(EventEmitter.listenerCount.length).toBe(2);
		});
	});

	describe('handleFSProjectionTourDone', () => {
		callback(handleFSProjectionTourDone());
		it('calls for the handleFSProjectionTourDone', () => {
			expect(ProjectionStore.isDemoDoneCliked()).toBeFalsy();
		});
	});

	describe('projectionCrunchBackClicked', () => {
		callback(projectionCrunchBackClicked());
		it('calls for the projectionCrunchBackClicked', () => {
			expect(ProjectionStore.getCrunching()).toBeFalsy();
		});
	});

	describe('handleProjectionSettingLeaveSetup', () => {
		callback(handleProjectionSettingLeaveSetup());
		it('calls for the handleProjectionSettingLeaveSetup', () => {
			expect(ProjectionStore.getOnload()).toBeTruthy();
		});
	});

	describe('setEarningId', () => {
		let data = [1, 2, 3];
		callback(setEarningId(data));
		it('calls for the setEarningId', () => {
			expect(ProjectionStore.getEarningId().length).toBe(2);
		});
	});


});
