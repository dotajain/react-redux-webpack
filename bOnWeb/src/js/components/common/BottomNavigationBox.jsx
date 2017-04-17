/**
 * @module NavigationBottomBox
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const LoadingSpinner = require('../LoadingSpinner');

const NavigationBottomBox = React.createClass({

	propTypes: {
		disabled: PropTypes.bool,
		nextButtonLabel: PropTypes.string,
		backTaskId: PropTypes.string,
		nextTaskId: PropTypes.string,
		onClickNext: PropTypes.func,
		dataAnchorNext: PropTypes.string,
		dataAnchorBack: PropTypes.string,
		isLoading: PropTypes.bool,
		className: PropTypes.string,
		hasSeparator: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			disabled: false,
			nextButtonLabel: 'Next',
		};
	},

	/**
	 * Triggered when user clicks back button.
	 * If we were given a back task ID, go there.
	 *
	 * @param  {Event} e 	Click event.
	 */
	_onClickBack(e) {
		if (this.props.backTaskId) {
			e.preventDefault();
			AccountOpeningActions.navigateToWebTask(this.props.backTaskId);
		}
	},

	/**
	 * Triggered when user clicks 'next' button.
	 * If we were given a click handler, call it. Otherwise, navigate to task.
	 *
	 * @param  {Event} e 	Click event.
	 */
	_onClickNext(e) {
		e.preventDefault();

		if (this.props.disabled || this.props.isLoading) {
			e.stopPropagation();
		}

		if (this.props.onClickNext) {
			this.props.onClickNext(e);
			return;
		}

		AccountOpeningActions.navigateToWebTask(this.props.nextTaskId);
	},

	render() {
		let _nextButtonContainerClassName = ['col-xs-12', 'col-md-6', 'col-md-push-5', 'text-center'];
		const _backButtonContainerClassName = ['col-xs-12', 'col-md-6', 'col-md-pull-5', 'text-center'];

		let loadingSpinner;

		if (this.props.isLoading) {
			loadingSpinner = <LoadingSpinner />;
		}

		let backButton;
		if (this.props.backTaskId) {
			backButton = (<div className={_backButtonContainerClassName.join(' ')}>
				<button
					onClick={this._onClickBack}
					name={this.props.dataAnchorBack}
					className="btn btn-primary btn-lg btn-back"
					data-anchor={this.props.dataAnchorBack}
				>
					Go Back
				</button>
			</div>);
		} else {
			_nextButtonContainerClassName = ['col-xs-12', 'text-center'];
		}

		if (this.props.className) {
			_nextButtonContainerClassName.push(this.props.className);
		}

		let linkClasses = 'btn btn-primary btn-lg btn-next ';
		linkClasses += (this.props.disabled || this.props.isLoading) ? 'btn-disabled ' : '';

		return (
			<div className="bottom-navigation-box">
				{(this.props.hasSeparator === true) ? <hr /> : null }
				<div className="row">
					<div className={_nextButtonContainerClassName.join(' ')}>
						<button
							onClick={this._onClickNext}
							className={linkClasses}
							name={this.props.dataAnchorNext}
							data-anchor={this.props.dataAnchorNext}
							disabled={this.props.disabled || this.props.isLoading}
						>
							<span className="">
								{this.props.nextButtonLabel}
							</span>
							{loadingSpinner}
						</button>
					</div>
					{backButton}
				</div>
			</div>

		);
	},
});

module.exports = NavigationBottomBox;
