jest.unmock('../ScrollToHash');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const ScrollToHash = require('../ScrollToHash');

const ChildComponent = (props) => {
	return (<h1>Test</h1>);
}

describe('given a scrollToHash component', () => {

	let instance;

	beforeEach(() => {
		const HOC = ScrollToHash(ChildComponent);
		instance =  TestUtils.renderIntoDocument(<HOC />);
		spyOn(instance, "scrollToHash");
		instance.setState({});
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	it('should call scroll to hash within utils', () => {
		expect(instance.scrollToHash).toHaveBeenCalled();
	});
});
