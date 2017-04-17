jest.unmock('../EditSweep');
const React = require('react');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore')
const AlertSweepModal = require('../AlertSweepModal');
const EditSweep = require('../EditSweep');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EditSweep
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('EditSweep Test Cases check', () => {
	let component;
	let props;
	let instance;
	let accounts = [];
	beforeEach(() => {
		props = {
			content: {
				sweepLine1: 'one',
				sweepLine2: 'two',
				sweepLine3: 'three',
				sweepLine4: 'four',
				confirmButton: 'Ok',
            },
			backSweep: jest.genMockFn(),
			sweepId: 1,
			sweepEdited: jest.genMockFn(),
            data: {},
        },

			accounts = [{ 'id': '1', 'name': 'current', label: 'current ending',number:"12345678" },
				{ 'id': '2', 'name': 'current2', label: 'current2 ending' ,number:"12334455"},
			],

			AlertsNSweepsStore.getEditSweepData.mockReturnValue({
				counter: 0,
				id: 1,
				owner:0,
				fromAccountId: '1',
				alert: [{ lessmore: 'less', amount: 0 }],
			}),

		AlertsNSweepsStore.getSweepToAccountName.mockReturnValue(accounts);
		AlertsNSweepsStore.getSweepFromAccountName.mockReturnValue(accounts);
		

		component = shallowRender(props);
	});

	it('Unit Test Case 1 : CreateSweepsPage : toBeDefined', () => {
		expect(component).toBeDefined();
	});

	it('should check valid rendered HTML', () => {
		component = shallowRender(props);
        expect(component).toEqualJSX(
			  <div className="content-wrapper">
   <div className="row no-gutters headerContainer">
     <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 ">
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span />
       </button>
     </div>
     <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-6 col-xs-offset-0">
       <h2 className="sweepHeading" />
     </div>
     <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-right">
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span className="icon icon-information" />
       </button>
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span className="icon icon-delete" />
       </button>
     </div>
   </div>
   <div className="row">
     <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
       <ul className="form-wrapper sweepsForm">
         <li className="second-column">
           <section>
             <span className="float-left">
               one
             </span>
           </section>
           <section>
             <select
               className="editSweep"
               dir="rtl"
               disabled={true}
               onChange={function noRefCheck() {}}
               value={1}
             >
               <option value="1">
                 current
               </option>
               <option value="2">
                 current2
               </option>
             </select>
           </section>
         </li>
         <li className="first-column">
           <section>
             <span
               className="float-left"
               dangerouslySetInnerHTML={{__html: 'two'}}
             />
           </section>
           <section>
             <h4 className="currency currency-value-holder">
               <input
                 defaultValue="£0"
                 onChange={function noRefCheck() {}}
                 placeholder=""
                 type="text"
                 value="£0"
               />
               <span className="currency-value-border">
                 £0
               </span>
             </h4>
           </section>
         </li>
         <li>
           <section>
             <span
               className="float-left"
               dangerouslySetInnerHTML={{__html: 'three'}}
             />
           </section>
           <section>
             <exports
               ref="fromAccountDropDown"
               clearText="Remove selection"
               closeText="Close"
               dir="rtl"
               onChange={function noRefCheck() {}}
               value={undefined}
             >
               <option value="1">
                 <span>
                   current
                 </span>
                 <span>
                   ending 5678
                 </span>
               </option>
               <option value="2">
                 <span>
                   current2
                 </span>
                 <span>
                   ending 4455
                 </span>
               </option>
             </exports>
           </section>
         </li>
         <li className="first-column">
           <section>
             <span className="float-left">
               four
             </span>
           </section>
           <section>
             <h4 className="currency currency-value-holder">
               <input
                 defaultValue="£undefined"
                 onChange={function noRefCheck() {}}
                 placeholder=""
                 type="text"
                 value="£undefined"
               />
               <span className="currency-value-border">
                 £undefined
               </span>
             </h4>
           </section>
         </li>
       </ul>
     </div>
   </div>
   <div>
     <AlertSweepModal
       confirmCancel={false}
       content={{confirmButton: 'Ok', sweepLine1: 'one', sweepLine2: 'two', sweepLine3: 'three', sweepLine4: 'four'}}
       deleteData={function noRefCheck() {}}
       id={1}
       name=""
       sendDeleteData={undefined}
     />
   </div>
 </div>
		);
	});

	it('should check the showHeader()', () => {
		let node = document.createElement('div');
		let showHeader = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		instance = ReactDOM.render(<EditSweep {...props} />, node);
		instance.showHeader();
	});

	describe('To check getRealAccountName Function', () => {
		let instance;
		let props = {
			e: 1,
			sweepEdited: jest.genMockFn(),
			deleteData: jest.genMockFn(),
			content: {

			},
		};
		xit('calls for the getRealAccountName() ', () => {
			accounts = [{ 'id': '1', 'name': 'current', label: 'current ending',number:"12345678" },
				{ 'id': '2', 'name': 'current2', label: 'current2 ending' ,number:"12334455"},
			]
			AlertsNSweepsStore.getSweepFromAccountName.mockReturnValue(accounts);
			let accountid = 1;
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.getRealAccountName('1');

		});
		

		it('calls for the onGetMyAccount function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.setState({ account_id: props.e })
			instance.onGetMyAccount('1');
		});

		it('calls for the onGetOtherAccount function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			//instance.setState({ fromAccountId: props.e });
			//instance.setState({ other_account_id: props.e });
			instance.onGetOtherAccount('1');
		});

		

		it('calls for the updateSweep function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.updateSweep();
		});

		it('calls for the DeleteData function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.DeleteData();
		});

		it('calls for the delPopup function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.delPopup();
		});

		

		it('calls for the isConfirm function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.isConfirm();
		});


		

		it('should check if UserAgreement is info Popup', () => {
			AlertsNSweepsStore.isJointAccount.mockReturnValue(false);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.setState({ modalPopup: true, name: 'info' });
			instance.onUserAgreementInfoPopup();
		});

		
		
		it('should check if UserAgreement is Info Popup', () => {
			AlertsNSweepsStore.isJointAccount.mockReturnValue(true);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.setState({ modalPopup: true, name: 'jointInfo' });
			instance.onUserAgreementInfoPopup();
		});

	});

	describe('To check EventHandlers', () => {
		let props = {
			content: {
			},
		};
		let e = {
				target: {
					value: '',
				}
		}
		it('calls for the onTargetMoneyChange function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.onTargetMoneyChange(e);
		});

		it('should check target money is larger then ThresholdMoney-value -0 ', () => {
			let evnt = {
				target: {
					value: '100',
				}
			}
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			//instance.setState({ targetAmount: `£${10}` });
        	//instance.setState({ amount1: 60000});
			instance.onTargetMoneyChange(evnt);
		});

		it('should check if input ThresholdMoney larger then 0 function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.onThresholdMoneyChange(e);
		});

		let evnt = {
				target: {
					value: '125.25',
				}
		}

		it('should check if input target money larger then 0 function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.onTargetMoneyChange(evnt);
		});

		it('should check if input ThresholdMoney larger then 0 function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.onThresholdMoneyChange(evnt);
		});


		it('should check target money is larger then ThresholdMoney ', () => {
			let evnt = {
				target: {
					value: '25125.25',
				}
			}
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.setState({ targetAmount: `£${10}` });
        	instance.setState({ amount1: 60000});
			instance.onThresholdMoneyChange(evnt);
		});

			it('should check target money is larger then ThresholdMoney-value -0 ', () => {
			let evnt = {
				target: {
					value: '-0',
				}
			}
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			//instance.setState({ targetAmount: `£${10}` });
        	//instance.setState({ amount1: 60000});
			instance.onThresholdMoneyChange(evnt);
		});

		it('should check target money is larger then ThresholdMoney-value -0 ', () => {
			let evnt = {
				target: {
					value: '100',
				}
			}
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			//instance.setState({ targetAmount: `£${10}` });
        	//instance.setState({ amount1: 60000});
			instance.onThresholdMoneyChange(evnt);
		});

		it('should check target money is larger then ThresholdMoney-value -0 ', () => {
			let evnt = {
				target: {
					value: null,
				}
			}
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			//instance.setState({ targetAmount: `£${10}` });
        	//instance.setState({ amount1: 60000});
			instance.onThresholdMoneyChange(evnt);
		});
	});

	describe('Apply format of target Money on change', () => {
		it('should check if valid value found', () => {
			let value = '52332325';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.updateStateOnTargetMoneyChange(value);
		});

		it('should closeToggleMessage', () => {
			//let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.closeToggleMessage();
		});

		

		it('should showNotification', () => {
			//let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.showNotification();
		});
	});

	xdescribe('Apply format of thresold Money on change', () => {
		it('should check if valid value found', () => {
			let value = '52332325.25.4548545';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.getFormattedThresholdMoney(value);
		});

		xit('should check return thresold-money state value if valid value not found', () => {
			let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<EditSweep {...props} />, node);
			instance.getFormattedThresholdMoney(value);
		});
	});

	








});