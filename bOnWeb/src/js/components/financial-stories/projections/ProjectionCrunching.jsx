/**
 * @module projection screen for wheel component, crunching screen and settings page
 */

const React = require('react');
import { Swipeable, defineSwipe } from 'react-touch';
const Helmet = require('react-helmet');
const PoundIcon = require('./SvgIcons/Pound');
const WalletIcon = require('./SvgIcons/Wallet');
const TrolleyIcon = require('./SvgIcons/Trolley');
const CameraIcon = require('./SvgIcons/Camera');
const Wheel = require('./SvgIcons/Wheel');

let interval;
const getStateFromStores = () => {
    return {
        wheelDegree: 0,
    };
};
const ProjectionCrunching = React.createClass({
    propTypes: {
        content: React.PropTypes.object,
        doneClickCrunch: React.PropTypes.func,
    },
    getInitialState() {
        return getStateFromStores();
    },
    componentDidMount() {
        interval = setInterval(this.projectionWheelRightMove, 510);
    },
    componentWillUnmount() {
        clearInterval(interval);
    },
    // method defined to move the wheel component left side. 
    projectionWheelLeftMove() {
        this.setState({ wheelDegree: this.state.wheelDegree + 72 });
    },
    // method defined to move the wheel component right side.
    projectionWheelRightMove() {
        this.setState({ wheelDegree: this.state.wheelDegree - 72 });
    },
    // method defined to move the wheel component left click.
    projectionWheelLeftClick() {
        this.setState({ wheelDegree: this.state.wheelDegree + 72 });
    },
    // method defined to move the wheel component right side.
    projectionWheelRightClick() {
        this.setState({ wheelDegree: this.state.wheelDegree - 72 });
    },



    render() {
        console.log('in projection crunching screen');
        const circularDeg = {
            WebkitTransform: `rotate(${this.state.wheelDegree}deg)`,
            msTransform: `rotate(${this.state.wheelDegree}deg)`,
            MozTransform: `rotate(${this.state.wheelDegree}deg)`,
            OTransform: `rotate(${this.state.wheelDegree}deg)`,
        };
        return (
            <div className="scroll-wrapper">
                <Helmet title="Projections" />
                <div className="row content-wrapper">
                    <div className="settings-main-wrapper">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <p><a href="#" onClick={this.props.doneClickCrunch}>Done</a></p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <div className="draggable_wp">
                                    <span className="inner-circle"></span>
                                    <Swipeable onSwipeLeft={this.projectionWheelLeftMove} onSwipeRight={this.projectionWheelRightMove} >
                                        <div className="cn-wrapper opened-nav" id="cn-wrapper" style={circularDeg} >
                                            <ul >
                                                <li onClick={this.circleClick} > <span data-item="0" className={(this.state.wheelDegree === 0 ? 'active' : '') || (this.state.wheelDegree === 360 ? 'active' : '') || (this.state.wheelDegree === -360 ? 'active' : '')}><CameraIcon /></span></li>
                                                <li onClick={this.circleClick} > <span data-item="216" className={(this.state.wheelDegree === -144 ? 'active' : '') || (this.state.wheelDegree === 216 ? 'active' : '')}><WalletIcon /></span></li>
                                                <li onClick={this.circleClick} > <span data-item="360" className={(this.state.wheelDegree === -72 ? 'active' : '') || (this.state.wheelDegree === 288 ? 'active' : '')}><PoundIcon /></span></li>

                                                <li onClick={this.circleClick} > <span data-item="144" className={(this.state.wheelDegree === -216 ? 'active' : '') || (this.state.wheelDegree === 144 ? 'active' : '')}><TrolleyIcon /></span></li>
                                                <li onClick={this.circleClick} > <span data-item="72" className={(this.state.wheelDegree === -288 ? 'active' : '') || (this.state.wheelDegree === 72 ? 'active' : '')}><Wheel /></span></li>
                                            </ul>
                                        </div>
                                    </Swipeable>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            </div>
                            <div className="sliding-content">
                                <div className="crunching content-block">
                                    <h3 className="wheel-stmnt">{this.props.content.projectedCrunchingHeader1}</h3>
                                    <h3 className="wheel-stmnt2">{this.props.content.projectedCrunchingHeader2}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = ProjectionCrunching;
