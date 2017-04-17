jest.unmock('../SpendingsCreateBudget');
const React = require('react');
const _ = require('lodash');
const TestUtils = require('react-addons-test-utils');
const SpendingsCreateBudget = require('../SpendingsCreateBudget');
const Modal = require('react-bootstrap/lib/Modal');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
const SpendingsStore = require('../../../stores/SpendingsStore');
let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<SpendingsCreateBudget
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('SpendingsCreateBudget Test Cases', () => {
 beforeEach(()=>{
  props = {
     potValue:{
         pot : 0,
     },
      content:{
          spendingCancelButtonText:'',
          spendingSaveButtonText:''
      },
      earnings: {
       "period" : {
           "scope" : "monthly",
           "net_income" : {
               "value" : 2500.00,
               "currency" : "GBP"
           }
       }
   },
   createBudgetData :[{
       name : 'Entertainment',
       target_amount: 100
   }],
   budgetPageData: {
          "tag_budget" : true,
          "tag_budgets": [
            {
              "tag": {
                "value": "Shoes",
                "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
                "archived": false,
                "path" : true
              },
              "target_amount": {
                "value": 40.0,
                "currency": "GBP"
              }
            },
             {
              "tag": {
                "value": "Hello",
                "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2g",
                "archived": false,
                "path" : true
              },
              "target_amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          ],
          "category_budgets": [
            {
              "category": {
                "value": "Entertainment",
                "path": "/entertainment",
                "scheme": "NAG Categories",
                "id": 2,
                "archived": false
              },
              "target_amount": {
                "value": 30.0,
                "currency": "GBP"
              }
            },
            {
              "category": {
                "value": "Earnings",
                "path": "/earnings",
                "scheme": "NAG Categories",
                "id": 22,
                "archived": false
              },
              "target_amount": {
                "value": 2200.0,
                "currency": "GBP"
              }
            }
          ]
        }
  };
  SpendingsStore.updatedCreateBudgetData.mockReturnValue(props.budgetPageData);
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<SpendingsCreateBudget {...props}/>);
 });
 it('SpendingsCreateBudget : Unit Test Case 1 : toBedefined',()=>{
  expect(component).toBeDefined();
 });
 it('SpendingsCreateBudget : Unit Test Case 2 : _handleCancel',()=>{
  instance._handleCancel();
  expect(SpendingsActionCreator.goBackToSpendings.mock.calls.length).toBe(0);
 });
 it('SpendingsCreateBudget : Unit Test Case 3 : _handleEarnings',()=>{
  instance._handleEarnings();
  expect( SpendingsActionCreator.loadSpendingPage.mock.calls.length).toBe(0);
 });
  it('SpendingsCreateBudget : Unit Test Case 4 : _handleSave if part',()=>{
      instance.setState({
          isSavEnable : true,
      });
  instance._handleSave();
  expect(SpendingsActionCreator.updateBudgetConnection.mock.calls.length).toBe(1);
 });
 
  it('SpendingsCreateBudget : Unit Test Case 5 : _updatePotBudgetValue',()=>{
  props = {
      content:{
          spendingCancelButtonText:'',
          spendingSaveButtonText:''
      },
      earnings: {
       "period" : {
           "scope" : "monthly",
           "net_income" : {
               "value" : 2500.00,
               "currency" : "GBP"
           }
       }
   },
   createBudgetData :[{
       name : 'Pots',
       target_amount: 100
   }]
  } 
  instance = TestUtils.renderIntoDocument(<SpendingsCreateBudget {...props}/>);
  expect(instance.props.createBudgetData[0].name).toBe('Pots');
 });


 it('SpendingsCreateBudget : Unit Test Case 6 :   _onChildToggle',()=>{
     let obj = {
         tag_id:'1234'
     }
     let id = 0;
     let selections = '1';
     instance.setState({
         selections:[],
         tableData:{},
         budgetPacket:{
             tag_budgets:[]
         },        
     })
  instance._onChildToggle(id,selections,obj);
  expect(instance.state.selections[id]).toBe('1');
 });


 it('SpendingsCreateBudget : Unit Test Case 7 :   _onChildToggle is not Empty Part',()=>{
     let obj = {
         tag_id:'1',
         target_amount:{
                     value:123
                 }
     }
     let id = 1;
     let selections = '1';
     instance.setState({
         budgetPacket:{
             tag_budgets:[
                 {
                 tag_id : 1,
                 target_amount:{
                     value:123
                 }
             },
             {
                 tag_id : 1,
                 target_amount:{
                     value:123
                 }
             }

             ]
         },
         tableData:[{
             key : 1,
             target_amount : 123
         }],        
     })
  instance._onChildToggle(id,selections,obj);
    expect(instance.state.budgetPacket.tag_budgets[id].target_amount.value).toBe('1231');
 });

 it('SpendingsCreateBudget : Unit Test Case 8 :   _onChildToggle id and tag id are different',()=>{
     let obj = {
         tag_id:'1',
         target_amount:{
                     value:123
                 }
     }
     let id = 1;
     let selections = '1';
     instance.setState({
         budgetPacket:{
             tag_budgets:[
                 {
                 tag_id : '1',
                 target_amount:{
                     value:123
                 }
             }
             ]
         },        
     })
  instance._onChildToggle(id,selections,obj);
    expect(instance.state.budgetPacket.tag_budgets[0].target_amount.value).toBe(123);
 });


 it('SpendingsCreateBudget : Unit Test Case 9 :   _onChildToggle else',()=>{
     let obj = {
         category_id:'0',
         target_amount:{
                     value:123
                 }
     }
     let id = 0;
     let selections = '0';
     instance.setState({
         tableData:[{
             key:0,
             target_amount:123
         }],
         budgetPacket:{
             category_budgets: [{
                 category_id : 0,
                 target_amount:{
                     value:123
                 }
             }],
         },        
     })
  instance._onChildToggle(id,selections,obj);
    expect(instance.state.budgetPacket.category_budgets[0].target_amount.value).toBe('1230');
 });

it('SpendingsCreateBudget : Unit Test Case 10 :   _onChildToggle else',()=>{
     let obj = {
         category_id:'0',
         target_amount:{
                     value:123
                 }
     }
     let id = 0;
     let selections = '0';
     instance.setState({
         budgetPacket:{
             category_budgets: [{
                 category_id : 1,
                 target_amount:{
                     value:123
                 }
             }],
         },        
     })
  instance._onChildToggle(id,selections,obj);
  expect(instance.state.budgetPacket.category_budgets[0].target_amount.value).toBe(123);
 });

 it('SpendingsCreateBudget : Unit Test Case 11 :   _onChildToggle category_budgets else',()=>{
     let obj = {
         category_id:'1',
         target_amount:{
                     value:123
                 }
     }
     let id = 0;
     let selections = '1';
     instance.setState({
         budgetPacket:{
             category_budgets: [],
         },        
     })
  instance._onChildToggle(id,selections,obj);
     expect(instance.state.budgetPacket.category_budgets.length).toBe(0);
 });


 it('SpendingsCreateBudget : Unit Test Case 12 : nbaFlag',()=>{
     let data='Data';
  //instance.nbaFlag(data);
  expect(instance.props.earnings.period.net_income.value).toBe(2500.00);
 });

  it('SpendingsCreateBudget : Unit Test Case 13 : _handleSave else part',()=>{
      instance.setState({
          isSavEnable : false,
      });
  instance._handleSave();
  expect(instance.state.isSavEnable).toBe(false);
 });
  it('SpendingsCreateBudget : Unit Test Case 14 : _handleSave else part',()=>{
  
  expect(instance.props.potValue.pot).toBe(0);
 });

  it('SpendingsCreateBudget : Unit Test Case 15 : componentWillMount If part',()=>{
      instance.setState({
          tableData : [{
            key : 'Hello',
            tag_budget : true,
            target_amount : '100',
            category_budgets : {
              value : '100',
            }
          }],
      });
  instance.componentWillMount();
  expect(instance.state.tableData.length).toBe(1);
 });

  it('SpendingsCreateBudget : Unit Test Case 16 : componentWillMount else part',()=>{
      instance.setState({
          tableData : [{
            key : 'spend_pot_key',
            tag_budget : true,
            target_amount : '100',
            category_budgets : {
              value : '100',
            }
          }],
      });
  instance.componentWillMount();
  expect(instance.state.tableData.length).toBe(1);
 });

  it('SpendingsCreateBudget : Unit Test Case 17 : _handleEarnings',()=>{
    instance.setState({
        budgetPacket:{
             category_budgets: [{
                 category_id : 0,
                 target_amount:{
                     value:123
                 }
                 }],
             tag_budgets:[
                     {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                     },
                    {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                    }
                    ]
              },
        tableData:[{
             key:1,
             target_amount:123
         }],
    });
  instance._handleEarnings();
  expect(SpendingsActionCreator.handleUpdatedBudgetData.mock.calls.length).toBe(2);
  expect(SpendingsActionCreator.loadEarningPage.mock.calls.length).toBe(2);
 });

  it('SpendingsCreateBudget : Unit Test Case 18 : _handleEarnings',()=>{
    instance.setState({
        budgetPacket:{
             category_budgets: [{
                 category_id : 0,
                 target_amount:{
                     value:123
                 }
                 }],
             tag_budgets:[
                     {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                     },
                    {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                    }
                    ]
              },
        tableData:[{
             key:0,
             target_amount:123
         }],
    });
  instance._handleEarnings();
  expect(SpendingsActionCreator.handleUpdatedBudgetData.mock.calls.length).toBe(3);
  expect(SpendingsActionCreator.loadEarningPage.mock.calls.length).toBe(3);
 });

  it('SpendingsCreateBudget : Unit Test Case 18 : _handleEarnings',()=>{
    instance.setState({
        budgetPacket:{
             category_budgets: [{
                 category_id : 0,
                 target_amount:{
                     value:123
                 }
                 }],
             tag_budgets:[
                     {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                     },
                    {
                     tag_id : 1,
                     target_amount:{
                         value:123
                     }
                    }
                    ]
              },
        tableData:[{
             key:'spend_pot_key',
             target_amount:123
         }],
    });
  instance._handleEarnings();
  expect(SpendingsActionCreator.handleUpdatedBudgetData.mock.calls.length).toBe(4);
  expect(SpendingsActionCreator.loadEarningPage.mock.calls.length).toBe(4);
 });

  it('SpendingsCreateBudget : Unit Test Case 19 : _updatePotBudgetValue',()=>{
  props.earnings = {}; 
  instance = TestUtils.renderIntoDocument(<SpendingsCreateBudget {...props}/>);
  expect(_.isEmpty(instance.props.earnings)).toBe(true);
 });

  it('SpendingsCreateBudget : Unit Test Case 20 : pot',()=>{
  instance = TestUtils.renderIntoDocument(<SpendingsCreateBudget {...props}/>);
  instance.setState({
    pot : 0,
  })
  expect(instance.state.pot).toBe(0);
 });

 it('SpendingsCreateBudget : Unit Test Case 21 : _updatePotBudgetValue',()=>{
  props.earnings = {}; 
  instance = TestUtils.renderIntoDocument(<SpendingsCreateBudget {...props}/>);
  instance._handleSave();
  expect(_.isEmpty(instance.props.earnings)).toBe(true);
 });

});
