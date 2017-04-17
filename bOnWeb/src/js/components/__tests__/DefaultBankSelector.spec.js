'use strict';

jest.unmock('../DefaultBankSelector');
jest.unmock('../../config/GlobalEnvConfig');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const GlobalEnvConfig = require('../../config/GlobalEnvConfig');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const ChildComponent = props => {
	return (<h1>Child Component</h1>);
};

const DefaultBankSelector = require('../DefaultBankSelector');

describe('when using DefaultBankSelector', () => {
	let componentUT;
	let HOC;
	let expectedBankId;

	beforeEach(() => {
		HOC = DefaultBankSelector(ChildComponent);
	});

	afterEach(() => {
		AccountOpeningActions.setBankId.mockClear();
	});

	describe('and bankId set to CB', () => {
		beforeEach(() => {
			expectedBankId = 'CB';
			let envConfig = {
				bankId: expectedBankId
			};
			componentUT = ReactDOM.render(<HOC envConfig={envConfig} />, document.createElement('div'));
		});

		afterEach(() => {
			AccountOpeningActions.setBankId.mockClear();
		});

		it('should invoke action to set bank id', () => {
			expect(AccountOpeningActions.setBankId.mock.calls.length).toBe(1);
		});

		it('should invoke action to set expected bankId', () => {
			expect(AccountOpeningActions.setBankId.mock.calls[0][0]).toEqual(expectedBankId);
		});
	});

	describe('and bankId set to YB', () => {

		beforeEach(() => {
			expectedBankId = 'YB';

			let envConfig = {
				bankId: expectedBankId
			};
			componentUT = ReactDOM.render(<HOC envConfig={envConfig} />, document.createElement('div'));
		});

		afterEach(() => {
			AccountOpeningActions.setBankId.mockClear();
		});

		it('should invoke action to set bank id', () => {
			expect(AccountOpeningActions.setBankId.mock.calls.length).toBe(1);
		});

		it('should invoke action to set expected bankId', () => {
			expect(AccountOpeningActions.setBankId.mock.calls[0][0]).toEqual(expectedBankId);
		});
	});

	describe('and bankId set to B', () => {

		beforeEach(() => {
			expectedBankId = 'DYB';

			let envConfig = {
				bankId: expectedBankId
			};
			componentUT = ReactDOM.render(<HOC envConfig={envConfig} />, document.createElement('div'));
		});

		afterEach(() => {
			AccountOpeningActions.setBankId.mockClear();
		});

		it('should not invoke action to set bank id', () => {
			expect(AccountOpeningActions.setBankId.mock.calls.length).toBe(0);
		});
	});

	it('should render the child component', () => {
		let childElem = ReactDOM.findDOMNode(componentUT);
		const expectedTextContent = 'Child Component';
		expect(childElem.textContent).toEqual(expectedTextContent);
	});

});
