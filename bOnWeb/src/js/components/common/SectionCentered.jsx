/**
 * @module SectionCentered
 */

const React = require('react');
const { PropTypes } = React;

const SectionCentered = React.createClass({

	propTypes: {
		className: PropTypes.string,
		id: PropTypes.string,
		centredColumnSize: PropTypes.number,
		children: PropTypes.node,
	},

	getDefaultProps() {
		return {
			className: '',
			centredColumnSize: 6,
		};
	},

	render() {
		const classNames = ['row'];

		if (this.props.className) {
			classNames.push(this.props.className);
		}
		const sideColumnSize = (12 - this.props.centredColumnSize) / 2;

		return (

			<div className={classNames.join(' ')} id={this.props.id}>
				<div className={`col-xs-12 col-md-offset-${sideColumnSize} col-md-${this.props.centredColumnSize}`}>
					{this.props.children}
				</div>
			</div>
		);
	},
});

module.exports = SectionCentered;
