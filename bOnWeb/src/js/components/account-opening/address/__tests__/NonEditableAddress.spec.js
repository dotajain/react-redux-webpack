
jest.unmock('../NonEditableAddress');

// React & Test Utils
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const _ = require('lodash');
const envConfig = require('../../../../../static/config');

// Components
const NonEditableAddress = require('../NonEditableAddress');
const StaticParagraphQuestion = require('../../../common/questionsets/StaticParagraphQuestion');

// Actions
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');

const testAddressId = 1;
const name = 'testname';

describe('NonEditableAddress', function() {

	// Render an instance of the component
	let instance;
	const createInstance = () => {
		instance = TestUtils.renderIntoDocument(
			<NonEditableAddress
			data={{}}
			group={'ANYGROUP'}
			name={name}
			addressId={testAddressId} />
		);
	};

	const cleanup = () => {
		instance = undefined;
		StaticParagraphQuestion.mockClear();
	};

	beforeEach(createInstance);

	afterEach(cleanup);

	describe('componentDidMount', function() {

	});

	describe('render', function() {
		describe('DYB', () => {

			let originalBankId;

			beforeEach(function() {
				originalBankId = envConfig.bankId;
				envConfig.bankId = 'DYB';

				cleanup();
				createInstance();
			});

			afterEach(function() {
				envConfig.bankId = originalBankId;
			});

			it('mainColumnsize is equal to 12', () => {
				expect(StaticParagraphQuestion.mock.calls.length).toEqual(1);
				expect(StaticParagraphQuestion.mock.calls[0][0].mainColumnSize).toEqual(12);
			});
		});

		describe('CB and YB', () => {
			let originalBankId;

			beforeEach(function() {
				originalBankId = envConfig.bankId;
				envConfig.bankId = 'CB';

				cleanup();
				createInstance();
			});

			afterEach(function() {
				envConfig.bankId = originalBankId;
			});

			it('mainColumnsize is equal to 4', () => {
				expect(StaticParagraphQuestion.mock.calls.length).toEqual(1);
				expect(StaticParagraphQuestion.mock.calls[0][0].mainColumnSize).toEqual(4);
			});
		});
	});

});
