jest.unmock('../AlertsSweepsError');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Helmet = require('react-helmet');
const HeaderComponent = require('../../common/HeaderComponent');
const AlertsSweepsError = require('../AlertsSweepsError');
const { PropTypes } = React;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AlertsSweepsError
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('AlertsSweepsError Test Cases check', () => {
	let instance;
	let props;
	beforeEach(() => {
		props = {
			content: {
				width: 10,
				height: 10,
            },
            data: {
            },
		}
		instance = shallowRender(props);
	});

	it('render a standard modal with child elements', () => {
		instance = shallowRender(props);
        expect(instance).toEqualJSX(
			<div className=" alertsnSweepsError content-wrapper">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<div className="errorBlock">
							<h4 />
							<h1 />
							<p />
							<a className="page-options border col ">
								<span onClick={undefined} />
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	});

});
