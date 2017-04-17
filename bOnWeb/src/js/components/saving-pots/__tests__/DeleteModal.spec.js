jest.unmock('../DeleteModal');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const Button = require('react-bootstrap/lib/Button');
const Modal = require('react-bootstrap/lib/Modal');

const DeleteModal = require('../DeleteModal');
let component;
	let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<DeleteModal
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('DeleteModal Test Cases check', () => {

	beforeEach(() => {	
		props = {
			  show : false,
			  onHide : jest.genMockFunction(), 
			  onDelete : jest.genMockFunction(), 
			  message : "Pummy",
			  content:{
			  	savingPotDeleteTitle: 'hello',
			  }
		}
		component = shallowRender(props);
	});

	it('Unit Test Case 1 : DeleteModal : toBeDefined',()=>{
		expect(component).toBeDefined();
	});

});
