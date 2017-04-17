
jest.unmock('../LableWithIconComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const LableWithIconComponent = require('../LableWithIconComponent');
const _ = require('lodash');


const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<LableWithIconComponent
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
			<LableWithIconComponent onClick={onClickStub}	content={content}
				/>
		);
		props = {
			content: {
			},
        }
	});

	it('should run onClick event', () => {
		const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
		onClickStub();
		_.map(pageoptions, page => {
		TestUtils.Simulate.click(page);
		});
		expect(onClickStub).toBeCalled();
	});
});
