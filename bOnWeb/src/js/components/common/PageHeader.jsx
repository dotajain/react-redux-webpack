/**
 * @module PageHeader
 * @requires React
 * @requires PropTypes
 * @requires UIActions
 * @requires BrandUtils
 */

// Packages
const React = require('react');
const { PropTypes } = React;

// Actions
const UIActions = require('../../actions/UIActions');

// Utils
const BrandUtils = require('../../utils/BrandUtils');

// Private Vars
const _shrinkOn = 80;

const PageHeader = React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		visible: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			visible: true,
		};
	},

	getInitialState() {
		return {
			className: '',
		};
	},

	componentDidMount() {
		// State callbacks in componentWillMount do not run - https://github.com/facebook/react/issues/1740
		// TODO - When React upgraded, change this to componentWillMount and remove className default from getInitialState
		this.expand();

		if (BrandUtils.isAbleToDisplay('page-header-without-text')) {
			window.addEventListener('scroll', this._handleScroll);
		}
	},

	componentWillUnmount() {
		if (BrandUtils.isAbleToDisplay('page-header-without-text')) {
			window.removeEventListener('scroll', this._handleScroll);
		}
	},

	_handleScroll() {
		const distanceY = window.pageYOffset || document.documentElement.scrollTop;

		if (this.isCollapsed() && distanceY < _shrinkOn) {
			this.expand();
		} else if (!this.isCollapsed() && distanceY >= _shrinkOn) {
			this.collapse();
		}
	},

	collapse() {
		this.setState({
			className: 'smaller',
		}, () => {
			UIActions.notifyHeaderCollapse();
		});
	},

	expand() {
		this.setState({
			className: '',
		}, () => {
			UIActions.notifyHeaderExpand();
		});
	},

	isCollapsed() {
		return this.state.className === 'smaller';
	},

	render() {
		if (!this.props.visible) {
			return false;
		}

		if (BrandUtils.isAbleToDisplay('page-header-with-text')) {
			return (
				<header className="row" role="banner">
					<div className="col-xs-12">
						<div className="row">
							<div className="col-xs-4">
								<img className="img-responsive" src={BrandUtils.appendBrand('images/{}/logo.png')} title={this.props.content.headerLogoAlt} alt={this.props.content.headerLogoAlt} />
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12  header-title-column">
								<h1>{this.props.title}</h1>
							</div>
						</div>
					</div>
				</header>
			);
		} else if (BrandUtils.isAbleToDisplay('page-header-without-text')) {
			return (
				<header className={`row ${this.state.className}`} role="banner">
					<span className="screenreader">{this.props.content.headerLogoAlt}</span>
					<h1 className="screenreader">{this.props.title}</h1>
				</header>
			);
		}

		return false;
	},
});

module.exports = PageHeader;
