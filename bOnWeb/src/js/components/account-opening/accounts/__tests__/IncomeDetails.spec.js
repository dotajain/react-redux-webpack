jest.unmock('../IncomeDetails');
jest.unmock('../CurrentAccountPaymentInfo');

jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const IncomeDetails = require('../IncomeDetails');

describe('IncomeDetails', () => {
	let instance;

	let content = {
	};

	let data = {
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<IncomeDetails
				group='group'
				data={data}
				content={content} 
				onChange={() => {}}/>
		);
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	it('can validate net monthly income values', function() {
		const scenarios = [
			{grossAnnualIncome: '0', netMonthlyIncome: '0', result: true},
			{grossAnnualIncome: '0', netMonthlyIncome: '100', result: false},
			{grossAnnualIncome: '12000', netMonthlyIncome: '1000', result: true},
			{grossAnnualIncome: '12000', netMonthlyIncome: '500', result: true},
			{grossAnnualIncome: '12000', netMonthlyIncome: '1100', result: false},
			{grossAnnualIncome: undefined, netMonthlyIncome: undefined, result: false},
			{grossAnnualIncome: 'abc', netMonthlyIncome: 'cba', result: false}
		];

		_.each(scenarios, (scenario) => {
			data = {
				grossAnnualIncome: scenario.grossAnnualIncome,
				netMonthlyIncome: scenario.netMonthlyIncome
			}
			instance = TestUtils.renderIntoDocument(
				<IncomeDetails
					data={data}
					content={content}
					group='group'
					onChange={() => {}}
					/>
			);

			expect(instance.netMonthlyIncomeValidator()).toBe(scenario.result);
		});
	});

});

