/**
 * @module TagItem
 */
const React = require('react');
const { PropTypes } = React;
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Tags = require('./Tags');
const MyTags = require('./MyTags');
const _ = require('lodash');
const RememberThisTagCheckBox = require('./RememberThisTagCheckBox');

const styles = {
	rootStyle: {
		className: '',
	},

	colorStyle: {
		className: 'tag-focus',
	},
};

const TagsComponent = React.createClass({
	propTypes: {
		transactionTagData: PropTypes.array,
		tags: PropTypes.array,
		categories: PropTypes.array,
		onRemeberThisInfoClick: PropTypes.func,
		toggleCheckBox: PropTypes.func,
		assignTag: PropTypes.func,
		flagForAddTag: PropTypes.bool,
		flagForEditTag: PropTypes.bool,
		onTagInfoClick: PropTypes.func,
		handleKeyPress: PropTypes.func,
		handleAddTagButton: PropTypes.func,
		handleChangeOfTag: PropTypes.func,
		data: PropTypes.array,
		getClass: PropTypes.func,
		deleteTag: PropTypes.func,
		content: PropTypes.object,
		handleSelect: PropTypes.func,
		unTagSelected: PropTypes.bool,
		noTagSelection: PropTypes.bool,
	},

	getInitialState() {
		return {
			tabKey: 1,
		};
	},

	getClass(id) {
		let labelStyle = styles.rootStyle.className;
		if (this.props.unTagSelected) { return labelStyle; }

		if (_(this.props.transactionTagData).find(c => c.tagId === id)) {
			labelStyle = styles.colorStyle.className;
		}
		return labelStyle;
	},

	handleSelect(tabKey) {
		this.props.handleSelect(tabKey);
		this.setState({ tabKey: tabKey });
	},
	render() {
		return (
			<div className="col-xs-12" style={{ height: '100%' }}>
				<Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" bsStyle="pills">
					<RememberThisTagCheckBox onRemeberThisInfoClick={this.props.onRemeberThisInfoClick}
						toggleCheckBox={this.props.toggleCheckBox} content={this.props.content}
					/>
					<Tab eventKey={1} title={this.props.content.tagInfoPopupHeader}>
						{this.state.tabKey === 1 &&
							<Tags
							assignTag={this.props.assignTag}
							data={this.props.categories}
							getClass={this.getClass}
							content={this.props.content}
							onTagInfoClick={this.props.onTagInfoClick}
							noTagSelection={this.props.noTagSelection}
							/> }
					</Tab>
					<Tab eventKey={2} title={this.props.content.myTagsHeader}>
						{this.state.tabKey === 2 &&
							<MyTags
							data={this.props.tags}
							handleKeyPress={this.props.handleKeyPress}
							handleChangeOfTag={this.props.handleChangeOfTag}
							handleAddTagButton={this.props.handleAddTagButton}
							flagForAddTag={this.props.flagForAddTag}
							deleteTag={this.props.deleteTag}
							flagForEditTag={this.props.flagForEditTag}
							content={this.props.content}
							onTagInfoClick={this.props.onTagInfoClick}
							getClass={this.getClass}
							assignTag={this.props.assignTag}
							noTagSelection={this.props.noTagSelection}
							/> }
					</Tab>
				</Tabs>
			</div>
		);
	},

});

module.exports = TagsComponent;
