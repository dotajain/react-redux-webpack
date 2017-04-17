jest.unmock('../AddressContainer');

// React & Test Utils
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var _ = require('lodash');

// Components
var AddressContainer = require('../AddressContainer');

describe('AddressContainer' , () => {
	let postcodeData = {};
	let appData = {};
	let content = {};

	let defaultProps = {
		addressId: 1,
		children: 2
	}

	let render = props => TestUtils.renderIntoDocument(<AddressContainer {...props} />);

	describe('when rendering', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps)
		});

		it('should render ok', () => {
			expect(instance).not.toBe(false);
		});
	});
});


