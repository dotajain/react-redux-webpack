/**
 * @test ErrorPage
 */

jest.unmock('../ErrorPage');


const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const { buildContent } = require('../../../__helpers__/TestHelpers');

const ErrorPage = require('../ErrorPage');

// Components
const ResultSection = require('../../common/sections/ResultSection');

const PageHeader = require('../../common/PageHeader');

describe('ErrorPage', () => {

	let instance;

	const data = {};
	const content = buildContent(['errorPageHeader']);

	beforeEach(() => {
		PageHeader.mockClear();
		ResultSection.mockClear();
		instance = TestUtils.renderIntoDocument(
			<ErrorPage
				data={data}
				validations={{}}
				content={content}
			/>
		);
	});

	describe('GIVEN I load the error page', () => {

		it('returns a valid page header', () => {
			expect(PageHeader.mock.calls.length).toBe(1);
		});

		it('returns a valid result section', () => {
			expect(ResultSection.mock.calls.length).toBe(1);
		});

	});
});
