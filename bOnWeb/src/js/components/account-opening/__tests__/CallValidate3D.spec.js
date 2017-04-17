
jest.unmock('../../../config');
jest.unmock('../CallValidate3D');

// React
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const CallValidate3D = require('../CallValidate3D');

const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);


describe('CallValidate3D', function() {

	let instance;
	const data = {
		productCode: 'IM136'
	};

	const content = {
		securityPageSubmissionMessage: 'Submitting',
		securityPageLoadingMessage: 'Loading'
	};

	beforeEach(function() {


		instance = render(
			<CallValidate3D data={data} content={content} appData={{}} call3d={[]} />
		);
	});

	describe('CallValidate3D', () => {
		it('returns the loading text on first load', () => {
			const result = instance._getLoadingScreen(false);
			expect(result.props.children).toMatch('Loading');
			expect(result.props.children).not.toMatch('Submitting');
		});

		it('returns the submission text when answers are being submitted', () => {
			const result = instance._getLoadingScreen(true);
			expect(result.props.children).not.toMatch('Loading');
			expect(result.props.children).toMatch('Submitting');
		});

		describe('_getLoadingScreen', () => {
			let previousMethod;
			let previousMethod2;
			beforeEach(function() {
				previousMethod = instance._getLoadingScreen;
				previousMethod2 = instance._getQuestionsAvailable;
				instance._getLoadingScreen = jest.fn();
				instance._getQuestionsAvailable = jest.fn();
				instance = render(
					<CallValidate3D data={data} content={content} appData={{}} call3d={[]} />
				);

			});

			afterEach(() => {
				instance._getLoadingScreen = previousMethod;
				instance._getQuestionsAvailable = previousMethod2;
			});

			it('should be called on render', () => {
				expect(instance._getLoadingScreen.mock.calls.length).toBe(1);
				expect(instance._getQuestionsAvailable.mock.calls.length).toBe(0);
			});

			it('should not be called', () => {
				instance._getLoadingScreen.mockClear();
				instance = render(
					<CallValidate3D data={data} content={content} appData={{}} call3d={['test']} />
				);
				expect(instance._getLoadingScreen.mock.calls.length).toBe(0);
				expect(instance._getQuestionsAvailable.mock.calls.length).toBe(1);
			});
		});
	});
});
