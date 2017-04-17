/**
 * @module PostcodeQuestion
 */

const React = require('react');
const { PropTypes } = React;

const PostcodeQuestion = React.createClass({
	propTypes: {
		name: PropTypes.string.isRequired,
		questionDescription: PropTypes.string.isRequired,
		label: PropTypes.string,
	},

	render() {
		return (
			<div className="row form-spacing postcode-row">
				<div className="col-xs-4">
					<label htmlFor={this.props.name}>{(this.props.label || 'Postcode') + this.getRequiredQuestionText()}</label>
				</div>
				<div className="col-xs-8">
					<input id={this.props.name} name={this.props.name} className="postcode-input" type="text" onChange={this.changeValue} />
					<button className="btn btn-primary btn-lg btn-postcode" role="button">Find Address</button>
				</div>
			</div>
		);
	},
});

module.exports = PostcodeQuestion;
