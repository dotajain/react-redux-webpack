jest.unmock('../CircularProgress');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const CircularProgress = require('../CircularProgress');
const NumberUtils = require('../../../utils/NumberUtils');

let component;
let props;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CircularProgress
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('CircularProgress Test Cases', () => {

	describe('Test Cases 1 --> toBeDefined', () => {
		it('check ToBedefined',()=>{
			props = {
				  potBalance : 2000,
				  potGoal : 3000,
				  }
			component = shallowRender(props);
			expect(component).toBeDefined();
		});
	});

	describe('Test Cases 2 --> _calculatePotPercentage : If', () => {
		it('Check percent',()=>{
			props = {
			  potBalance : 3000,
			  potGoal : 2000,
			  }
			let percent = 0;
    		let instance = TestUtils.renderIntoDocument(<CircularProgress {...props}/>);
			percent = instance._calculatePotPercentage();
			expect(percent).toBe(150);
		});
	});

	describe('Test Cases 3 --> _calculatePotPercentage : Else ', () => {
		it('Check percent',()=>{
			props = {
			  potBalance : 2000,
			  potGoal : 3000,
			  }
    		let percent = 0;
    		let instance = TestUtils.renderIntoDocument(<CircularProgress {...props}/>);
			percent = instance._calculatePotPercentage();
			expect(percent).toBe(66);
		});
	});	

	describe('Test Cases 4 --> _calculatePotPercentage : Else ', () => {
		it('Check percent',()=>{
			props = {
			  potBalance : -2000,
			  potGoal : 3000,
			  }
    		let percent = 0;
    		let instance = TestUtils.renderIntoDocument(<CircularProgress {...props}/>);
			percent = instance._calculatePotPercentage();
			expect(percent).toBe(0);
		});
	});	

});
