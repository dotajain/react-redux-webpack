jest.unmock('../CurrentAccountReviewSection');
jest.unmock('../ReviewSection');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const { buildContent } = require('../../../../__helpers__/TestHelpers');

const ReviewSection = require('../ReviewSection');
const BrandUtils = require('../../../../utils/BrandUtils');

const CurrentAccountReviewSection = require('../CurrentAccountReviewSection');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CurrentAccountReviewSection
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('CurrentAccountReviewSection', () => {
	let instance;
	let result;

	let content = buildContent([
		'reviewLabelgrossAnnualIncome',
		'reviewLabelnetMonthlyIncome',
		'reviewLabelincomeOtherAmount',
		'reviewLabelincomeOtherAccountPurpose',
		'reviewLabelincomeOtherPaymentTypeOptions',
		'reviewLabelincomeOtherPaymentAmount',
		'reviewLabelincomeOtherSavingsAmount',
		'reviewLabelincomeOtherSavingsFrequency',
		'reviewLabelgrossAnnualIncome',
		'reviewLabelsectionOutgoings',
		'reviewLabelmortgageOrRentExpenditure',
		'reviewLabelexpenditureOther',
	]);

	let data = {
		grossAnnualIncome: 100,
		netMonthlyIncome: 100,
		incomeOtherAmount: 100,
		incomeOtherFrequencyOptions: 'incomeOtherFrequencyOptions',
		incomeOtherAccountPurpose: 'incomeOtherAccountPurpose',
		incomeOtherPaymentTypeOptions: 'incomeOtherPaymentTypeOptions',
		incomeOtherPaymentAmount: 100,
		incomeOtherSavingsAmount: 100,
		incomeOtherSavingsFrequency: 'incomeOtherSavingsFrequency',
		mortgageOrRentExpenditure: 100,
		expenditureOther: 100,
	};

	describe('Current', () => {
		beforeEach(() => {
			result = shallowRender({
				content,
				data,
				onEditLinkClick: () => {},
			})
		});

		it('should render correctly', () => {
			expect(result).toEqualJSX(
				<div>
					<ReviewSection
						data={{
						editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-INCOME',
						leftContent: [
							{label: 'reviewLabelgrossAnnualIncome', value: 100},
							{label: 'reviewLabelnetMonthlyIncome', value: 100},
							{label: 'reviewLabelincomeOtherAccountPurpose', value: undefined},
							{label: 'reviewLabelincomeOtherPaymentTypeOptions', value: undefined}
						],
						rightContent: [
							{label: 'reviewLabelincomeOtherAmount', value: '100 - undefined'},
							{label: 'reviewLabelincomeOtherPaymentAmount', value: 100}
						], title: undefined}}
						onEditLinkClick={function noRefCheck() {}}
					/>
					<ReviewSection
						data={{
							editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-OUTGOINGS',
							leftContent: [{label: 'reviewLabelmortgageOrRentExpenditure', value: 100}],
							rightContent: [{label: 'reviewLabelexpenditureOther', value: 100}],
							title: 'reviewLabelsectionOutgoings'}}
						onEditLinkClick={function noRefCheck() {}}
					/>
				</div>
			);
		});

	});

	describe('Current Bundled', () => {
		beforeEach(() => {
			BrandUtils.isAbleToDisplay.mockReturnValue(true);
			result = shallowRender({
				content,
				data,
				onEditLinkClick: () => {},
			})
		});

		it('should render correctly', () => {
			expect(result).toEqualJSX(<div>
										<ReviewSection
											data={{editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-INCOME', leftContent: [{label: 'reviewLabelgrossAnnualIncome', value: 100}, {label: 'reviewLabelnetMonthlyIncome', value: 100}], rightContent: [{label: 'reviewLabelincomeOtherAmount', value: '100 - undefined'}], title: undefined}}
											onEditLinkClick={function noRefCheck() {}}
										/>
									<ReviewSection
										data={{isSubSection: true, leftContent: [{label: 'reviewLabelincomeOtherAccountPurpose', value: undefined}, {label: 'reviewLabelincomeOtherPaymentTypeOptions', value: undefined}], rightContent: [{label: 'reviewLabelincomeOtherPaymentAmount', value: 100}], title: undefined}}
										onEditLinkClick={function noRefCheck() {}}
									/>
									<ReviewSection
										data={{isSubSection: true, leftContent: [{label: 'reviewLabelincomeOtherSavingsAmount', value: 100}], rightContent: [{label: 'reviewLabelincomeOtherSavingsFrequency', value: undefined}], title: undefined}}
										onEditLinkClick={function noRefCheck() {}}
									/>
									<ReviewSection
										data={{editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-OUTGOINGS', leftContent: [{label: 'reviewLabelmortgageOrRentExpenditure', value: 100}], rightContent: [{label: 'reviewLabelexpenditureOther', value: 100}], title: 'reviewLabelsectionOutgoings'}}
										onEditLinkClick={function noRefCheck() {}}
									/>
								</div>);
		});

	});
});


