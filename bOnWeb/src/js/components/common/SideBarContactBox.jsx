/**
 * @module SideBarContactBox
 */

const React = require('react');
const { PropTypes } = React;
const cx = require('classnames');
const ComponentHeader = require('./ComponentHeader');

// Utils
const ContentUtils = require('../../utils/ContentUtils');

const SideBarContactBox = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		content: PropTypes.object,
	},

	render() {
		const classNames = cx({
			'sidebar-wrapper': true,
			'collapsed-header': !this.props.appData.displayingExpandedHeader,
		});

		const titleElement = (<div className="row">
			<div className="col-xs-12">
				<h3 className="sidebar-title">
					{this.props.content.sideBarTitle}
				</h3>
			</div>
			<span className="sidebar-expand-arrow"></span>
		</div>);

		return (
			<div className="row">
				<div className="col-sm-12 sidebar-col">
					<div className={classNames}>
						<div className="sidebar-arrow" />
						<article
							className="sidebar"
						>
							<ComponentHeader
								title={titleElement}
							>
								{ContentUtils.getContentParagraphs('sideBarContentLine', this.props.content)}
							</ComponentHeader>
						</article>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = SideBarContactBox;
