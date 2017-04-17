jest.unmock('../Camera');
const React = require('react');
const TestUtils = require('react-addons-test-utils');


const Camera = require('../Camera');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Camera
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Camera Test Cases check', () => {
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
		component = shallowRender(props);
	});
	it('Unit Test Case 1 : Camera : toBeDefined', () => {
		expect(component).toBeDefined();
	});
	it('Unit Test Case 2 : camera  Else', () => {
		props.data.projection_periods[0].warning_days = [];
		component = shallowRender(props);
		expect(props.data.projection_periods[0].warning_days.length).toBe(0);
	});
	it('unit test case 3 : camera Else', () => {
		props.data = undefined;
		component = shallowRender(props);
		expect(component).toEqualJSX(<div>
			<svg
				className="svgicon"
				height="66"
				preserveAspectRatio="xMidYMid"
				viewBox="0 0 64 66"
				width="64"
				xmlns="http://www.w3.org/2000/svg"
				>
				<g>
					<rect
						className="svgiconItem"
						height="66"
						rx="2"
						ry="2"
						width="64"
						/>
					<path id="SVGID_1_" d="M38,40c5.5198975,0,10-4.4699707,10-10c0-5.5200195-4.4801025-10-10-10c-5.5200195,0-10,4.4799805-10,10
						C28,35.5300293,32.4799805,40,38,40 M38,24c3.3199463,0,6,2.6900635,6,6c0,3.3200684-2.6800537,6-6,6
			c-3.3100586,0-6-2.6799316-6-6C32,26.6900635,34.6899414,24,38,24 M4,36h4v-4H6c-1.1000977,0-2-0.8900146-2-2V6
			c0-1.0999756,0.8999023-2,2-2h40c1.1099854,0,2,0.9000244,2,2v2h4V4c0-2.2099609-1.7900391-4-4-4H4C1.789917,0,0,1.7900391,0,4v28
			C0,34.210083,1.789917,36,4,36 M12,16v28c0,2.210083,1.789917,4,4,4h44c2.2099609,0,4-1.789917,4-4V16
			c0-2.2099609-1.7900391-4-4-4H16C13.789917,12,12,13.7900391,12,16 M18,16h40c1.1099854,0,2,0.9000244,2,2v24
			c0,1.1099854-0.8900146,2-2,2H18c-1.1000977,0-2-0.8900146-2-2V18C16,16.9000244,16.8999023,16,18,16"/>
        </g>
			</svg>
		</div>
		);
	});
});
