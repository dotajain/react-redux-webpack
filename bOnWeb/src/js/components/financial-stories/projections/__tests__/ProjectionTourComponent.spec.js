'use strict'
jest.unmock('../ProjectionTourComponent');

const ProjectionTourComponent = require('../ProjectionTourComponent');
const React = require('react');
const ReactDOM = require('react-dom');
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
const ProjectionPagination = require('../ProjectionPagination');
const TestUtils = require('react-addons-test-utils');
const ProjectionDemoGo = require('../ProjectionDemoGo');
const FinancialStoriesActionCreator = require('../../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const { PropTypes } = React;
const BrowserUtils = require('../../../../utils/BrowserUtils');
const AutoPlaySwipeableViews = bindKeyboard(SwipeableViews);

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ProjectionTourComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Projection Tour Component', () => {
	let screenSize = {
			x: 1060,
		}
	let screenSize2 = {
			x: 700,
		}
	let screenSize3 = {
			x: undefined,
		}
	describe('Web View', () => {
		let props = {
			content: {},
			closed: () => {},
		}

		BrowserUtils.getScreenSize.mockReturnValue(screenSize);
		let component = shallowRender(props);
		it('should be equal to component', () => {
			expect(component).toEqualJSX(<div className="b container-fluid-full help bg-help demo-full-width">
			      <div className="row no-gutters">
			        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
			          <div className="demo">
			            <a
			              className="icon"
			              onClick={function noRefCheck() {}}
			            >
			              Back
			            </a>
			          </div>
			        </div>
			        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
			          <h3>
			            Projections Quick Tour
			          </h3>
			        </div>
			        <div className="col-lg-2 col-md-2 8 col-sm-2 col-xs-2 text-right" />
			      </div>
			      <div className="col-lg-12 col-md-12 demo-title">
			        <a
			          className="icon icon-page-back icon-arrow-disabled"
			          onClick={function noRefCheck() {}}
			        />
			        <AutoPlaySwipeableViews
			          index={0}
			          onChangeIndex={function noRefCheck() {}}
			        >
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Toggle.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p style={{fontSize: '20px'}}/>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/DD-SO.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p style={{fontSize: '20px'}}/>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Toggle-Tags.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p style={{fontSize: '20px'}}/>
			            
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Projections.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p style={{fontSize: '20px'}}/>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/projection_tour_wheel.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p style={{fontSize: '20px'}}/>
			          </div>
			          <div style={{background: '#00db6d', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <ProjectionDemoGo
			              closed={function noRefCheck() {}}
			              content={{}}
			            />
			          </div>
			        </AutoPlaySwipeableViews>
			        <a
			          className="icon icon-page-next"
			          onClick={function noRefCheck() {}}
			        />
			        <ProjectionPagination
			          dots={6}
			          index={0}
			          onChangeIndex={function noRefCheck() {}}
			        />
			      </div>
			    </div>)
			})
	})
	describe('Mobile View', () => {
		let props = {
			content: {},
			closed: () => {},
		}
		BrowserUtils.getScreenSize.mockReturnValue(screenSize2);
		let component = shallowRender(props);
		it('should be equal to mobile component', () => {
			expect(component).toEqualJSX(<div className="b container-fluid-full help bg-help demo-full-width">
			      <div className="row no-gutters">
			        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
			          <div className="demo">
			            <a
			              className="icon"
			              onClick={function noRefCheck() {}}
			            >
			              Back
			            </a>
			          </div>
			        </div>
			        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
			          <h3 />
			        </div>
			        <div className="col-lg-2 col-md-2 8 col-sm-2 col-xs-2 text-right" />
			      </div>
			      <div className="col-lg-12 col-md-12 demo-title">
			        <a
			          className="icon icon-page-back icon-arrow-disabled"
			          onClick={function noRefCheck() {}}
			        />
			        <AutoPlaySwipeableViews
			          index={0}
			          onChangeIndex={function noRefCheck() {}}
			        >
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Toggle.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p>
			              To start, B will take into account what you've tagged as earnings
			            </p>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/DD-SO.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p>
			              Review your Commitments; these are Standing Orders and Direct Debits on your account
			            </p>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Toggle-Tags.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p>
			              Select the tags which are essential to you, and B will incorporate the spending on these tags to make your projection more relevant
			            </p>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/Projections.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p>
			              Look ahead to keep track of projected earnings and commitments, and receive alerts if you're going to run low
			            </p>
			          </div>
			          <div style={{background: '#f3f3f3', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <img
			              alt=""
			              src="../images/b/projection_tour_wheel.png"
			              style={{width: 973}}
			              title=""
			            />
			            <p>
			              B will give you a projected discretionary balance (good to go) or give you a heads up on when you may be running low
			            </p>
			          </div>
			          <div style={{background: '#00db6d', color: '#57575f', fontSize: '23px', minHeight: 500, padding: 15, paddingBottom: '50px', paddingTop: 0, textAlign: 'center'}}>
			            <ProjectionDemoGo
			              closed={function noRefCheck() {}}
			              content={{}}
			            />
			          </div>
			        </AutoPlaySwipeableViews>
			        <a
			          className="icon icon-page-next"
			          onClick={function noRefCheck() {}}
			        />
			        <ProjectionPagination
			          dots={6}
			          index={0}
			          onChangeIndex={function noRefCheck() {}}
			        />
			      </div>
			    </div>)
			})
	})
	describe('functions related test cases', () => {
		let props = {
			content: {
				value : '',
			},
			closed: () => {},
		}
		let instance;
		it('should call closed function', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.closed();
			expect(instance.state.Go).toBeFalsy();
		})
		let demo1;
		let demo2 = 'Projections Quick Tour';
		it('should call demoMsg function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			expect(instance.demoText(2)).toEqual(demo2);
		})
		it('should call demoMsg function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize2);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			expect(instance.demoText(2)).toEqual(demo1);
		})
		it('should call swipe right mobile function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize2);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.swipeRight()
			expect(instance.state.index).toEqual(1);
		})
		it('should call swipe right web function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.setState({index: 5})
			instance.swipeRight()
			expect(instance.state.Go).toBeTruthy();
		})
		it('should call swipe left mobile function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize2);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.setState({ index: 1 })
			instance.swipeLeft()
			expect(instance.state.index).toEqual(0);
		})
		it('should call swipe left web function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.swipeLeft()
			expect(instance.state.index).toEqual(0);
		})
		it('should call handleChange function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize3);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.handleChangeIndex(5)
			expect(instance.state.index).toEqual(5);
		})
		it('should call back to projection function', () => {
			BrowserUtils.getScreenSize.mockReturnValue(undefined);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.backToProjection()
			expect(FinancialStoriesActionCreator.handleUpdateFSTileClick.mock.calls.length).toEqual(1);
		})
		it('should call disabledIcon function: if', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize3);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.setState({ index: 0 })
			expect(instance.disabledIcon()).toEqual("icon icon-page-back icon-arrow-disabled");
		})
		it('should call disabledIcon function: else', () => {
			BrowserUtils.getScreenSize.mockReturnValue(screenSize3);
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			instance = ReactDOM.render(<ProjectionTourComponent {...props} />, node);
			instance.setState({ index: 1 })
			expect(instance.disabledIcon()).toEqual("icon icon-page-back");
		})

	})

})
