/**
 * @module RadioButton
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const cx = require('classnames');

const RadioButton = React.createClass({

	propTypes: {
		anchor: PropTypes.string,
		checkedImage: PropTypes.string,
		image: PropTypes.string,
		isChecked: PropTypes.bool,
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any,
		question: PropTypes.string,
		blockList: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			isChecked: false,
		};
	},

	/**
	 * Get the anchor text.
	 *
	 * @return {String} 	From props, or calculated.
	 */
	getAnchor() {
		if (this.props.anchor) {
			return this.props.anchor;
		} else {
			const anchorVal = _.isString(this.props.value) ? this.props.value.toLowerCase() : this.props.value;
			return `${this.props.name}-${anchorVal}`;
		}
	},

	/**
	 * What label to display on this button?
	 *
	 * @return {Component} Image or text.
	 */
	getLabel() {
		if (this.props.image && this.props.checkedImage) {
			return (
				<div>
					<div className="radio-image-label-left">
						{this.props.label}
					</div>
					<div className="radio-image-label-right">
						<img alt={this.props.label}
							title={this.props.label}
							src={this.props.isChecked ? this.props.checkedImage : this.props.image}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<span>
					<span className="screenreader">{`${this.props.question} `}</span>
					<span>{this.props.label || this.props.value}</span>
				</span>
			);
		}
	},

	render() {
		const classNames = cx(
			'radio-inline',
			'btn',
			'btn-lg',
			'btn-primary',
			{
				'radio-block': this.props.blockList,
				'checked': this.props.isChecked,
			}
		);

		return (
			<label
				className={classNames}
				data-anchor={this.getAnchor()}
			>
				<input
					type="radio"
					checked={this.props.isChecked}
					aria-checked={this.props.isChecked}
					onChange={this.props.onChange}
					name={this.props.name}
					value={this.props.value}
				/>
				{this.getLabel()}
			</label>
		);
	},
});

module.exports = RadioButton;
