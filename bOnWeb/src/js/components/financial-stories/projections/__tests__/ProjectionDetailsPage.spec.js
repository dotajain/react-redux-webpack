jest.unmock('../ProjectionDetailsPage');
const React = require('react');
const TestUtils = require('react-addons-test-utils');


const ProjectionDetailsPage = require('../ProjectionDetailsPage');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ProjectionDetailsPage
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('ProjectionDetails Test Cases check', () => {

	beforeEach(() => {
		props = {
			content : {
				projectionPredictionTotalString: 'Total',
				projectedCommitmentBeforeYourNextEarnings: 'Next',
				projectedCommitments: 'Commitments',
				projectedBalanceInNext31Days: '31 Days',
				projectedPredictionEssentialSpendPreviosString: 'Previous String',
				projectedPredictionYourThreshold: 'Threshold',
			},
			projectionSummary: {
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
		component = shallowRender(props);
	});

	it('Unit Test Case 1 : ProjectionDetails : toBeDefined',()=>{
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : ProjectionDetails : warning_days',()=>{
		props.projectionSummary.projection_periods[0].warning_days = [];
		component = shallowRender(props);
		expect(props.projectionSummary.projection_periods[0].warning_days.length).toBe(0);
	});

	it('Unit Test Case 3 : ProjectionDetails : transactions',()=>{
		props.projectionSummary.projection_periods[0].projected_transactions.transactions = [];
		component = shallowRender(props);
		expect(props.projectionSummary.projection_periods[0].projected_transactions.transactions.length).toBe(0);
	});


	it('Unit Test Case 4 : ProjectionDetails : transactions',()=>{
		props.projectionSummary.projection_periods[0].projected_transactions.transactions = 1;
		component = shallowRender(props);
		expect(props.projectionSummary.projection_periods[0].projected_transactions.transactions.length).toBe();
	});

	it('Unit Test Case 5 : ProjectionDetails : dateConversion',()=>{
   		 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
   		 instance.dateConversion('');
   		 expect(instance.dateConversion.length).toBe(1);
	});

	it('Unit Test Case 6 : ProjectionDetails : _showEssentialSpendingsTagData : Else If',()=>{
		 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
		 props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend = [];
   		 instance._showEssentialSpendingsTagData();
		expect(props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length).toBe(0);
	});

	it('Unit Test Case 7 : ProjectionDetails : projectionSummary : Else If',()=>{
   		 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
			  props.projectionSummary.projection_periods = undefined;
   		 //instance._showEssentialSpendingsTagData();
		expect(props.projectionSummary.projection_periods).toBe(undefined);
	});

	// it('Unit Test Case 8 : ProjectionDetails : _showCurrentBalanceDate : Else If',()=>{
	// 	 props.projectionSummary = undefined;
  //  		 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
	// 			props.projectionSummary.projection_periods = undefined;
  //  	//	 instance._showCurrentBalanceDate();
	// 	expect(props.projectionSummary.projection_periods).toBe(undefined);
	// });

	it('Unit Test Case 9 : ProjectionDetails : projection_periods : Else If',()=>{
			 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
			 props.projectionSummary.projection_periods = undefined;
   		 instance._showCurrentBalanceDate();
		expect(props.projectionSummary.projection_periods).toBe(undefined);
	});

	it('Unit Test Case 10 : ProjectionDetails : showNewEarnings : If',()=>{
		props.projectionSummary.projection_periods[1] =
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
						 ],
						 "total_amount": {
							 "value": -3021.82,
							 "currency": "GBP"
						 }
					 }
				 };
			 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);

			 instance.showNewEarnings();
	});

	it('Unit Test Case 10 : ProjectionDetails : showNewEarnings : Else If',()=>{
		props.projectionSummary.projection_periods[1] =
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
						 "display_name": "UK Gas Co",
						 "amount": {
							 "value": -45.0,
							 "currency": "GBP"
						 },
						 "type": "Direct Debit",
						 "when": "2016-06-03T13:00:00.000+01:00"
					 },
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
						 ],
						 "total_amount": {
							 "value": 0,
							 "currency": "GBP"
						 }
					 }
				 };
			 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);

			 instance.showNewEarnings();
	});

	it('Unit Test Case 11 : ProjectionDetails : _essentialSpendingsFlag : ',()=>{
			 props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value = 0;
			 let instance = TestUtils.renderIntoDocument(<ProjectionDetailsPage {...props}/>);
			 instance._essentialSpendingsFlag();
	});

});
