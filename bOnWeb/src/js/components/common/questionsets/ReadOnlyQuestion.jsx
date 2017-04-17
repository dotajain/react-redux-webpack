/**
 * @module ReadOnlyQuestion
 */

const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');
const _ = require('lodash');

// Components
const StaticParagraphQuestion = require('./StaticParagraphQuestion');

// Utils
const MaskingUtils = require('../../../utils/MaskingUtils');

const ReadOnlyQuestion = React.createClass({

	propTypes: {
		readOnly: PropTypes.string,
		children: PropTypes.node,
		mask: PropTypes.bool,
	},

	/**
	 * Determine whether to use the given input or to use a readonly field
	 *
	 * @return {ReactComponent} the correct input
	 */
	getInput() {
		let input = this.props.children;

		if (this.props.readOnly && this.props.readOnly.toLowerCase() === 'yes') {
			let value = this.props.children.props.defaultValue;

			if (value && this.props.children.props.data && _.isArray(this.props.children.props.data)) {
				value = _.result(_.find(this.props.children.props.data, current => {
					return current.value && (current.value.toUpperCase() === value);
				}), 'label') || value;
			}

			if (value && this.props.mask) {
				const mask = config.masks[this.props.children.props.name];
				value = MaskingUtils.applyMask(value, mask.startPosition, mask.numberOfMasks);
			}

			input = (<StaticParagraphQuestion
				{...this.props.children.props}
				label={this.props.children.props.children || this.props.children.props.labelText}
				readonlyValue={value}
			/>);
		}

		return input;
	},

	render() {
		return (
			<div>
				{this.getInput()}
			</div>
		);
	},
});

module.exports = ReadOnlyQuestion;
