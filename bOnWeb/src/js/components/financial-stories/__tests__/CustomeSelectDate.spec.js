'use strict';

jest.unmock('../CustomeSelectDate');

const CustomeSelectDate = require('../CustomeSelectDate');
const TestUtils = require('react-addons-test-utils');
const React = require('react');
const { PropTypes } = React;
const DatePicker = require('react-datepicker');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CustomeSelectDate
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('CustomeSelectDate Test Cases', () => {
  let props = {
    onClick: () => {},
    customTextToDisplay: 'text',
  };
  it('should be equal to jsx', () => {
    let component = shallowRender(props);
    expect(component).toEqualJSX(<div >
				<a onClick={() => {}}> text</a>
			</div>)
  })
})
