'use strict';

jest.unmock('../CustomeDatePicker');
const React = require('react');
const { PropTypes } = React;

const CustomeDatePicker = require('../CustomeDatePicker');
const DateTimeField = require('react-bootstrap-datetimepicker');
const moment = require('moment');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CustomeDatePicker
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};


describe('CustomeDatePicker Test Cases', () => {
	let props = {
		content: {
			Showing: 'Showing',
			Upto: 'Upto',
		},
		onMenuSelect: jest.fn(),
		
	}
	let component = shallowRender(props);
	it('should be equal to JSX', () => {
		expect(component).toBeDefined();
	})

	it('show hide', () => {
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.showHide();
	});

	it('show hide', () => {
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.setState({open:true});
        instance.showHide();
	});

	it('closeDatePiker', () => {
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.closeDatePiker();
	});

	it('fromDateChange', () => {
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.fromDateChange();
	});

	it('getToDate', () => {
		props.toDate = moment();
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.getToDate();
	});

	it('toDateChange', () => {
		props.toDate = moment();
		props.fromDate = '2016-12-11';
		let instance = TestUtils.renderIntoDocument(<CustomeDatePicker
        {...props}
        />);
        instance.toDateChange();
	});

	
	
})		