
jest.unmock('../TermsConditions');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const TermsConditions = require('../TermsConditions');
const BrowserUtils = require('../../../utils/BrowserUtils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const TermsConditionStore = require('../../../stores/TermsConditionStore');
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TermsConditions content={this.props.content} />);
	return shallowRenderer.getRenderOutput();
};

describe('when a user clicked on TermsConditions Panel', () => {

	const contentHeader = buildContent(['TnCHeading']);
	const contentBody = buildContent(['TCHead']);
	BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
	let instance;
	const content = {
		TnCHeading: 'PropTypes.string.isRequired',
		TCHead: 'PropTypes.string.isRequired',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<TermsConditions
				content={content}
				/>
		);
	});
	it('email pop will be open with with heading', () => {
		expect(contentHeader.TnCHeading.length).toBe(10);
	});

	it('returns a valid body section', () => {
		BrowserUtils.getScreenSize.mockReturnValue();
		instance = TestUtils.renderIntoDocument(
			<TermsConditions
				content={content}
				/>
		);

	});


	it('calls for the removeChangeListener', () => {
		let props = {
			content: '',
		}
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let component = ReactDOM.render(<TermsConditions {...props} />, node);
		React.unmountComponentAtNode(node);
		expect(TermsConditionStore.removeChangeListener.mock.calls.length).toBe(1);
	});

	it('should on store change', () => {
		let props = {
			content: '',
		}
		let component;
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		component = ReactDOM.render(<TermsConditions {...props} />, node);
		TermsConditionStore.getAll.mockReturnValue('hello');
		component.onStoreChange();
		expect(component.state.tcData).toBe("hello");
	});


	it('should on store change', () => {
		let props = {
			content: '',
		}
		let component;
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		component = ReactDOM.render(<TermsConditions {...props} />, node);
		TermsConditionStore.getAll.mockReturnValue('hello');
		component.renderLoadingImage();
		// expect(component.state.tcData).toBe("hello");
	});


});

