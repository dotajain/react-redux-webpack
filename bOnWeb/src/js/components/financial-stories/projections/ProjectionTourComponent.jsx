/**
* @module projection Demo Component
*/
const React = require('react');
const config = require('../../../config');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
const Pagination = require('./ProjectionPagination');
const ProjectionDemoGo = require('./ProjectionDemoGo');
const { PropTypes } = React;
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const BrowserUtils = require('../../../utils/BrowserUtils');
const AutoPlaySwipeableViews = bindKeyboard(SwipeableViews);
const _ = require('lodash');
const styles = {
	slide: {
		padding: 15,
		paddingTop: 0,
		minHeight: 500,
		color: '#57575f',
		fontSize: '23' + 'px',
		background: '#f3f3f3',
		textAlign: 'center',
		paddingBottom: '50' + 'px',
	},

	slideGreen: {
		padding: 15,
		paddingTop: 0,
		minHeight: 500,
		color: '#57575f',
		fontSize: '23' + 'px',
		background: '#00db6d',
		textAlign: 'center',
		paddingBottom: '50' + 'px',
	},

	mobilesSlide: {
		padding: 15,
		minHeight: 500,
		color: '#57575f',
		fontSize: '23' + 'px',
		background: '#f8f8f8',
		textAlign: 'center',
		paddingBottom: '50' + 'px',
	},

	img: {
		 width: 973,
	},

};

const ProjectionTourComponent = React.createClass({

	propTypes: {
		content: PropTypes.object,
		closed: PropTypes.func,
	},
	getInitialState() {
		return {
			index: 0,
			Go: false,
		};
	},

	// To get the text under every image.
	demoText(index) {
		if (this.isMobileDevice()) {
			const demoMsg = [
			];
			return demoMsg[index];
		}
		else {
			const demoMsg = [
				'Projections Quick Tour',
				'Projections Quick Tour',
				'Projections Quick Tour',
				'Projections Quick Tour',
				'Projections Quick Tour',
			];
			return demoMsg[index];
		}
	},

	// Demo images will be moved left side.
	swipeLeft() {
		if (this.state.index > 0) {
			this.setState({ index: this.state.index - 1 });
		}
	},

	// Demo images will be moved right side.
	swipeRight() {
		const index = this.isMobileDevice() ? 5 : 5;
		if (this.state.index === index) {
			this.setState({ Go: true });
		}
		else {
			this.setState({
				index: this.state.index + 1,
			});
		}
	},

	// On click change the index of dot.
	handleChangeIndex(index) {
		this.setState({
			index: index,
		});
	},

	closed() {
		this.setState({ Go: false });
	},
	isMobileDevice() {
		const screenSize = BrowserUtils.getScreenSize();
		const screenWidth = screenSize ? screenSize.x : undefined;
		const isMobileDevice = screenWidth < 768;

		return isMobileDevice;
	},
	disabledIcon(){
		if(this.state.index == 0){
			return "icon icon-page-back icon-arrow-disabled";
		}else {
			return "icon icon-page-back";
		}
	},
	changeBackgroundFluidFull(){
		if(this.state.index == 5){
			return "b container-fluid-full help bg-help demo-full-width greenBackground";
		}else {
			return "b container-fluid-full help bg-help demo-full-width";
		}
	},
	changeBackgroundGutters(){
		if(this.state.index == 5){
			return "row no-gutters greenBackground";
		}else {
			return "row no-gutters";
		}
	},
	disabledRightIcon(){
		if(this.state.index == 5){
			return "icon icon-page-next icon-arrow-disabled";
		}else {
			return "icon icon-page-next";
		}
	},
	disabledLeftIcon(){
		if(this.state.index == 0){
			return "icon icon-page-back icon-arrow-disabled";
		}else if(this.state.index == 5){
			return "icon icon-page-back whiteArrow";
		} else {
			return "icon icon-page-back";
		}
	},
	renderHelpDemoWeb() {
		return (<div className="col-lg-12 col-md-12 demo-title">
			<a className={this.disabledLeftIcon()}  onClick={this.swipeLeft}></a>
			<AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} >

				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Toggle.png" alt="" title="" />
					<p style={{fontSize:'20px'}}>{this.props.content.TutorialProjectionsslide1Text}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/DD-SO.png" alt="" title="" />
					<p style={{fontSize:'20px'}}>{this.props.content.TutorialProjectionsslide2Text}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Toggle-Tags.png" alt="" title="" />
					<p style={{fontSize:'20px'}}>{this.props.content.TutorialProjectionsslide3Text}</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Projections.png" alt="" title="" />
					<p style={{fontSize:'20px'}}>{this.props.content.TutorialProjectionsslide4Text}</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/projection_tour_wheel.png" alt="" title="" />
					<p style={{fontSize:'20px'}}>{this.props.content.TutorialProjectionsslide5Text}</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slideGreen)}>
						<ProjectionDemoGo {...this.props} closed={this.props.closed} />
				</div>

			</AutoPlaySwipeableViews>
			<a className={this.disabledRightIcon()} onClick={this.swipeRight}></a>
			<Pagination
				dots={6}
				index={this.state.index}
				onChangeIndex={this.handleChangeIndex}
				/>
		</div>);
	},
	renderHelpDomeMobile() {
		return (
			<div className="col-lg-12 col-md-12 demo-title">
				<a className={this.disabledLeftIcon()} onClick={this.swipeLeft}></a>
				<AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Toggle.png" alt="" title="" />
					<p>To start, B will take into account what you've tagged as earnings</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/DD-SO.png" alt="" title="" />
					<p>Review your Commitments; these are Standing Orders and Direct Debits on your account</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Toggle-Tags.png" alt="" title="" />
					<p>Select the tags which are essential to you, and B will incorporate the spending on these tags to make your projection more relevant</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/Projections.png" alt="" title="" />
					<p>Look ahead to keep track of projected earnings and commitments, and receive alerts if you're going to run low</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slide3)}>
					<img style={_.assign({}, styles.img)} src="../images/b/projection_tour_wheel.png" alt="" title="" />
					<p>B will give you a projected discretionary balance (good to go) or give you a heads up on when you may be running low</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slideGreen)}>
						<ProjectionDemoGo {...this.props} closed={this.props.closed} />
				</div>
				</AutoPlaySwipeableViews>
				<a className={this.disabledRightIcon()} onClick={this.swipeRight}></a>
				<Pagination
					dots={6}
					index={this.state.index}
					onChangeIndex={this.handleChangeIndex}
					/>
			</div>);
	},
	renderHelpDemoPages() {
		if (this.isMobileDevice())
			return this.renderHelpDomeMobile();
		else
			return this.renderHelpDemoWeb();
	},
	backToProjection(){
        AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
				description: config.analytics.analytics_action_projections_demo_back,
				event: 'click',
			});
		FinancialStoriesActionCreator.handleUpdateFSTileClick();
		AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
	},
	render() {
		return (
				<div className={this.changeBackgroundFluidFull()}>
					<div className={this.changeBackgroundGutters()}>
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
						  {this.state.index==5?'':<div className="demo"><a className="icon" onClick={this.backToProjection}>Back</a></div>}
						</div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
							{this.state.index >= 0 ?
								<h3>{this.demoText(this.state.index)}</h3> : <h3>&nbsp; </h3>
							}
						</div>
						<div className="col-lg-2 col-md-2 8 col-sm-2 col-xs-2 text-right">
							
						</div>
					</div>
					{this.renderHelpDemoPages()}
				</div>
		);
	},
});

module.exports = ProjectionTourComponent;
