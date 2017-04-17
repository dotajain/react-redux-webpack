
jest.unmock('../TaxObligationsComponent');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

// SUT
const TaxObligationsComponent = require('../TaxObligationsComponent');

describe('Tax Obligations', () => {
	let instance;

	const content = {
	};

	const data = {
		productCode: 'IM540',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<TaxObligationsComponent
				groups='group'
				data={data}
				group='sampleGroupName'
				content={content} />
		);
	});

	it('should be defined', function() {
		expect(instance).toBeDefined();
	});

});

