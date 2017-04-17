/**
 * @class TestHelpers
 *
 */

const _ = require('lodash');

const filterMocks = (reducer, mocks, filter) => reducer(mocks, filter);

// TODO: Make the index customisable
const genericFilter = (property, value, item) => item.length && _.head(item)[property] === value;

const findMock = (mocks, filter) => {
	const mock = filterMocks(_.find, mocks, filter);
	if (!mock) {
		throw new Error('No mock found.');
	}

	return mock[0];
};

const factory = (mocks, filter) => value => findMock(mocks, _.partial(filter, value));

const nameFilter = (name, item) => genericFilter('name', name, item);
const dataAnchorFilter = (dataAnchor, item) => genericFilter('dataAnchor', dataAnchor, item);

const buildFindMockByNameFilter = mocks => factory(mocks, nameFilter);
const buildFindMockByDataAnchorFilter = mocks => factory(mocks, dataAnchorFilter);
const buildContent = contentKeys => _.zipObject(contentKeys, _.values(contentKeys));

const TestHelpers = {
	/**
	 * Builds a mock filter that will use an elements name property
	 * to locate the appropriate mock.
	 *
	 * @param {Array} mocks An array containing mockFn.mock.calls
	 *
	 * @returns {Function} Search filter that takes a name string that will return
	 * the first mock it finds, or throws.
	 *
	 * @example var textboxes = buildFindMockByNameFilter(TextBoxQuestion.mock.calls);
	 * ...
	 * var firstName = textboxes('firstName');
	 *
	 */
	buildFindMockByNameFilter,

	/**
	 * Builds a mock filter that will use an elements dataAnchor property
	 * to locate the appropriate mock.
	 *
	 * @param {Array} mocks An array containing mockFn.mock.calls
	 *
	 * @returns {Function} Search filter that takes a dataAnchor string that will return
	 * the first mock it finds, or throws.
	 *
	 * @example var textboxes = buildFindMockByDataAnchorFilter(TextBoxQuestion.mock.calls);
	 * ...
	 * var firstName = textboxes('firstName');
	 *
	 */
	buildFindMockByDataAnchorFilter,

	/**
	 * Builds a content object based off content keys passed in
	 *
	 * @param {Array} content keys
	 *
	 * @returns {Object} Return an object of content with the keys used as the content
	 *
	 * @example var content = buildContent(['test1', 'test2']);
	 * ...
	 * {
	 *	test1: 'test1',
	 *	test2: 'test2,
	 *	}
	**/
	buildContent,
};

module.exports = TestHelpers;

