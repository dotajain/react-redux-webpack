/**
 * @module ResultSection
 */

const React = require('react');
const { PropTypes } = React;

// Components
const ComponentHeader = require('../ComponentHeader');

const ResultSection = React.createClass({

	propTypes: {
		className: PropTypes.string,
		title: PropTypes.node,
		subTitle: PropTypes.string,
		imgSrc: PropTypes.string,
		imgAlt: PropTypes.string,
		bodyClassName: PropTypes.string,
		hasSubtitleSeparator: PropTypes.bool,
		titleClass: PropTypes.string,
		titleLevel: PropTypes.number,
		children: PropTypes.node,
	},

	getDefaultProps() {
		return {
			hasSubtitleSeparator: true,
			titleLevel: 1,
		};
	},

	render() {
		const classNames = ['result-section'];
		if (this.props.className) {
			classNames.push(this.props.className);
		}

		const bodyClassNames = ['text-left'];
		if (this.props.bodyClassName) {
			bodyClassNames.push(this.props.bodyClassName);
		}

		let image;
		if (this.props.imgSrc) {
			image = <img src={this.props.imgSrc} alt={this.props.imgAlt} title={this.props.imgAlt} />;
		}

		return (
			<div className={classNames.join(' ')}>
				{image}
				<ComponentHeader
					wrapperClass="vertical-center"
					bodyClass={bodyClassNames.join(' ')}
					titleLevel={this.props.titleLevel}
					hasSubtitleSeparator={this.props.hasSubtitleSeparator}
					title={this.props.title}
					titleClass={this.props.titleClass}
					subTitle={this.props.subTitle}
				>
					{this.props.children}
				</ComponentHeader>
			</div>
		);
	},
});

module.exports = ResultSection;
