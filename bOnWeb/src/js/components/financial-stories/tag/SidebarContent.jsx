/**
 * @module SidebarContent
 */

const React = require('react');
const TagsComponent = require('./TagsComponent');
const SideBarTitlePanel = require('./SideBarTitlePanel');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
const config = require('../../../config');
const _ = require('lodash');

const styles = {
	sidebar: {
		width: 400,
		height: '100%',
	},

	sideBarNoContent: {
		width: 400,
		textAlign: 'center',
		backgroundColor: 'white',
	},
};

const SidebarContent = React.createClass({
	propTypes: {
		categories: React.PropTypes.object,
		tags: React.PropTypes.object,
		closeButton: React.PropTypes.func,
		editTagging: React.PropTypes.func,
		addNewTag: React.PropTypes.func,
		noTagSelection: React.PropTypes.bool,
		deleteTag: React.PropTypes.func,
		assignTag: React.PropTypes.func,
		onRemeberThisInfoClick: React.PropTypes.func,
		transactionTagData: React.PropTypes.array,
		content: React.PropTypes.object,
		onTagInfoClick: React.PropTypes.func,
		toggleCheckBox: React.PropTypes.func,
		unTagSelected:React.PropTypes.bool,
		onUnTagSelected:React.PropTypes.func,
	},

	getInitialState() {
		return {
			tabKey: -1,
			flagForAddTag: false,
			disableEdit: true,
			disableDone: false,
			flagForEditTag: false,
			newTag: {},
			updateTag: {},
		};
	},

	componentDidMount() {
		FinancialStoriesActionCreator.getTagsList();
    },

	componentWillReceiveProps(nextProps) {
		if (nextProps.noTagSelection) {
			this.setState({ disableEdit: true });
			this.setState({ flagForAddTag: false, flagForEditTag: false });
		}
		// if (!nextProps.noTagSelection) {
		// 	if (nextProps.transactionTagData && nextProps.transactionTagData.length > 0 && this.state.tabKey === 2) {
		// 		this.setState({ disableEdit: false });
		// 	}
		// }
	},

	onUnTagSelected() {
		const tags = FinancialStoriesStore.getTags();
		const untag = tags.untagged[0]; // _(tags.categories).filter(c => c.path === '/untagged').value()[0];
		untag.noTag = true;
		this.props.onUnTagSelected(untag);
	},

	handleChangeOfTag(e) {
		const updateTag = { 'value': e.target.value, 'id': e.target.id };
		e.target.value.length === 0 ? this.setState({ disableDone: true }) : this.setState({ disableDone: false });
		this.setState({ updateTag: updateTag });
	},

	addNewTag(e) {
		AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_tag_editor_assigned_new_tag,
                event: 'click',
            });
		const newTag = { 'value': e.target.value };
		e.target.value.length === 0 ? this.setState({ disableDone: true }) : this.setState({ disableDone: false });
		this.setState({ newTag: newTag });
	},

	cancelTagging() {
		this.setState({ flagForAddTag: false, flagForEditTag: false });
	},

	doneTagging() {
		this.state.flagForAddTag && FinancialStoriesActionCreator.createTag(this.state.newTag);
		if (this.state.updateTag.id !== undefined) {
			this.state.flagForEditTag && FinancialStoriesActionCreator.updateTag(this.state.updateTag);
		}
		this.setState({ flagForAddTag: false, flagForEditTag: false });
	},

	editTagging() {
		AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_tag_editor_edit_tag_selected,
                event: 'click',
            });
		this.setState({ flagForEditTag: true, disableDone: false });
	},

	handleAddTagButton() {
		this.setState({ flagForAddTag: true, disableDone: true });
	},

	handleSelect(tabKey) {
		tabKey === 2 ? this.setState({ disableEdit: false }) : this.setState({ disableEdit: true });
		if (tabKey === 1) {
			this.setState({ flagForAddTag: false, flagForEditTag: false });
		}
		// this.setState({ tabKey: tabKey });
	},

	render() {
		const style = styles.sidebar;
		const tags = FinancialStoriesStore.getTags();


		return (
			<SideBarTitlePanel
				title={this.props.content.menuTitle}
				disableEdit={this.state.disableEdit}
				disableDone={this.state.disableDone}
				noTagSelection={this.props.noTagSelection}
				closeButton={this.props.closeButton}
				style={style}
				flagForAddTag={this.state.flagForAddTag}
				flagForEditTag={this.state.flagForEditTag}
				editTagging={this.editTagging}
				cancelTagging={this.cancelTagging}
				doneTagging={this.doneTagging}
				content={this.props.content}
			>

			<div className={`sidebar-content ${this.state.flagForEditTag || this.state.flagForAddTag ? 'edit' : ''}`}>
				{this.props.noTagSelection &&
					<div className="tag-tips">
							<h5>{this.props.content.tagSidebarHeading}</h5>
							<p>{this.props.content.tagSidebarContent}</p>
						</div>
				}
					<TagsComponent categories={tags.categories} tags={tags.tags}
						handleKeyPress={this.addNewTag}
						toggleCheckBox={this.props.toggleCheckBox}
						handleChangeOfTag={this.handleChangeOfTag}
						handleAddTagButton={this.handleAddTagButton}
						flagForAddTag={this.state.flagForAddTag}
						deleteTag={this.props.deleteTag}
						assignTag={this.props.assignTag}
						handleSelect={this.handleSelect}
						flagForEditTag={this.state.flagForEditTag}
						content={this.props.content}
						onTagInfoClick={this.props.onTagInfoClick}
						onRemeberThisInfoClick={this.props.onRemeberThisInfoClick}
						transactionTagData={this.props.transactionTagData}
						unTagSelected={this.props.unTagSelected}
						noTagSelection={this.props.noTagSelection}
					/>

				</div>
				{
					(!this.state.flagForEditTag && !this.state.flagForAddTag) &&
					<div className="sidebar-footer">
						<a className="action-bttn" onClick={this.onUnTagSelected}>
							{this.props.content.unTagSelected}
						</a>
					</div>
				}

			</SideBarTitlePanel>
		);
	},
});

module.exports = SidebarContent;
