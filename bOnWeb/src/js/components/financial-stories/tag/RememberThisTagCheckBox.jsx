/**
 * @module RememberThisTagCheckBox
 */
const React = require('react');
const { PropTypes } = React;
const Toggle = require('../../common/Toggle');

const RememberThisTagCheckBox = React.createClass({
	propTypes:{
		name:React.PropTypes.string,
		value:React.PropTypes.string,
		toggleCheckBox:React.PropTypes.func,
		content : PropTypes.object,
		onRemeberThisInfoClick:React.PropTypes.func,
	},
	getInitialState() {
		return {
			toggled: false,
		};
	},

	render() {
		return (
			<div className="remember-this">
				<div className="page-options float-left" onClick={this.props.onRemeberThisInfoClick}>
					<span className="icon icon-information"></span>
					{this.props.content.rememberThis}
				</div>

				<div className="toggle float-right">
						<Toggle
						defaultChecked={this.state.toggled}
						aria-label="No label tag"
						onChange={this.props.toggleCheckBox}
						/>
				</div>
			</div>
		);
	},
});
module.exports = RememberThisTagCheckBox;
