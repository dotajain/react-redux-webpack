jest.unmock('../SpendingsEarnings');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsEarnings = require('../SpendingsEarnings');
const Modal = require('react-bootstrap/lib/Modal');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
const SpendingsUtils = require('../../../utils/SpendingsUtils');
const NumberUtils = require('../../../utils/NumberUtils');
const _ = require('lodash');
let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<SpendingsEarnings
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('SpendingsEarnings Test Cases', () => {
 beforeEach(()=>{
   props={
          earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : 123,
                  'currency' : 'GBP',
              },
          },
        },
        content:{
          spendingCancelButtonText:'Cancel',
          spendingSaveButtonText:'Save'
      },
    }
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<SpendingsEarnings {...props}/>);
 });

 it('SpendingsEarnings : Unit Test Case 1 : toBedefined',()=>{
     props={
          earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : 123,
                  'currency' : 'GBP',
              },
          },
        },
        content:{
          spendingCancelButtonText:'Cancel',
          spendingSaveButtonText:'Save'
      },
    }
    component = shallowRender(props);
  expect(props.earnings.period.net_income.value).toBeDefined(123);
 });

 it('SpendingsEarnings : Unit Test Case 2 : Earnings Empty',()=>{
     props = {
            content:{
          spendingCancelButtonText:'Cancel',
          spendingSaveButtonText:'Save'
      },
      earnings:{
                 'period' : {
                    'scope' : 'monthly',
                    'net_income' : {
                        'value' : '',
                        'currency' : 'GBP',
                    },
          },
      }
      
  }
    instance.setState({
        earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : '',
                  'currency' : 'GBP',
              },
          },
        },
      });
component = shallowRender(props);
  expect(instance.state.earnings.period.net_income.value).toBe('');
 });


  it('SpendingsEarnings : Unit Test Case 3 : _handleCancel',()=>{
   instance._handleCancel();
   expect(instance._handleCancel).toBeTruthy();
 });

 it('SpendingsEarnings : Unit Test Case 4 : _handleNext IF',()=>{

  instance._handleNext();
  expect(SpendingsActionCreator.requestEditBudgetPage.mock.calls.length).toBe(1);
 });

 it('SpendingsEarnings : Unit Test Case 5 : _handleNext ELSE',()=>{
      instance.setState({
        earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : '£',
                  'currency' : 'GBP',
              },
          },
        },
      });
  instance._handleNext();
  expect(SpendingsActionCreator.requestEditBudgetPage.mock.calls.length).toBe(2);
 });
 
 it('SpendingsEarnings : Unit Test Case 6 : _earningsOnChange',()=>{
    let e={
        target:{
            value:'123',
        }
    }
  SpendingsUtils.numberValidation.mockReturnValue(true);
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£123');
 });


it('SpendingsEarnings : Unit Test Case 7 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'0',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£0');
  
 });

 it('SpendingsEarnings : Unit Test Case 8 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'.',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£.');
  
 });

  it('SpendingsEarnings : Unit Test Case 9 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'0.0',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£0.0');
  
 });

   it('SpendingsEarnings : Unit Test Case 10 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'0.00',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£0.00');
  
 });
   it('SpendingsEarnings : Unit Test Case 11 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'0000',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£0');
  
 });
   it('SpendingsEarnings : Unit Test Case 12 : _earningsOnChange',()=>{
     let e={
        target:{
            value:'',
        }
    }
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe('£');
  
 });
  it('SpendingsEarnings : Unit Test Case 13 : _earningsOnChange',()=>{
    let e={
        target:{
            value:'£123',
        }
    }
  SpendingsUtils.numberValidation.mockReturnValue(false);
  instance._earningsOnChange(e);
  expect(instance.state.earnings.period.net_income.value).toBe(123);
 });

});
describe('SpendingsEarnings Test Cases', () => {
 beforeEach(()=>{
   props={
          earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : 123,
                  'currency' : 'GBP',
              },
          },
        },
        content:{
          spendingCancelButtonText:'Cancel',
          spendingSaveButtonText:'Save'
      },
    }
 });
 
it('SpendingsEarnings : Unit Test Case 15 : _earningsOnBlur',()=>{
  instance = TestUtils.renderIntoDocument(<SpendingsEarnings {...props}/>);
  instance.setState({
        earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : 123,
                  'currency' : 'GBP',
              },
          },
        },
      });  
  NumberUtils.appendCurrency.mockReturnValue(123);
  
  instance._earningsOnBlur();
  expect(_.isNumber(instance.state.earnings.period.net_income.value)).toBe(true);
});
it('SpendingsEarnings : Unit Test Case 16 : _earningsOnBlur',()=>{
  instance = TestUtils.renderIntoDocument(<SpendingsEarnings {...props}/>);
  instance.setState({
        earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : '£123',
                  'currency' : 'GBP',
              },
          },
        },
      });  
  NumberUtils.appendCurrency.mockReturnValue('£123');
  
  instance._earningsOnBlur();
  expect(_.isNumber(instance.state.earnings.period.net_income.value)).toBe(false);
});
it('SpendingsEarnings : Unit Test Case 17 : _earningsOnBlur',()=>{
  instance = TestUtils.renderIntoDocument(<SpendingsEarnings {...props}/>);
  instance.setState({
        earnings: {
          'period' : {
              'scope' : 'monthly',
              'net_income' : {
                  'value' : '£',
                  'currency' : 'GBP',
              },
          },
        },
      });  
  NumberUtils.appendCurrency.mockReturnValue('£123');
  
  instance._earningsOnBlur();
  expect(_.isNumber(instance.state.earnings.period.net_income.value)).toBe(false);
});

it('SpendingsEarnings : Unit Test Case 18 : _onPaste',()=>{
  instance = TestUtils.renderIntoDocument(<SpendingsEarnings {...props}/>);
    const event = {
      preventDefault : jest.genMockFunction(),
    }
    instance._onPaste(event);
    expect(instance._onPaste).toBeTruthy();
  });

});