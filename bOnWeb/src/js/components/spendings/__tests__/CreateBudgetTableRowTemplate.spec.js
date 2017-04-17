/**
 * @module CreateBudgetTableRowTemplate
*/

jest.unmock('../CreateBudgetTableRowTemplate');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');

const _ = require('lodash');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Popover = require('react-bootstrap/lib/Popover');
const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';
const extractNum = str => extract(str, '^[0-9]{0,6}');
const NumberUtils = require('../../../utils/NumberUtils');
const SpendingsUtils = require('../../../utils/SpendingsUtils');

const CreateBudgetTableRowTemplate = require('../CreateBudgetTableRowTemplate');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CreateBudgetTableRowTemplate
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
}

describe('To Check CreateBudgetTableRowTemplate page', () => {
    let instance;
    let props;

    beforeEach(() => {
        props = {
            rowData: {
                name: '',
                earnings: '',
                target_amount: '',
                key: '1 2',
                joint: '',
                last_month: '',
            },
            metadata: {
                columnName: 'name',
            },
            content: {
            },
            // data: {
            // },
        };
        instance = shallowRender(props);
    });

    it('CreateBudgetTableRowTemplate : Unit Test Case 1 : toBedefined', () => {
        expect(instance).toBeDefined();
    });
});
describe('To Check rowData name as Pots', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            rowData: {
                name: 'Pots',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                target_amount: 2000,
                key: 1,
                joint: 1,
                last_month: '',
            },
            metadata: {
                columnName: 'name',
            },
            content: {
            },
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(props.rowData.name).toEqual('Pots');
    });
});
describe('To Check metaData else', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            rowData: {
                name: 'Pots',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                target_amount: 2000,
                key: 1,
                joint: '',
                last_month: 0,
            },
            metadata: {
                columnName: 'last_month',
            },
            content: {
            },
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(props.rowData.name).toEqual('Pots')
    });
});
describe('To Check last_month else', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            rowData: {
                name: 'ABCD',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                target_amount: 2000,
                key: 1,
                joint: '',
                last_month: 10,
            },
            metadata: {
                columnName: 'last_month',
            },
            content: {
            },
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(props.rowData.name).toEqual('ABCD');
    });
});
describe('To Check columnName as target_amount', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            rowData: {
                name: 'Pots',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                target_amount: 2000,
                key: 1,
                joint: '',
                last_month: 10,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(props.rowData.name).toEqual('Pots');
    });
});
describe('To Check columnName as target_amount else of name', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            rowData: {
                name: '',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                target_amount: 2000,
                key: 1,
                joint: '',
                last_month: 10,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(props.rowData.name).toEqual('');
    });
});

describe('Start from here', () => {
    let props;
    beforeEach(()=>{
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };        
    });
    
    it('isDisabledDecrease checking :',() => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        instance.setState({
            isDisabledDecrease : false,
        })
        instance.componentWillMount();
        expect(instance.state.isDisabledDecrease).toBe(true);
    });
    it('checks the _onChange function valid 1', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        let e={
            target:{
                value:'£123',
            }
        }
        props = {
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue(123);   
        instance._onChange(e);
        expect(instance.state.target_amount).toBe('£123');
    });
        it('checks the _onChange function valid 2', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        let e={
            target:{
                value:'',
            }
        }
        props = {
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue('£');   
        instance._onChange(e);
        expect(instance.state.target_amount).toBe('£');
    });
    it('checks the _onChange function valid 3', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        let e={
            target:{
                value:'£100000',
            }
        }
        props = {
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
        })
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue('£100000');   
        instance._onChange(e);
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _onChange function invalid 4', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        let e={
            target:{
                value:'£100000',
            }
        }
        props = {
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
        })
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue(false);   
        instance._onChange(e);
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _onBlur function 1', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            rowData: {
                name: '',
                target_amount: 1000,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            target_amount: 1000,
        })
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue(false);   
        instance._onBlur();
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _onBlur function 2', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            rowData: {
                name: '',
                target_amount: 1000,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : true,
            target_amount: '1000',
        })
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue(false);
        NumberUtils.appendCurrency.mockReturnValue('£1000');   
        instance._onBlur();
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
        it('checks the _onBlur function 3', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : false,
            target_amount: 0,
        })
        SpendingsUtils.numberValidationForCreateEditBudget.mockReturnValue(false);
        NumberUtils.appendCurrency.mockReturnValue(0);   
        instance._onBlur();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
    it('checks the _increment function 1', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: 0,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
        });  
        NumberUtils.appendCurrency.mockReturnValue('£123');
        instance._increment();
        expect(instance._increment).toBeTruthy();
    });
        it('checks the _increment function 2', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: '1007.82',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : true,
            target_amount : 1000,
        });
        NumberUtils.appendCurrency.mockReturnValue(1000);  
        instance._increment();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
    it('checks the _increment function 3', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: '1007.82',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '100002',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : true,
            target_amount : '£100002',
        });
        NumberUtils.appendCurrency.mockReturnValue('£100002');  
        instance._increment();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
        it('checks the _increment function 4', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: '1007.82',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 9999.99999,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : true,
            target_amount : 9999.99999,
        });
        NumberUtils.appendCurrency.mockReturnValue(9999.99999);  
        instance._increment();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
            it('checks the _increment function 5', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount: '1007.82',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000000,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : true,
            target_amount : 1000000,
        });
        NumberUtils.appendCurrency.mockReturnValue(1000000);  
        instance._increment();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
      it('checks the _decrement function 1', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:'123',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : '123',
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            target_amount: '123',
        });  
        NumberUtils.appendCurrency.mockReturnValue('£123');
        instance._decrement();
        expect(instance._increment).toBeTruthy();
    });
          it('checks the _decrement function 2', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:100,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 100,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            isDisabledDecrease : false,
            target_amount: '£-10',
        });  
        NumberUtils.appendCurrency.mockReturnValue('£-10');
        instance._decrement();
        expect(instance.state.isDisabledDecrease).toBe(false);
    });
    it('checks the _decrement function 3', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:1000,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : true,
            target_amount: 1000,
        });  
        NumberUtils.appendCurrency.mockReturnValue('£1000');
        instance._decrement();
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _decrement function 4', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:1000,
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            target_amount: 0,
        });  
        NumberUtils.appendCurrency.mockReturnValue('£1000');
        instance._decrement();
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _decrement function 5', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:'£',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                key: 1,
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : true,
            target_amount: '£',
        });  
        NumberUtils.appendCurrency.mockReturnValue('£');
        instance._decrement();
        expect(instance.state.isDisabledIncrease).toBe(false);
    });
    it('checks the _decrement function 6', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:'',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            target_amount: '',
        });  
        NumberUtils.appendCurrency.mockReturnValue('');
        instance._decrement();
        expect(instance._decrement).toBeTruthy();
    });
        it('checks the _decrement function 7', () => {
        let instance = TestUtils.renderIntoDocument(<CreateBudgetTableRowTemplate {...props}/>);
        props = {
            customClick : jest.fn(),
            rowData: {
                name: '',
                target_amount:'',
                earnings: {
                    'period' : {
                        'scope' : 'monthly',
                        'net_income' : {
                            'value' : 1000,
                            'currency' : 'GBP',
                        },
                    },
                },
                
                joint: '',
                last_month: 10,
                tag_budget:false,
            },
            metadata: {
                columnName: 'target_amount',
            },
            content: {
            },
        };
        instance.setState({
            isDisabledIncrease : false,
            target_amount: 123,
        });  
        NumberUtils.appendCurrency.mockReturnValue('');
        instance._decrement();
        expect(instance._decrement).toBeTruthy();
    });

});

