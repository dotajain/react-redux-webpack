jest.unmock('../Nationality');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const Nationality = require('../Nationality');

describe('Nationality', () => {
	let instance;

	let content = {
	};

	let data = {
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<Nationality
				group='group'
				data={data}
				onChange={() => {}}
				content={content} />
		);
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

});

