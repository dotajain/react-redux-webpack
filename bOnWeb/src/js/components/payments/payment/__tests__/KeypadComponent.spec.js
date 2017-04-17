'use strict';

jest.unmock('../KeypadComponent');

const KeypadComponent = require('../KeypadComponent');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const ButtonComponent = require('../ButtonComponent');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<KeypadComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Keypad Component Test Cases', () => {
    let component;
	let props;  
	it('should return keypad jsx', () => {	
		let component = shallowRender(props);        
		expect(component).toEqualJSX(
<div className="key-wrapper">
  <ButtonComponent
    bsSize="small"
    btnName="1"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="2"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="3"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="4"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="5"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="6"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="7"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="8"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="9"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="."
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="0"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="Delete"
    className="delete-button"
    onClick={undefined}
    type="button"
  />
  <ButtonComponent
    bsSize="small"
    btnName="Next"
    className="next"   
    onClick={undefined}
    type="button"
  />
</div>
        )

	});
});