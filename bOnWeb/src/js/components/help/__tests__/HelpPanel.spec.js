
jest.unmock('../HelpPanel');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const HelpPanel = require('../HelpPanel');
const _ = require('lodash');


const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<HelpPanel
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Label with Icon Component', () => {
	let component;
	let props;
    let state;
	let closeClickStub;
    let onStoreChange;
    let onClickStub;
	let nbaFeedBackClick;
    const content = {

	}

	beforeEach(() => {
		onClickStub = jest.genMockFn();
		onStoreChange= jest.genMockFn();
		closeClickStub= jest.genMockFn();

		component = TestUtils.renderIntoDocument(
			<HelpPanel onClick={onClickStub}	content={content}
				/>
		);
		props = {
			content: {
			},
        }
	});

	it('should run onClick event', () => {
		const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'panel');
		onClickStub();
		_.map(pageoptions, page => {
		TestUtils.Simulate.click(page);
		});
		expect(onClickStub).toBeCalled();
	});
});
