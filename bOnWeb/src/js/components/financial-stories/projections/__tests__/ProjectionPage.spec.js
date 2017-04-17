'use strict';

jest.unmock('../ProjectionPage');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
// const { buildContent } = require('../../../__helpers__/TestHelpers');

const ProjectionPage = require('../ProjectionPage');
const Panel = require('react-bootstrap/lib/Panel');


const _ = require('lodash');

const ProjectionTourComponent = require('./../ProjectionTourComponent');
const FinancialStoriesStore = require('../../../../stores/FinancialStoriesStore');
const ProjectionStore = require('../../../../stores/ProjectionStore');
const FinancialStoriesActionCreator = require('../../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');

const ProjectionActionCreator = require('../../../../actions/ProjectionActionCreator');
const ProjectionSettings = require('./../ProjectionSettings');
const ProjectionScreen = require('./../ProjectionScreen');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ProjectionPage
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Projection page', () => {
	let component;
	let props;
	let state;
	let closeClickStub;
	let onStoreChange;
	let onClickStub;
	let nbaFeedBackClick;
	const content = {
	}
	let e = {
		target: {
			value: '',
			getAttribute: jest.fn(),
		}
	}
	beforeEach(() => {
		onClickStub = jest.genMockFn();
		onStoreChange = jest.genMockFn();
		closeClickStub = jest.genMockFn();
		props = {
			content: {
			},
			data: {
				notEnabled: false,
			},
			onClick: onClickStub,
			e: e,
		}
		component = TestUtils.renderIntoDocument(
			<ProjectionPage {...props}
				/>
		);
	});
	it('should on store change event', () => {
		component.onStoreChange();
	});
	it('check the method for opt out of projections', () => {
		component._opt_out_of_projections();
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(false);
		expect(component.state.optOutFlag).toBe(true);
	});
	it('check the method for onclickCancelForOptOut', () => {
		component.onclickCancelForOptOut();
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(false);
		expect(component.state.optOutFlag).toBe(false);
		expect(component.state.tour).toBe(false);

	});
	it('check the method for cancel button', () => {
		component._cancel_button();
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(true);
		expect(component.state.optOutFlag).toBe(false);
	});
	it('check the method for on click leave setup fxn', () => {
		component.onclickLeaveSetup();
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(false);
		expect(component.state.optOutFlag).toBe(false);
		expect(component.state.onLoad).toBe(true);
	});
	it('check the method for change the value fxn', () => {
		let e = {
			target: {
				value: '2334444.453.0',
				getAttribute: jest.fn(),
			}
		}
		component.changeTheValue(e);
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(false);
		expect(component.state.optOutFlag).toBe(false);
		expect(component.state.onLoad).toBe(false);
	});
	it('check the method for change the notification flag fxn', () => {
		component.changeTheNotificationFlag();
		expect(component.state.dLeaveSetup).toBe(false);
		expect(component.state.cancelFlag).toBe(false);
		expect(component.state.optOutFlag).toBe(false);
		expect(component.state.onLoad).toBe(false);
		expect(component.state.notificationFlag).toBe(true);
		ProjectionActionCreator.setAlertsNotificationFlag(component.state.notificationFlag);
	});
	it('should cover get earnings id fxn', () => {
		let id = 12345678901234;
		let flag = true;
		ProjectionStore.getEarningId.mockReturnValue([]);
		component.getEarningsId(id, flag);
	});
	it('should cover get earnings id fxn: else condition', () => {
		let id = 1;
		let flag = true;
		ProjectionStore.getEarningId.mockReturnValue([1]);
		component.getEarningsId(id, flag);
	});
	it('check the method for go to projection settings page fxn', () => {
		component.goToProjectionSettingsPage();
		FinancialStoriesActionCreator.projectionSettingClicked();
	});
	it('should cover done projection settings fxn', () => {
		let props1 = {
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
					}],
				"direct_debits": [
					{
						"display_name": "Mortgage",
						"last_payment_date": "2015-12-29T15:14:24.000+00:00",
						"frequency": "monthly",
						"amount": {
							"value": 573.39,
							"currency": "GBP"
						}
					}],
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
				}],
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
						"enabled": true
					}],
				"categories": [
					{
						"id": 1,
						"value": "Groceries",
						"enabled": true
					}],
			},
		};
		component.setState({ earningsAndCommitmentsData: props1 });
		component.doneProjectionSettings();
		// expect(component.state.onLoad).toBe(false);
	});

	it('should cover done projection settings fxn: else condition', () => {
		let value = {
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
					}],
				"direct_debits": [
					{
						"display_name": "Mortgage",
						"last_payment_date": "2015-12-29T15:14:24.000+00:00",
						"frequency": "monthly",
						"amount": {
							"value": 573.39,
							"currency": "GBP"
						}
					}],
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
				}],
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
						"id": "123",
						"value": "Shoes",
						"enabled": true
					}],
				"categories": [
					{
						"id": 1,
						"value": "Groceries",
						"enabled": true,
					}],
			},
		};

		ProjectionStore.isDemoDoneCliked.mockReturnValue(false);
		let fn = jest.fn();
		component.compareObject = fn;
		fn.mockReturnValue(true);
		// check this again
		component.setState({ earningsAndCommitmentsData: value });
		component.doneProjectionSettings();
		// expect(component.state.onLoad).toBe(false);
	});
	it('should cover projection settings page fxn', () => {

		component.projectionSettingsPage();
		expect(component.state.onLoad).toBe(true);
	});
	it('should cover back fxn', () => {
		component.back();
	});
	it('should cover closed fxn', () => {
		component.closed();
	});
	it('should cover closed fxn', () => {
		component.backToAccount();
	});
	it('should modifiedTags  fxn', () => {
		ProjectionStore.getCategoryTags.mockReturnValue([]);
		component.modifiedTags(123);
	});
	it('should modifiedTags  fxn: else part', () => {
		ProjectionStore.getCategoryTags.mockReturnValue([123]);
		component.modifiedTags(123);
	});
	it('should modifiedUserTag  fxn: ', () => {
		ProjectionStore.getUserTags.mockReturnValue([]);
		component.modifiedUserTag(123);
	});
	it('should modifiedUserTag  fxn: else part', () => {
		ProjectionStore.getUserTags.mockReturnValue([123]);
		component.modifiedUserTag(123);
	});
	describe('componentWillUnmount', () => {
		const props = {
			content: {

			},
			data: {
				notEnabled: true,
			},
		};
		it('calls for the removeChangeListener', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<ProjectionPage {...props} />, node);
			React.unmountComponentAtNode(node);
			expect(ProjectionStore.removeChangeListener.mock.calls.length).toBe(1);
		});
	});

	it('should compare jsx', () => {
		ProjectionStore.getEarningsAndCommitments.mockClear();
		let instance = shallowRender(props);
		expect(instance).toBeDefined();
	});

	it('should compare state',()=>{
		let instance = TestUtils.renderIntoDocument(<ProjectionPage {...props}/>);
		instance.optoutDemo();
		expect(instance.state.cancelFlag).toBe(false);
	})
});
