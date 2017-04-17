jest.unmock('../Title');
jest.unmock('../../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../../common/questionsets/DropdownQuestion');
jest.unmock('../../../common/mixins/InputMixin');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);

const Title = require('../Title');

describe('Title', () => {
	let instance;

	it('should return the defaultValue if one is provided', () => {
		instance = render(
			<Title
				data={[]}
				readOnly={''}
				name={''}
				group={''}
				onChange={()=> true}
				defaultValue={'default'}
				dataAnchor={''}
				required={false}
				label={''} />
		);

		let result = instance.getInitialState();
		expect(result).toEqual({value: 'default'});
	});

	it('should have a empty string if no defaultValue is provided', () => {
		instance = render(
			<Title
				data={[]}
				readOnly={''}
				name={''}
				group={''}
				onChange={()=> true}
				defaultValue={undefined}
				dataAnchor={''}
				required={false}
				label={''} />
		);

		let result = instance.getInitialState();
		expect(result).toEqual({value: ''});
	});
});
