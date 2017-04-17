/**
 * @module PersonalDetailsFoundError
 */

const React = require('react');
const { PropTypes } = React;
const envConfig = require('../../../../static/config');

const ErrorMessage = require('../../common/ErrorMessage');

const PersonalDetailsFoundError = React.createClass({
	propTypes: {
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
	},

	render() {
		if (!this.props.data.personalDetailsFound || !this.props.content.personalDetailsFoundValidationMessage) {
			return null;
		}

		const content = this.props.content.personalDetailsFoundValidationMessage
				.replace('{websiteBaseDirectory}', envConfig.websiteBaseDirectory)
				.replace('{productCode}', this.props.data.productCode);

		return (<div className="row padding-bottom" role="alert" aria-live="assertive"><ErrorMessage text={content} extraClasses="found-user help" /></div>);
	},
});

module.exports = PersonalDetailsFoundError;
