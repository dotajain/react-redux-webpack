jest.unmock('../MaritalStatus');
jest.unmock('../../../common/mixins/InputMixin');
jest.unmock('../../../common/questionsets/DropdownQuestion');
jest.unmock('../../../common/questionsets/Dropdown');
jest.unmock('../../../../config');

// React
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

// Component
var MaritalStatus = require('../MaritalStatus');

// Lodash
var _ = require('lodash');

describe('Marital Status', () => {

	var content = {
	};

	// Render an instance of the component
	var instance;

	const container = document.createElement('div');

	describe('WHEN it is a existing customer', () => {

		it('should be possible to edit username IF we have a invalid marital status', () => {
			instance = ReactDOM.render(
				<MaritalStatus
					data={{
						isExistingCustomer: 'yes',
						maritalStatus: null
					}}
					content={content}
				/>, container
			);
			var el = ReactDOM.findDOMNode(instance).querySelectorAll('[data-anchor="marital-status"]')
			expect(el.length).toBe(1);
		});

		it('should NOT be possible to edit username IF we have a valid marital status', () => {
			instance = ReactDOM.render(
				<MaritalStatus
					data={{
						isExistingCustomer: 'yes',
						maritalStatus: 'Single'
					}}
					content={content}
				/>, container
			);
			var el = ReactDOM.findDOMNode(instance).querySelectorAll('[data-anchor="marital-status"]')
			expect(el.length).toBe(1);
		});
	});

});

