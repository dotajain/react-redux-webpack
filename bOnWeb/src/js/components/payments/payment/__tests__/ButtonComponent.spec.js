'use strict';

jest.unmock('../ButtonComponent');

const ButtonComponent = require('../ButtonComponent');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ButtonComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Button Component Test Cases', () => {
    	let props;  
it('should return button jsx', () => {	
    	let component = shallowRender(props);   
        expect(component).toEqualJSX(
         <button
   bsSize={undefined}
   bsStyle={undefined}
   disabled={undefined}
   name={undefined}
   onClick={undefined}
   type={undefined}
   value={undefined}
 />
        );  


});



});