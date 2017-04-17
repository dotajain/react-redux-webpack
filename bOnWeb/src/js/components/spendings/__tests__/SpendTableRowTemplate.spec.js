jest.unmock('../SpendTableRowTemplate');

const React = require('react');
const { PropTypes } = React;
const TestUtils = require('react-addons-test-utils');
const SpendTableRowTemplate = require('../SpendTableRowTemplate');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Popover = require('react-bootstrap/lib/Popover');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SpendTableRowTemplate
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('SpendTableRowTemplate Test Cases 1', () => {

    it('check ToBedefined', () => {
        let props = {
            content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
                key: 'id',
                name: 'name',
                 last_month:0.00,
                current_month: 10.00,
                target_amount: 10.00,
                archived: true,
                message: 'status',
                difference: 'difference',
                joint: true,
                category_budgets: true,
                tag_budget: false 

            },
            metadata: {
              columnName:'Name'    
            
            },
            customClick: jest.fn(),
        }         
        let component = shallowRender(props);
        expect(component).toBeDefined();
    })

});
describe('SpendTableRowTemplate Test Cases 2', () => {       
        it('check columnName', () => {
            let currentMonthValue = -1
            let props = {
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
                    key: 'id',
                    name: 'name',
                    last_month:0.00,
                    current_month: 0.00,
                    target_amount: 10.00,
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
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>); 
           instance._onClick();
           expect(instance.props.rowData.name).toBe('name'); 
    });
});
    
 describe('SpendTableRowTemplate Test Cases 3', () => {       
        it('check target_amount', () => {
            let currentMonthValue = -1
            let props = {
            
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
 
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: 0.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.rowData.target_amount).toBe(0);    
    });
});    
describe('SpendTableRowTemplate Test Cases 4', () => {       
        it('check ToBedefined', () => {
            let currentMonthValue = -1.00
            let props = {
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.rowData.current_month).toBe(-1.00);    
    });
});      
describe('SpendTableRowTemplate Test Cases 5', () => {
        it('check columnName is current_month ', () => {
           
            let props = {
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.metadata.columnName).toBe('current_month');    
    });
}); 
describe('SpendTableRowTemplate Test Cases 6', () => {
        it('check columnName isprogress ', () => {
           
            let props = {
                content:{
                    spendingJointTooltipMessage:''
                },
                rowData: {
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.metadata.columnName).toBe('progress');    
    });

    it('check rowData.archived Else ', () => {
           
            let props = {
                content:{
                    spendingJointTooltipMessage:''
                },
                rowData: {
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.rowData.archived).toBe(false);    
    });
});   
describe('SpendTableRowTemplate Test Cases 7', () => {
        it('check columnName is message ', () => {
           
            let props = {
            
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
 
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
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
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.metadata.columnName).toBe('message');    
    });
});  
describe('SpendTableRowTemplate Test Cases 8', () => {
        it('check columnName is last_month ', () => {
           
            let props = {
            
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
 
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
                    target_amount: 0.00,
                    archived: true,
                    message: 'status',
                    difference: 'difference',
                    joint: true,
                    category_budgets: true,
                    tag_budget: false,
 
                },
                metadata: {
                    columnName: 'last_month',
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.metadata.columnName).toBe('last_month');    
    });
});  
describe('SpendTableRowTemplate Test Cases 9', () => {
        it('check columnName is message ', () => {
           
            let props = {
            
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
 
                    key: 'id',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
                    target_amount: 0.00,
                    archived: false,
                    message: 'status',
                    difference: 'difference',
                    joint: true,
                    category_budgets: true,
                    tag_budget: false,
 
                },
                metadata: {
                    columnName: 'last_month',
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.rowData.archived).toBe(false);    
    });

    it('check key is untagged_key ', () => {
           
            let props = {
            
                content:{
                spendingJointTooltipMessage:''
            },
            rowData: {
 
                    key: 'untagged_key',
                    name: 'name',
                    last_month:-1.00,
                    current_month: -1.00,
                    target_amount: 0.00,
                    archived: false,
                    message: 'status',
                    difference: 'difference',
                    joint: true,
                    category_budgets: true,
                    tag_budget: false,
 
                },
                metadata: {
                    columnName: 'last_month',
                },
                customClick: jest.fn(),
            }
             
           let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>);                                     
            expect(instance.props.rowData.key).toBe('untagged_key');    
    });
});  
               
describe('SpendTableRowTemplate Test Cases 10', () => {
                    
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
                        let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>); 
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
                        let instance = TestUtils.renderIntoDocument(<SpendTableRowTemplate  {...props}/>); 
                         expect(instance.props.rowData.archived).toBe(false);
                         expect(instance.props.rowData.joint).toBe(false);
                                       
                  });
});    
                                                                         
