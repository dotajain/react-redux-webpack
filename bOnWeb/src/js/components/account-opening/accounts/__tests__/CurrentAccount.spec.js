jest.unmock('../CurrentAccount');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const CurrentAccount = require('../CurrentAccount');
const { BundledAccount } = CurrentAccount;

const BrandUtils = require('../../../../utils/BrandUtils');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');

const SectionFullWidth = require('../../../common/SectionFullWidth.jsx');
const IncomeDetails = require('../IncomeDetails');
const Expenditure = require('../Expenditure');
const CurrentAccountPaymentInfoSection = require('../CurrentAccountPaymentInfoSection');
const SavingsAccountPaymentInfoSection = require('../SavingsAccountPaymentInfoSection');

describe('CurrentAccount', () => {
	let instance;
	let component;
	let result;

	let content = {
			};

	let data = {
	};

	let props = {
		group: '',
		data: data,
		content: content,
		onChange: () => {},
	};


	describe('standard', () => {
		beforeEach(() => {
			component = (
				<CurrentAccount {...props} />
			);
			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should be defined', () => {
			expect(instance).toBeDefined();
		});

		it('should render correctly', () => {
			expect(result).toEqualJSX(
				<div>
					<SectionFullWidth id="income-details">
						<IncomeDetails
							onChange={() => {}}
							showCurrentAccountPaymentInfo={true}
							{...props}
						/>
					</SectionFullWidth>

					<SectionFullWidth id="outgoings-details">
						<Expenditure
							onChange={() => {}}
							{...props}
						/>
					</SectionFullWidth>
				</div>
			);
		});
	});

	describe('bundled', () => {
		beforeEach(() => {
			BrandUtils.isAbleToDisplay.mockReturnValue(true);
			component = (
				<CurrentAccount {...props} />
			);
			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should be defined', () => {
			expect(instance).toBeDefined();
		});

		it('should render correctly', () => {
			expect(result).toEqualJSX(
				<div>
					<SectionFullWidth id="income-details">
						<IncomeDetails
							onChange={() => {}}
							showCurrentAccountPaymentInfo={false}
							{...props}
						/>
					</SectionFullWidth>

					<SectionFullWidth id="outgoings-details">
						<Expenditure
							onChange={() => {}}
							{...props}
						/>
					</SectionFullWidth>

					<BundledAccount
						onChange={() => {}}
						{...props}
					/>
				</div>
			);
		});
	});

	describe('onHasAdditionalIncome - No', () => {
		let data;
		beforeEach(() => {
			instance = render(component);
			instance.onIncomeDetailsSectionChange('hasAdditionalIncome', 'No');
			data = AccountOpeningActions.updateFormValues.mock.calls[0][0]
		});

		afterEach(() => {
			AccountOpeningActions.updateFormValues.mockClear();
		});

		it('should call with the correct data', () => {
			expect(data).toEqual([
				{ key: 'hasAdditionalIncome', value: 'No' },
				{ key: 'incomeOtherAmount', value: undefined },
				{ key: 'incomeOtherFrequencyOptions', value: undefined },
			]);
		});
	});

	describe('onHasAdditionalIncome - Yes', () => {
		let data;
		beforeEach(() => {
			instance = render(component);
			instance.onIncomeDetailsSectionChange('hasAdditionalIncome', 'Yes');
			data = AccountOpeningActions.updateFormValues.mock.calls[0][0]
		});

		afterEach(() => {
			AccountOpeningActions.updateFormValues.mockClear();
		});

		it('should call with the correct data', () => {
			expect(data).toEqual([
				{ key: 'hasAdditionalIncome', value: 'Yes' },
			]);
		});
	});

	describe('updateGrossAnnualIncome', () => {
		let data;
		let update;

		beforeEach(() => {
			instance = render(component);
			instance.onIncomeDetailsSectionChange('grossAnnualIncome', 1000);

			data = AccountOpeningActions.updateFormValues.mock.calls[0][0]
			update = AccountOpeningActions.updateFormValue.mock.calls[0]
		});

		afterEach(() => {
			AccountOpeningActions.updateFormValues.mockClear();
			AccountOpeningActions.updateFormValue.mockClear();
		});

		it('should call with the correct data', () => {
			expect(data).toEqual([
				{ key: 'grossAnnualIncome', value: 1000 },
				{ key: 'netMonthlyIncome', value: undefined },
			]);
		});

		it('should clear netMonthlyIncome', () => {
			expect(update).toEqual(['netMonthlyIncome', '']);
		});
	});

});


