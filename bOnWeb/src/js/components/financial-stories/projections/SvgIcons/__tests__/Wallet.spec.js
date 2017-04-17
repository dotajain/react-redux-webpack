jest.unmock('../Wallet');
const React = require('react');
const TestUtils = require('react-addons-test-utils');


const Wallet = require('../Wallet');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Wallet
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Wallet Test Cases check', () => {

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

	it('Unit Test Case 1 : Wallet : toBeDefined', () => {
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : Wallet : Else', () => {
		props.data.projection_periods[0].warning_days = [];
		component = shallowRender(props);
		expect(props.data.projection_periods[0].warning_days.length).toBe(0);
	});
	it('unit test case 3 : Wallet Else', () => {
		props.data = undefined;
		component = shallowRender(props);
		let setCssForWheel = 'svgicon';
		expect(component).toEqualJSX(<div>
		<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"  width="64" height="66" viewBox="0 0 64 66" className={setCssForWheel} >
                <g>
                    <rect width="64" height="66" rx="2" ry="2" className="svgiconItem"  />
                    <path class="st0" d="M55.9836502,15.9770823L55.9145126,3.9773581c-0.0189972-2.2122431-1.8137932-3.9902694-4.022007-3.9772873
	L3.9795177,16.2665825c-2.2082109,0.0129814-3.9887457,1.8122311-3.9794817,4.022459l0.2232054,39.998909
	c0.0101907,2.2073212,1.8139124,3.9903107,4.0221233,3.9773254l47.9986496-0.2689362l4.0053673-0.0205994
	c2.2079124-0.0120544,3.989357-1.8141518,3.9792824-4.0214348l-0.0685272-12.0016441l-0.069313-11.9987564l-0.0854836-15.9985447
	C59.9866562,17.7421265,58.1915627,15.9650307,55.9836502,15.9770823z M49.9111862,4.0097322
	c1.1043129-0.0069375,2.00634,0.8840318,2.0113602,1.9877319l0.0553246,10.0011129l-35.0020714,0.194355L49.9111862,4.0097322z
	 M48.1364288,44.0204124l8.0014076-0.0441093l-0.0257034-4.0028267l-8.0012894,0.0441475L48.1364288,44.0204124z
	 M56.0948792,35.9775047l-12.0066528,0.0647507l0.0690193,11.9996872l11.9975281-0.0686836l0.0553284,10.0011139
	c0.0050354,1.1036415-0.8805504,2.0052719-1.9848824,2.0122681L6.2265687,60.2555733
	c-1.103899,0.0060463-2.0059085-0.8849831-2.0109453-1.9886246L4.0093751,22.2649422
	c-0.0051532-1.1036797,0.890089-2.0022297,1.9943032-2.009264l47.9983368-0.2679462
	c1.104332-0.0069942,2.00634,0.8840332,2.0113754,1.9876747L56.0948792,35.9775047z"/>
                </g>
                </svg>
		</div>
		);
	});


});
