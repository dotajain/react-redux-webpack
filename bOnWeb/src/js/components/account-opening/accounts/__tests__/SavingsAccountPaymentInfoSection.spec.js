jest.unmock('../SavingsAccountPaymentInfoSection');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const config = require('../../../../config');
const SavingsAccountPaymentInfoSection = require('../SavingsAccountPaymentInfoSection');
const { DropdownQuestion, CurrencyQuestion } = require('../../../common/questionsets');
const ComponentHeader = require('../../../common/ComponentHeader');


describe('SavingsAccountPaymentInfoSection', () => {
	let instance;
	let component;
	let result;

	let content = {
		incomeSectionSavingsAccountIntro: 'incomeSectionSavingsAccountIntro',
		incomeSectionSavingsAccountSubtitle: 'incomeSectionSavingsAccountSubtitle'
	};

	let data = {
	};

	let props = {
		group: '',
		data: data,
		content: content,
		onChange: () => {},
		children: 'kids',
	};


	beforeEach(() => {
		component = (
			<SavingsAccountPaymentInfoSection {...props} />
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
			<ComponentHeader
				title="incomeSectionSavingsAccountSubtitle"
				titleLevel={2}>
				<p>incomeSectionSavingsAccountIntro</p>
				kids
			</ComponentHeader>
		);
	});
});

