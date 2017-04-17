jest.unmock('../SpendingsHeader');
const React = require('react');
const { PropTypes } = React;
const moment = require('moment');
// const _ = require('lodash');

const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');
const Button = require('react-bootstrap/lib/Button');

const TestUtils = require('react-addons-test-utils');
const SpendingsHeader = require('../SpendingsHeader');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');

let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<SpendingsHeader
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('SpendingsHeader Test Cases', () => {
 beforeEach(()=>{

  props = {
            
            content:{
          spendingCancelButtonText:'Cancel',
          spendingSaveButtonText:'Save'
      },
      
  }
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<SpendingsHeader {...props}/>);
 });

 it('SpendingsHeader : Unit Test Case 1 : toBedefined',()=>{
     props={
         
         lastMonth:9,
        content:{
          spendingHeaderButtonLabel:'Header',
          spendingSaveButtonText:'Save'
      },
    }
    component = shallowRender(props);
  expect(component).toBeDefined();
 });


it('SpendingsHeader : Unit Test Case 2 : isNoBudget false',()=>{
  instance.setState({
      lastMonth : '9'
  })
  instance.componentWillMount();
  expect(instance.state.buttonTitle).toBe('9');
 });

 it('SpendingsHeader : Unit Test Case 3 :ComponentWillMount isNoBudget true',()=>{
     props={
         isNoBudget:true,
         lastMonth:'9',
        content:{
          spendingHeaderButtonLabel:'Header',
          spendingSaveButtonText:'Save'
      },
    }
  instance = TestUtils.renderIntoDocument(<SpendingsHeader {...props}/>);
  instance.componentWillMount();
  expect(instance.state.buttonTitle).toBe(props.content.spendingHeaderButtonLabel);
 });


  it('SpendingsHeader : Unit Test Case 4 : _onButtonToggle',()=>{
      let eventKey = 2;
      let e={
          target :{
              innerHTML : 'Hello'
          }
      }
    instance._onButtonToggle(eventKey,e);
  expect(instance._loadSpendingAction).toBeTruthy();
 });

it('SpendingsHeader : Unit Test Case 5 : _smClose',()=>{
  instance._smClose();
  expect(SpendingsActionCreator.closeAccountModal.mock.calls.length).toBe(1);
 });



it('SpendingsHeader : Unit Test Case 6 : _smShow',()=>{
    instance.setState({
          showModal : true,
      });
  instance._smShow();
  expect(instance.state.showModal).toBe(true);
 });


 it('SpendingsHeader : Unit Test Case 7 : _hideCrateMessage',()=>{

    let e = {
        preventDefault : jest.genMockFunction(),
    };
    
  instance = TestUtils.renderIntoDocument(<SpendingsHeader {...props}/>);
  instance._hideCrateMessage(e);
  expect(instance.state.isCreateMessage).toBe('hide');
  
 });

 it('SpendingsHeader : Unit Test Case 8 : _handleCreateBudget',()=>{
  instance._handleCreateBudget();
  expect(instance._loadSpendingAction).toBeTruthy();
 });

 it('SpendingsHeader : Unit Test Case 9 : _handleEditBudget',()=>{
   
  instance._handleEditBudget();
  expect(instance._loadSpendingAction).toBeTruthy();
 });
 it('SpendingsHeader : Unit Test Case 1 : toBedefined',()=>{
     props={
         showAccountModal:true,
         lastMonth:9,
        content:{
          spendingHeaderButtonLabel:'Header',
          spendingSaveButtonText:'Save'
      },
    }
    component = shallowRender(props);
  expect(component).toBeDefined();
 });


});