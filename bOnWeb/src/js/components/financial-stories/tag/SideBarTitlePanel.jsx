/**
 * @module SideBarTitlePanel
 */
const React = require('react');
const { PropTypes } = React;

const styles = {
	disableLink: {
		pointerEvents: 'none',
		opacity: 0.3,
	},
	enableLink: {
		pointerEvents: 'auto',
	},
};

const SideBarTitlePanel = React.createClass({
	propTypes:{
		style: PropTypes.object,
		flagForAddTag: PropTypes.bool,
		flagForEditTag: PropTypes.bool,
		cancelTagging: PropTypes.func,
		doneTagging: PropTypes.func,
		content: PropTypes.object,
		closeButton: PropTypes.func,
		disableEdit: PropTypes.bool,
		disableDone: PropTypes.bool,
		editTagging: PropTypes.func,
		children: PropTypes.array,
	},

	render() {
		const disableClass = this.props.disableEdit ? styles.disableLink : styles.enableLink;
		return (
			<div className="sidebar-box">
				<div className="sidebar-header" >
					{this.props.flagForAddTag || this.props.flagForEditTag ?
						<div>
							<a className="page-options float-left" onClick={this.props.cancelTagging}>{this.props.content.cancelButton}</a>
							<a disabled={this.props.disableDone} style={this.props.disableDone ? styles.disableLink : styles.enableLink} className="page-options float-right" onClick={this.props.doneTagging}>{this.props.content.doneButton}</a>
						</div>
					:
						<div>
							<a className="page-options float-left" onClick={this.props.closeButton}>{this.props.content.closeButton}</a>
							<a disabled={this.props.disableEdit} style={disableClass} className="page-options float-right" onClick={this.props.editTagging}>{this.props.content.editButton}</a>
						</div>
					}
				</div>
				{this.props.children}
			</div>
		);
	},
});
module.exports = SideBarTitlePanel;
