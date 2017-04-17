/**
 * @module ComponentHeader
 */

const React = require('react');
const PropTypes = React.PropTypes;
const _ = require('lodash');

const ComponentHeader = React.createClass({

	propTypes: {
		title: PropTypes.node,
		subTitle: PropTypes.string,
		hasSeparator: PropTypes.bool,
		hasSubtitleSeparator: PropTypes.bool,
		titleLevel: PropTypes.number,
		bodyClass: PropTypes.string,
		subtitleClass: PropTypes.string,
		titleClass: PropTypes.string,
		id: PropTypes.string,
		spanElement: PropTypes.element,
		wrapperClass: PropTypes.string,
		children: PropTypes.node,
	},

	getDefaultProps() {
		return {
			hasSeparator: false,
			wrapperClass: '',
		};
	},

	renderTitle(titleValue, titleLevel, classNamePrefix) {
		if (!titleValue) {
			return;
		}
		const Type = `h${titleLevel}`;
		let props = {
			className: `component-title account-locked-title ${classNamePrefix}`,
		};

		if (this.props.id) {
			props = _.extend({}, props, { id: this.props.id });
		}
		return <Type {...props}>{titleValue}</Type>;
	},

	render() {
		let titleClassPrefix = '';
		if (this.props.titleClass) {
			titleClassPrefix += this.props.titleClass;
		}

		let spanElement;
		if (this.props.spanElement) {
			spanElement =
				(<div className="col-xs-4">
					{this.props.spanElement}
				</div>);
		}

		const classNames = ['component-header'];

		if (this.props.wrapperClass) {
			classNames.push(this.props.wrapperClass);
		}

		if (!this.props.subTitle) {
			classNames.push('no-subtitle');
		}

		const subtitleClassNames = ['component-header-subtitle'];
		if (this.props.subtitleClass) {
			subtitleClassNames.push(this.props.subtitleClass);
		}

		const titleIsObject = typeof this.props.title === 'object';

		return (
			<div className={classNames.join(' ')}>
				{(this.props.hasSeparator === true) ? <hr /> : null }
				<div className="row">
					<div className={this.props.spanElement ? 'col-xs-8' : 'col-xs-12'}>
						{titleIsObject ? this.props.title : this.renderTitle(this.props.title, this.props.titleLevel, titleClassPrefix)}
					</div>
					{spanElement}
				</div>
				{(this.props.hasSubtitleSeparator === true) ? <hr /> : null }
				<div className={this.props.bodyClass}>
					<div className="row">
						<div className="col-xs-12">
							{this.props.subTitle && <div className={subtitleClassNames.join(' ')} dangerouslySetInnerHTML={{ __html: this.props.subTitle }} />}
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = ComponentHeader;
