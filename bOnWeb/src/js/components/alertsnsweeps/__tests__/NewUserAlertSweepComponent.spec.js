jest.unmock('../NewUserAlertSweepComponent');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const { PropTypes } = React;

const NewUserAlertSweepComponent = require('../NewUserAlertSweepComponent');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<NewUserAlertSweepComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('NewUserAlertSweepComponent Test Cases check', () => {
	let instance;
	let props;
	beforeEach(() => {
		props = {

			content: {
				'alertsSweepsHead': 'Alert',

            },
            data: {
            },
		}
		instance = shallowRender(props);
	});

	it('render a standard modal with child elements', () => {
		instance = shallowRender(props);
        expect(instance).toEqualJSX(
			<div className="select-your-choice" />
		)
	});

	describe('To check showDefault function ', () => {
		let instance;
		let props;
		beforeEach(() => {
			props = {

				content: {
					alertsSweepsHead: 'Alert',

				},
				data: {
				},
			}
			//instance = shallowRender(props);
		});





		it('To check showDefault function with both Alert and Sweep permission true', () => {
			AlertsNSweepsStore.getAlertFlag.mockReturnValue(true);
			AlertsNSweepsStore.getSweepFlag.mockReturnValue(true);
			let component = TestUtils.renderIntoDocument(<NewUserAlertSweepComponent  {...props}/>);
			component.showDefault();
		});

		it('To check showDefault function with Alert permission true and Sweep permission false', () => {
			AlertsNSweepsStore.getAlertFlag.mockReturnValue(true);
			AlertsNSweepsStore.getSweepFlag.mockReturnValue(false);
			let component = TestUtils.renderIntoDocument(<NewUserAlertSweepComponent  {...props}/>);
			component.showDefault();
		});

		it('To check showDefault function with Alert permission false and Sweep permission true', () => {
			AlertsNSweepsStore.getAlertFlag.mockReturnValue(false);
			AlertsNSweepsStore.getSweepFlag.mockReturnValue(true);
			let component = TestUtils.renderIntoDocument(<NewUserAlertSweepComponent  {...props}/>);
			component.showDefault();
		});

		it('To check showDefault function with Alert permission false and Sweep permission false', () => {
			AlertsNSweepsStore.getAlertFlag.mockReturnValue(false);
			AlertsNSweepsStore.getSweepFlag.mockReturnValue(false);
			let component = TestUtils.renderIntoDocument(<NewUserAlertSweepComponent  {...props}/>);
			component.showDefault();
		});

	});

});
