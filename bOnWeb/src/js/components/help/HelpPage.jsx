/**
 * @module HelpPage
 */
const React = require('react');
const Helmet = require('react-helmet');
const HelpPanel = require('./HelpPanel');
const HeaderComponent = require('../common/HeaderComponent');
const ModalComponent = require('../common/modals/ModalComponent');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const AboutB = require('./AboutB');
const AboutBMobile = require('./AboutBMobile');
const Talk = require('./Talk');
const TalkMobile = require('./TalkMobile');
const Email = require('./Email');
const EmailMobile = require('./EmailMobile');
const TermsConditions = require('./TermsConditions');
const HelpDemoComponent = require('./HelpDemoComponent');
const AnyQuestions = require('./AnyQuestions');
const BrowserUtils = require('../../utils/BrowserUtils');
const MobileOverlay = require('../common/MobileOverlay');
const TermsConditionStore = require('../../stores/TermsConditionStore');
const TermsConditionActionCreator = require('../../actions/TermsConditionActionCreator');
const { PropTypes } = React;

const HelpPage = React.createClass({
	propTypes: {
		confirmCancel: PropTypes.func,
		content: PropTypes.object,
		AnyQuestion: PropTypes.func,
		Demo: PropTypes.func,
	},

	getInitialState() {
        return {
			confirmCancel: false,
			isConfirming: this.props.confirmCancel,
			HelpContent: '',
			AnyQuestion: false,
			Demo: false,
			style: '',
			style1: '',
			AboutBsize: 'medium',
			showTermsCondition: false,
		};
    },
	componentWillMount() {
		BrowserUtils.setViewPort(1);
		TermsConditionStore.removeChangeListener(this.onStoreChange);
    },
	componentDidMount() {
        TermsConditionStore.addChangeListener(this.onStoreChange);
    },
	componentWillReceiveProps(nextProps) {
        this.setState({
            isConfirming: nextProps.confirmCancel,
        });
    },
    onStoreChange() {
		this.setState({ showTermsCondition: TermsConditionStore.getShowTC() });
		if (TermsConditionStore.getShowTC()) {
			const AboutBsize = this.isMobileDevice() ? 'small' : 'large';
			this.setState({ confirmCancel: true, HelpContent: <TermsConditions content={this.props.content} closed={this.closed} tcData={TermsConditionStore.getAll() } />, title: 'Terms & Conditions', AboutBsize: AboutBsize });
		}
    },
	confirmCancel() {
        this.setState({
            isConfirming: false,
        });
    },

	closed() {
		this.setState({ confirmCancel: false });
		this.setState({ AnyQuestion: false });
		this.setState({ Demo: false, HelpContent: '' });
	},

	// To show the Modal on every click of HelpPanel.
	HelpModal(e) {
		let isConfirm = true;
		let style = '';
		let AboutBsize = 'medium';

		switch (e) {
			case 'Talk':
				isConfirm = true;
				style = 'height-auto talk-width';
				if (this.isMobileDevice()) {
					this.setState({ HelpContent: e });
				} else {
					this.setState({ HelpContent: <Talk content={this.props.content} closed={this.closed} />, title: 'Talk' });
				}
				break;

			case 'Email':
				isConfirm = true;
				style = 'height-auto';
				if (this.isMobileDevice()) {
					this.setState({ HelpContent: e });
				} else {
					this.setState({ HelpContent: <Email content={this.props.content} closed={this.closed} />, title: 'Email' });
				}
				break;

			case 'Any questions?':
				isConfirm = false;
				this.setState({ AnyQuestion: true });
				break;

			case 'Demo':
				isConfirm = false;
				this.setState({ Demo: true });
				break;

			case 'About B':
				isConfirm = true;
				AboutBsize = 'large';
				if (this.isMobileDevice()) {
					this.setState({ HelpContent: e });
				} else {
					this.setState({ HelpContent: <AboutB content={this.props.content} closed={this.closed}/>, title: 'About B' });
				}
				break;

			case 'T&Cs':
				isConfirm = false;
				// AboutBsize = this.isMobileDevice() ? 'small' : 'large';
				// this.setState({ HelpContent: <TermsConditions content={this.props.content} closed={this.closed} tcData={this.state.tcData} />, title: 'Terms & Conditions' });
				this.setState({ HelpContent: 'TnC' });
				TermsConditionActionCreator.getTcData();
				break;

			case 'Protecting your money':
				isConfirm = false;
				window.open(this.props.content.BankUrl);
				break;
		}

		this.setState({ confirmCancel: isConfirm, style: style, AboutBsize: AboutBsize });
	},
	isMobileDevice() {
		const screenSize = BrowserUtils.getScreenSize();
		const screenWidth = screenSize ? screenSize.x : undefined;
		const isMobileDevice = screenWidth < 768;

		return isMobileDevice;
	},
	openFaq() {
		this.setState({ AnyQuestion: true });
	},
	renderLoadingImage() {
        return <div className="chicken-loading" />;
    },
	renderMobileHelp() {
		if (this.state.HelpContent === 'Talk') {
			return <TalkMobile {...this.props} closed={this.closed}/>;
		} else if (this.state.HelpContent === 'Email') {
			return <EmailMobile {...this.props} closed={this.closed}/>;
		} else if (this.state.HelpContent === 'About B') {
			return <AboutBMobile {...this.props} closed={this.closed}/>;
		} else if (this.state.Demo) {
			return <HelpDemoComponent {...this.props} closed={this.closed}/>;
		} else if (this.state.AnyQuestion) {
			return <AnyQuestions {...this.props} closed={this.closed}/>;
		} else {
			if (this.state.HelpContent === 'TnC' && !this.state.showTermsCondition) {
				return this.renderLoadingImage();
			} else {
				return this.renderHelp();
			}
		}
	},
	renderHelpOption() {
		if (this.isMobileDevice()) {
			return this.renderMobileHelp();
		}

		if (this.state.Demo) {
			return <HelpDemoComponent {...this.props} closed={this.closed}/>;
		} else if (this.state.AnyQuestion) {
			return <AnyQuestions {...this.props} closed={this.closed}/>;
		} else {
			if (this.state.HelpContent === 'TnC' && !this.state.showTermsCondition) {
				return this.renderLoadingImage();
			} else {
				return this.renderHelp();
			}
		}
	},
	renderHelp() {
		return (
			<div className="b container-fluid-full">
				<Helmet title="HelpPage" />
				<HeaderComponent selectedTab="help" {...this.props} openFaq={this.openFaq}/>
				<div className="main-container">
					{this.state.confirmCancel && <ModalComponent closed={this.closed} title={this.state.title} confirmCancel={this.state.confirmCancel} helpConent={this.state.HelpContent} style={this.state.style} bsSize= {this.state.AboutBsize}/>
					}
					<div className="scroll-wrapper no-scroll">
						<div className="row help content-wrapper">
							<MobileOverlay selectedTab="help" content={this.props.content} openFaq={this.openFaq}/>
							<h3 className="page-title text-center">{this.props.content.HelpPageHeading}</h3>

							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

								<HelpPanel {...this.props} panelName="Talk" src="icon icon-help-talk" onClick={this.HelpModal} panelLine={this.props.content.talkLine}/>

								<HelpPanel {...this.props} panelContent="Send your feedback" panelName="Email" src="icon icon-help-email" onClick={this.HelpModal} panelLine={this.props.content.emailLine}/>

								<HelpPanel {...this.props} panelName="Any questions?" src="icon icon-help-questions" onClick={this.HelpModal} panelLine={this.props.content.faqLine}/>

								<HelpPanel {...this.props} panelName="Demo" src="icon icon-help-demo" onClick={this.HelpModal} panelLine={this.props.content.demoLine}/>


								<HelpPanel {...this.props} panelName="About B" src="icon icon-help-reminders" onClick={this.HelpModal} panelLine={this.props.content.aboutBLine}/>

								<HelpPanel {...this.props} panelName="T&Cs" src="icon icon-case" onClick={this.HelpModal} panelLine={this.props.content.tncLine}/>

								<HelpPanel {...this.props} cssClass= "for-protected" panelName="Protecting your money" src="icon icon-fscs" onClick={this.HelpModal} panelLine={this.props.content.protectedLine}/>

							</div>
						</div>
					</div>
				</div>

			</div>);
	},
	render() {
		return (
			<div>
				{this.renderHelpOption() }
			</div>
		);
	},
});

module.exports = RequiresAuthenticatedUser(HelpPage);
