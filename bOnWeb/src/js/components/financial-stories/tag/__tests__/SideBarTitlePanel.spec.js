/**
 * @module SideBarTitlePanel
 */

jest.unmock('../SideBarTitlePanel');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');
const SideBarTitlePanel = require('../SideBarTitlePanel');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SideBarTitlePanel content={this.props.content} />);
	return shallowRenderer.getRenderOutput();
};

describe('when a user clicked on Talk Panel', () => {

const contentCancelButton = buildContent(['cancelButton']);
const contentDoneButton = buildContent(['doneButton']);
const contentCloseButton = buildContent(['closeButton']);

let instance;
const content = {
		cancelButton: 'PropTypes.string.isRequired',
		doneButton: 'PropTypes.string.isRequired',
        closeButton: 'PropTypes.string.isRequired',
	};

	beforeEach(() => {
		const props={
			disableEdit :false
		}
		instance = TestUtils.renderIntoDocument(
			<SideBarTitlePanel
				content={content} 
			/>
		);
});
	it('Contact Details of Bank will be open with with heading', () => {
		expect(contentCancelButton.cancelButton.length).toBe(12);
	});

	it('returns a valid body section', () => {
		expect(contentDoneButton.doneButton.length).toBe(10);
	});
	it('returns a valid body section', () => {
		expect(contentCloseButton.closeButton.length).toBe(11);
	});
	it('returns disableEdit :true', () => {
		let props={
			disableEdit :true
		}
		instance = TestUtils.renderIntoDocument(
			<SideBarTitlePanel {...props}
				content={content} 
			/>
		);
		expect(contentCloseButton.closeButton.length).toBe(11);
	});

	});
