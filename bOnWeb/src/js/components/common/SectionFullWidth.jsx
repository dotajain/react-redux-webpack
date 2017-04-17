/**
 * @module SectionFullWidth
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const SectionFullWidth = React.createClass({

	propTypes: {
		className: PropTypes.string,
		id: PropTypes.string,
		children: PropTypes.node,
	},

	getDefaultProps() {
		return {
			className: '',
			id: undefined,
		};
	},

	getSectionHeading() {
		let child;

		if (this.props.children.constructor === Array) {
			child = _.find(this.props.children, item => {
				return item && item.props && item.props.title;
			});
		} else {
			child = this.props.children;
		}

		return (child && child.props.title) ? child.props.title : 'Page Section';
	},

	render() {
		const classNames = ['row'];

		if (this.props.className) {
			classNames.push(this.props.className);
		}

		return (
			<section className={classNames.join(' ')} id={this.props.id} aria-label={this.getSectionHeading()}>
				<div className="col-xs-12">
					{this.props.children}
				</div>
			</section>
		);
	},
});

module.exports = SectionFullWidth;
