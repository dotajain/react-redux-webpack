'use strict';

jest.unmock('../NBAComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');

const NBAComponent = require('../NBAComponent');
const Panel = require('react-bootstrap/lib/Panel');
const NBAActionCreator = require('../../../actions/NBAActionCreator');
const NBAStore = require('../../../stores/NBAStore');
const _ = require('lodash');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<NBAComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('customer registration page', () => {
	let component;
	let props;
    let state;
	let closeClickStub;
    let onStoreChange;
    let onClickStub;
	let nbaFeedBackClick;
	let nbaFlag;
    const content = {

	}

	beforeEach(() => {
		onClickStub = jest.genMockFn();
		onStoreChange= jest.genMockFn();
		closeClickStub= jest.genMockFn();
		nbaFlag = jest.genMockFn();

		component = TestUtils.renderIntoDocument(<NBAComponent onClick={onClickStub} content={content} nbaFlag = {nbaFlag}/>
		);
		component.setState({ NBAHeader: true });
		NBAStore.getHeader.mockReturnValue('Header');
		NBAStore.getContent.mockReturnValue('Header');
		props = {
			content: {
			},
		nbaFlag: jest.genMockFn()
        }
	});

	it('should run onClick event', () => {
		const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
		component.closeClick = onClickStub;
		component.onStoreChange = onClickStub;

		onClickStub();
		_.map(pageoptions, page => {

		 		 TestUtils.Simulate.click(page);
		});

		expect(onClickStub).toBeCalled();
	});
	it('should on store change event', () => {
				 
	 	component.onStoreChange();
		expect(component.state.NBAHeader).toBe("Header");
	});

	it('should do change on store', () => {
		let instance = shallowRender(props);
			expect(instance).toEqualJSX(<div>
					{
							<div className="tips" style = { { display : 'block' }}>
							<div className="note dashboard">
								<div className="row no-gutters">
									<div className="col-lg-10 col-md-9 col-sm-9 col-xs-9 padding-top-6">
										 Header
									</div>

									<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 float-right">
										<a className="page-options float-right" onClick={function noRefCheck() { }}>
											<span className="icon icon-close"></span>
										</a>
										<div className="vr float-right"></div>
										<a className="page-options opt-green float-right" onClick={function noRefCheck() { }}>
											<span className="icon icon-more"></span>
											<span>more</span>
										</a>
									</div>
								</div>
								<Panel collapsible expanded={ false}>
									<hr />
									<div className="row padding-top">
										<div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
										 Header
										</div>
										<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 float-right">
											<a className="page-options opt-green" onClick={function noRefCheck() { }} >
												<span className="icon icon-confirm"></span>
												<span>OK</span>
											</a>
											<hr />
											<a className="page-options opt-green" onClick={function noRefCheck() { }}>
												<span className="icon icon-close"></span>
												<span>I'm Not Interested</span>
											</a>
										</div>
									</div>
								</Panel>
							</div>
						</div>
					}
				</div>
	)   
	  });

	 describe('componentDidMount', () => {
		const props = {
		content: {

		},
		nbaFlag: jest.genMockFn()
	};
		it('calls for the getNBAData', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<NBAComponent {...props} />, node);
			expect(NBAActionCreator.getNBAData.mock.calls.length).toBe(6);
		});
	});
	describe('componentWillUnmount', () => {
		const props = {
		content: {

		},
		nbaFlag: jest.genMockFn()
	};
		it('calls for the removeChangeListener', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<NBAComponent {...props} />, node);
			React.unmountComponentAtNode(node);
			expect(NBAStore.removeChangeListener.mock.calls.length).toBe(1);
		});
	});
	describe('nbaClick', () => {
		const props = {
			open: true,
			nbaFlag: jest.genMockFn()
		}
		let node = document.createElement('div');
			let nbaClick = jest.genMockFn();
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<NBAComponent {...props} />, node);
			component.nbaClick();
			it('should have open state as false', () => {
				expect(component.state.open).toBeFalsy();
			})
			it('should have open state as true', () => {
				component.setState({open: true})
				expect(component.state.open).toBeTruthy();
			})
			it('should have status more as none', () => {
				let output= { display : 'none' };
				component.setState({open: true})
				component.nbaClick();
				expect(component.state.status_more).toEqual(output)
;			})
		});
});
