jest.unmock('../AlertsNotificationsComponent');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AlertsNotificationsComponent = require('../AlertsNotificationsComponent');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AlertsNotificationsComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('AlertsNotificationsComponent shallowrender Test Cases check', () => {

	beforeEach(() => {
		props = {
			alertsAmountValue: 'Hello',
			changeTheValue: jest.fn(),
			_alertsAmountBlur: jest.fn(),
			notificationFlag: true,
			changeTheNotificationFlag: {},
			content: {
				projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
				projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
				projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
				projectionAlertAndNotificationsToggleText: 'Send me an SMS when I enter a danger period',
			}
		}
		component = shallowRender(props);
	});

	it('Unit Test Case 1 : AlertsNotificationsComponent : toBeDefined', () => {
		expect(component).toBeDefined();
	});



});

describe('AlertsNotificationsComponent Test Cases check', () => {
	let props = {
		alertsAmountValue: 'Hello',
		changeTheValue: jest.fn(),
		_alertsAmountBlur: jest.fn(),
		notificationFlag: true,
		changeTheNotificationFlag: {},
		content: {
			projectionSettingsAlertsAndNotificationsHeader: 'Tell us how much you need left in your account; we\'ll alert you when you fall below that limit',
			projectionSettingsAlertsAndNotificationsContent: 'When i have a balance of',
			projectionSettingsAlertsAndNotificationsFooter: 'Send me an in app notification',
			projectionAlertAndNotificationsToggleText: 'Send me an SMS when i enter a danger period',
			projectionLeaveProjectionsSetupPopupHeader: 'Leave Projections Setup',
		}
	}
	let onClickStub = jest.genMockFn();


	let component = TestUtils.renderIntoDocument(
		<AlertsNotificationsComponent onClick={onClickStub} {...props}
			/>
	);

	it('should AlertsNotificationsComponent', () => {

		let e = 'e';
		component.OnChange(e);
		
	});

});