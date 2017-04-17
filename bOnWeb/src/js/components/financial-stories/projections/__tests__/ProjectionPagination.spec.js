
'use strict';

jest.unmock('../ProjectionPagination');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const ProjectionPagination = require('../ProjectionPagination');
const Panel = require('react-bootstrap/lib/Panel');
const ProjectionPaginationDot = require('./../ProjectionPaginationDot');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProjectionPagination
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};



describe('customer registration page', () => {

	let component;
	let props = {
		onChangeIndex : jest.fn(),
    dots: 2,
	};
    let onClickStub;
    const content = {

	}

	beforeEach(() => {
		onClickStub = jest.genMockFn();

		component = TestUtils.renderIntoDocument(
			<ProjectionPagination onClick={onClickStub}	content={content} {...props}
				/>
		);

	});

	it('should run onClick event', () => {
		const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'PaginationDot');
		component.onClick = onClickStub;

		onClickStub();
		TestUtils.Simulate.click(pageoptions);
		// _.map(pageoptions, page => {

		//  		 TestUtils.Simulate.click(page);
		// });

		expect(onClickStub).toBeCalled();
	});

	it('should handle click fxn', () => {

		let event = '';
		let index = 'hello';

		component.handleClick(event,index);
	//	expect(component.props.onChangeIndex).toBe('hello');
	});


    it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
           <div className="demo-pagination" style={{bottom: 20, display: 'flex', flexDirection: 'row', marginRight: '-54px', position: 'absolute', right: '50%'}} >
             <ProjectionPaginationDot
                     active={false}
                     index={0}
                     onClick={function noRefCheck() {}}
                   />
                   <ProjectionPaginationDot
                     active={false}
                     index={1}
                     onClick={function noRefCheck() {}}
                   />
               </div>);
    });
});
