jest.unmock('../PostcodeSearch');
jest.unmock('../AddressParts');
jest.unmock('../../../common/mixins/InputMixin');

// React & Test Utils
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var _ = require('lodash');

// Components
var PostcodeSearch = require('../PostcodeSearch');

describe('PostcodeSearch' , () => {
	let postcodeData = {};
	let appData = {};
	let content = {
		postcodeQuestion: 'Postcode'
	};

	let data = {
	};

	let defaultProps = {
		addressId: 1,
		group: 'postcode',
		name: 'postcode',
		onChange: jest.fn(),
		content
	}

	let render = props => TestUtils.renderIntoDocument(<PostcodeSearch {...props}/>);

	describe('when rendering and manual entry is disabled', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps);
		});

	});
});
