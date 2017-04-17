/**
 * @module ResultSection
 */

const React = require('react');
const { PropTypes } = React;

const _ = require('lodash');

const ListSection = React.createClass({

	propTypes: {
		items: PropTypes.array.isRequired,
		wrapperFn: PropTypes.func,
		title: PropTypes.string,
	},

	getDefaultProps() {
		return {
			wrapperFn: arr => {
				return _.map(arr, (name, i) => {
					return (
						<li name={name} key={name + i}>{name}</li>
					);
				});
			},
			items: [],
		};
	},

	render() {
		if (_.isEmpty(this.props.items)) {
			return null;
		}

		return (
			<div>
				{this.props.title && <h3>{this.props.title}</h3>}
				<ul className="list-section">{this.props.wrapperFn(this.props.items)}</ul>
			</div>
		);
	},
});

module.exports = ListSection;
