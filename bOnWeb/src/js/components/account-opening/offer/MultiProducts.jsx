/**
 * @module MultiProducts
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const OfferSummary = require('./OfferSummary');
const SingleProduct = require('./SingleProduct');
const Modal = require('../../common/modals/Modal');

const MultiProducts = React.createClass({

	propTypes: {
		selectedProduct: PropTypes.object,
		products: PropTypes.array.isRequired,
		onClickMoreInfo: PropTypes.func.isRequired,
		onClickGoBack: PropTypes.func.isRequired,
		appData: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		onClickActionAccount: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {
			isConfirming: false,
			confirmed: false,
		};
	},

	confirmCancel(cancelApplication) {
		this.setState({
			confirmed: cancelApplication,
			isConfirming: false,
		});

		if (cancelApplication) {
			this.props.onClickActionAccount(
				true,
				_.head(this.props.products).offerId // @ticket DGW2-984
			);
		}
	},

	askForConfirmation() {
		this.setState({
			isConfirming: true,
		});
	},

	render() {
		return (
			<div>
				{this.state.isConfirming &&
					<Modal title={this.props.content.offerCancelApplicationModalTitle}>
						<div>
							<button
								onClick={() => { this.confirmCancel(false); }}
								className="btn btn-primary"
								data-anchor="confirm-cancel-button"
								role="button"
							>
								{this.props.content.offerCancelApplicationDecline}
							</button>
							<button
								onClick={() => { this.confirmCancel(true); }}
								className="btn btn-primary btn-next"
								data-anchor="confirm-cancel-button"
								role="button"
							>
								{this.props.content.offerCancelApplicationConfirm}
							</button>
						</div>
					</Modal>
				}
				{!this.props.selectedProduct && (
					<div>
					{_.map(this.props.products, (product, i) => {
						return (
							<OfferSummary
								key={i}
								product={product}
								isLast={i + 1 === this.props.products.length}
								{...this.props}
							/>
						);
					})}
					</div>
					)
				}
				{!this.props.selectedProduct && (
					<div>
						<hr/>
						<p>{this.props.content.offerCancelIntro}</p>
						<a
							className="btn btn-lg btn-primary btn-next"
							onClick={this.askForConfirmation}
							disabled={this.props.appData.isApiCallInProgress}
						>
							{this.props.content.offerCancelApplicationBtn}
						</a>
					</div>
				)}
				{this.props.selectedProduct && <SingleProduct product={this.props.selectedProduct} goBack {...this.props} />}
			</div>
		);
	},
});

module.exports = MultiProducts;
