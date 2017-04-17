/**
* @module HelpDemoComponent
*/
const React = require('react');
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
const Pagination = require('./Pagination');
const PaginationMobile = require('./PaginationMobile');
const DemoGo = require('./DemoGo');
const { PropTypes } = React;
const BrowserUtils = require('../../utils/BrowserUtils');
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

const HelpDemoComponent = React.createClass({

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
				'',
				'Timeline',
				'Tagging',
				'Payments',
				'Alerts & Sweeps',
				'Sweeps',
				'Help',
			];
			return demoMsg[index];
		} else {
			const demoMsg = [
				'',
				'Timeline',
				'Insights',
				'Tagging',
				'Spending',
				'Savings Pots',
				'Payments',
				'Alerts and Messages',
				'Sweeps',
				'Projections',
				'Help',
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
		const index = this.isMobileDevice() ? 7 : 11;
		if (this.state.index === index) {
			this.setState({ Go: true });
		} else {
			this.setState({
				index: this.state.index + 1,
			});
		}
	},

	// On click change the index of dot.
	handleChangeIndex(index) {
		if (index === 0 && this.state.index === 10) {
			this.setState({ Go: true });
		}
		if (index === 10 && this.state.index === 0) {
			return (false);
		}
		this.setState({
			index: index,
		});
	},

	handleChangeMobileIndex(index) {
		if (index === 0 && this.state.index === 6) {
			this.setState({ Go: true });
		}
		if (index === 6 && this.state.index === 0) {
			return (false);
		}
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
	disabledLeftIcon() {
		if (this.state.index === 0) {
			return 'icon icon-page-back icon-arrow-disabled';
		} else {
			return 'icon icon-page-back';
		}
	},
	changeBackgroundFluidFull() {
		const index = this.isMobileDevice() ? 7 : 11;
		if (this.state.index === index) {
			return 'b container-fluid-full help bg-help greenBackground';
		} else {
			return 'b container-fluid-full help bg-help';
		}
	},
	changeBackgroundGutters() {
		const index = this.isMobileDevice() ? 7 : 11;
		if (this.state.index === index) {
			return 'row no-gutters greenBackground';
		} else {
			return 'row no-gutters';
		}
	},
	changeBackgroundInternalDiv() {
		const index = this.isMobileDevice() ? 7 : 11;
		if (this.state.index === index) {
			return 'col-lg-12 col-md-12 demo-title greenBackground';
		} else {
			return 'col-lg-12 col-md-12 demo-title';
		}
	},
	disabledRightIcon() {
		const index = this.isMobileDevice() ? 7 : 11;
		if (this.state.index === index) {
			return 'icon icon-page-next icon-arrow-disabled';
		} else {
			return 'icon icon-page-next';
		}
	},
	renderHelpDemoWeb() {
//	{this.dynamicClass()}
//	<a className="icon icon-page-back" onClick={ this.swipeLeft }></a>

		return (<div className={this.changeBackgroundInternalDiv()}>
			<a className={this.disabledLeftIcon()} onClick={ this.swipeLeft }></a>
			<AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} >
				<div style={_.assign({}, styles.slide, styles.slide1) }>
					<img style={_.assign({}, styles.img) } className="big-b" width="20%" src="../images/b/icons/Demo-B.png" alt="" title="" />
					<p>{this.props.content.BImg}</p>
				</div>
				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/timeline.png" alt="" title="" />
					<p>{this.props.content.TimelineImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Insights.png" alt="" title="" />
					<p>{this.props.content.InsightsImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Tagging.png" alt="" title="" />
					<p>{this.props.content.TaggingImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Spending.png" alt="" title="" />
					<p>{this.props.content.SpendingImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/SavingsPots.png" alt="" title="" />
					<p>{this.props.content.SavingsPotsImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Payments.png" alt="" title="" />
					<p>{this.props.content.PaymentsImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide1) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Alerts&Messages.png" alt="" title="" />
					<p>{this.props.content.AlertsMessagesImg}</p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Sweeps.png" alt="" title="" />
					<p>{this.props.content.SweepsImg} </p>
				</div>

				<div style={_.assign({}, styles.slide, styles.slide3) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Projections.png" alt="" title="" />
					<p>{this.props.content.ProjectionsImg}</p>
				</div>


				<div style={_.assign({}, styles.slide, styles.slide2) }>
					<img style={_.assign({}, styles.img) } src="../images/b/Help.png" alt="" title="" />
					<p>{this.props.content.HelpImg}</p>
				</div>

				<div style={_.assign({}, styles.mobilesSlide, styles.slideGreen) }>
						<DemoGo {...this.props} closed={this.props.closed}/>
				</div>
			</AutoPlaySwipeableViews>
			<a className={this.disabledRightIcon()} onClick={ this.swipeRight }></a>
			<Pagination dots={12} index={this.state.index} onChangeIndex={this.handleChangeIndex} />
		</div>);
	},
	renderHelpDomeMobile() {
		return (
			<div className={this.changeBackgroundInternalDiv()}>
				<a className={this.disabledLeftIcon()} onClick={ this.swipeLeft }></a>
				<AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeMobileIndex}>
					<div style={_.assign({}, styles.mobilesSlide, styles.slide1) }>
						<img style={_.assign({}) } width = "100%" src="../images/b/icons/MlaunchB.png" alt="" title="" />
					</div>
					<div style={_.assign({}, styles.mobilesSlide, styles.slide3) }>
						<img style={_.assign({}) } width="100%" src="../images/b/Mtimeline.png" alt="" title="" />
					</div>

					<div style={_.assign({}, styles.mobilesSlide, styles.slide3) }>
						<img style={_.assign({}) } width="100%" src="../images/b/MTagging.png" alt="" title="" />
					</div>
					<div style={_.assign({}, styles.mobilesSlide, styles.slide3) }>
						<img style={_.assign({}) } width="100%" src="../images/b/MPayments.png" alt="" title="" />
					</div>

					<div style={_.assign({}, styles.mobilesSlide, styles.slide1) }>
						<img style={_.assign({}) } width="100%" src="../images/b/MAlerts.png" alt="" title="" />
					</div>

					<div style={_.assign({}, styles.mobilesSlide, styles.slide3) }>
						<img style={_.assign({}) } width="100%" src="../images/b/MCreateSweeps.png" alt="" title="" />
					</div>
					<div style={_.assign({}, styles.mobilesSlide, styles.slide2) }>
						<img style={_.assign({}) } width="100%" src="../images/b/MNeedhelp.png" alt="" title="" />
					</div>
					<div style={_.assign({}, styles.mobilesSlide, styles.slideGreen) }>
						<DemoGo {...this.props} closed={this.props.closed}/>
					</div>
				</AutoPlaySwipeableViews>
				<a className={this.disabledRightIcon()} onClick={ this.swipeRight }></a>
				<PaginationMobile dots={8} index={this.state.index} onChangeIndex={this.handleChangeMobileIndex} />
			</div>);
	},
	renderHelpDemoPages() {
		if (this.isMobileDevice()) {
			return this.renderHelpDomeMobile();
		}	else {
			return this.renderHelpDemoWeb();
		}
	},
	render() {
		return (
				<div className={this.changeBackgroundFluidFull()}>
					<div className={this.changeBackgroundGutters()}>
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
							{this.state.index > 0 ?
								<h3><b>{this.demoText(this.state.index) }</b></h3> : <h3>&nbsp; </h3>
							}
						</div>
						<div className="col-lg-2 col-md-2 8 col-sm-2 col-xs-2 text-right">
							<div className="demo"><a className="icon" onClick={ this.props.closed}>{this.props.content.DemoSkipButton}</a></div>
						</div>
					</div>


					{this.renderHelpDemoPages() }


				</div>
		);
	},
});

module.exports = HelpDemoComponent;
