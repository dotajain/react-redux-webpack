/**
 * @module LoadingSpinner
 */

const React = require('react');
const { PropTypes } = React;

const cx = require('classnames');

const BrandUtils = require('../utils/BrandUtils');

const LoadingSpinner = React.createClass({

	propTypes: {
		imgSize: PropTypes.number,
		centerAlign: PropTypes.bool,
		backdrop: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			imgSize: 80,
		};
	},

	_getAttribtues() {
		const attributes = {};

		if (this.props.imgSize) {
			attributes.height = `${this.props.imgSize}px`;
			attributes.width = `${this.props.imgSize}px`;
		}

		return attributes;
	},

	render() {
		const imgSrc = BrandUtils.appendBrand('images/{}/spinner.png');
		const classNames = cx({
			'loading-spinner': true,
			'text-center': this.props.centerAlign,
			backdrop: this.props.backdrop,
		});
		return (
			<div className={classNames}>
				<img className="spin" src={imgSrc} alt="Loading" title="Loading" {...this._getAttribtues()}></img>
			</div>
		);
	},
});

module.exports = LoadingSpinner;
