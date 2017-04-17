jest.unmock('../CreateAlert');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const CreateAlert = require('../CreateAlert');
const AlertSweepModal = require('../AlertSweepModal');
const AlertsNSweepsActionCreator = require('../../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const ReactDOM = require('react-dom');
let component;
let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CreateAlert
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('CreateAlert Test Cases check', () => {


	beforeEach(() => {
	});

	it('should cover getCreateAlertData fxn1', () => {
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
			alertCreated: jest.fn(),
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
            <CreateAlert {...props}
                />
        );

		component.onGetAlertMyAccount(alerts);
	});

	xit('should cover onGetAlertMyAccount fxn3', () => {
		let e;
		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.onGetAlertMyAccount(e);
	});

	xit('should cover account click fxn4', () => {
		let props = {
			content: {
				cancelButton: 'cancelButton',
			}
		};
		//AlertsNSweepsStore.getAlertLessMoreValue
		//AlertsNSweepsStore.getAlertLessMoreValue.mockReturnValue([{ id: '1', name: 'curent' }])
		let value = 1;

		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let instance = ReactDOM.render(<CreateAlert {...props} />, node);
		//instance.setState({ lessMore: false });
		//instance.setState({ editAlert: false });
		instance.getLessMoreValue(value);
	});

	xit('should cover lessMore fxn', () => {
		let value = 'less';
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
		AlertsNSweepsStore.getAlertAccountName.mockReturnValue([{ id: '1', name: 'current' }])
		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.setState({ lessMore: 'less' });
		//AlertsNSweepsStore.getAlertLessMoreValue.mockReturnValue({ label: { name: 'less' } });
		//component.setState({ lessMore: { name: 'less' } });
		component.getLessMoreValue(value);
	});

	describe('CreateAlert............', () => {
		let component;
		AlertsNSweepsActionCreator.hideHeaderComponent.mockReturnValue(true);
		it('editProjectionAlert function()', () => {
			let node = document.createElement('div');
			props = {
				content: {},
				alertCreated: jest.fn(),
				backAlert: jest.fn(),
				alertUpdated: jest.fn(),
			}
			component = ReactDOM.render(<CreateAlert {...props} />, node);
			component.setState({ thresholdAmount: false });
			component.render();
		});
	});

	describe('To check onThresholdMoneyChange Function', () => {

		it('calls for the onThresholdMoneyChange function', () => {
			let evnt = {
				target: {
					value: '',
				}
			};
			let props = {
				alertCreated: jest.fn(),
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
				<CreateAlert {...props}
					/>
			);
			component.onThresholdMoneyChange(evnt);

		});

		it('calls for the onThresholdMoneyChange function to cover else condn of thresholdvalue.length', () => {
			let e = {
				target: {
					value: '111.50',
				}
			};
			let props = {
				alertCreated: jest.fn(),
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
				<CreateAlert {...props}
					/>
			);
			component.onThresholdMoneyChange(e);

		});


		it('calls for the onThresholdMoneyChange function to cover else condn of thresholdvalue.length', () => {
			let e = {
				target: {
					value: '400',
				}
			};
			let props = {
				alertCreated: jest.fn(),
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
				<CreateAlert {...props}
					/>
			);
			component.onThresholdMoneyChange(e);

		});
	});

	it('calls for the onThresholdMoneyChange function to cover else condn of thresholdvalue.length', () => {
		let e = {
			target: {
				value: 'null',
			}
		};
		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.onThresholdMoneyChange(e);

	});

	it('calls for the onThresholdMoneyChange function to cover else condn of thresholdvalue.length', () => {
		let e = {
			target: {
				value: '£$25',
			}
		};
		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.onThresholdMoneyChange(e);

	});

	it('should cover showHeader fxn', () => {
		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.showHeader();
	});
	xit('calls for the getRealAccountName() ', () => {
		let accounts = [{ 'id': '1', 'name': 'current', label: 'current ending', number: "12345678" },
			{ 'id': '2', 'name': 'current2', label: 'current2 ending', number: "12334455" },
		]
		//AlertsNSweepsStore.getAlertAccountName
		AlertsNSweepsStore.getAlertAccountName.mockReturnValue(accounts);
		let accountid = 1;
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let instance = ReactDOM.render(<CreateAlert {...props} />);
		instance.getRealAccountName('1');

	});
	



	xit('should cover componentDidMount fxn7', () => {

		let props = {
			alertCreated: jest.fn(),
			backAlert: jest.fn(),
			alertUpdated: jest.fn(),
			alertId: 'alertId',
			lessMore: 'less',
			content: {
				cancelButton: 'cancelButton',
				editMyAlert: 'editMyAlert',
				inMy: 'inMy',
			},

		};
		let refs = {
			createAlertMyAccountDropDown: true,
		};

		let component = TestUtils.renderIntoDocument(
			<CreateAlert {...props}
				/>
		);
		component.componentDidMount();
	});

	it('should cover createAlert fxn7', () => {

		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.createAlert();
	});

	it('should cover createAlert fxn7 when amount is undefined', () => {

		let props = {
			alertCreated: jest.fn(),
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
			<CreateAlert {...props}
				/>
		);
		component.setState({ amount: undefined });
		component.setState({ lessMore: 'less' });
		component.createAlert();
	});

	xit('should cover createAlert fxn7 when amount is undefined', () => {

		let props = {
			alertCreated: jest.fn(),
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
		AlertsNSweepsStore.getAlertAccountName.mockReturnValue({ id: 'aaa' });
		AlertsNSweepsStore.getAlertsList.mockReturnValue({ id: 'aaa', value: '10' });

		let component = TestUtils.renderIntoDocument(
			<CreateAlert {...props}
				/>
		);
		//component.setState({ amount: undefined });
		//component.setState({ lessMore: 'less' });
		//component.createAlert();
		component.componentDidMount();
	});

	describe('should run getLessMoreValue', () => {
		it('should check if valid value found', () => {
			let value = '52332325';
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<CreateAlert {...props} />, node);
           AlertsNSweepsActionCreator.setAlertLessMoreValue(value);
         component.setState({lessMore:'less'});
        component.getLessMoreValue(value);
		});
		});

		describe('should run getRealAccountName', () => {
	it('should check if valid value found', () => {
		let value = '52332325';
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		component = ReactDOM.render(<CreateAlert {...props} />, node);
		component.setState({showModal:true});
	component.getRealAccountName(value);
	});
	});


	it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
		
		 <div className="content-wrapper">
   <div className="row no-gutters headerContainer">
     <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
       <button
         className="page-options opt-white"
         onClick={function noRefCheck() {}}
         type="button"
       >
         <span />
       </button>
     </div>
     <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-8  col-xs-offset-0">
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
             <span className="float-right">
               <div className="editSweep">
                 curent
               </div>
             </span>
           </section>
         </li>
         <li>
           <section>
             <span className="float-left" />
           </section>
           <section>
             <exports
               ref="createAlertLessMoreDropDown"
               clearText="Remove selection"
               closeText="Close"
               onChange={function noRefCheck() {}}
               value="less"
             >
               <option value="1">
                 <span>
                   curent
                 </span>
               </option>
             </exports>
           </section>
         </li>
         <li>
           <section>
             <span className="float-left" />
           </section>
           <section>
             <h4 className="currency currency-value-holder">
               <input
                 defaultValue="£50"
                 onChange={function noRefCheck() {}}
                 placeholder=""
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
               dangerouslySetInnerHTML={{__html: undefined}}
             />
           </section>
           <section>
             <span
               className="float-right"
               dangerouslySetInnerHTML={{__html: undefined}}
             />
           </section>
         </li>
       </ul>
     </div>
   </div>
   <div>
     <button
       className="action-button"
       onClick={function noRefCheck() {}}
     />
     <AlertSweepModal
       confirmCancel={false}
       content={{}}
     />
   </div>
 </div>
		);
    });
});
