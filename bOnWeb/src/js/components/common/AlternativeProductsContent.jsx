/**
 * @module AlternativeProductsContent
 */
const React = require('react');
const { PropTypes } = React;

const _ = require('lodash');

const ContentUtils = require('../../utils/ContentUtils');

const AlternativeProductsContent = WrappedComponent => React.createClass({
	propTypes: {
		content: PropTypes.object.isRequired,
		data: PropTypes.shape({
			isAltProduct: PropTypes.bool,
		}),
	},

	componentDidMount() {
		this.constructor.displayName = WrappedComponent.name;
	},

	/**
	 * Returns alternative content required for CYB B route when downgraded
	 * @param {string} key 				Content key
	 * @param {Object} regexConfig 		object containing regex and text to replace
	 * @return {String} 				Alternative CYB downgrade content
	 */
	selectContentBasedOnDowngrade(key, regexConfig) {
		const content = ContentUtils.getCYBAltContent(key, this.props.content, this.props.data.isAltProduct);

		if (_.isObject(regexConfig) && regexConfig.regex && _.isString(regexConfig.text)) {
			return content.replace(regexConfig.regex, regexConfig.text);
		}

		return content;
	},

	render() {
		return (
			<WrappedComponent
				{...this.props}
				selectContentBasedOnDowngrade={this.selectContentBasedOnDowngrade}
			/>
		);
	},

});

module.exports = AlternativeProductsContent;
