jest.unmock('../EmploymentDetailsPage');
jest.unmock('../employment/TaxObligationsComponent');
jest.unmock('../employment/Nationality');
jest.unmock('react-bootstrap-datetimepicker');
jest.unmock('../../../config');

// React
const React = require('react');

// React Addons
const TestUtils = require('react-addons-test-utils');

// Component
const EmploymentDetailsPage = require('../EmploymentDetailsPage');

// Lodash
const _ = require('lodash');

describe('Employment Details Page', () => {

	const content = {
	};

	let data = {
		productCode: 'IM136',
	};

	let instance;

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<EmploymentDetailsPage
				data={data}
				content={content} />
		);
	})

	it ('should be defined', function() {
		expect(instance).toBeDefined();
	});

});

