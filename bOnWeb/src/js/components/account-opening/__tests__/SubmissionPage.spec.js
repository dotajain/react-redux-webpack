/**
 * @test SubmissionPage
 */
jest.unmock('../SubmissionPage');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SubmissionPage = require('../SubmissionPage');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const UrlUtils = require('../../../utils/UrlUtils');

const Component = props => (<SubmissionPage
						   {...props}
						/>);

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<Component
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SubmissionPage', () => {

	let instance;

	let data = {};
	let content = {};

	describe('when initially loading with no case id', () => {
		let result;
		let instance;

		beforeEach(() => {
			const values = {
				caseId: 1234,
				type: 'savings',
			}
			UrlUtils.getParam.mockImplementation(key => values[key]);

			const props = {
				data,
				appData: {},
				content,
			}
			result = shallowRender(props);

			instance = TestUtils.renderIntoDocument(<Component {...props} />);
		});

		it('should fetch the case', () => {
			expect(AccountOpeningActions.getCase.mock.calls.length).toBe(1);
			expect(AccountOpeningActions.getCase.mock.calls[0][0]).toBe(1234);
			expect(AccountOpeningActions.getCase.mock.calls[0][1]).toBe('savings');
		});
	});
});

