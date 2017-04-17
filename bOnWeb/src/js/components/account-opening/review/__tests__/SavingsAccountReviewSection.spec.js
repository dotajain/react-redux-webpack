jest.unmock('../SavingsAccountReviewSection');
jest.unmock('../ReviewSection');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const { buildContent } = require('../../../../__helpers__/TestHelpers');

const ReviewSection = require('../ReviewSection');
const BrandUtils = require('../../../../utils/BrandUtils');

const CurrentAccountReviewSection = require('../SavingsAccountReviewSection');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CurrentAccountReviewSection
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingsAccountReviewSection', () => {
	let instance;
	let result;

	let content = buildContent([
		'reviewLabelincomeOtherSavingsTypeOptions',
		'reviewLabelincomeOtherSavingsFrequency',
		'reviewLabelincomeOtherSavingsPurpose',
		'reviewLabelsectionSA'
	]);

	let data = {
		incomeOtherSavingsTypeOptions: 'incomeOtherSavingsTypeOptions',
		incomeOtherSavingsFrequency: 'incomeOtherSavingsFrequency',
		incomeOtherSavingsPurpose: 'incomeOtherSavingsPurpose',
	};

	beforeEach(() => {
		result = shallowRender({
			content,
			data,
			onEditLinkClick: () => {},
		})
	});

	it('should render correctly', () => {
		expect(result).toEqualJSX(<div>
									<ReviewSection
										data={{editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-SAVINGS', leftContent: [{label: 'reviewLabelincomeOtherSavingsTypeOptions', value: 'incomeOtherSavingsTypeOptions'}, {label: 'reviewLabelincomeOtherSavingsFrequency', value: 'incomeOtherSavingsFrequency'}], rightContent: [{label: 'reviewLabelincomeOtherSavingsPurpose', value: 'incomeOtherSavingsPurpose'}], title: 'reviewLabelsectionSA'}}
										onEditLinkClick={function noRefCheck() {}}
									/>
								</div>);
	});
});
