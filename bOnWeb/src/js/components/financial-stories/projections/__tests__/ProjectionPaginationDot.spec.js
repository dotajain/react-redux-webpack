'use strict'

jest.unmock('../ProjectionPaginationDot');

const ProjectionPaginationDot = require('../ProjectionPaginationDot');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const styles = {
	  root: {
	    height: 18,
	    width: 18,
	    cursor: 'pointer',
	  },
	  dot: {
	    backgroundColor: '#c1c1c4',
	    height: 12,
	    width: 12,
	    borderRadius: 999,
	    margin: 3,
	  },
	  active: {
	    backgroundColor: '#8e8e93',
	  },
	};
const shallowRender = (props) => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ProjectionPaginationDot
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Projections Paginations Dot', () => {
	let onClickStub = jest.genMockFn();
	let props = {
		active: false,
		index: 1,
		onClick: jest.genMockFn(),
		};
	let props1 = {
		active: true,
		index: 1,
		onClick: jest.genMockFn(),
		};
	let component = shallowRender(props);
	let component1 = shallowRender(props1);

	it('should be equal to rendered component', () => {
		expect(component).toEqualJSX(
		<div className="paginationSwipe" style={{cursor: 'pointer', height: 18, width: 18}} onClick={() => {}}>
        	<div style={{backgroundColor: '#c1c1c4', borderRadius: 999, height: 8, margin: 3, width: 8}} />
      	</div>);
	});
	it('should be equal to rendered component', () => {
		expect(component1).toEqualJSX(
			<div className="paginationSwipe active" style={{cursor: 'pointer', height: 18, width: 18}} onClick={() => {}}>
	        	<div style={{backgroundColor: '#8e8e93', borderRadius: 999, height: 8, margin: 3, width: 8}} />
	      	</div>);
	});

	it('should set state on event', () => {
			let node = document.createElement('div');
			let event = {
				target:{
					value:'Hello',
				},
				preventDefault : jest.fn(),
			}
			let instance = ReactDOM.render(<ProjectionPaginationDot {...props} />, node);
			instance.handleClick(event);
		    expect(props.onClick).toBeCalled();

		})

});
