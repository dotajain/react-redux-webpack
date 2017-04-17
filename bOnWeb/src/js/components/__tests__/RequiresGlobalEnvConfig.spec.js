jest.unmock('../RequiresGlobalEnvConfig');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const RequiresGlobalEnvConfig = require('../RequiresGlobalEnvConfig');

const ChildComponent = (props) => {
		return (<h1>Child Component</h1>);
}

describe('when wrapping a component', () => {

	let componentUT;

	beforeEach(() => {
		let HOC = RequiresGlobalEnvConfig(ChildComponent);
		const renderer = TestUtils.createRenderer();
		renderer.render(<HOC envConfig={window.envConfig}/>);

		componentUT = renderer.getRenderOutput();
	});

	it('should pass global env as props to wrapped component', () => {
		expect(componentUT.props.envConfig).toEqual(window.envConfig);
	});
});
