/**
 * @module PortalPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const _ = require('lodash');

const ComponentHeader = require('../common/ComponentHeader');
const PageHeader = require('../common/PageHeader');
const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');
const CaseItem = require('./portal/CaseItem');
const SectionFullWidth = require('../common/SectionFullWidth.jsx');
const LoadingSpinner = require('../LoadingSpinner');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');

const PortalActionCreator = require('../../actions/PortalActionCreator');
const PortalStore = require('../../stores/PortalStore');

function getStateFromStores() {
	return {
		cases: PortalStore.getAll(),
		caseTypes: ['CS', 'SA'],
	};
}

const PortalPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		appData: PropTypes.object,
	},

	/**
	 * Get values from store as well as set the first question.
	 * @return {object} initial state
	 */
	getInitialState() {
		return getStateFromStores();
	},

	componentDidMount() {
		// API call to initialise cases
		PortalActionCreator.requestPortalCases();

		PortalStore.addChangeListener(this.onStoreChange);
	},

	componentWillUnmount() {
		PortalStore.removeChangeListener(this.onStoreChange);
	},

	/**
	 * Store has been updated.
	 *
	 */
	onStoreChange() {
		this.setState(getStateFromStores());
	},

	/**
	 * Returns CaseItems from the list returned by the API.
	 */
	getCaseItems() {
		const cases = this.state.caseTypes
			.map(x => this.state.cases[x])
			.filter(x => !!x)
			.reduce((prev, curr) => prev.concat(curr), []);

		if (!cases || !cases.length) {
			return (<LoadingSpinner centerAlign backdrop imgSize={80} />);
		}

		return _.map(cases, (caseItem, index) => {
			return (<CaseItem caseItem={caseItem} key={`case-item-${index}`} caseIndex={index} {...this.props} />);
		});
	},

	render() {
		return (
			<div className="account-opening portal-page container-fluid">
				<Helmet title={this.props.content.portalPageTitle} />
				<PageHeader title={this.props.content.portalPageTitle} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper content={this.props.content}>
					<SectionFullWidth>
						<ComponentHeader
							title={this.props.content.portalPageSubTitle}
							titleLevel={1}
						>
							<div className="row">
								{this.getCaseItems()}
							</div>
						</ComponentHeader>
					</SectionFullWidth>
					</PageColumnWrapper>
					<SideBarColumnWrapper
						appData={this.props.appData}
						content={this.props.content}
					/>
				</div>
			</div>
		);
	},
});

module.exports = RequiresAuthenticatedUser(PortalPage);
