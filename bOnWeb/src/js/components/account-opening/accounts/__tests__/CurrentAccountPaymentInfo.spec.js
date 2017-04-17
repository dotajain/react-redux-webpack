jest.unmock('../CurrentAccountPaymentInfo');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const config = require('../../../../config');
const CurrentAccountPaymentInfo = require('../CurrentAccountPaymentInfo');
const { DropdownQuestion, CurrencyQuestion } = require('../../../common/questionsets');

describe('Current Account Payment Info', () => {
	let instance;
	let component;
	let result;

	let content = {
		incomeOtherPaymentType: 'incomeOtherPaymentType',
		incomeOtherPaymentAmount: 'incomeOtherPaymentAmount',
		incomeOtherAccountPurpose: 'incomeOtherAccountPurpose',
	};

	let data = {
		incomeOtherPaymentTypeOptions: [],
		incomeOtherAccountPurpose: [],
		incomeOtherPaymentAmount: 12,
	};

	let props = {
		group: '',
		data: data,
		content: content,
		onChange: () => {},
	};


	beforeEach(() => {
		component = (
			<CurrentAccountPaymentInfo {...props} />
		);
		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	it('should render other income dropdown', () => {
		expect(result.props.children[0]).toEqualJSX(
			<DropdownQuestion
				name="incomeOtherPaymentTypeOptions"
				group={props.group}
				data={config.formOptionsIncomeOtherPaymentType}
				onChange={props.onChange}
				defaultValue={props.data.incomeOtherPaymentTypeOptions}
				dataAnchor="income-other-payment-type"
				required>
				incomeOtherPaymentType
			</DropdownQuestion>
		);
	});

	it('should render other income payment amount', () => {
		expect(result.props.children[1]).toEqualJSX(
			<CurrencyQuestion
				name="incomeOtherPaymentAmount"
				group={props.group}
				onChange={props.onChange}
				defaultValue={props.data.incomeOtherPaymentAmount}
				dataAnchor="income-other-payment-amount"
				required>
				incomeOtherPaymentAmount
			</CurrencyQuestion>
		);
	});

	it('should render other income type dropdown', () => {
		expect(result.props.children[2]).toEqualJSX(
			<DropdownQuestion
				name="incomeOtherAccountPurpose"
				group={props.group}
				data={config.formOptionsAccountPurpose}
				onChange={props.onChange}
				defaultValue={props.data.incomeOtherAccountPurpose}
				dataAnchor="income-other-account-purpose"
				required>
				incomeOtherAccountPurpose
			</DropdownQuestion>
		);
	});



});

