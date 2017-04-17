jest.unmock('../CreateSweep');
const React = require('react');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore')
const AlertSweepModal = require('../AlertSweepModal');
const CreateSweep = require('../CreateSweep');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CreateSweep
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('CreateSweep Test Cases check', () => {
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
     <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span>
           Cancel
         </span>
       </button>
     </div>
     <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-8 col-xs-offset-0">
       <h2 className="sweepHeading" />
     </div>
     <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span className="icon icon-information" />
       </button>
     </div>
   </div>
   <div className="row">
     <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
       <ul className="form-wrapper sweepsForm">
         <li>
           <section>
             <span className="float-left">
               one
             </span>
           </section>
           <section>
             <span className="float-right">
               <exports
                 ref="myAccount"
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
             </span>
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
                 defaultValue="£50"
                 onChange={function noRefCheck() {}}
                 type="text"
                 value="£50"
               />
               <span className="currency-value-border">
                 £50
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
             <span className="float-right">
               <exports
                 ref="fromAccountCreateSweepDropDown"
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
             </span>
           </section>
         </li>
         <li>
           <section>
             <span className="float-left">
               four
             </span>
           </section>
           <section>
             <h4 className="currency currency-value-holder">
               <input
                 defaultValue="£150"
                 onBlur={undefined}
                 onChange={function noRefCheck() {}}
                 placeholder=""
                 type="text"
                 value="£150"
               />
               <span className="currency-value-border">
                 £150
               </span>
             </h4>
           </section>
         </li>
       </ul>
     </div>
   </div>
   <div>
     <button
       className="action-button"
       onClick={function noRefCheck() {}}
       value="update"
     >
       Ok
     </button>
     <AlertSweepModal
       confirmCancel={false}
       content={{confirmButton: 'Ok', sweepLine1: 'one', sweepLine2: 'two', sweepLine3: 'three', sweepLine4: 'four'}}
       name=""
     />
   </div>
 </div>
		)
	});

	it('should check the showHeader()', () => {
		let node = document.createElement('div');
		let showHeader = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		instance = ReactDOM.render(<CreateSweep {...props} />, node);
		instance.showHeader();
	});

	describe('To check getRealAccountName Function', () => {
		let instance;
		let accounts = [{ 'id': '1', 'name': 'current', label: 'current ending',number:"12345678" },
				{ 'id': '2', 'name': 'current2', label: 'current2 ending' ,number:"12334455"},
			];
		let props = {
			e: 1,
			sweepEdited: jest.genMockFn(),
			sweepCreated: jest.genMockFn(),
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.getRealAccountName('1');

		});
		

		xit('calls for the onGetMyAccount function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.setState({ account_id: props.e })
			instance.onGetMyAccount('1');
		});

		it('calls for the onGetOtherAccount function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			//instance.setState({ fromAccountId: props.e });
			//instance.setState({ other_account_id: props.e });
			instance.onGetOtherAccount('1');
		});

		

		it('calls for the createSweep function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.createSweep();
		});
        //infoPopup
		it('calls for the createSweep function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			AlertsNSweepsStore.isJointAccount.mockReturnValue(false);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);

			instance.infoPopup();
		});
		it('calls for the createSweep function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			AlertsNSweepsStore.isJointAccount.mockReturnValue(true);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);

			instance.infoPopup();
		});
		//getMyAccount
		it('calls for the getMyAccount function', () => {
			let acc='1';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			//AlertsNSweepsStore.isJointAccount.mockReturnValue(true);
			AlertsNSweepsStore.getSweepToAccountName.mockReturnValue(accounts);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);

			instance.getMyAccount(acc);
		});


		it('calls for the isConfirm function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.isConfirm();
		});

		xit('should check if UserAgreement is info Popup', () => {
			AlertsNSweepsStore.isJointAccount.mockReturnValue(false);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.setState({ modalPopup: true, name: 'info' });
			instance.onUserAgreementInfoPopup();
		});

		
		
		xit('should check if UserAgreement is Info Popup', () => {
			AlertsNSweepsStore.isJointAccount.mockReturnValue(true);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			//instance.setState({ targetAmount: `£${10}` });
        	//instance.setState({ amount1: 60000});
			instance.onTargetMoneyChange(evnt);
		});

		it('should check if input ThresholdMoney larger then 0 function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.onTargetMoneyChange(evnt);
		});

		it('should check if input ThresholdMoney larger then 0 function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
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
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.updateStateOnTargetMoneyChange(value);
		});

		it('should closeToggleMessage', () => {
			//let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.closeToggleMessage();
		});

		

		it('should showNotification', () => {
			//let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.showNotification();
		});
	});

	xdescribe('Apply format of thresold Money on change', () => {
		it('should check if valid value found', () => {
			let value = '52332325.25.4548545';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.getFormattedThresholdMoney(value);
		});

		xit('should check return thresold-money state value if valid value not found', () => {
			let value = '';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<CreateSweep {...props} />, node);
			instance.getFormattedThresholdMoney(value);
		});
	});

	








});