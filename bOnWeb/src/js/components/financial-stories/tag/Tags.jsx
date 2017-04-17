/**
 * @module Tags
 */
const React = require('react');
const { PropTypes } = React;

const Tags = React.createClass({
	propTypes: {
		data: PropTypes.array,
		assignTag: PropTypes.func,
		getClass: PropTypes.func,
		onTagInfoClick: PropTypes.func,
		noTagSelection: PropTypes.bool,
	},

	assignTag(tag) {
		this.props.assignTag(tag);
	},

	contentTags() {
		if (this.props.data) {
			let tags = this.props.data.map((category, i) => {
				if (category.value) {
					return (
						<li key={i}>
							<span onClick={this.assignTag.bind(this, category) } className={`icon icon-tag ${this.props.getClass(category.id)}`}>{category.value}</span>
						</li>
					);
				}
				return tags;
			}
			);

			return (
				<ul>
					{tags}
				</ul>
			);
		}
	},

	render() {
		return (
			<div className={`tag-list ${this.props.noTagSelection ? 'tagIndex' : ''}`}>
				<span className="icon icon-information float-right" onClick={this.props.onTagInfoClick}></span>
				{ this.contentTags() }
			</div>
		);
	},
});

module.exports = Tags;
