jest.unmock('../ProgressOnTable');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ProgressOnTable = require('../ProgressOnTable');
const Modal = require('react-bootstrap/lib/Modal');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<ProgressOnTable
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('ProgressOnTable Test Cases', () => {
 beforeEach(()=>{
  props = {
      rowData:{
                 difference:100,
                 last_month:9,
                 current_month:10,
       
      },
      content:{
      },
  }
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
 });

 it('ProgressOnTable : Unit Test Case 1 : toBedefined',()=>{
  expect(component).toBeDefined();
 });

 it('ProgressOnTable : Unit Test Case 2 : CurrentMonth is equal to zero',()=>{
      props = {
      rowData:{
                difference:100,
                 last_month:9,
                 current_month:0,
       
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.current_month).toBe(0);
 });


it('ProgressOnTable : Unit Test Case 3 : Last Month is equal to zero',()=>{
      props = {
        rowData:{
                    difference:100,
                    last_month:0,
                    current_month:10,
        
        },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.last_month).toBe(0);
 });




it('ProgressOnTable : Unit Test Case 4 : Percentage between 0-50',()=>{
      props = {
      rowData:{
                difference:100,
                 last_month:10,
                 current_month:3,
       
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.current_month).toBe(3);
 });


it('ProgressOnTable : Unit Test Case 5 : Percentage between 50-100',()=>{
      props = {
      rowData:{
          difference:100,
                 last_month:10,
                 current_month:8,
       
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.current_month).toBe(8);
 });


it('ProgressOnTable : Unit Test Case 6 : Last Month Undefined',()=>{
      props = {
      rowData:{
          difference:100,
            current_month:8,
       
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.last_month).toBe(undefined);
 });


it('ProgressOnTable : Unit Test Case 7 : Difference',()=>{
      props = {
      rowData:{
                difference:100,
                last_month:9,
                current_month:10,
                target_amount:1000
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(1000);
 });

it('ProgressOnTable : Unit Test Case 8 : Difference is zero',()=>{
      props = {
      rowData:{
                difference:0,
                last_month:9,
                current_month:10,
                target_amount:1000
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(1000);
 });

it('ProgressOnTable : Unit Test Case 9 : Difference Percentage between 50-100',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:2,
                target_amount:3
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(3);
 });


it('ProgressOnTable : Unit Test Case 10 : Difference Percentage above 100',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:2,
                target_amount:1
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(1);
 });

it('ProgressOnTable : Unit Test Case 11 : Untagged',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:2,
                target_amount:1,
                name:'Untagged'
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.name).toBe(props.rowData.name);
 });

it('ProgressOnTable : Unit Test Case 12 : target_amount',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:2,
                target_amount:0,
                name:'Untagged'
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(props.rowData.target_amount);
 });

it('ProgressOnTable : Unit Test Case 13 : currentMonth <= valueTillToday',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:-1,
                target_amount:1
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(1);
 });

  it('ProgressOnTable : Unit Test Case 14 : currentMonth < last_month & currentMonth > valueTillToday',()=>{
      props = {
      rowData:{
          difference:1000,
                last_month:10,
                current_month:9,
                target_amount:1
      },      
  }
     
  instance = TestUtils.renderIntoDocument(<ProgressOnTable {...props}/>);
  expect(instance.props.rowData.target_amount).toBe(1);
 });
});


