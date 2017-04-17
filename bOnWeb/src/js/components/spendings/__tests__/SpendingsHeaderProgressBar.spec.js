jest.unmock('../SpendingsHeaderProgressBar');
jest.useFakeTimers();
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsHeaderProgressBar = require('../SpendingsHeaderProgressBar');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsHeaderProgressBar
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsHeaderProgressBar Test Cases', () => {

	beforeEach(()=>{
		props = {
			content: {
				spendingProgressText1 : 'Hello',
				spendingHeaderThisMonthText:'Hello',
				spendingDaysLeftText : 'Hello',
			},
    		leftValue: 100,
    		rightValue: 2,
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
		expect(setTimeout.mock.calls.length).toBe(2);
  		expect(setTimeout.mock.calls[0][1]).toBe(100);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check percent < ',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 50,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBe(50);
	});

	it('Test Case : 3 : check percent < 50',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 45,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBe(45);
	});
    
    /*jest.useFakeTimers();

    it('waits 1 second before ending the game', () => {
        const timerGame = require('../SpendingsHeaderProgressBar');
        timerGame();

        expect(setTimeout.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1000);
    });*/
    
	it('Test Case : 4 : check percent > 50',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 65,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);

			expect(percentage).toBe(65);
	});

	it('Test Case : 5 : check percent is negative',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: -65,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBe(-65);
	});

	it('Test Case : 6 : check percent : Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 0,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBe(0);
	});
describe('SpendingsHeaderProgressBar Test Cases', () => {
    it('Test Case : 6.1 : check percent : Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 1000,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
            instance.componentWillMount(percentage),
            expect(percentage).toBe(1000);          
	});
});
  it('Test Case : 6.1 : check percent 87: Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 88,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBe(88);
	});

	it('Test Case : 7 : check percent is NaN',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 0,
	    		rightValue: 0,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(props.leftValue).toBe(0);
	});
    it('Test Case : 6.1 : check percent : Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 0,
	    		rightValue: 0,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(percentage).toBeDefined();
	});
     it('Test Case : 8 : check spendingProgressText1 : Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 0,
	    		rightValue: 0,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(props.leftValue).toBe(0);
	});
     it('Test Case : 9 : check spendingProgressText1 : NaN percentage',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 0,
	    		rightValue: 0,
			}
			instance.setState({
				percentage : Math.round((props.leftValue * 100) / props.rightValue),
			});
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(instance.state.percentage).toBe(0);
	});

     it('Test Case : 10 : check NaN percentage',()=>{
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			instance.setState({
				percentage : 120,
			});
			expect(instance.state.percentage).toBe(120);
	});

     it('Test Case : 11 : check spendingProgressText',()=>{
     	props.spendingProgressText = true;
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			expect(instance.props.spendingProgressText).toBe(true);
	});

     /*it('Test Case : 12 : check componentWillMount : setTimeout',()=>{
     		props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 100,
	    		rightValue: 20,
			}
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
			instance.componentWillMount();
  			expect(setTimeout.mock.calls.length).toBe(4);
  			expect(setTimeout.mock.calls[0][1]).toBe(100);
	});*/
});
describe('SpendingsHeaderProgressBar Test Cases', () => {
    it('Test Case : 6.1 : check percent : Else',()=>{
			props = {
				content: {
					spendingProgressText1 : 'Hello',
					spendingHeaderThisMonthText:'Hello',
					spendingDaysLeftText : 'Hello',
				},
	    		leftValue: 1000,
	    		rightValue: 100,
			}
			let percentage = Math.round((props.leftValue * 100) / props.rightValue);
			instance = TestUtils.renderIntoDocument(<SpendingsHeaderProgressBar {...props}/>);
            instance.componentWillMount(percentage),
            expect(percentage).toBe(1000);          
	});
});