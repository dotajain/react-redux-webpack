
jest.unmock('../SwitchPage');
jest.unmock('object-assign');

// React
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const DatePickerQuestion = require('../../common/questionsets/DatePickerQuestion');
DatePickerQuestion.shouldComponentUpdate = jest.fn();
DatePickerQuestion.shouldComponentUpdate.mockReturnValue(true);

// Component
const SwitchPage = require('../SwitchPage');

describe('Switch Page', function() {

	const content = {
		switchCode0: 'First code',
		switchCode111: 'Second code',
		switchCode222: 'Second code',
		switchCodeDefault: 'Default code',
		bankNames: {
			CB: 'cb',
			YB: 'yb',
			DYB: 'b',
		},
	};

	// Render an instance of the component
	let instance;
	beforeEach(function() {
		instance = TestUtils.renderIntoDocument(
			<SwitchPage
				content={content}
				selectContentBasedOnDowngrade={(key) => {
					return content[key];
				}}
				data={{}}
			/>);
	});

	afterEach(function() {
		instance = undefined;
	});

	describe('getErrorMessage', function() {
		it('gets the corresponding error message', function() {
			expect(instance.getErrorMessage('0')).toEqual(content.switchCode0);
			expect(instance.getErrorMessage(0)).toEqual(content.switchCode0);

			expect(instance.getErrorMessage('111')).toEqual(content.switchCode111);
			expect(instance.getErrorMessage(111)).toEqual(content.switchCode111);

			expect(instance.getErrorMessage('222')).toEqual(content.switchCode222);
			expect(instance.getErrorMessage(222)).toEqual(content.switchCode222);
		});

		it('gets a default message if given invalid input, or no matching code found', function() {
			expect(instance.getErrorMessage('999')).toEqual(content.switchCodeDefault);
			expect(instance.getErrorMessage(999)).toEqual(content.switchCodeDefault);
			expect(instance.getErrorMessage()).toEqual(content.switchCodeDefault);
			expect(instance.getErrorMessage(null)).toEqual(content.switchCodeDefault);
			expect(instance.getErrorMessage(undefined)).toEqual(content.switchCodeDefault);
		});
	});
});
