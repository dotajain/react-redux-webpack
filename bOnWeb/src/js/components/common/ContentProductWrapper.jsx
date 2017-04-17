/**
 * @module ContentProductWrapper
 */
const React = require('react');
const { PropTypes } = React;
const ContentUtils = require('../../utils/ContentUtils');

const ContentProductWrapper = WrappedComponent => React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		data: PropTypes.shape({
			productCode: PropTypes.string,
		}),
	},

	/**
	 * Returns content based off product type
	 * @param {string} key 				Content key
	 * @param {string} productCode 		Product Code
	 * @return {String} 				Alternative Product based content
	 */
	getProductContent(key) {
		return ContentUtils.getProductContent(key, this.props.content, this.props.data.productCode);
	},

	render() {
		return (
			<WrappedComponent
				{...this.props}
				getProductContent={this.getProductContent}
			/>
		);
	},
});

module.exports = ContentProductWrapper;
