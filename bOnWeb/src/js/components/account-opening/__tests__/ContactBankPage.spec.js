jest.unmock('../ContactBankPage');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const Helmet = require('react-helmet');

const shallowRenderer = TestUtils.createRenderer();

const ContactBankPage = require('../ContactBankPage');

describe('given contact bank page', () => {

	let componentUT, expectedPageTitle;

	beforeEach(() => {
		expectedPageTitle = 'A page title';
		const props = {
			content: {
				contactBankPageHeader: expectedPageTitle
			},
			data: {
			},
		};

		shallowRenderer.render(<ContactBankPage {...props} />);
		componentUT = shallowRenderer.getRenderOutput();
	});

	it('should have a helmet', () => {
		const helmetUT = componentUT.props.children.filter(item => item.type === Helmet);
		expect(helmetUT).toBeDefined();
	});

	it('should have a title set', () => {
		const helmetUT = componentUT.props.children.filter(item => item.type === Helmet).pop();
		expect(helmetUT.props.title).toEqual(expectedPageTitle);
	});
});
