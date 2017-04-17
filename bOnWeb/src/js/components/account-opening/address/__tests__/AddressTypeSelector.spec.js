jest.unmock('../AddressTypeSelector');

// React & Test Utils
var TestUtils = require('react-addons-test-utils');
var ReactDOM = require('react-dom');
var _ = require('lodash');

// Components
var AddressTypeSelector = require('../AddressTypeSelector');

describe('AddressTypeSelector' , () => {
	let postcodeData = {};
	let appData = {};
	let content = {};

	let defaultProps = {
	}

	const container = document.createElement('div');

	const render = props => ReactDOM.render(<AddressTypeSelector {...props} />, container);

	describe('when rendering', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps)
		});
	});
});

