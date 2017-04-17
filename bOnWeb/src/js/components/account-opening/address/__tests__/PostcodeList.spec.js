
jest.unmock('../PostcodeList');

// React & Test Utils
const React = require('react');
const TestUtils = require('react-addons-test-utils');

// Components
const PostcodeList = require('../PostcodeList');
const MultiSelectQuestion = require('../../../common/questionsets/MultiSelectQuestion');
const ErrorMessage = require('../../../common/ErrorMessage');

// Local vars
const myAddress = 'hey this is where i live';
const data = [{id:'id1', potential_address:'address1'},
			{id:'id2', potential_address:'address2'},
			{id:'id3', potential_address: myAddress},
			{id:'id4', potential_address:'address4'},
			{id:'id5', potential_address:'address5'},
			{id:'id6', potential_address:'address6'}];

describe('PostcodeList test', function() {
	const addressId = 1;
	const isCountryDomestic = true;
	let instance;

	beforeEach(() => {
		ErrorMessage.mockClear();
		MultiSelectQuestion.mockClear();
	});

	afterEach(() => {
		instance = undefined;
	});

	it('should be a component', function() {
		// Render an instance of the component
		const instance = TestUtils.renderIntoDocument(
			<PostcodeList
				group={'ANYGROUP'}
				content={{}}
				section={`address-section${addressId}`}
				addressId={addressId}
				data={data}
				onItemSelected={jest.fn()}
			/>
		);

		expect(TestUtils.isCompositeComponent(instance)).toBe(true);
	});

	it('should contain an address selection list', function() {
		// Render an instance of the component
		const instance = TestUtils.renderIntoDocument(
			<PostcodeList
				group={'ANYGROUP'}
				content={{}}
				section={`address-section${addressId}`}
				addressId={addressId}
				onItemSelected={jest.fn()}
				data={data} />
		);

		expect(MultiSelectQuestion.mock.calls.length).toBe(1);
	});

});
