/**
 * @module FinancialStoriesPage
 */

const React = require('react');
const { PropTypes } = React;
const config = require('../../config');
const Helmet = require('react-helmet');
const FinancialStoriesComponent = require('./FinancialStoriesComponent');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const TileComponent = require('./TileComponent');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../constants/FinancialStoriesConstants');
const ProjectionsPage = require('./projections/ProjectionPage');
const ProjectionTourComponent = require('./projections/ProjectionTourComponent');
const AnyQuestions = require('../help/AnyQuestions');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const ProjectionActionCreator = require('../../actions/ProjectionActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
let dummyVal = '';

const getStateFromStores = () => {
	return {
		transactionsState: FinancialStoriesStore.getState(),
		microData: FinancialStoriesStore.getMicroTileData(),
		cashpointData: FinancialStoriesStore.getCashPointData(),
		inoutData: FinancialStoriesStore.getInOutData(),
		projectionData: FinancialStoriesStore.getProjectionData(),
		matchAllForDropDown: FinancialStoriesStore.getMatchAllForDropDown(),
		isPopupOpen: false,
	};
};

const FinancialStoriesPage = React.createClass({
	propTypes: {
		content: PropTypes.object,
		data: PropTypes.object,
	},

	getInitialState() {
		const obj = getStateFromStores();
		obj.financialStoriesClass = 'account-details';
		return obj;
	},
	componentDidMount() {
		FinancialStoriesStore.addChangeListener(this.onStoreChange);
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
				description: 'PageLoaded',
			});
	},
	componentWillReceiveProps() {
		if (!this.state.transactionsState.fsTileClick) {
			this.setState({ financialStoriesClass: 'account-details' });
		}
	},
	componentWillUnmount() {
		FinancialStoriesStore.removeChangeListener(this.onStoreChange);
	},

	onFSTileClick(tile) {
		FinancialStoriesActionCreator.handleFinancialStoriesTile(tile);
	},

	onStoreChange() {
		const obj = getStateFromStores();
		obj.financialStoriesClass = this.state.transactionsState.fsTileClick ? this.state.transactionsState.financialStoriesClass : this.state.financialStoriesClass;
		this.setState(obj);
		this.setState({ isPopupOpen: FinancialStoriesStore.getPopupState() });
	},
	onHelpClick() {
		this.setState({ financialStoriesClass: '' });
		dummyVal = 1;
		FinancialStoriesStore.getAccountHelpOpen();
	},
	onCloseHelp() {
		dummyVal = '';
		FinancialStoriesActionCreator.setAccountHelp(false);
		AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
	},
	getComponent() {
		if (!FinancialStoriesStore.getAccountHelpOpen()) {
			return <FinancialStoriesComponent onHelpClick={this.onHelpClick} onMicroTileClick={this.onFSTileClick} content={this.props.content} isPopupOpen={this.state.isPopupOpen} />;
		} else {
			return <AnyQuestions content={this.props.content} closed={this.onCloseHelp} />;
		}
	},
	tourDoneClick() {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
				description: config.analytics.analytics_action_projections_demo_complete,
				event: 'click',
			});
		this.setState({
			projectionData: { notEnabled: false },
		});
		ProjectionActionCreator.handleFSProjectionTourDone();
		console.log(this.state.projectionData);
	},
	assignTileComponent() {
		if (this.state.transactionsState.fsTileClick) {
			switch (this.state.transactionsState.fsTileClick) {
				case FinancialStoriesConstants.microTransactions:
					return <TileComponent tileType="microTransactions" dropDownData={this.state.matchAllForDropDown} content={this.props.content} data={this.state.microData} />;
				case FinancialStoriesConstants.cashpoint:
					return <TileComponent tileType="cashpoint" dropDownData={this.state.matchAllForDropDown} content={this.props.content} data={this.state.cashpointData} />;
				case FinancialStoriesConstants.insAndOuts:
					return <TileComponent tileType="insAndOuts" dropDownData={this.state.matchAllForDropDown} content={this.props.content} data={this.state.inoutData} />;
				case FinancialStoriesConstants.projection:
					if (this.state.projectionData.notEnabled) {
						return (<ProjectionTourComponent closed={this.tourDoneClick} content={this.props.content} />);
					}
					return <ProjectionsPage {...this.props} data={this.state.projectionData} />;
				default:
			}
		}
	},
	render() {
		let colorIndex = FinancialStoriesStore.getAccountColorIndex();
		colorIndex = colorIndex === 0 ? 1 : colorIndex;
		return (
			<div className="b container-fluid-full">
				<Helmet title="FinancialStories" />
				<div className={`main-container${dummyVal} ${this.state.financialStoriesClass} account-${colorIndex}`} onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';">
					{this.state.transactionsState.fsTileClick ? this.assignTileComponent() :
						this.getComponent()
					}
				</div>
			</div>
		);
	},
});
module.exports = RequiresAuthenticatedUser(FinancialStoriesPage);
