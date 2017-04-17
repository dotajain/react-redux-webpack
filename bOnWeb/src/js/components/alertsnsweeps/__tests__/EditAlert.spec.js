jest.unmock('../EditAlert');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const EditAlert = require('../EditAlert');
const AlertSweepModal = require('../AlertSweepModal');
const AlertsNSweepsActionCreator = require('../../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EditAlert
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('EditAlert Test Cases check', () => {


	beforeEach(() => {
	});

	it('should cover getEditAlertData fxn1', () => {
		let alerts = {
			alert: [
				{
					'label': 'less',
					'lessMore': 'less',
				}
			],
			counter: 0,
			id: 0,
			account_id: 0,

		};

		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		AlertsNSweepsStore.getAlertAccountName.mockReturnValue([{ id: '1', name: 'curent' }])
		AlertsNSweepsStore.getAlertLessMoreValue.mockReturnValue([{ id: '1', name: 'curent' }])
		AlertsNSweepsStore.getEditAlertData.mockReturnValue(alerts)
		let component = TestUtils.renderIntoDocument(
            <EditAlert {...props}
                />
        );

		component.getAlert(alerts);
	});

	it('should cover account click fxn2', () => {
		let e;
		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.getLessMoreValue(e);
	});

	it('should cover getAlertMyAccount fxn3', () => {
		let e;
		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.getAlertMyAccount(e);
	});

	xit('should cover account click fxn4', () => {
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let instance = ReactDOM.render(<EditAlert {...props} />, node);
		instance.setState({ lessMore: false });
		instance.setState({ editAlert: false });
		instance.lessMore();
	});


	it('should cover lessMore fxn', () => {
		let alerts = {
			alert: [
				{
					'label': 'less',
					'lessMore': 'less',
				}
			],
			counter: 0,
			id: 0,
			account_id: 0,

		};
		AlertsNSweepsStore.getEditAlertData.mockReturnValue(alerts)
		AlertsNSweepsStore.getAlertAccountName.mockReturnValue([{ id: '1', name: 'curent' }])
		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.setState({ lessMore: 'less' });
		component.lessMore();
	});

	describe('To check thresholdMoney Function', () => {
		// let instance;
		// let event;
		// let props = {
		// 	thresholdMoney: jest.genMockFn(),
		// 	content: {
		// 	},
		// };

		it('calls for the thresholdMoney function', () => {
			let evnt = {
				target: {
					value: '',
				}
			};
			let props = {

				backAlert: jest.fn(),
				alertUpdated: jest.fn(),
				alertId: 'alertId',
				lessMore: 'less',
				content: {
					cancelButton: 'cancelButton',
					editMyAlert: 'editMyAlert',
					inMy: 'inMy',
				}
			};

			let component = TestUtils.renderIntoDocument(
				<EditAlert {...props}
					/>
			);
			component.thresholdMoney(evnt);

		});

		it('calls for the thresholdMoney function to cover else condn of thresholdvalue.length', () => {
			let e = {
				target: {
					 value:'111.50',
				}
			};
			let props = {

				backAlert: jest.fn(),
				alertUpdated: jest.fn(),
				alertId: 'alertId',
				lessMore: 'less',
				content: {
					cancelButton: 'cancelButton',
					editMyAlert: 'editMyAlert',
					inMy: 'inMy',
				}
			};

			let component = TestUtils.renderIntoDocument(
				<EditAlert {...props}
					/>
			);
			component.thresholdMoney(e);

		});
	});

	it('should cover showHeader fxn', () => {
		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.showHeader();
	});

	it('should cover editAlert fxn7', () => {

		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};

		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.editAlert();
	});

	it('should cover editAlert fxn7 when amount is undefined', () => {

		let props = {

			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			}
		};
		
		let component = TestUtils.renderIntoDocument(
			<EditAlert {...props}
				/>
		);
		component.setState({ amount:undefined });
		component.setState({ lessMore :'less' });
		component.editAlert();
	});

	xit('should cover account click fxn8', () => {
		component.renderToAccounts();
	});

	xit('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(

		);
    });
});


// it('calls for the thresholdMoney function', () => {
// 			let node = document.createElement('div');
// 			let thresholdMoney = jest.genMockFn();
// 			const render = (comp, el) => ReactDOM.render(comp, el);
// 			instance = ReactDOM.render(<EditAlert {...props} />, node);
// 			instance.thresholdMoney(e);
// 		});