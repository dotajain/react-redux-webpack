const React = require('react');
const CreateAlert = require('./CreateAlert');
const CreateSweep = require('./CreateSweep');
const EditSweep = require('./EditSweep');
const EditAlert = require('./EditAlert');

const EditProjection = require('./EditProjection');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const AlertSweepModal = require('./AlertSweepModal');
const SweepsStores = require('../../stores/SweepsStores');
const ProjectionsStore = require('../../stores/ProjectionsStore');
const AlertsStore = require('../../stores/AlertsStore');
const AlertSweepInformation = require('./AlertSweepInformation');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const NewUserAlertSweepComponent = require('./NewUserAlertSweepComponent');
const BrowserUtils = require('../../utils/BrowserUtils');
const NumberUtils = require('../../utils/NumberUtils');
const ProjectionsActionCreator = require('../../actions/ProjectionsActionCreator');
const _ = require('lodash');
const { PropTypes } = React;

const ALERT_MODEL = 'alertModal';
const SWEEP_MODEL = 'sweepModal';
const ALERT = 'alert';
const SWEEP = 'sweep';
const timeOut = 3000;
let isLoaded = false;

const getStateFromStores = () => {
	return {
		sweepsData: AlertsNSweepsStore.getSweepsList(),
		alertsData: AlertsNSweepsStore.getAlertsList(),
		projectionAlertsData: AlertsNSweepsStore.getProjectionAlertsList(),

		modalSweepsCreated: false,
		modalSweepsUpdated: false,
		modalSweepsDeleted: false,
		modalAlertsCreated: false,
		modalAlertsUpdated: false,
		modalProjectionUpdated: false,
		compName: 'default',
		showModal: false,
		isRowClick: true,
		showLoader: false,
		showToggle: false,
	};
};

