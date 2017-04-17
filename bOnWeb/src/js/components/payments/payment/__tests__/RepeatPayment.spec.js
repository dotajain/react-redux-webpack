'use strict';

jest.unmock('../RepeatPayment');
jest.mock('../../../../stores/PaymentsStore');
jest.mock('../../../../actions/PaymentsActionCreator');

const RepeatPayment = require('../RepeatPayment');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const DateUtils = require('../../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../../config');
const Toggle = require('../../../common/Toggle');
const RegexUtils = require('../../../../utils/RegexUtils');
const _ = require('lodash');
const DateTimeField = require('react-bootstrap-datetimepicker-noicon');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<RepeatPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
//PaymentsStore.getEndingDetails().mockReturnValue();
PaymentsStore.getEndingDetails.mockReturnValue({
    reference: 'reference',
    stopitwhenText: 'Nooftimes',
    isRepeat: true,
    //when: 'Today',
    dtStart:'10-10-2016',
    dtEnd:'11-11-2016', 
});
//PaymentsStore.getNextTask.mockReturnValue('RP');
//PaymentsStore.getConfirmBack.mockReturnValue(true);
describe('RepeatPayment Component Test Cases', () => {
let instance;
    beforeEach(() => {
        //  let deletePaymentFunc = jest.genMockFn();
        PaymentsStore.getPaymentType.mockReturnValue(true);
        //let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        //instance.setState({ reference: 'reference' });
    });

    let props = {
        content: {
            'reference': 'reference',
            'No': 'No',
            'when':'Today',
            'repeatPayment':'repeatPayment',
        },
        'showWhen': true,
        'referenceData': 'reference',
        onClick: jest.genMockFn(),
        repeatAccountValid: false,
    }
    it('should call on store change', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'Nooftimes',
            dtStart: '2016-12-01',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.onStoreChange();
    });
    it('should call on componentDidMount', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat: false, dtStart: '2016-12-01'});
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.componentDidMount();
    });
    it('should call on showTimeUpPopup', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat: false, dtStart: '2016-12-01' });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.setState({ showTime: true });
        instance.showTimeUpPopup();
    });

    it('should call setSelOften function', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.setSelOften();
        instance.getInitialState();
    });
    it('should call componentWillUnmount', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.componentWillUnmount();
    });
    it('should call enableLabel', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.setState({ isClicked: false });
        instance.enableLabel();
        expect(instance.state.isClicked).toBe(false);
    });
    it('should call showHowOften', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showHowOften();
    });
    it('should call showStopItWhen', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showStopItWhen();
    });
    it('should call refBlur', () => {
        let e = {
            target: {
                value: 'value',
            },
        };
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.refBlur(e);
    });
    xit('should call txtBlur', () => {
        let e = {
            target: {
                value: 'value',
            },
        };
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText:'Nooftimes',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
          instance.getEndingDetails();
          instance.textField();
        instance.txtBlur(e);
    });
     it('should call refBlur', () => {
        let e = {
            target: {
                value: 'values',
            },
        };
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.refBlur(e);
    });
    it('should call checkWhenDate', () => {
        let e = '21-10-2016';
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.checkDate(e);
        instance.checkWhenDate(e);
    });
     it('should call checkWhenDate else part', () => {
        let e = '2sss1-1sss0-2016ssss';
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.checkDate(e);
        instance.checkWhenDate(e);
    });
    it('should call showEndingData', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'Pickadate',
             dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showEndingData();
    });
    it('should call closed', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.closed();
    });

    it('should call showEndingData when stopitwhenText is whenicancel', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'whenicancel',
             dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showEndingData();
    });
    it('should call getNumberOfDays', () => {
        let e = '21-10-2016';
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.getNumberOfDays(e);
    });
    it('should call handleCheck', () => {
        let e = {
            target: {
                value: true,
            },
        };
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.handleCheck(e);
    });
    it('should call pickStopItWhen', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.pickStopItWhen('when i cancel');
    });
    it('should call dateTimeField', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.dateTimeField();
    });
    it('should call dateTimeField when enddate is not Choose a date', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            end: 'Choose a date',
            dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.dateTimeField();
    });
    it('should call textField', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.textField();
    });
    it('should call disableDates for renderWhen', () => {
        props.repeatAccountValid=true;
         PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat : false, stopitwhenText:'Pickadate', dtStart: '2016-12-01'});
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.disableDates();
        // instance.showEndingData();
         // instance.getEndingDetails();
        props.repeatAccountValid=false;
    });
    
    it('should call disableDates for dtEnd', () => {
        props.repeatAccountValid=true;
         PaymentsStore.getEndingDetails.mockReturnValue({ stopitwhenText:'Pickadate', dtStart:'10-10-2016', end:'11-11-2016' });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
      
        instance.disableDates();
        props.repeatAccountValid=false;
         PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat : false });
        
    });

    it('should call keyPress', () => {
        RegexUtils.isValid.mockReturnValue(true);

        let e = {
            key: 2,
            target: {
                className: '',
            },
            preventDefault: jest.genMockFn(),
        };
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.keyPress(e);
    });
    it('should call keyPress when value is not valid', () => {
        RegexUtils.isValid.mockReturnValue(false);
        let e = {
            key: 2,
            target: {
                className: '',
            },
            preventDefault: jest.genMockFn(),
        };
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.keyPress(e);
    });
    it('should call nextClicked', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.nextClicked();
    });
    it('should call dtStart ', () => {
        let e = '21-10-2016';
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.dtStart(e);
    });
    it('should call dtEnd ', () => {
        let e = '21-10-2016';
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.dtEnd(e);
    });
    it('should call componentWillMount ', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        PaymentsStore.getNextTask.mockReturnValue('RP');
        instance.componentWillMount();
    });
    it('should call componentWillMount ', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        instance.componentWillMount();

    });
    it('should call onStoreChange ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            reference: 'Pickadate',
            stopitwhenText: 'Nooftimes',
            dtStart: '2016-12-01'
        });

        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        //  instance.refs.Nooftimes =TestUtils.renderIntoDocument(<input type='text' />);
        // console.log('d', node);
        //instance.setState({ reference: 'Pickadate' });
        instance.onStoreChange();

    });
    it('should call onStoreChange 1', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            reference: 'Nooftimes',
            stopitwhenText: 'Nooftimes',
            isRepeat: true,
            dtStart: '2016-12-01'
        });

        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        console.log('stoe chamnge')
        instance.onStoreChange();

    });

    it('should call renderWhen ', () => {
        props.repeatAccountValid=true;
         PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat : false, stopitwhenText:'Pickadate' });
        
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        // ReactDOM.findDOMNode.mockReturnValue('fdsdd');
      
       instance.renderWhen();
        props.repeatAccountValid=false;
       
    });
    it('should call getEndingDetails ', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.getEndingDetails();
    });
      it('should call closed ', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.closed();
    });
    it('should call getEndingDetails for Pickadate case ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'Pickadate',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.getEndingDetails();
    });
    it('should call getEndingDetails for Nooftimes case ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'Nooftimes',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.getEndingDetails();
    });
    it('should call showStartDate ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            dtStart: 'Pickadate',
            end: 'Tuesday',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showStartDate();
    });
    it('should call showStartDate when dtStart is Choose a date ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            dtStart: 'Choose a date',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showStartDate();
    });
    it('should return RepeatPayment page jsx', () => {
        let deletePaymentFunc = jest.genMockFn();
        let component = shallowRender(props);
        expect(component).toEqualJSX(
            <div>
  <ul className="form-wrapper">
    <li>
      <section>
         repeatPayment
       </section>
      <section>

        No
      </section>
    </li>
  </ul>
</div>
        );
    });
});
// if test case is not working for jsx then delete this describe
describe('RepeatPayment Component Test Cases for showwhen ', () => {

    beforeEach(() => {
        //  let deletePaymentFunc = jest.genMockFn();
        PaymentsStore.getPaymentType.mockReturnValue(false);
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.setState({ reference: 'reference' });
    });

    let props = {
        content: {
            'reference': 'reference',
            'No': 'No',
        },
        'showWhen': false,
        'referenceData': 'reference',
        onClick: jest.genMockFn(),
        repeatAccountValid: false,
    }
    it('should call on getEndingDetails', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            stopitwhenText: 'Nooftimes',
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.getEndingDetails();
    });
    it('should call textField ', () => {
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.textField();
    });
    it('should call onStoreChange ', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            isRepeat: true, stopitwhenText: 'Nooftimes',dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.textField();
        instance.onStoreChange();
    });

    it('should call on getEndingDetails', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            dtStart: 'Tomorrow',dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.showStartDate();
    });
    xit('should call on componentDidMount', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat: true, stopitwhenText: 'Pickadate', dtStart: '2016-12-01' });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.componentDidMount();
    });
    xit('should call on dateTimeField', () => {
        // PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat: false });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.dateTimeField();
    });
});
describe('RepeatPayment Component Test Cases to check repeatAccountValid is true ', () => {
    beforeEach(() => {
        //  let deletePaymentFunc = jest.genMockFn();

        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        instance.setState({ reference: 'reference' });
    });
    let props = {
        content: {
            'reference': 'reference',
            'No': 'No',
        },
        'referenceData': 'reference',
        onClick: jest.genMockFn(),
        repeatAccountValid: true,
    }
    it('should return RepeatPayment page jsx', () => {
        PaymentsStore.getReferenceFlag.mockReturnValue(true);
        PaymentsStore.getEndingDetails.mockReturnValue({ isRepeat: false, dtStart: '2016-12-01' });
        let component = shallowRender(props);
        //  component.setState({ defaultValue: DateUtils.getShortString(), endMinDate: moment() });
        let defaultValue = DateUtils.getShortString();
        let endMinDate = moment();
    });
});
describe('RepeatPayment Components Test Cases to map array', () => {

    beforeEach(() => {
        //  let deletePaymentFunc = jest.genMockFn();

    });

    let props = {
        content: {
            'reference': 'reference',
            'No': 'No',
        },
        'referenceData': 'reference',
        onClick: jest.genMockFn(),
        repeatAccountValid: true,
        repeatOption: [],
    }
    it('should return RepeatPayment page jsx', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            reference: 'reference',
            stopitwhenText: 'Nooftimes',
            isRepeat: true,
            when: 'Today',
            dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        //instance.setState({ reference: 'reference' });


    });
    it('should return RepeatPayment page jsx with when date', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            reference: 'reference',
            stopitwhenText: 'Nooftimes',
            isRepeat: false,
            when: '10-10-2016',
            dtStart: '2016-12-01'
        });
        let instance = TestUtils.renderIntoDocument(<RepeatPayment {...props}/>);
        //instance.setState({ reference: 'reference' });


    });
});
