jest.unmock('../NoSpendDataError');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const NoSpendDataError = require('../NoSpendDataError');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<NoSpendDataError
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('NoSpendDataError Test Cases', () => {

	beforeEach(()=>{
		props = {
			content: {},
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<NoSpendDataError {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	/*it('Test Case : 2 : check _onClick',()=>{
			instance._onClick();
			expect(instance._onClick()).toBe();
	});*/
});