/**
 * @module AccountDetailsComponent
 */
const React = require('react');
const { PropTypes } = React;
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AccountSummarySlider = require('./AccountSummarySlider');
const BrandUtils = require('../../utils/BrandUtils');
const UIActions = require('../../actions/UIActions');
const _shrinkOn = 80;

const AccountDetailsComponent = React.createClass({
  propTypes:{
   content: PropTypes.object,
    onTagsClick:PropTypes.func,
    onNextAccountDetails:PropTypes.func,
    onHelpClick:PropTypes.func,
  },

  getInitialState() {
    return {
      accountsState: FinancialStoriesStore.getState(),
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
			window.removeEventListener('scroll', this.handleScroll);
		}
	},

  onTagsClick() {
    this.props.onTagsClick();
  },

   onHelpClick() {
    FinancialStoriesActionCreator.setAccountHelp(true);
    this.props.onHelpClick();
  },
  expand() {
		this.setState({
			className: 'detailed',
		}, () => {
			UIActions.notifyHeaderExpand();
		});
  },
  collapse() {
		this.setState({
			className: 'short',
		}, () => {
			UIActions.notifyHeaderCollapse();
		});
	},
  isCollapsed() {
		return this.state.className === 'short';
	},
  handleScroll() {
		const distanceY = window.pageYOffset || document.documentElement.scrollTop;

		if (this.isCollapsed() && distanceY < _shrinkOn) {
			this.expand();
		} else if (!this.isCollapsed() && distanceY >= _shrinkOn) {
			this.collapse();
		}
	},

  backClick() {
      // timeline
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          setTimeout(
            () => { AccountOpeningActions.navigateToWebTask('WEB-TIMELINE'); },
            100
        );
      } else {
        AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
      }
  },
  render() {
      const accountList = this.state.accountsState.accountList;

      return accountList.length > 0 ?
          (
            <div className={`row no-gutters account-summery ${this.state.className}`}>
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                <a className="page-options float-left" href="#" onClick={this.backClick}>{this.props.content.doneButton}</a>
              </div>


              <div className="col-lg-2 col-lg-push-8 col-md-2 col-md-push-8 col-sm-2 col-sm-push-8 col-xs-6">
                  <a onClick={this.onHelpClick} className="page-options float-right">
                    <span className="icon icon-help-questions"></span>
                  </a>

                  <a onClick={this.onTagsClick} className="page-options float-right">
                    <span className="icon icon-tag"></span>
                  </a>
              </div>


                <div className="summery-slider col-lg-8 col-lg-offset-0 col-lg-pull-2 col-md-offset-0 col-md-8 col-md-pull-2 col-sm-8 col-sm-offset-0 col-sm-pull-2 col-xs-10 col-xs-offset-1">
                  <AccountSummarySlider nextSlide={this.nextSlide} content={this.props.content} onNextAccountDetails={this.props.onNextAccountDetails} />
                </div>
              </div>
          ) : null;
  },
});


module.exports = AccountDetailsComponent;


// <div className="scroll-wrapper">
//             <div className="row no-gutters more-information">
//                 <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
//                   <panel className="expandable">Expandable code comes here</panel>
//                 </div>
//             </div>
//           </div>
// 			</div>

// <div className="acc-top-row" style={style}>
//         <div className="row payments content-wrapper">
//           <div className="acc-header clearfix">
//             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 align-center">
//               <div>
//                 <h3 className="show-desktop"><span className="icon icon-swipe-left" onClick={this.prevSlide}></span><span className="acc-name">{accountList[this.state.counter].name}</span><span className="icon icon-swipe-right" onClick={this.nextSlide}></span></h3>
//                  <ul className="slider-nav">
//                     {this.getAcccountDots()}
//                 </ul>

//               </div>
//               <h3 className="show-mobile">{accountList[this.state.counter].name}</h3>
//               <span className="current-value">{this.props.content.CurrencySign}{accountDetails.currentBalance}<span className="pence-l"></span></span>
//               <p className="more-info" onClick={this.showAndHideInformation}> { this.state.cName }<span className={ this.state.arrow }></span></p>
//             </div>
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={this.state.showHideStyle} >
//               <div className="align-center moreInfo-col">
//                 <p><strong>{accountDetails.number} {accountDetails.sortcode}</strong></p>
//                  {moreInfoRows}
//                  <AccountDetailsMoreInformationDisClaimer contactMessage={this.props.content.AccountMoreInfoView_ContactMessage} disClaimer={moreInformationDisClaimer}/>
//               </div>
//             </div>
//           </div>
//           </div>
//           </div>
