jest.unmock('../BudgetTableRowTemplate');
jest.unmock('../ProgressOnTable');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { PropTypes } = React;

const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Popover = require('react-bootstrap/lib/Popover');
const BudgetTableRowTemplate = require('../BudgetTableRowTemplate');
const ProgressOnTable = require('../ProgressOnTable');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetTableRowTemplate
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('BudgetTableRowTemplate Test Cases 1', () => {

    it('check ToBedefined', () => {
        let props = {
            content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
                key: 'id',
                name: 'name',
                current_month: 10,
                target_amount: 10,
                archived: true,
                message: 'status',
                difference: 'difference',
                joint: true,
                category_budgets: true,
                tag_budget: false,

            },
            metadata: {
                columnName: 'name',
            },
            customClick: jest.fn(),
        }         
        let component = shallowRender(props);
        expect(component).toBeDefined();
    })

});
describe('BudgetTableRowTemplate Test Cases 2', () => {
        //   this.props.customClick(this.props.rowData.name, this.props.rowData);
        it('check ToBedefined', () => {
            let currentMonthValue = -1
            let props = {
                    content:{
                        spendingJointTooltipMessage:''
                    },
                    rowData: {
                    key: 'id',
                    name: 'name',
                    current_month: 0,
                    target_amount: 10,
                    archived: true,
                    message: 'status',
                    difference: 'difference',
                    joint: true,
                    category_budgets: true,
                    tag_budget: false,
                },
                metadata: {
                    columnName: 'name',
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
           instance._onClick();
           expect(instance.props.rowData.name).toBe('name');
           expect(currentMonthValue).toBe(-1);
 
    });
});
                describe('BudgetTableRowTemplate Test Cases 3', () => {
                    
                        it('check target_amount', () => {
                            let props = {
                                content:{
                                    spendingJointTooltipMessage:''
                                },                            
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: -1.00,
                                    target_amount: 0,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'name',
                                }
                    }
                            
                                let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>);                                     
                                expect(instance.props.rowData.target_amount).toBe(0);                                       
                  });
                });
         describe('BudgetTableRowTemplate Test Cases 3', () => {
                    
                        it('check target_amount', () => {
                            let props = {    
                                content:{
                                    spendingJointTooltipMessage:''
                                },                        
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: -1.00,
                                    target_amount: -1.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                
                                },
                                metadata: {
                                    columnName: 'name',
                                }
                    }
                            
                                let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>);                                     
                                expect(instance.props.rowData.target_amount).toBe(-1.00);                                       
                  });
                });        
    describe('BudgetTableRowTemplate Test Cases 3', () => {
                    
                        it('check columnName else if', () => {
                            let props = {     
                                content:{
                                    spendingJointTooltipMessage:''
                                },                       
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'current_month',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.metadata.columnName).toBe('current_month');
                                       
                  });
                });  
                describe('BudgetTableRowTemplate Test Cases 3', () => {
                    
                        it('check columnName else if', () => {
                            let props = { 
                                content:{
                                    spendingJointTooltipMessage:''
                                },                          
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: '',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.metadata.columnName).toBe('');
                                       
                  });
                });  
                 describe('BudgetTableRowTemplate Test Cases 4', () => {
                    
                        it('check columnName  if', () => {
                            let props = {   
                                content:{
                                    spendingJointTooltipMessage:''
                                },                         
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: false,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'progress',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.metadata.columnName).toBe('progress');
                         expect(instance.props.rowData.archived).toBe(false);
                }); 
                   });   
                  describe('BudgetTableRowTemplate Test Cases 5', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                content:{
                                    spendingJointTooltipMessage:''
                                },                            
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'target_amount',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.metadata.columnName).toBe('target_amount');
                                       
                  });
                });
                 describe('BudgetTableRowTemplate Test Cases 6', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                content:{
                                    spendingJointTooltipMessage:''
                                },                            
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'message',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.metadata.columnName).toBe('message');
                                       
                  });
                });    
                describe('BudgetTableRowTemplate Test Cases 7', () => {
                    
                        it('check columnName  if', () => {
                            let props = {  
                                content:{
                                    spendingJointTooltipMessage:''
                                },                          
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: false,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'name',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.rowData.archived).toBe(false);
                                       
                  });
                });   
                 describe('BudgetTableRowTemplate Test Cases 8', () => {
                    
                        it('check columnName  if', () => {
                            let props = {  
                                content:{
                                    spendingJointTooltipMessage:''
                                },                          
                                rowData: {                
                                    key: 'untagged_key',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'name',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.rowData.name).toBe('name');
                                       
                  });
                });                                                                       
          describe('BudgetTableRowTemplate Test Cases 9', () => {
                    
                        it('check archived  if', () => {
                            let props = {   
                                content:{
                                    spendingJointTooltipMessage:''
                                },                         
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: true,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: true,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'progress',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.rowData.archived).toBe(true);
                         expect(instance.props.rowData.joint).toBe(true);
                                       
                  });
                  it('check archived  Else', () => {
                            let props = {   
                                content:{
                                    spendingJointTooltipMessage:''
                                },                         
                                rowData: {                
                                    key: 'id',
                                    name: 'name',
                                    current_month: 0,
                                    target_amount: 0.00,
                                    archived: false,
                                    message: 'status',
                                    difference: 'difference',
                                    joint: false,
                                    category_budgets: true,
                                    tag_budget: false,
                                },
                                metadata: {
                                    columnName: 'progress',
                                }
                              }
                        let instance = TestUtils.renderIntoDocument(<BudgetTableRowTemplate  {...props}/>); 
                         expect(instance.props.rowData.archived).toBe(false);
                         expect(instance.props.rowData.joint).toBe(false);
                                       
                  });
                });                     