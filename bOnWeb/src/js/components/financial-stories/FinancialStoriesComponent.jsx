/**
 * @module FinancialStoriesComponent
 */

const React = require('react');
const config = require('../../config');
const { PropTypes } = React;
const AccountDetailsComponent = require('./AccountDetailsComponent');
const AccountTilesComponent = require('./AccountTilesComponent');
const AccountTransactionComponent = require('./AccountTransactionComponent');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesModal = require('./tag/FinancialStoriesModal');
const AccountDetailsExpansion = require('./AccountDetailsExpansion');
const BasicModal = require('../common/modals/ModalB');
const BrowserUtils = require('../../utils/BrowserUtils');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
import Sidebar from 'react-sidebar';
import SidebarContent from './tag/SidebarContent';

const getStateFromStores = () => {
	return {
		sidebarOpen: false,
		noTagSelection: false,
		resetTranTagSelection: false,
		transactionsState: FinancialStoriesStore.getState(),
		clearSearchText: false,
		tagInfoClick: false,
		tagDeleteClick: false,
		transactionProgressClick: false,
		rememberThisInfoClick: false,
		myTag: {},
		remember: false,
		closeAssignTagPopup: false,
		tagMessage: '',
		unTagSelected: false,
	};
};

const FinancialStoriesComponent = React.createClass({
	propTypes: {
		content: PropTypes.object,
		onMicroTileClick: PropTypes.func,
		isPopupOpen: PropTypes.bool,
		onHelpClick:PropTypes.func,
	},

	getInitialState() {
		return getStateFromStores();
	},

	componentWillMount() {
		if (BrowserUtils.isMobileView()) {
			this.setState({ custGrid: true });
       }
		BrowserUtils.setViewPort(1);
		FinancialStoriesActionCreator.getAccountsList();
	},
	componentWillReceiveProps() {
		this.setState({
			tagInfoClick: false, tagDeleteClick: false,
			transactionProgressClick: false, rememberThisInfoClick: false, clearSearchText: false,
		});
	},
	onClickDeleteTag() {
		FinancialStoriesActionCreator.deleteTag(this.state.myTag);
		this.setState({ tagDeleteClick: false });
	},
	onRemeberThisInfoClick() {
		this.setState({ rememberThisInfoClick: true });


		this.setState({ tagDeleteClick: false });
		this.setState({ tagInfoClick: false });
		this.setState({ transactionProgressClick: false });
	},

	onNextAccountDetails() {
		this.setState({ clearSearchText: true, transactionProgressClick: false });
		this.closeSideBarFromInsideSideBar();
	},

	onTagsClick() {
		if (this.state.custGrid) {
			this.setState({ mobileView: !this.state.mobileView });
       } else {
			this.setState({ sidebarOpen: true, noTagSelection: true });
		}
		this.setState({ resetTranTagSelection: false });
		this.setState({ openGridCheckBoxColumn: true });

		this.setState({ tagInfoClick: false });
		this.setState({ tagDeleteClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
	},

	onTagInfoClick() {
		this.setState({ tagInfoClick: true });


		this.setState({ tagDeleteClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
	},
	onShowProgressIconClick() {
		this.setState({ transactionProgressClick: true });
		this.setState({ tagDeleteClick: false });
		this.setState({ tagInfoClick: false });
		this.setState({ rememberThisInfoClick: false });
	},
	onUnTagSelected(tag) {
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
		this.setState({ tagDeleteClick: false });
		this.setState({ tagInfoClick: false });
		// this.setState({ unTagSelected: true });
		this.assignTag(tag);
	},
	onPopupCancelClick() {
		FinancialStoriesActionCreator.handleCreateUpdateTagError('', false);
	},

	getCreateUpdateTagQuoteId() {
		if (FinancialStoriesStore.getCreateUpdateTagError()) {
			return this.props.content.tagCreateUpdatError.replace('{quote-id}', FinancialStoriesStore.getCreateUpdateErrorId());
		}
		return '';
	},

	deleteTag(myTag) {
		AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_tag_editor_archive_tag,
                event: 'click',
            });
		this.setState({ tagDeleteClick: true });


		this.setState({ tagInfoClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
		this.setState({ myTag: myTag });
	},

	openSideBarFromGrid(transTag, noTagSelection) {
		this.setState({ resetTranTagSelection: false });
		this.setState({ tagInfoClick: false });
		this.setState({ tagDeleteClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });

		this.setState({ openGridCheckBoxColumn: true, sidebarOpen: true, noTagSelection: noTagSelection, transTag: transTag });
	},
	closeSideBarFromInsideSideBar() {
		this.setState({ mobileView: false });
		this.setState({ tagInfoClick: false });
		this.setState({ tagDeleteClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
		this.setState({ unTagSelected: false });

        this.setState({ sidebarOpen: false, resetTranTagSelection: true });
        this.setState({
            transTag: [],
        });
    },

	toggleCheckBox(e) {
		this.setState({
			remember: e.target.checked,
		});

		this.setState({ tagInfoClick: false });
		this.setState({ tagDeleteClick: false });
		this.setState({ transactionProgressClick: false });
		this.setState({ rememberThisInfoClick: false });
	},

	assignTag(tag) {
		FinancialStoriesActionCreator.assignTag(this.createTagJson(tag));
		let tagMessage;
		if (tag.noTag) {
			if (this.state.transTag.length > 1) {
				tagMessage = this.props.content.transactionUnTags.replace('{TranNo}', this.state.transTag.length);
			} else {
				tagMessage = this.props.content.transactionUnTag.replace('{TranNo}', this.state.transTag.length);
			}
		} else {
			if (this.state.transTag.length > 1) {
				tagMessage = this.props.content.transactionReTags.replace('{TranNo}', this.state.transTag.length).replace('{TagName}', tag.value);
			} else {
				tagMessage = this.props.content.transactionReTag.replace('{TranNo}', this.state.transTag.length).replace('{TagName}', tag.value);
			}
		}
		this.setState({ resetTranTagSelection: true, closeAssignTagPopup: true, tagMessage: tagMessage });
		setTimeout(
			() => { this.setState({ sidebarOpen: false, closeAssignTagPopup: false }); },
			6000
		);
	},

	createTagJson(tag) {
        let object;
		const transaction = [];
        if (tag.path) {
			for (let i = 0; i < this.state.transTag.length; i++) {
				transaction.push({
					'id': this.state.transTag[i].id,
					'tag_ids': [
					],
					'category_ids': [
						tag.id,
					],
				});
			}
            object = {
				'transactions': transaction,
				'remember': this.state.remember,
            };
        } else {
			for (let i = 0; i < this.state.transTag.length; i++) {
				transaction.push({
					'id': this.state.transTag[i].id,
					'tag_ids': [
						tag.id,
					],
					'category_ids': [
					],
				});
			}
            object = {
				'transactions': transaction,
				'remember': this.state.remember,
            };
        }
        return object;
    },

	assignTagPopup() {
        if (FinancialStoriesStore.getAssignTagResponse() && this.state.closeAssignTagPopup) {
            return (
				<BasicModal >
					<div className="popupRect col">
						<div className="doneIconStyle">
							<span className="icon icon-done doneIconStyle"/>
						</div>
						<p>{this.state.tagMessage}</p>
					</div>
				</BasicModal>
			);
        }
    },
	render() {
		return (
			<div>
			<FinancialStoriesModal cancelButton yesButton={false} header={this.props.content.FYI} content={this.props.content.rememberThisTagContent} confirmCancel={this.state.rememberThisInfoClick} cancelText={this.props.content.okButton} />
			<FinancialStoriesModal cancelButton yesButton={false} header={this.props.content.tagInfoPopupHeader} content={this.props.content.tagInfoPopupContent} confirmCancel={this.state.tagInfoClick} cancelText={this.props.content.okButton} />
			<FinancialStoriesModal cancelButton yesButton={false} header={this.props.content.accountDetailsInprogressHeader} content={this.props.content.accountDetailsInprogressContent} confirmCancel={this.state.transactionProgressClick} cancelText={this.props.content.okButton} />
			<FinancialStoriesModal header={this.props.content.deleteTagHeader} content={this.props.content.deleteTagContent} onClickDeleteTag={() => { this.onClickDeleteTag(); } } confirmCancel={this.state.tagDeleteClick} yesButton cancelButton cancelText={this.props.content.cancelButton} yesText={this.props.content.yesText} />
			<FinancialStoriesModal cancelButton yesButton={false} header={this.props.content.OTPAuthenticationTitleNoOTP} content={this.getCreateUpdateTagQuoteId()} confirmCancel={FinancialStoriesStore.getCreateUpdateTagError()} cancelText={this.props.content.okButton} onPopupCancelClick={this.onPopupCancelClick} />
			{this.assignTagPopup() }

			<Sidebar
				sidebar = {
					<SidebarContent
						transactionTagData={this.state.transTag}
						content={this.props.content}
						assignTag={this.assignTag}
						noTagSelection={this.state.noTagSelection}
						closeButton={this.closeSideBarFromInsideSideBar}
						onTagInfoClick={this.onTagInfoClick}
						deleteTag={this.deleteTag}
						onRemeberThisInfoClick={this.onRemeberThisInfoClick}
						toggleCheckBox={this.toggleCheckBox} onUnTagSelected={this.onUnTagSelected}
						unTagSelected={this.state.unTagSelected}
						doneTagging={this.doneTagging}
					/>
				}

					open={this.state.sidebarOpen}
					rootClassName= "rootSideBar"
					sidebarClassName= "SideBarBox"
					contentClassName= "contentSideBar"
					overlayClassName= "overlaySideBar"
					pullRight touch={false}
			>
				{!FinancialStoriesStore.getAssignTagStatus() ?
				<div className="account-details-body">
					<AccountDetailsComponent onHelpClick={this.props.onHelpClick} onTagsClick={this.onTagsClick} content={this.props.content} onNextAccountDetails={this.onNextAccountDetails} />

					<div className="scroll-wrapper">
						<div className="row no-gutters more-information">
							<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0">
								<ul><AccountDetailsExpansion content={this.props.content} hideMoreInformation={this.state.clearSearchText}/> </ul>
							</div>
						</div>

						<div className="row no-gutters dashboard content-wrapper">
							{this.state.transactionsState.accountType === this.props.content.current &&
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="projection-slider">
										<AccountTilesComponent onMicroTileClick={this.props.onMicroTileClick} content={this.props.content}/>
									</div>
								</div>
							}

							<AccountTransactionComponent content={this.props.content} openSideBar={this.openSideBarFromGrid} nextAccountDetails={this.state.clearSearchText} transactionsState={this.state.transactionsState}	onTagInfoClick={this.onTagInfoClick} deleteTag={this.deleteTag} onShowProgressIconClick={this.onShowProgressIconClick} onRemeberThisInfoClick={this.onRemeberThisInfoClick} isPopupOpen = {this.props.isPopupOpen} resetTranTagSelection={this.state.resetTranTagSelection} openGridCheckBoxColumn={this.state.openGridCheckBoxColumn}
							mobileView={this.state.mobileView}
							/>


						</div>
					</div>
				</div>
			:
				<div className="chicken-loading"></div>
			}
			</Sidebar>
			</div>
		);
	},
});

module.exports = FinancialStoriesComponent;

