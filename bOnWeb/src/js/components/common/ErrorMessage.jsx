/**
 * @module ErrorMessage
 */

const React = require('react');
const { PropTypes } = React;

const ErrorMessage = React.createClass({

	propTypes: {
		extraClasses: PropTypes.string,
		text: PropTypes.string,
		visible: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			visible: true,
			extraClasses: 'error',
		};
	},

	render() {
		if (!this.props.visible || !this.props.text) {
			return false;
		}

		const cssClasses = ['col-xs-12', 'info-message'];
		cssClasses.push(this.props.extraClasses);

		return (
			<div className={cssClasses.join(' ')}>
				<p dangerouslySetInnerHTML={{ __html: this.props.text }} />
			</div>
		);
	},
});

module.exports = ErrorMessage;
