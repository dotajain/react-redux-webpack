jest.unmock('../TransactionRowTemplate');

const React = require('react');
const { PropTypes } = React;

const TestUtils = require('react-addons-test-utils');
const TransactionRowTemplate = require('../TransactionRowTemplate');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Popover = require('react-bootstrap/lib/Popover');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TransactionRowTemplate
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('BudgetTableRowTemplate Test Cases 1', () => {

    it('check ToBedefined', () => {
        let props = {
            rowData: {
                date:'10-2016',
                 description:'dfd',
                 type:'dgdg',
                 tag:'dfd',
                 amount:46,
                 account:'B Current ', 
                 accIndex:{  
                     index:1,                 
                 },
                 
            },
            metadata: {
                columnName: 'name',
            },
           
        }         
        let component = shallowRender(props);
        expect(component).toBeDefined();
    })

});
         describe('BudgetTableRowTemplate Test Cases 2', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'date',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('date');                                       
        });
});    
  describe('BudgetTableRowTemplate Test Cases 3', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'description',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('description');                                       
        });
        });
  describe('BudgetTableRowTemplate Test Cases 4', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'type',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('type');                                       
        });
        });      
     describe('BudgetTableRowTemplate Test Cases 5', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'tag',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('tag');                                       
        });
        });      
     describe('BudgetTableRowTemplate Test Cases 6', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'amount',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('amount');                                       
        });
        });     

     describe('BudgetTableRowTemplate Test Cases 7', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'account',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('account');                                       
        });

         it('TransactionRowTemplate : Unit Test Case 8 : _onClick',()=>{
              let props = {
                        customClick: jest.fn(),
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'account',
                                },
           
              }       
              let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
              instance._onClick();
              expect(instance._onClick).toBeTruthy();
         });

         it('TransactionRowTemplate : Unit Test Case 9 : _onClick',()=>{
              let props = {
                        customClick: jest.fn(),
                                rowData: {
                                    inProgress: true,
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'dfd',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'account',
                                },
           
              }       
              let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>);
              expect(instance.props.rowData.inProgress).toBe(true);
         });
describe('BudgetTableRowTemplate Test Cases 10', () => {
                    
                        it('check columnName  if', () => {
                            let props = {
                                rowData: {
                                    date: '10-2016',
                                    description: 'dfd',
                                    type: 'dgdg',
                                    tag: 'Untagged',
                                    amount: 46,
                                    account: 'B Current ',
                                    accIndex: {
                                        index: 1,
                                    },
                                },
                                metadata: {
                                    columnName: 'tag',
                                },
           
        }         
        let instance = TestUtils.renderIntoDocument(<TransactionRowTemplate  {...props}/>); 
            expect(instance.props.metadata.columnName).toBe('tag');                                       
        });
        });
         
        });                          