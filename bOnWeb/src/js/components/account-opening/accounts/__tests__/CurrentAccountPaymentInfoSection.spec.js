jest.unmock('../CurrentAccountPaymentInfoSection');
jest.unmock('../../../../config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const config = require('../../../../config');
const CurrentAccountPaymentInfoSection = require('../CurrentAccountPaymentInfoSection');
const CurrentAccountPaymentInfo = require('../CurrentAccountPaymentInfo');
const ComponentHeader = require('../../../common/ComponentHeader');

describe('Current Account Payment Info Section', () => {
	let instance;
	let component;
	let result;

	let content = {
		incomeSectionCurrentAccountSubtitle: 'incomeSectionCurrentAccountSubtitle'
	};

	let data = {

	};

	let props = {
		group: '',
		data: data,
		content: content,
		onChange: () => {},
	};


	beforeEach(() => {
		component = (
			<CurrentAccountPaymentInfoSection {...props} />
		);
		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	it('should render current account payment section', () => {
		expect(result.props.children).toEqualJSX(
			<ComponentHeader
				title={props.content.incomeSectionCurrentAccountSubtitle}
				titleLevel={2}>
				<CurrentAccountPaymentInfo {...props} />
			</ComponentHeader>
		);
	});

});

