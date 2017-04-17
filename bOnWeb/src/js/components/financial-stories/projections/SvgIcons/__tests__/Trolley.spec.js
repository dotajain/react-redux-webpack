jest.unmock('../Trolley');
const React = require('react');
const TestUtils = require('react-addons-test-utils');


const Trolley = require('../Trolley');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Trolley
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Trolley Test Cases check', () => {

	beforeEach(() => {
		props = {
			data: {
				"last_updated": "2016-05-16T16:07:50.074+01:00",
				"thresholds": {
					"lower": {
						"amount": {
							"value": 50.0,
							"currency": "GBP"
						}
					}
				},
				"projection_periods": [
					{
						"warning_days": [
							{
								"value": 10
							}],
						"period": {
							"from": {
								"date": "2016-05-11T00:00:00.000+01:00",
								"available_balance": {
									"value": 4093.94,
									"currency": "GBP"
								}
							},
							"to": {
								"date": "2016-06-16T23:59:59.000+01:00",
								"available_balance": {
									"value": 2572.77,
									"currency": "GBP"
								}
							}
						},
						"earnings": [
							{
								"amount": {
									"value": 2200.0,
									"currency": "GBP"
								},
								"display_name": "BACS, Recruitment Solutions - Salary",
								"when": "2016-05-11T13:00:00.000+01:00"
							}
						],
						"projected_transactions": {
							"transactions": [
								{
									"display_name": "UK Gas Co",
									"amount": {
										"value": -45.0,
										"currency": "GBP"
									},
									"type": "Direct Debit",
									"when": "2016-06-03T13:00:00.000+01:00"
								},
								{
									"display_name": "UK Electric Co",
									"amount": {
										"value": -54.0,
										"currency": "GBP"
									},
									"type": "Direct Debit",
									"when": "2016-06-04T13:00:00.000+01:00"
								},
								{
									"display_name": "Sweat It Out Gym - Monthly membership",
									"amount": {
										"value": -18.25,
										"currency": "GBP"
									},
									"type": "Standing Order",
									"when": "2016-06-05T13:00:00.000+01:00"
								},
								{
									"display_name": "Saving Account S/O",
									"amount": {
										"value": -100.0,
										"currency": "GBP"
									},
									"type": "Standing Order",
									"when": "2016-06-05T13:00:00.000+01:00"
								},
								{
									"display_name": "Broadband & Cable TV",
									"amount": {
										"value": -45.0,
										"currency": "GBP"
									},
									"type": "Direct Debit",
									"when": "2016-06-06T13:00:00.000+01:00"
								},
								{
									"display_name": "CYB Mortgage 11223344",
									"amount": {
										"value": -317.21,
										"currency": "GBP"
									},
									"type": "Direct Debit",
									"when": "2016-06-09T13:00:00.000+01:00"
								},
								{
									"display_name": "Leafyville Borough Council Tax",
									"amount": {
										"value": -119.89,
										"currency": "GBP"
									},
									"type": "Direct Debit",
									"when": "2016-06-10T00:01:00.000+01:00"
								}
							],
							"total_amount": {
								"value": -699.35,
								"currency": "GBP"
							}
						},
						"essential_spend_info": {
							"essential_spend": [
								{
									"amount": {
										"value": -439.13,
										"currency": "GBP"
									},
									"display_name": "Shoes"
								},
								{
									"amount": {
										"value": -910.28,
										"currency": "GBP"
									},
									"display_name": "Untagged"
								},
								{
									"amount": {
										"value": -49.79,
										"currency": "GBP"
									},
									"display_name": "Style"
								},
								{
									"amount": {
										"value": -310.11,
										"currency": "GBP"
									},
									"display_name": "Finance"
								},
								{
									"amount": {
										"value": -23.32,
										"currency": "GBP"
									},
									"display_name": "Fuel"
								},
								{
									"amount": {
										"value": -292.25,
										"currency": "GBP"
									},
									"display_name": "Getting around"
								},
								{
									"amount": {
										"value": -43.31,
										"currency": "GBP"
									},
									"display_name": "Eating out"
								},
								{
									"amount": {
										"value": -22.0,
										"currency": "GBP"
									},
									"display_name": "Entertainment"
								},
								{
									"amount": {
										"value": -15.24,
										"currency": "GBP"
									},
									"display_name": "Staying away"
								},
								{
									"amount": {
										"value": -394.46,
										"currency": "GBP"
									},
									"display_name": "Mortgage or rent"
								},
								{
									"amount": {
										"value": -64.61,
										"currency": "GBP"
									},
									"display_name": "Keeping fit"
								},
								{
									"amount": {
										"value": -212.4,
										"currency": "GBP"
									},
									"display_name": "Utilities"
								},
								{
									"amount": {
										"value": -2.37,
										"currency": "GBP"
									},
									"display_name": "Kids"
								},
								{
									"amount": {
										"value": -185.56,
										"currency": "GBP"
									},
									"display_name": "Groceries"
								},
								{
									"amount": {
										"value": -24.99,
										"currency": "GBP"
									},
									"display_name": "Home"
								},
								{
									"amount": {
										"value": -32.0,
										"currency": "GBP"
									},
									"display_name": "Pets"
								}
							],
							"total_amount": {
								"value": -3021.82,
								"currency": "GBP"
							}
						}
					}
				]
			}
		}
		console.log("HELLO");

		component = shallowRender(props);
	});

	it('Unit Test Case 1 : Trolley : toBeDefined', () => {
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : Trolley : Else', () => {
		props.data.projection_periods[0].warning_days = [];
		component = shallowRender(props);
		expect(props.data.projection_periods[0].warning_days.length).toBe(0);
	});
	it('unit test case 3 : trolley Else', () => {
		props.data = undefined;
		let setCssForWheel = 'svgicon';
		component = shallowRender(props);
		expect(component).toEqualJSX(<div>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="64" height="66" viewBox="0 0 64 66" className={setCssForWheel}  >
				<g>
					<rect width="64" height="66" rx="2" ry="2" className="svgiconItem" />
					<path class="st0" d="M16,56.0169678c0-2.2099609,1.7900391-4,4-4s4,1.7900391,4,4s-1.7900391,3.9899902-4,3.9899902
						S16,58.2269287,16,56.0169678 M40,56.0169678c0-2.2099609,1.7900391-4,4-4s4,1.7900391,4,4s-1.7900391,3.9899902-4,3.9899902
	S40,58.2269287,40,56.0169678 M49.2399902,12.0169678h9.960083l-4.8200684,20.1400146L12,35.9669189V12.0169678h6h6h25.1600342
	l0.0499268,0.0300293L49.2399902,12.0169678z M35.75,4.1269531l6.5999756,3.8900146H29.9599609L35.75,4.1269531z
	 M32.9300537,1.2069092l-9.4000244,6.8100586H12v-4h2c1.0999756,0,2-0.9000244,2-2c0-1.1099854-0.9000244-2-2-2H2
	c-1.1099854,0-2,0.8900146-2,2c0,1.0999756,0.8900146,2,2,2h6v42c0,1.0999756,0.8900146,1.9899902,2,1.9899902h10
	c-4.4199219,0-8,3.5899658-8,8.0100098c0,4.4110107,3.5800781,7.9899902,8,7.9899902c4.4100342,0,8-3.5789795,8-7.9899902
	c0-4.4200439-3.5899658-8.0100098-8-8.0100098h24c-4.4199219,0-8,3.5899658-8,8.0100098
	c0,4.4110107,3.5800781,7.9899902,8,7.9899902c4.4200439,0,8-3.5789795,8-7.9899902c0-4.4200439-3.5799561-8.0100098-8-8.0100098h16
	c1.0999756,0,2-0.8900146,2-1.9899902c0-1.1099854-0.9000244-2-2-2H12v-4.1800537l43.4699707-3.9099121
	c0.0400391,0.0098877,0.0700684,0.0299072,0.1101074,0.039917c1.1398926,0.2900391,2.3099365-0.3599854,2.6099854-1.4599609
	l5.7299805-23.9200439c0.0200195-0.0499268,0.0200195-0.0899658,0.0300293-0.1400146
	c0-0.0299072,0.0089111-0.0699463,0.0089111-0.0999756c0.0209961-0.0899658,0.0310059-0.1699219,0.0310059-0.25
	C63.9899902,10.0668945,64,10.0369873,64,10.0169678c0-0.0700684-0.0200195-0.1300049-0.0200195-0.1900635
	c0-0.0299072,0-0.0599365-0.0100098-0.0799561c-0.1199951-0.8699951-0.789917-1.5600586-1.6599121-1.6989746
	c-0.25-0.0610352-0.5100098-0.0710449-0.75-0.0310059H50.1300049L38.5600586,1.2069092
	C37.7850342,0.4019775,36.7669678,0,35.7490234,0C34.7299805,0,33.7099609,0.4019775,32.9300537,1.2069092"/>        </g>
			</svg>
		</div>
		);
	});


});