const AlertSweepComponent = React.createClass({
	propTypes: {
		content: PropTypes.object,
		accountName: PropTypes.string,
		sentence: PropTypes.string,
		alertInfoClick: PropTypes.func,
		data: PropTypes.object,
		id: PropTypes.string,
		type: PropTypes.string,
		setCss: PropTypes.func,
		backSweep: PropTypes.func,
		onClose: PropTypes.func,
	},
	getInitialState() {
		const object = getStateFromStores();
		object.alertName = '';
		return object;
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
		isLoaded = AlertsNSweepsStore.getLoadStatus();
	},

	componentDidMount() {
		AlertsNSweepsStore.addChangeListener(this.onStoreChange);
		SweepsStores.addChangeListener(this.onSweepStoreChange);
		AlertsStore.addChangeListener(this.onAlertStoreChange);
		ProjectionsStore.addChangeListener(this.onProjStoreChange);
	},

	componentWillReceiveProps(nextProps) {
		AlertsNSweepsStore.showErrorMessage() &&
			this.setState({ name: 'someTechnicalError' });

		if (nextProps.compName !== '') {
			this.setState({ compName: nextProps.compName });
		}
		if (nextProps.name !== '') {
			this.setState({ name: nextProps.name });
		}
	},

	componentWillUnmount() {
		AlertsNSweepsStore.removeChangeListener(this.onStoreChange);
		SweepsStores.removeChangeListener(this.onSweepStoreChange);
		AlertsStore.removeChangeListener(this.onAlertStoreChange);
		ProjectionsStore.removeChangeListener(this.onProjStoreChange);
	},
	onStoreChange() {
		if (AlertsNSweepsStore.showHeader()) {
			if (AlertsNSweepsStore.getLoadStatus()) {
				this.setState({ compName: 'default' });
			}
		}
	},
	onProjStoreChange() {
		const isToggleProjection = ProjectionsStore.isToggleProjection();
		if (ProjectionsStore.isUpdateProjection() && (isToggleProjection === null) && !this.state.showToggle) {
			this.setState({
				showModal: true,
				showLoader: false,
				name: 'editAlert',
			});
			setTimeout(
				() => {
					this.setState({ showModal: false, isRowClick: true });
					ProjectionsActionCreator.setProjectionEdited(false);
				},
				timeOut
			);

			this.props.setCss('');
		}
		this.setState({ compName: 'default', showToggle: false });
	},
	onSweepStoreChange() {
		const isToggleSweep = SweepsStores.isToggleSweep();
		if (!this.state.showToggle) {
			if (SweepsStores.isUpdateSweep() && (isToggleSweep === null)) {
				this.setState({
					showModal: true,
					name: 'editSweep',
				});
				this.props.setCss('');
			} else if (SweepsStores.isSweep()) {
				this.setState({
					showModal: true,
					name: 'createSweep',
				});
				this.props.setCss('');
			} else if (SweepsStores.getDelId()) {
				this.setState({
					showModal: true,
					name: 'deleteSweep',
				});
				this.props.setCss('');
			}

			setTimeout(
				() => {
					this.setState({ showModal: false, isRowClick: true });
				},
				timeOut
			);
		}
		this.setState({ compName: 'default', showLoader: false, showToggle: false });
	},
	onAlertStoreChange() {
		const isToggleAlert = AlertsStore.isToggleAlert();
		if (!this.state.showToggle && isToggleAlert === false) {
			if (AlertsStore.isUpdateAlert()) {
				this.setState({
					showModal: true,
					name: 'editAlert',
				});
				this.props.setCss('');
			} else if (AlertsStore.isAlert()) {
				this.setState({
					showModal: true,
					name: 'createAlert',
				});
				this.props.setCss('');
			}

			setTimeout(
				() => {
					this.setState({ showModal: false, isRowClick: true });
				},
				timeOut
			);
		}
		this.setState({ compName: 'default', showLoader: false, showToggle: false });
	},


	getNewComponent() {
		if ((AlertsNSweepsStore.getAlertsList().length > 0) || (AlertsNSweepsStore.getSweepsList().length > 0)
			|| (AlertsNSweepsStore.getProjectionAlertsList().length > 0)) {
			return false;
		} else {
			return true;
		}
	},
	getAlertsSweepsData(data, alertType) {
		const AlertRows = [];
		let sentence = '';
		let key = 0;
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].alert.length; j++) {
				const lessMore = data[i].alert[j].lessMore;
				const accountName = data[i].name;
				const thresholdAmount = data[i].alert[j].amount;
				const otherAccountId = data[i].otherAccountId;
				const targetAmount = data[i].alert[j].amount1;
				switch (alertType) {
					case SWEEP:
						key = i;
						if (otherAccountId !== null) {
							sentence = `When I have <strong>${lessMore}</strong> than <strong>${this.applyFormatting(thresholdAmount)}</strong> in my ${accountName} <strong>sweep</strong> money from <strong>${otherAccountId}</strong> to meet my target of <strong>${this.applyFormatting(targetAmount)}</strong> and send me a text.`;
						} else {
							sentence = 'The sweep was set up by your joint account holder.';
						}
						break;
					case ALERT:
						key = j;
						if (i > 0) {
							key = j + (i + i);
						}
						sentence = `When I have <strong>${lessMore}</strong> than <strong>${this.applyFormatting(thresholdAmount)}</strong> in my <strong>${accountName}</strong> send me a text.`;
						break;
					case 'projection':
						key = j;
						if (i > 0) {
							key = j + (i + i);
						}
						sentence = `When I am projected to have <strong>${lessMore}</strong> than <strong>${this.applyFormatting(thresholdAmount)}</strong> in my <strong>${accountName}</strong> please send me a text.`;
						break;
					default:
						break;
				}
				AlertRows.push(<AlertSweepInformation
					key={key} data={data[i]}
					headerName={data[i].alert[j].label}
					sentence={sentence}
					type={alertType}
					accountId = {data[i].account_id}
					alertInfoClick={this.alertInfoClick}
					toggleClick={this.toggleClick}
					toggleCheck={data[i].alert[j].enabled}
					thresholdAmount={ data[i].alert[j].amount}
					lessMore={data[i].alert[j].lessMore}
					accntClass = {this.getAccountClass(data[i].id) }
				/>);
			}
		}
		// AlertRows = _.sortBy(AlertRows, item => {
		// 	return [item.props.accntClass];
		// });
		return AlertRows;
	},

	getAccountClass(id) {
		return AlertsNSweepsStore.getAccountColour(id).accntClass;
	},

	/* sort sweeps list by account colour */
	getListData(dataList) {
		const listArr = [];
		dataList.forEach(data => {
			const obj = data;
			// added account class to sort data
			obj.accntClass = this.getAccountClass(data.id);
			listArr.push(obj);
		});

		return this.sortDataByAccountClass(listArr);
	},

	addAlertSweepProjectionInfo() {
		const AlertSweepProjectionRows = [];
		const sweepsData = this.getListData(AlertsNSweepsStore.getSweepsList());
		const alertsData = this.sortAlertsByLowBalance(AlertsNSweepsStore.getAlertsList());
		const projectionsData = this.getListData(AlertsNSweepsStore.getProjectionAlertsList());

		AlertSweepProjectionRows.push(this.getAlertsSweepsData(sweepsData, SWEEP));
		AlertSweepProjectionRows.push(this.getAlertsSweepsData(alertsData, ALERT));
		AlertSweepProjectionRows.push(this.getAlertsSweepsData(projectionsData, 'projection'));
		return AlertSweepProjectionRows;
	},

	sortDataByAccountClass(listArr) {
		return _.sortBy(listArr, item => {
			return [item.accntClass];
		});
	},

	applyFormatting(value) {
		let result = NumberUtils.decimalFormat(value, 3, false);
		// add minus prefix with pound symbol.
		if (String(result).indexOf('-') > -1) {
			result = `-£${String(result).split('-')[1]}`;
		} else {
			result = `£${result}`;
		}
		return result;
	},


	/* separating and listing low balance first then uppper balance */
	sortAlertsByLowBalance(alertsData) {
		let alertsArr = [];
		let lowAlerts = [];
		let upperAlerts = [];

		alertsData.forEach(data => {
			data.alert.forEach(alert => {
				// creating new object for low/more balance.
				const obj = {};
				obj.alert = [];
				obj.account_id = data.account_id;
				obj.counter = 0;
				obj.id = data.account_id;
				obj.name = data.name;
				obj.type = data.type;
				obj.alert.push(alert);
				obj.accntClass = this.getAccountClass(data.id);
				if (alert.lessMore === 'less') {
					lowAlerts.push(obj);
				} else if (alert.lessMore === 'more') {
					upperAlerts.push(obj);
				}
			});
		});

		// sort low alert by account class
		lowAlerts = this.sortDataByAccountClass(lowAlerts);
		// sort upper alerts by account class
		upperAlerts = this.sortDataByAccountClass(upperAlerts);

		// merge two array object
		alertsArr = _.union(lowAlerts, upperAlerts);
		return alertsArr;
	},


	toggleClick(type, name, isChecked) {
		if (!isChecked) {
			let accountName = name;
			if (type === SWEEP && AlertsNSweepsStore.isJointAccount()) {
				accountName = this.props.content.jointAccountHolders; // Joint Account Holders
			}
			this.setState({ showToggleOfMessage: true, alertName: accountName });
			setTimeout(
				() => { this.setState({ showToggleOfMessage: false }); },
				4000
			);
		}

		this.setState({ showToggle: true });
	},

	closeToggleMessage() {
		this.setState({ showToggleOfMessage: false });
	},

	showToggleOfMessage() {
		let msg = '';
		if (this.state.showToggleOfMessage) {
			switch (this.state.alertName) {
				case this.props.content.sweepAlert:
					msg = this.props.content.footerLabelSweep;
					break;
				case this.props.content.triggerListCell_lowerThresholdAlert_Title_Prefix:
					msg = this.props.content.footerLabelAlert;
					break;
				case this.props.content.triggerListCell_upperThresholdAlert_Title_Prefix:
					msg = this.props.content.footerLabelAlert;
					break;
				case this.props.content.projectionLowBalanceAlert:
					msg = this.props.content.footerLabelAlert;
					break;
				case this.props.content.jointAccountHolders:
					msg = this.props.content.footerLabelJointAccountHolder;
					break;
			}
			return (
				<div className="row no-gutters infoRow">
					<div className = "col-lg-1 col-md-1 col-sm-1 col-xs-2 infoIconStyle text-center">
						<a className="page-options opt-green ">
							<span className="icon icon-information"></span>
						</a>
					</div>
					<div className = "col-lg-10 col-md-10 col-sm-10 col-xs-8 text-left">
						<span>{msg}</span>
					</div>
					<div className = "col-lg-1 col-md-1 col-sm-1 col-xs-2 close-info text-center">
						<a className="page-options opt-green" onClick = {this.closeToggleMessage}>
							<span className="icon icon-close"></span>
						</a>
					</div>
				</div>
			);
		}
	},

	someTechnicalError() {
		this.setState({
			modalSweepsCreated: false,
			modalSweepsUpdated: false,
			modalSweepsDeleted: false,
			modalAlertsCreated: false,
			modalAlertsUpdated: false,
			modalProjectionUpdated: false,
			modalTechnicalError: true,
			name: 'someTechnicalError',
		});

		setTimeout(
			() => {
				this.setState({ modalTechnicalError: false });
			},
			4000
		);

		this.setState({ compName: 'default' });
	},

	showModal() {
		switch (true) {
			case SweepsStores.isSweep() && this.state.showModal:
				return true;
			case SweepsStores.isUpdateSweep() && this.state.showModal:
				return true;
			case AlertsStore.isAlert() && this.state.showModal:
				return true;
			case AlertsStore.isUpdateAlert() && this.state.showModal:
				return true;
			case SweepsStores.getDelId() && this.state.showModal:
				return true;
			case ProjectionsStore.isUpdateProjection() && this.state.showModal:
				return true;
			case this.state.name === SWEEP_MODEL:
				return true;
			case this.state.name === ALERT_MODEL:
				return true;
			case AlertsNSweepsStore.showErrorMessage():
				return true;
			default:
				return false;
		}
	},

	alertInfoClick(type, accountId, lessMore) {
		this.setState({ modalSweepsCreated: false, isRowClick: false });
		this.setState({ id: accountId, compName: `edit${type}`, lessMore: lessMore });
		AlertsNSweepsActionCreator.setCompName(`edit${type}`);
	},

	showProgress() {
		this.setState({ showLoader: true });
	},

	displayAlertSweep() {
		switch (AlertsNSweepsStore.getCompName()) {
			case 'default':
				return this.showAlertSweepList();
			case SWEEP:
				return <CreateSweep sweepId={this.state.id} backSweep={this.backSweep} content={this.props.content} sweepCreated={this.showProgress}/>;
			case ALERT:
				return <CreateAlert alertId={this.state.id} backAlert={this.backAlert} content={this.props.content} alertCreated={this.showProgress}/>;
			case 'editsweep':
				return <EditSweep deleteData={this.sweepDeleted} sweepId={this.state.id} backSweep={this.backSweep} content={this.props.content} sweepEdited={this.showProgress}/>;
			case 'editalert':
				return <EditAlert lessMore={this.state.lessMore} alertId={this.state.id} backAlert={this.backAlert} content={this.props.content} alertUpdated={this.showProgress}/>;
			case 'editprojection':
				return <EditProjection projectionId={this.state.id} backAlert={this.backAlert} content={this.props.content} projectionUpdated={this.showProgress}/>;
			// case 'newUser':
			// 	return <NewUserAlertSweepComponent sweepCreated={this.sweepCreated} content={this.props.content} setCss={this.setString} />;
			default:
				return this.showAlertSweepList();
		}
	},

	backSweep() {
		this.props.backSweep();
		this.setState({ compName: 'default' });
	},

	backAlert() {
		this.props.backSweep();
		this.setState({ compName: 'default' });
	},

	closePopup() {
		this.setState({ name: '' });
		this.props.onClose();
		AlertsNSweepsActionCreator.handleAlertsNSweepsError('', false);
	},
	createSweep() {
		AlertsNSweepsActionCreator.setCompName(SWEEP);
	},
	createAlert() {
		AlertsNSweepsActionCreator.setCompName(ALERT);
	},

	showAlertSweepList() {
		return (
			this.getNewComponent() ?
				<div>
					<NewUserAlertSweepComponent createAlert={this.createAlert} createSweep={this.createSweep} content={this.props.content} setCss={this.setString} />

				</div>
				:
				<div>
					<div className="row alert-body">
						<ul>
							{this.addAlertSweepProjectionInfo() }
						</ul>
					</div>
				</div>
		);
	},

	render() {
		let component = '';
		if (this.state.showLoader) {
			component = <div className="chicken-loading fade in"></div>;
		} else if (isLoaded) {
			component = (<div className="row content-wrapper">
				{this.displayAlertSweep() }
				{this.showToggleOfMessage() }
			</div>);
		}
		return (
			<div className="full-height">
				<div className="scroll-wrapper">
					{ component }
				</div>
				<AlertSweepModal
					closePopup={this.closePopup}
					confirmCancel={this.showModal() }
					content={this.props.content}
					errorResponse= {AlertsNSweepsStore.getErrorMessage() }
					name={this.state.name}
					/>
			</div>
		);
	},
});

module.exports = AlertSweepComponent;
