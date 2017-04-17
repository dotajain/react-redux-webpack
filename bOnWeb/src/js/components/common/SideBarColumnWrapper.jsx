/**
 * @module SideBarColumnWrapper
 */

// Packages
const React = require('react');
const SideBarContactBox = require('./SideBarContactBox');

// Utils
const BrandUtils = require('../../utils/BrandUtils');

const SideBarColumnWrapper = React.createClass({

	render() {
		const classNames = ['col-lg-3', 'sidebar-container'];

		if (BrandUtils.isAbleToDisplay('md-view-aligned-with-lg')) {
			classNames.push('col-md-3');
		}

		if (BrandUtils.isAbleToDisplay('page-wrapper-without-margin')) {
			classNames.push('col-xs-12');
		} else if (BrandUtils.isAbleToDisplay('page-wrapper-with-margin')) {
			classNames.push('col-xs-11');
		}

		return (
			<div className={classNames.join(' ')} role="complementary">
				<SideBarContactBox {...this.props} />
			</div>
		);
	},
});

module.exports = SideBarColumnWrapper;
