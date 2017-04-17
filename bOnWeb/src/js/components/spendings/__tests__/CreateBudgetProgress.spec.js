jest.unmock('../CreateBudgetProgress');

const React = require('react');
const { PropTypes } = React;

const TestUtils = require('react-addons-test-utils');
const CreateBudgetProgress = require('../CreateBudgetProgress');
const NumberUtils = require('../../../utils/NumberUtils');

let component;
let props;
let percentage;
let potPercentage;

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CreateBudgetProgress
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('Test Cases 1 --> toBeDefined', () => {
    it('check ToBedefined', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            totalBudgetValue: 3000,
            potValue: 222,
            earning: 1111,
        }
        component = shallowRender(props);
        expect(component).toBeDefined();
    });
});

describe('Test Cases 2 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            earning: 3000,
            potValue: 2000,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(3000);

    });
});

describe('Test Cases 3 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            earning: 100,
            potValue: 50,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(100);

    });
});

describe('Test Cases 4 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            earning: 50,
            potValue: 100,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(50);

    });
});

describe('Test Cases 5 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            earning: 200,
            potValue: 10,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(200);

    });
});

describe('Test Cases 6 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            earning: 3000,
            potValue: 2800,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(3000);

    });
});


describe('Test Cases 7 --> percentage : If', () => {
    it('percentage : If', () => {
        props = {
            content: {
                "spendingProgressText3": 'my',
                "spendingProgressText1": 'try',
                "spendingProgressText2": 'Testcases',
            },
            totalBudgetValue: 2800,
            earning: 3000,
            potValue: 2800,
        }
        let instance = TestUtils.renderIntoDocument(<CreateBudgetProgress {...props}/>);
        expect(instance.props.earning).toBe(3000);

    });
});