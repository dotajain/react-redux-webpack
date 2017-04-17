/**
 * @module PageColumnWrapper
 */

const React = require('react');
const { PropTypes } = React;

const SideProgressBar = require('../account-opening/SideProgressBar');

const BrandUtils = require('../../utils/BrandUtils');

const PageColumnWrapper = React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		step: PropTypes.number,
		children: PropTypes.node,
	},

	render() {
		const showSideProgressBar = BrandUtils.isAbleToDisplay('side-progress-bar');
		const fullPageColSize = showSideProgressBar ? 6 : 9;
		const sideProgressBar = showSideProgressBar ? <SideProgressBar step={this.props.step} content={this.props.content} /> : false;

		let fullPageColumnBreak;
		let xsColumnClassName;

		if (BrandUtils.isAbleToDisplay('page-wrapper-without-margin')) {
			xsColumnClassName = 'col-xs-12';
		} else if (BrandUtils.isAbleToDisplay('page-wrapper-with-margin')) {
			xsColumnClassName = 'col-xs-11';
		}

		if (BrandUtils.isAbleToDisplay('md-view-aligned-with-lg')) {
			fullPageColumnBreak = ' col-md-';
		} else if (BrandUtils.isAbleToDisplay('md-view-semi-aligned-with-xs')) {
			fullPageColumnBreak = ' col-lg-';
		}

		return (
			<div>
				{sideProgressBar}

				<div className={`${xsColumnClassName}${fullPageColumnBreak}${fullPageColSize} page-column-wrapper`} role="main">
					{this.props.children}
				</div>
			</div>
		);
	},
});

module.exports = PageColumnWrapper;
