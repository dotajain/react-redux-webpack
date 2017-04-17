jest.unmock('../Wheel');
const React = require('react');
const TestUtils = require('react-addons-test-utils');


const Wheel = require('../Wheel');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Wheel
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('Wheel Test Cases check', () => {

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
				      "warning_days":[
				      {
				      	"value":10
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

	it('Unit Test Case 1 : Wheel : toBeDefined',()=>{
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : Wheel : Else',()=>{
		 props.data.projection_periods[0].warning_days = [];
		component = shallowRender(props);
		expect(props.data.projection_periods[0].warning_days.length).toBe(0);
	});
it('unit test case 3 : wheel Else', () => {
		props.data = undefined;
		component = shallowRender(props);
		let setCssForWheel = 'svgicon';
		expect(component).toEqualJSX(<div>
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="64" height="66" viewBox="0 0 64 66" className={setCssForWheel}>
                <g>
                    <rect width="64" height="66" rx="2" ry="2" className="svgiconItem"/>
                    <path class="st0" d="M12.0429344,48.0224495l0.0086498,3.9940224l19.9988461-0.0209045l-0.0086899-3.9941368L12.0429344,48.0224495z
	 M12.0325413,38.0230064l0.0085335,3.9940605l31.99687-0.0309982l0.0008659-3.9971275L12.0325413,38.0230064z
	 M12.0189276,28.0140877l0.0117912,4.0036545l31.9967155-0.0310764l-0.0031662-4.00634L12.0189276,28.0140877z
	 M38.0021324,7.9925175l0.010807,8.0008202l-8.0038834,0.0014076l-3.9940243,0.0086498l-8.0009346,0.0108452l-0.0108089-8.0008192
	l6.002161-0.0113382l-0.0090637-1.9954023c0.0062733-1.1065092,0.8953266-1.9958925,1.9990349-1.9982066l4.0036564-0.011791
	c1.1035919-0.0022759,1.9955902,0.894398,1.9980907,1.9990737l0.0091,1.9955177L38.0021324,7.9925175z M42.0157661,19.9787884
	l-0.0078201-7.9912653l9.9994049-0.0105095l0.052845,47.9984322L4.061727,60.0281792L4.0085764,12.0288172l9.9997444-0.0094662
	l0.0078211,7.9912653L42.0157661,19.9787884z M42.0056725,7.9807644l-0.0086861-3.994139l-5.9926453,0.0082355
	c-0.0076942-2.2168188-1.7984734-3.9994795-4.0058937-3.9948518l-8.0039215,0.0012916
	c-2.207304,0.0045897-3.9994431,1.7985899-3.9948521,4.0058918l-6.0022774,0.0113769l0.0083466,3.9930949L0,8.0253391
	l0.0636558,55.9992523l55.9924965-0.0520782l-0.053833-56.0014267L42.0056725,7.9807644z"/>
                </g>
                </svg>
			</div>
		);
	});


});
