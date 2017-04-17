jest.unmock('../EarningAndCommitmentComponent');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const EarningAndCommitmentComponent = require('../EarningAndCommitmentComponent');
let component;
let props;
let instance;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EarningAndCommitmentComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('EarningAndCommitmentComponent shallowrender Test Cases check', () => {

	beforeEach(() => {
		props = {
			getEarningsId : jest.fn(),
			data:{
				earnings:[

				]
			},
			content: {
			}
		};
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
	});

	it('Unit Test Case 1 : EarningAndCommitmentComponent : toBeDefined', () => {
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : EarningAndCommitmentComponent : toBeDefined', () => {
		let dat = '2016-10-20';
		instance.dateConversion(dat);
		expect(instance.dateConversion(dat)).toEqualJSX(<label>
			20 Oct 16
			</label>);
	});

	it('Unit Test Case 3 : EarningAndCommitmentComponent : toBeDefined', () => {
		let dat = '';
		instance.dateConversion(dat);
		expect(dat).toBe('');
	});
	
	it('Unit Test Case 4 : EarningAndCommitmentComponent : toBeDefined', () => {
		let dat = '';
		props.data.earnings= [
			{
				"id": "02932893920584",
				"display_name": "Salary",
				"amount": {
					"value": 2100.25, 
					"currency": "GBP"
				},
				"frequency": "monthly",
				"last_known_date": null,
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
		];
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		instance.earnings();
		expect(instance.props.data.earnings[0].last_known_date).toBe(null);
	});

	it('Unit Test Case 5 : EarningAndCommitmentComponent : toBeDefined', () => {
		let dat = '';
		props.data.earnings= [
			{
				"id": "02932893920584",
				"display_name": "Salary",
				"amount": {
					"value": 2100.25, 
					"currency": "GBP"
				},
				"frequency": "monthly",
				"last_known_date": "2015-12-28T15:14:24.000+00:00",
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
		];
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		instance.earnings();
		expect(instance.props.data.earnings[0].last_known_date).toBe("2015-12-28T15:14:24.000+00:00");
	});

	it('Unit Test Case 6 : EarningAndCommitmentComponent : toBeDefined', () => {
		props.data.earnings= undefined;
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		instance.earnings();
		expect(instance.props.data.earnings).toBe(undefined);
	});

	it('Unit Test Case 7 : EarningAndCommitmentComponent : toBeDefined', () => {
		props.data.commitments = {
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
						"display_name": "Mail order catalogue",
						"last_payment_date": "2016-02-21T15:14:24.000+00:00",
						"frequency": "monthly",
						"amount": {
							"value": 210.12,
							"currency": "GBP"
						}
					}
				]
			};
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		let val = instance.standingOrders();
		expect(instance.props.data.commitments.standing_orders.length).toBe(2);
	});

	it('Unit Test Case 8 : EarningAndCommitmentComponent : toBeDefined', () => {
		props.data.commitments = undefined;
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		let val = instance.standingOrders();
		expect(val).toBe();
	});

	it('Unit Test Case 5 : EarningAndCommitmentComponent : toBeDefined', () => {
		let dat = '';
		props.data.earnings= [
			{
				"id": "02932893920584",
				"display_name": "Salary",
				"amount": {
					"value": 2100.25, 
					"currency": "GBP"
				},
				"frequency": "monthly",
				"last_known_date": "2015-12-28T15:14:24.000+00:00",
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
		];
		props.data.commitments = {
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
						"last_payment_date": null,
						"frequency": "monthly",
						"amount": {
							"value": 573.39,
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
			};
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		instance.directdebits();
		expect(instance.props.data.commitments.direct_debits[0].last_payment_date).toBe(null);
	});

	it('Unit Test Case 9 : EarningAndCommitmentComponent : toBeDefined', () => {
		props = {
			getEarningsId : jest.fn(),
			content : {
				projectionSettingsEarningsAndCommitmentsHeader: 'Check your Earnings & Commitments',
				projectionSettingsEarningsAndCommitmentsEarnings: 'Earnings',
				projectionSettingsEarningsAndCommitmentsStandingOrders: 'Standing Orders',
				projectionSettingsEarningsAndCommitmentsDirectDebits: 'Direct Debits',
				projectionSettingsEarningsAndCommitmentsLastKnown: 'Last Known',
				projectionSettingsEarningsAndCommitmentsFrequency: 'Frequency',
				projectionSettingsEarningsAndCommitmentsLastKnownAmount: 'Last Known Amount',
			},
			data :{
				earnings:[
					{
						"id": "02932893920584",
						"display_name": "Salary",
						"amount": {
							"value": 2100.25, 
							"currency": "GBP"
						},
						"frequency": "monthly",
						"last_known_date": "2015-12-28T15:14:24.000+00:00",
						"enabled": true
					},
					],
					commitments :{
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
								"last_payment_date": null,
								"frequency": "monthly",
								"amount": {
									"value": 573.39,
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
					}
			}
		};
		let id = '101';
		let flag = true;
		instance = TestUtils.renderIntoDocument(<EarningAndCommitmentComponent {...props}/>);
		instance.getEarningsId(id,flag);
		expect(instance.props.getEarningsId.mock.calls.length).toBe(1);
	});

});
