/**
 * @module AlertsSweepsPage
 */

const React = require('react');
const Helmet = require('react-helmet');
const AlertSweepComponent = require('./AlertSweepComponent');
const AlertsSweepsError = require('./AlertsSweepsError');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const HeaderComponent = require('../common/HeaderComponent');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const MobileOverlay = require('../common/MobileOverlay');
const { PropTypes } = React;
const ALERT_MODEL = 'alertModal';
const SWEEP_MODEL = 'sweepModal';
const ALERT = 'alert';
const SWEEP = 'sweep';
const AnyQuestions = require('../help/AnyQuestions');

const getStateFromStores = () => {
	return {
		sweepsData: AlertsNSweepsStore.getSweepsList(),
		alertsData: AlertsNSweepsStore.getAlertsList(),
		projectionAlertsData: AlertsNSweepsStore.getProjectionAlertsList(),
		isNetworkError: AlertsNSweepsStore.isNetworkError(),
	};
};

const AlertsSweepsPage = React.createClass({

	propTypes: {
		content: PropTypes.object,
	},

	getInitialState() {
		return {
			storeChanged: false,
			sweepsData: AlertsNSweepsStore.getSweepsList(),
			alertsData: AlertsNSweepsStore.getAlertsList(),
			projectionAlertsData: AlertsNSweepsStore.getProjectionAlertsList(),
			compName: '',
			name: '',
			faqFlag: false,
			isNetworkError: AlertsNSweepsStore.isNetworkError(),
			headerClass: null,
		};
	},

	componentWillMount() {
		this._loadInitActions();
	},

	componentDidMount() {
		AlertsNSweepsStore.addChangeListener(this.onStoreChange);
		AnalyticsActionCreator.track({
            path: '/user/experience/view',
            action: 'Appeared',
        }, {
                description: 'PageLoaded',
			});
	},

	onStoreChange() {
		this.setState(getStateFromStores());
		this.setState({ storeChanged: true });
		if (AlertsNSweepsStore.showHeader()) {
			if (AlertsNSweepsStore.getLoadStatus()) {
				this.setState({ alertSweepClass: 'alertSweep' });
			} else {
				this.setState({ alertSweepClass: 'alertnsweep' });
			}
			this.setString('');
		} else {
			this.setString('Edit');
		}
	},

	onClose() {
		this.setState({ compName: '', name: '' });
	},

	setString(type) {
		switch (type) {
			case 'Edit':
				this.setState({ alertSweepClass: 'create-alert' });

				break;
			default:
				const sweepsData = AlertsNSweepsStore.getSweepsList();
				const alertsData = AlertsNSweepsStore.getAlertsList();
				const projectionAlertsData = AlertsNSweepsStore.getProjectionAlertsList();
				if (sweepsData.length === 0 && alertsData.length === 0
					&& projectionAlertsData.length === 0) {
					this.setState({ alertSweepClass: 'alertnsweep' });
				} else {
					this.setState({ alertSweepClass: 'alertSweep' });
				}
				break;
		}
	},

	getNewComponent() {
		if ((AlertsNSweepsStore.getAlertsList().length > 0) || (AlertsNSweepsStore.getSweepsList().length > 0)
			|| (AlertsNSweepsStore.getProjectionAlertsList().length > 0)) {
			return false;
		} else {
			return true;
		}
	},

	_reload() {
		this._loadInitActions();
	},

	_loadInitActions() {
		AlertsNSweepsStore.setAccountList();
		AlertsNSweepsStore.getAccountDetails();
		AlertsNSweepsActionCreator.getAlertsList();
		AlertsNSweepsActionCreator.getSweepsList();
		AlertsNSweepsActionCreator.getProjectionAlertsList();
	},

	createSweep() {
		if (AlertsNSweepsStore.showSweepPage()) {
			AlertsNSweepsActionCreator.setCompName(SWEEP);
		} else {
			AlertsNSweepsActionCreator.resetFlag(true);
			this.setState({ name: SWEEP_MODEL });
		}
	},

	createAlert() {
		if (AlertsNSweepsStore.showAlertPage()) {
			AlertsNSweepsActionCreator.setCompName(ALERT);
		} else {
			AlertsNSweepsActionCreator.resetFlag(true);
			this.setState({ name: ALERT_MODEL });
		}
	},

	showHeader() {
		if (AlertsNSweepsStore.showHeader()) {
			return <HeaderComponent selectedTab="alerts" {...this.props} openFaq={this.openFaq}/>;
		}
	},

	componentWillUnMount() {
		AlertsNSweepsStore.removeChangeListener(this.onStoreChange);
	},
	getHeaderClass(e) {
		this.setState({ headerClass: e });
	},

	showPageHeader() {
		if (this.showHeader() && !this.getNewComponent()) {
			return (<div className="full-width">
				<div className="alert-head row no-gutters">
					<div className = "col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<h4>{this.props.content.alertsSweepsHead}</h4>
						<MobileOverlay getHeaderClass={this.getHeaderClass} selectedTab="alerts" createSweep={this.createSweep} content={this.props.content} createAlert={this.createAlert} openFaq={this.openFaq}/>
					</div>
					<div className = "col-lg-8 col-md-8 col-sm-0">
						<a className="page-options opt-green float-right" onClick={this.createSweep}>
							<span className="icon icon-add"></span>
							Create my sweeps
						</a>
						<a className="page-options opt-green float-right" onClick={this.createAlert}>
							<span className="icon icon-add"></span>
							Create my alerts
						</a>
					</div>
				</div>
			</div>);
		}
	},
	// showloader not used..
	showMainContent() {
		return (
			<AlertSweepComponent content={this.props.content} setCss={this.setString} compName={this.state.compName} name={this.state.name} onClose={this.onClose}
				showLoader={this.showProgress} stopLoader={this.stopLoader} createAlert={this.newCreateAlert}
			/>
		);
	},
	showLoader() {
		if (!AlertsNSweepsStore.getLoadStatus()) {
			return <div className="chicken-loading fade in"></div>;
		}
	},
	openFaq() {
        this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
	render() {
		let component;
		let moduleName = '';
		let alertSweepClass = '';

		const storeChanged = this.state.storeChanged;
		const isNetworkError = this.state.isNetworkError;
		const faqFlag = this.state.faqFlag;
		const isLoaded = AlertsNSweepsStore.getLoadStatus();
		if (isLoaded) {
			const sweepsData = AlertsNSweepsStore.getSweepsList();
			const alertsData = AlertsNSweepsStore.getAlertsList();
			const projectionAlertsData = AlertsNSweepsStore.getProjectionAlertsList();
			if (sweepsData.length > 0 || alertsData.length > 0 || projectionAlertsData.length > 0) {
				alertSweepClass = 'alertSweep';
			} else {
				alertSweepClass = 'alertnsweep';
			}
		}
		if (this.state.alertSweepClass === 'create-alert') {
			alertSweepClass = this.state.alertSweepClass;
		}

		if (isLoaded) {
			moduleName = alertSweepClass;
		}

		if (storeChanged) {
			if (isLoaded) {
				if (faqFlag) {
					component = <AnyQuestions {...this.props} closed = {this.closeFaq}/>;
				} else {
					component = (
						<div className={`main-container ${moduleName}`}>
							{ this.showLoader() }
							{ AlertsNSweepsStore.getLoadStatus() && this.showPageHeader() }
							{ AlertsNSweepsStore.getLoadStatus() && this.showMainContent() }
						</div>);
				}
			} else if (isNetworkError) {
				component = <AlertsSweepsError content={this.props.content} reload={this._reload}/>;
			}
		} else {
			if (faqFlag) {
				component = <AnyQuestions {...this.props} closed = {this.closeFaq}/>;
			} else {
				component = (
					<div className={`main-container ${moduleName} ${this.state.headerClass}`}>
						{ this.showLoader() }
						{ AlertsNSweepsStore.getLoadStatus() && this.showPageHeader() }
						{ AlertsNSweepsStore.getLoadStatus() && this.showMainContent() }
					</div>);
			}
		}
		return (
				this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
			<div className="b container-fluid-full">
				<Helmet title="Alerts & Sweeps" />
				{this.showHeader() }
				{ component }
			</div>

		);
	},
});

module.exports = RequiresAuthenticatedUser(AlertsSweepsPage);
