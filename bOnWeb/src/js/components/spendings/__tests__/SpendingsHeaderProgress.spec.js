jest.unmock('../SpendingsHeaderProgress');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsHeaderProgress = require('../SpendingsHeaderProgress');
const Modal = require('react-bootstrap/lib/Modal');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<SpendingsHeaderProgress
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('SpendingsHeaderProgress Test Cases', () => {
 beforeEach(()=>{
  props = {
      isNoBudget:false,
      rightValue:100,
      leftValue:20,
      content:{
          spendingHeaderNoBudgetMessage:'HI',
          spendingHeaderNoBudgetTitle:'Hello'
      },
  }
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgress {...props}/>);
 });

 it('SpendingsHeaderProgress : Unit Test Case 1 : toBedefined',()=>{
  expect(component).toBeDefined();
 });
it('SpendingsHeaderProgress : Unit Test Case 2 : isNoBudgetTrue',()=>{
     props = {
      isNoBudget:true,
      rightValue:100,
      leftValue:20,
      content:{
          spendingHeaderNoBudgetMessage:'HI',
          spendingHeaderNoBudgetTitle:'Hello'
      },
  }
  instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgress {...props}/>);
  expect(instance.props.isNoBudget).toBe(true);
 });
 it('SpendingsHeaderProgress : Unit Test Case 3 : leftValue rightValue equals to zero',()=>{
     props = {
      isNoBudget:true,
      rightValue:0,
      leftValue:0,
      content:{
          spendingHeaderNoBudgetMessage:'HI',
          spendingHeaderNoBudgetTitle:'Hello'
      },
  }
  instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgress {...props}/>);
  expect(instance.props.leftValue).toBe(0);
 });



});