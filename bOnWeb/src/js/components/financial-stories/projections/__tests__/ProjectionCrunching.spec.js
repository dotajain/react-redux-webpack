'use strict';

jest.unmock('../ProjectionCrunching');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const ProjectionCrunching = require('../ProjectionCrunching');
import { Swipeable, defineSwipe } from 'react-touch';
const Pound = require('../SvgIcons/Pound');
const Wallet = require('../SvgIcons/Wallet');
const Trolley = require('../SvgIcons/Trolley');
const Camera = require('../SvgIcons/Camera');
const Wheel = require('../SvgIcons/Wheel');
const Helmet = require('react-helmet');


const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProjectionCrunching
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('projection crunching page', () => {
    let component;
    const props = {
        
        content: {
            projectedCrunchingHeader1: 'B is just crunching the numbers for you now.',
            projectedCrunchingHeader2: 'It\'ll take a little time for B to calculate everything, so check back later.',
        }
    };
    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
			<ProjectionCrunching {...props}
				/>
		);
    });
    const circularDeg = {
        WebkitTransform: `rotate(${undefined}deg)`,
        msTransform: `rotate(${undefined}deg)`,
        MozTransform: `rotate(${undefined}deg)`,
        OTransform: `rotate(${undefined}deg)`,
    };
    it('should call projectionWheelLeftMove', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.setState({wheelDegree: 288});
            instance.projectionWheelLeftMove();
            expect(instance.state.wheelDegree).toEqual(360);
        })
        it('should call projectionWheelLeftMove', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.projectionWheelLeftMove();
            expect(instance.state.wheelDegree).toEqual(72);
        })
        it('should call projectionWheelRightMove', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.projectionWheelRightMove();
            expect(instance.state.wheelDegree).toEqual(-72);
        })
        it('should call projectionWheelRightMove', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.setState({wheelDegree: -288});
            instance.projectionWheelRightMove();
            expect(instance.state.wheelDegree).toEqual(-360);
        })
        it('should call projectionWheelLeftClick', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.projectionWheelLeftClick();
            expect(instance.state.wheelDegree).toEqual(72);
        })
        it('should call projectionWheelLeftClick', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.setState({wheelDegree: 288});
            instance.projectionWheelLeftClick();
            expect(instance.state.wheelDegree).toEqual(360);
        })
        it('should call projectionWheelRightClick', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.setState({wheelDegree: -288});
            instance.projectionWheelRightClick();
            expect(instance.state.wheelDegree).toEqual(-360);
        })

        it('should call projectionWheelRightClick', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            let instance = ReactDOM.render(<ProjectionCrunching {...props} />, node);
            instance.projectionWheelRightClick();
            expect(instance.state.wheelDegree).toEqual(-72);
        })

    it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX( <div className="scroll-wrapper">
      <Helmet title="Projections" />
      <div className="row content-wrapper">
        <div className="settings-main-wrapper">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <p>
                <a
                  href="#"
                  onClick={undefined}
                >
                  Done
                </a>
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <div className="draggable_wp">
                <span className="inner-circle" />
                <Swipeable
                  config={{onSwipeDown: function noRefCheck() {}, onSwipeLeft: function noRefCheck() {}, onSwipeRight: function noRefCheck() {}, onSwipeUp: function noRefCheck() {}}}
                  onSwipeLeft={function noRefCheck() {}}
                  onSwipeRight={function noRefCheck() {}}
                >
                  <div
                    className="cn-wrapper opened-nav"
                    id="cn-wrapper"
                    style={{MozTransform: 'rotate(0deg)', OTransform: 'rotate(0deg)', WebkitTransform: 'rotate(0deg)', msTransform: 'rotate(0deg)'}}
                  >
                    <ul>
                      <li onClick={undefined}>
    
                        <span
                          className="active"
                          data-item="0"
                        >
                          <Camera />
                        </span>
                      </li>
                      <li onClick={undefined}>
    
                        <span
                          className=""
                          data-item="216"
                        >
                          <Wallet />
                        </span>
                      </li>
                      <li onClick={undefined}>
    
                        <span
                          className=""
                          data-item="360"
                        >
                          <Pound />
                        </span>
                      </li>
                      <li onClick={undefined}>
    
                        <span
                          className=""
                          data-item="144"
                        >
                          <Trolley />
                        </span>
                      </li>
                      <li onClick={undefined}>
    
                        <span
                          className=""
                          data-item="72"
                        >
                          <Wheel />
                        </span>
                      </li>
                    </ul>
                  </div>
                </Swipeable>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4" />
            <div className="sliding-content">
              <div className="crunching content-block">
                <h3 className="wheel-stmnt">
                  B is just crunching the numbers for you now.
                </h3>
                <h3 className="wheel-stmnt2">
                  It'll take a little time for B to calculate everything, so check back later.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
    });
});