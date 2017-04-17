/**
 * @module NBAComponent
 */
const React = require('react');
const { PropTypes } = React;
const Panel = require('react-bootstrap/lib/Panel');
const config = require('../../config');
const NBAActionCreator = require('../../actions/NBAActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const NBAStore = require('../../stores/NBAStore');

const getStateFromStores = () => {
	return {
		NBAHeader: NBAStore.getHeader(),
		NBAContent: NBAStore.getContent(),
		open: false,
		status:  { display : 'block' },
		status_more:  { display : 'block' },
	};
};

const NBAComponent = React.createClass({
	propTypes: {
		content: PropTypes.object,
		data: PropTypes.object,
		nbaFlag: PropTypes.func,
	},

	getInitialState() {
		return getStateFromStores();
	},

	componentDidMount() {
		NBAActionCreator.getNBAData();
		NBAStore.addChangeListener(this.onStoreChange);
	},

	componentWillUnmount() {
		NBAStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		this.setState(getStateFromStores());
	},

	// returns the state to click function
	nbaClick() {
		this.setState({ open: !this.state.open });
		this.state.open ? this.props.nbaFlag('less') : this.props.nbaFlag('more');
		if (!this.state.open) {
		this.setState({ status_more: { display : 'none' } });
		}
	},

	// gets the positive feedback
	nbaPositiveFeedBackClick() {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
			}, {
				description: config.analytics.analytics_behaviour_positive,
				event: 'click',
		});
		this.closeClick();
	},

	// gets the negative feedback
	nbaNegativeFeedBackClick() {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
			}, {
				description: config.analytics.analytics_behaviour_negative,
				event: 'click',
		});
		this.closeClick();
	},

	// returns the state to close click function
	closeClick() {
		this.props.nbaFlag('close');
		this.setState({ status: { display : 'none' } });
		this.setState({ NBAHeader: undefined });
		NBAActionCreator.closeNBAData();
	},

	render() {
		if (this.state.NBAHeader !== undefined) {
			this.props.nbaFlag(this.state.NBAHeader);
		}
		return (
			<div>
				{
					this.state.NBAHeader &&
					<div className="tips" style = {this.state.status}>
						<div className="note dashboard">
							<div className="row no-gutters">
								<div className="col-lg-10 col-md-9 col-sm-9 col-xs-9 padding-top-6">
									{this.state.NBAHeader}
								</div>

								<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 float-right">
									<a className="page-options float-right" onClick={this.closeClick}>
										<span className="icon icon-close"></span>
									</a>
									<div className="vr float-right"></div>
									<a className="page-options opt-green float-right" onClick={this.nbaClick}>
										<span className="icon icon-more"></span>
										<span>more</span>
									</a>
								</div>
							</div>
							<Panel collapsible expanded={ this.state.open}>
								<hr />
								<div className="row padding-top">
									<div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
										{this.state.NBAContent}
									</div>
									<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 float-right">
										<a className="page-options opt-green" onClick={this.nbaPositiveFeedBackClick} >
											<span className="icon icon-confirm"></span>
											<span>OK</span>
										</a>
										<hr />
										<a className="page-options opt-green" onClick={this.nbaNegativeFeedBackClick}>
											<span className="icon icon-close"></span>
											<span>I'm Not Interested</span>
										</a>
									</div>
								</div>
							</Panel>
						</div>
					</div>
				}
			</div>
		);
	},
});

module.exports = NBAComponent;
