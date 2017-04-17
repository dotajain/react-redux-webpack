/**
 * @module ReviewSection
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const cx = require('classnames');

const envConfig = global.envConfig;

const Link = require('react-router').Link;

const BrandUtils = require('../../../utils/BrandUtils');

const getTextRows = rows => {
	const data = rows.filter(d => !d.hidden);

	const formatValue = (text, formatting) => {
		if (!_.isString(text) && !_.isNumber(text)) {
			return null;
		}

		if (!_.isString(formatting)) {
			return <span>{text}</span>;
		}

		return <span className={(formatting === 'capitalize') ? 'u-text-capitalize' : ''}>{text.toLowerCase()}</span>;
	};

	if (BrandUtils.isAbleToDisplay('review-flat')) {
		return _.map(data, (item, index) => {
			return (<div className="row review-row" key={`review${index}`}>
				<div className="col-xs-5 col-sm-5 review-row-left-col">
					{item.label}
				</div>

				<div className="col-xs-2 col-sm-1 u-center">-</div>

				<div className="col-xs-5 col-sm-5 review-row-right-col">
					{formatValue(item.value)}
				</div>
			</div>);
		});
	} else if (BrandUtils.isAbleToDisplay('review-paper')) {
		return _.map(data, (item, index) => {
			return (<div className="row review-row" key={`review${index}`}>
				<div className="col-xs-5 review-row-left-col">
					{item.label}
				</div>

				<div className="col-xs-7 review-row-right-col">
					{(item.formatting) ? formatValue(item.value, item.formatting) : item.value}
				</div>
			</div>);
		});
	}

	return false;
};

const ReviewSection = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		onEditLinkClick: PropTypes.func.isRequired,
	},

	render() {
		const { data } = this.props;

		let title;

		if (data.isSubSection) {
			title = <h5 className="indented">{data.title}</h5>;
		} else {
			const link = (<Link
							onClick={this.props.onEditLinkClick}
							to={`${envConfig.websiteBaseDirectory}account-opening`}
							data-task-id={data.editLinkTaskId}
							className="edit-link"
							aria-label={`Edit ${data.title}`}
			>
							Edit
						</Link>);
			title = (<h4 className="indented">{data.title} {link}</h4>);
		}

		const createClasses = first => cx({
			'col-xs-12': true,
			'col-md-6': BrandUtils.isAbleToDisplay('review-flat'),
			'col-md-12': BrandUtils.isAbleToDisplay('review-paper'),
			'first-row': first && BrandUtils.isAbleToDisplay('review-paper'),
		});

		const leftClasses = createClasses(true);
		const rightClasses = createClasses(false);

		return (<div className="review-section">
				<div className="row">
					{title}
					<div className={leftClasses}>
						{getTextRows(data.leftContent)}
					</div>
				<div className={rightClasses}>
					{getTextRows(data.rightContent)}
				</div>
			</div>
		</div>);
	},
});

module.exports = ReviewSection;
