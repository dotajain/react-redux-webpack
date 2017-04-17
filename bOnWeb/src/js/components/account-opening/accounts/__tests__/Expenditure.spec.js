jest.unmock('../Expenditure');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const Expenditure = require('../Expenditure');
const { CurrencyQuestion } = require('../../../common/questionsets');
const ComponentHeader = require('../../../common/ComponentHeader');

describe('Expenditure', () => {
	let instance;
	let component;
	let result;

	let content = {
		expenditureSectionTitle: 'expenditureSectionTitle',
		mortgageOrRentExpenditure: 'mortgageOrRentExpenditure',
		expenditureOther: 'expenditureOther',
	};

	let data = {
		mortgageOrRentExpenditure: 'mortgageOrRentExpenditure',
		expenditureOther: 'expenditureOther',
	};

	let props = {
		group: '',
		data: data,
		content: content,
		onChange: () => {},
	};


	beforeEach(() => {
		component = (
			<Expenditure {...props} />
		);
		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	it('should render a header', () => {
		expect(result.props.children).toEqualJSX(
			<ComponentHeader
				title={'expenditureSectionTitle'}
				titleLevel={2}>
				{result.props.children.props.children}
			</ComponentHeader>
		);
	});

	it('should render rent/mortgage question', () => {
		expect(result.props.children.props.children[0]).toEqualJSX(
			<CurrencyQuestion
				name="mortgageOrRentExpenditure"
				group={props.group}
				onChange={props.onChange}
				defaultValue="mortgageOrRentExpenditure"
				dataAnchor="expenditure-housing"
				required>
				mortgageOrRentExpenditure
			</CurrencyQuestion>
		);
	});

	it('should render rent/mortgage question', () => {
		expect(result.props.children.props.children[1]).toEqualJSX(
			<CurrencyQuestion
				name="expenditureOther"
				group={props.group}
				onChange={props.onChange}
				defaultValue="expenditureOther"
				dataAnchor="expenditure-other"
				required>
				expenditureOther
			</CurrencyQuestion>
		);
	});

});

