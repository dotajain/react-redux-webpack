jest.unmock('../Gender');
jest.unmock('../../../common/questionsets');
/*jest.dontMock('../../../common/questionsets/ReadOnlyQuestion');
jest.dontMock('../../../common/questionsets/DropdownQuestion');
jest.dontMock('../../../common/mixins/InputMixin');*/

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);

const Gender = require('../Gender');

describe('Gender', () => {
	let instance;

	it('should return the defaultValue if one is provided', () => {
		instance = render(
			<Gender
				data={[]}
				readOnly={''}
				name={''}
				group={''}
				onChange={()=> true}
				defaultValue={'default'}
				dataAnchor={''}
				required={false}
				label={''}
				selectedValue={''}
				customValidator={()=> true} />
		);

		let result = instance.getInitialState();
		expect(result).toEqual({value: 'default'});
	});

	it('should have a empty string if no defaultValue is provided', () => {
		instance = render(
			<Gender
				data={[]}
				readOnly={''}
				name={''}
				group={''}
				onChange={()=> true}
				defaultValue={undefined}
				dataAnchor={''}
				required={false}
				label={''}
				selectedValue={''}
				customValidator={()=> true} />
		);
		let result = instance.getInitialState();
		expect(result).toEqual({value: ''});
	});
});
