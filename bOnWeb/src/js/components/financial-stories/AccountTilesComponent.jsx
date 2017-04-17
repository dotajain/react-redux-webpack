/**
 * @module AccountTilesComponent
 */

const React = require('react');
const { PropTypes } = React;
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../constants/FinancialStoriesConstants');
const Slick = require('react-slick');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');

const AccountTilesComponent = React.createClass({
propTypes:{
   onMicroTileClick: PropTypes.func,
   content : PropTypes.object,
  },
getInitialState() {
    return {

        fSConnectionData: FinancialStoriesStore.getState().fSConnectionData,
        transactionsState: FinancialStoriesStore.getState(),

    };
  },

componentWillMount() {
    FinancialStoriesActionCreator.getFinancialStoriesConnection(FinancialStoriesConstants.microTransactions);
    FinancialStoriesActionCreator.getFinancialStoriesConnection(FinancialStoriesConstants.cashpoint);
    FinancialStoriesActionCreator.getFinancialStoriesConnection(FinancialStoriesConstants.insAndOuts);
    FinancialStoriesActionCreator.getFinancialStoriesConnection(FinancialStoriesConstants.projection);
},
onMicroClick() {
  this.state.fSConnectionData.microClickable === undefined && this.props.onMicroTileClick(FinancialStoriesConstants.microTransactions);
},
onProjectionClick() {
    this.state.fSConnectionData.projectionClickable === undefined && this.props.onMicroTileClick(FinancialStoriesConstants.projection);
},
onCashpointClick() {
    this.state.fSConnectionData.cashClickable === undefined && this.props.onMicroTileClick(FinancialStoriesConstants.cashpoint);
},
onInAndOutClick() {
   this.state.fSConnectionData.inandoutClickable === undefined && this.props.onMicroTileClick(FinancialStoriesConstants.insAndOuts);
},
	render() {
	const settings = {
        arrows: true,
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		draggable: true,
		responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 991, settings: { slidesToShow: 2 } }, { breakpoint: 1025, settings: { slidesToShow: 3 } }, { breakpoint: 1200, settings: { slidesToShow: 3.1 } }, { breakpoint: 2500, settings: { slidesToShow: 3.1 } }],
    };

    const fsConData = this.state.fSConnectionData;
    const accountType = this.state.transactionsState.accountType;
    let projectionVisible = false;
    if (accountType === this.props.content.current) {
        projectionVisible = this.state.transactionsState.accountDetails.allowProjection;
	}

		return (
                <Slick {...settings}>
                    <div className="slide">
                        <a href="#" className="slide-content" onClick={this.onMicroClick}>
                            <section>
                                { fsConData.micro && <p className="strong" dangerouslySetInnerHTML = {{ __html:fsConData.micro.title }}></p> }
                                <p>{fsConData.micro && fsConData.micro.footer}</p>
                            </section>
                            <section className="tile-coffee">
                                <img src="../images/b/coffee.png" width="140px" alt="" />
                            </section>
                        </a>
                    </div>
                     {projectionVisible &&
                        <div className="slide">
                            <a href="#" className="slide-content" onClick={this.onProjectionClick}>
                                <section>
                                    <p>{fsConData.projection && fsConData.projection.title}</p>
                                    <p>{fsConData.projection && fsConData.projection.footer}</p>
                                </section>
                                <section className="tile-projection">
                                    <img src="../images/b/projection.png" width="140px" alt="" />
                                </section>
                            </a>
                        </div>
                     }
                     <div className="slide">
                        <a href="#" className="slide-content" onClick={this.onCashpointClick}>
                            <section>
                                {fsConData.cashpoint && <p className="strong" dangerouslySetInnerHTML = {{ __html:fsConData.cashpoint.title }}></p> }
                                <p>{fsConData.cashpoint && fsConData.cashpoint.footer}</p>
                            </section>
                            <section className="tile-chocolate">
                                <img src="../images/b/chocolate-box.png" width="140px" alt="" />
                            </section>
                        </a>
                    </div>
                    <div className="slide">
                        <a href="#" className="slide-content" onClick={this.onInAndOutClick}>
                            <section>
                                <p>{fsConData.inandout && fsConData.inandout.title}</p>
                                <p>{fsConData.inandout && fsConData.inandout.footer}</p>
                            </section>
                            <section className="tile-slinky">
                                <img src="../images/b/slinky.png" width="190px" alt="" />
                            </section>
                        </a>
                    </div>
                </Slick>

		);
	},
});

module.exports = AccountTilesComponent;
