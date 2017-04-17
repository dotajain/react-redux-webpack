jest.unmock('../EditProjection');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const AlertsNSweepsActionCreator = require('../../../actions/AlertsNSweepsActionCreator');
const ReactDOM = require('react-dom');
const ProjectionsActionCreator = require('../../../actions/ProjectionsActionCreator');
const EditProjection = require('../EditProjection');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EditProjection
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('EditProjection Test Cases check', () => {

	beforeEach(() => {
		props = {
			content: {}
		}
		component = shallowRender(props);
	});

	AlertsNSweepsStore.getProjectionAccountName.mockReturnValue(
		[
			{
				"account": {
					"id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
					"number": "65432112345678"
				},
				"thresholds": {
					"lower": {
						"amount": {
							"value": 50.0,
							"currency": "GBP"
						}
					}
				},
				"external_notification": true
			}
		]
	);
	AlertsNSweepsStore.getEditProjectionAlertData.mockReturnValue({ alert: [{ "amount": 25 }] });
	it('render a standard modal with child elements', () => {
		component = shallowRender(props);
        expect(component).toEqualJSX(
			<div className="content-wrapper">
				<div className="row no-gutters headerContainer">
					<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
						<button
							className="page-options opt-white"
							onClick={function noRefCheck() { } }
							type="button"
							>
							<span />
						</button>
					</div>
					<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
						<h2 className="sweepHeading" />
					</div>
					<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2" />
				</div>
				<div className="row">
					<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
						<ul className="form-wrapper sweepsForm">
							<li>
								<section>
									<span className="float-left" />
								</section>
								<section>
									<select
										className="editSweep"
										dir="rtl"
										disabled="disabled"
										value={undefined}
										>
										<option value={undefined} />
									</select>
								</section>
							</li>
							<li className="first-column">
								<section>
									<span
										className="float-left"
										dangerouslySetInnerHTML={{ __html: undefined }}
										/>
								</section>
								<section>
									<h4 className="currency currency-value-holder">
										<input
											defaultValue="£25"
											onChange={function noRefCheck() { } }
											type="text"
											value="£25"
											/>
										<span className="currency-value-border">
											£25
										</span>
									</h4>
								</section>
							</li>
							<li>
								<section>
									<span
										className="float-left"
										dangerouslySetInnerHTML={{ __html: undefined }}
										/>
								</section>
								<section>
									<span
										className="float-right"
										dangerouslySetInnerHTML={{ __html: undefined }}
										/>
								</section>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<button
						className="action-button"
						onClick={function noRefCheck() { } }
						/>
				</div>
			</div>
		)
	});
	it('Unit Test Case 1 : EditProjection : toBeDefined', () => {
		expect(component).toBeDefined();
	});
	it('renderToAccounts()', () => {
		expect(component).toBeDefined();
	});

	describe('myAccount', () => {
		let component;
		it('set my account value', () => {
			let node = document.createElement('div');
			props = {
				content: {}
			}

			component = ReactDOM.render(<EditProjection {...props} />, node);
			component.myAccount(25);
			// expect(component.setProjectionAlertInMyAccount).toBeDefined();
			expect(AlertsNSweepsActionCreator.setProjectionAlertInMyAccount.mock.calls.length).toBe(1);
		});

		it('set thresholdMoney', () => {
			let node = document.createElement('div');
			props = {
				content: {}
			}

			component = ReactDOM.render(<EditProjection {...props} />, node);
			const e = { target: { value: 25 } };
			component.onThresholdMoneyChange(e);
			expect(AlertsNSweepsActionCreator.targetProjectionAlertMoney.mock.calls.length).toBe(0);
		});

		it('set thresholdMoney', () => {
			let node = document.createElement('div');
			props = {
				content: {}
			}

			component = ReactDOM.render(<EditProjection {...props} />, node);
			const e = { target: { value: 0 } };
			component.onThresholdMoneyChange(e);
			expect(AlertsNSweepsActionCreator.targetProjectionAlertMoney.mock.calls.length).toBe(0);
		});

		it('set thresholdMoney', () => {
			let node = document.createElement('div');
			props = {
				content: {}
			}

			component = ReactDOM.render(<EditProjection {...props} />, node);
			const e = { target: { value: '000' } };
			component.onThresholdMoneyChange(e);
			const thresholdValue = String(e.target.value).substring(1);
			e.target.value = thresholdValue.substring(1);

			expect(AlertsNSweepsActionCreator.targetProjectionAlertMoney.mock.calls.length).toBe(0);
		});

		it('set thresholdMoney', () => {
			let node = document.createElement('div');
			props = {
				content: {}
			}

			component = ReactDOM.render(<EditProjection {...props} />, node);
			const e = { target: { value: null } };
			component.onThresholdMoneyChange(e);
			const thresholdValue = String(e.target.value).substring(1);
			e.target.value = thresholdValue.substring(1);

			expect(AlertsNSweepsActionCreator.targetProjectionAlertMoney.mock.calls.length).toBe(0);

			it('set thresholdMoney', () => {
				let node = document.createElement('div');
				props = {
					content: {}
				}

				component = ReactDOM.render(<EditProjection {...props} />, node);
				const e = { target: { value: '£$25' } };
				component.onThresholdMoneyChange(e);
				const thresholdValue = String(e.target.value).substring(1);
				e.target.value = thresholdValue.substring(1);

				expect(AlertsNSweepsActionCreator.targetProjectionAlertMoney.mock.calls.length).toBe(0);
			});
		});
	});

	describe('showHeader', () => {
		let component;
		AlertsNSweepsActionCreator.hideHeaderComponent.mockReturnValue(true);
		it('showHeader function()', () => {
			let node = document.createElement('div');
			props = {
				content: {},
				backAlert: jest.fn(),
			}
			component = ReactDOM.render(<EditProjection {...props} />, node);
			component.showHeader();
			expect(AlertsNSweepsActionCreator.hideHeaderComponent.mock.calls.length).toBe(1);
		});
	});

	describe('editProjectionAlert', () => {
		let component;
		AlertsNSweepsActionCreator.hideHeaderComponent.mockReturnValue(true);
		it('editProjectionAlert function()', () => {
			let node = document.createElement('div');
			props = {
				content: {},
				projectionUpdated: jest.fn(),
			}
			component = ReactDOM.render(<EditProjection {...props} />, node);
			component.editProjectionAlert();
			expect(AlertsNSweepsActionCreator.hideHeaderComponent.mock.calls.length).toBe(2);
			expect(ProjectionsActionCreator.editProjectionData.mock.calls.length).toBe(1);
		});
	});

	describe('editProjectionAlert............', () => {
		let component;
		AlertsNSweepsActionCreator.hideHeaderComponent.mockReturnValue(true);
		it('editProjectionAlert function()', () => {
			let node = document.createElement('div');
			props = {
				content: {},
				projectionUpdated: jest.fn(),
			}
			component = ReactDOM.render(<EditProjection {...props} />, node);
			component.setState({thresholdAmount : false});
			component.render();
			//expect(AlertsNSweepsActionCreator.hideHeaderComponent.mock.calls.length).toBe(2);
			//expect(ProjectionsActionCreator.editProjectionData.mock.calls.length).toBe(1);
		});
	});
});
