jest.unmock('../Modal');
jest.unmock('../../ComponentHeader');
jest.unmock('../../SectionCentered');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const ComponentHeader = require('../../ComponentHeader');
const SectionCentered = require('../../SectionCentered');
const Modal = require('../Modal');

describe('Modal', () => {
	let result, component, instance;

	beforeEach(() => {
		component = (
			<Modal
				title="test title"
				>
				<div><p>Child content</p>
				<ul><li>test</li></ul></div>
			</Modal>
		);

		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();

	});

	it('render a standard modal with child elements', () => {
		expect(result).toEqualJSX(
			<div>
				<div className="modal-wrapper">
					<div className="modal-wrapper__container">
						<SectionCentered centredColumnSize={8}>
							<ComponentHeader
								title="test title"
								titleLevel={3}
								wrapperClass="modal-wrapper__header"
								>
								<div><p>Child content</p>
								<ul><li>test</li></ul></div>
							</ComponentHeader>
						</SectionCentered>
					</div>
				</div>
			</div>
		);
	});

});