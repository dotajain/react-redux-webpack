jest.unmock('../AlertSweepsOverlay');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AlertSweepsOverlay = require('../AlertSweepsOverlay');
const { PropTypes } = React;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AlertSweepsOverlay
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('AlertSweepsOverlay Test Cases check', () => {
	let instance;
	let props;
	beforeEach(() => {
		props = {
			content: {
            },
            data: {
            },
		}
		instance = shallowRender(props);
	});

	it('render a standard modal with child elements', () => {
		instance = shallowRender(props);
        expect(instance).toEqualJSX(
			<div className="menu-overlay">
				<input
					id="menuOverlay2"
					type="checkbox"
					/>
				<div className="lower">
					<label
						className="user-options"
						htmlFor="menuOverlay2"
						title="User Options"
						>
						<span className="icon icon-item-dots" />
					</label>
				</div>
				<div className="overlay overlay-hugeinc">
					<nav>
						<label htmlFor="menuOverlay2" />
						<ul>
							<li>
								<a href="#">
									<span onClick={undefined}>
										Create Alerts
									</span>
								</a>
							</li>
							<li>
								<a href="#">
									<span onClick={undefined}>
										Create Sweeps
									</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		)
	});

});
