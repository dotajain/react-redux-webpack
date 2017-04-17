const React = require('react');
const { PropTypes } = React;
const ProjectionsActionCreator = require('../../actions/ProjectionsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const Select = require('react-select-box');

const EditProjection = React.createClass({
     propTypes: {
    content: PropTypes.object,
    projectionId: PropTypes.string,
    backAlert: PropTypes.func,
    projectionUpdated: PropTypes.func,
  },
  getInitialState() {
    return {
      modalPopup: false,
      editProjectionAlert: AlertsNSweepsStore.getEditProjectionAlertData(this.props.projectionId),
      amount: AlertsNSweepsStore.getEditProjectionAlertData(this.props.projectionId).alert[0].amount,
      thresholdAmount: `£${AlertsNSweepsStore.getEditProjectionAlertData(this.props.projectionId).alert[0].amount}`,
      showCnfrm: true,
    };
  },


  onThresholdMoneyChange(evnts) {
  //  let thresholdValue = this.getFormattedThresholdMoney(evnt.target.value);
  const evnt = evnts;
  const thresholdValue = String(evnt.target.value).substring(1);
    if (thresholdValue === '00') {
      evnt.target.value = thresholdValue.substring(1);
      return;
    }
    const res = thresholdValue.match(/^[0-9]{0,6}(\.[0-9]{0,2})?$/);
    if (res === null) return;
    if (thresholdValue >= 0 && thresholdValue !== '') {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }
    this.setState({ thresholdAmount: `£${thresholdValue}` });

     this.setState({ amount: thresholdValue });
      // AlertsNSweepsActionCreator.targetProjectionAlertMoney(thresholdValue);
  },

  editProjectionAlert() {
      AlertsNSweepsActionCreator.targetProjectionAlertMoney(parseFloat(this.state.amount));
      AlertsNSweepsActionCreator.hideHeaderComponent(true);
      ProjectionsActionCreator.editProjectionData(null, this.props.projectionId);
      // this.state.amount = this.state.amount === undefined ? this.state.editAlert.amount : this.state.amount;
      this.props.projectionUpdated();
  },

  myAccount(e) {
    AlertsNSweepsActionCreator.setProjectionAlertInMyAccount(e);
  },

  showHeader() {
   // this.props.backAlert();
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
  },

   isConfirm() {
    if (this.state.showCnfrm) {
      return (
        <button className="action-button" onClick={this.editProjectionAlert}>{this.props.content.confirmChanges}</button>
      );
    }
  },

   renderToAccounts() {
    return (<select dir="rtl" className="editSweep" disabled="disabled" value={this.props.projectionId}>
      {AlertsNSweepsStore.getProjectionAccountName().map(account => {
        return <option value={account.id}>{account.name}</option>;
      })
      }
    </select >);

    //  return (<Select onChange = {this.myAccount} value={this.props.projectionId}>
    //   {AlertsNSweepsStore.getProjectionAccountName().map(account => {
    //     return <option value={account.id}>{account.name}</option>;
    //   })
    //   }
    // </Select >);
  },

    render() {
      let amountValue1;
      if (this.state.thresholdAmount) {
        amountValue1 = this.state.thresholdAmount;
      } else {
        amountValue1 = `£${this.state.editProjectionAlert.alert[0].amount}`;
      }

       return (
       <div className="content-wrapper">
                <div className="row no-gutters headerContainer">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
                    <button type="button" className="page-options opt-white" onClick={this.showHeader}>
                      <span >{this.props.content.cancelButton}</span>
                    </button>

                    </div>
                 <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <h2 className="sweepHeading">{this.props.content.editMyAlert}</h2>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                </div>
                </div>
				<div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
                    <ul className= "form-wrapper sweepsForm">
                        <li>
                            <section><span className="float-left">{this.props.content.inMy}</span></section>
                            <section>{this.renderToAccounts() }</section>
                        </li>
                        <li className = "first-column">
                            <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.projectionLine2 }}></span></section>
                             <section>
                            <h4 className="currency currency-value-holder">
                                <input type="text"
                                  defaultValue={`£${this.state.amount}`}
                                  onChange = {this.onThresholdMoneyChange}
                                  value = {this.state.thresholdAmount}
                                />
                                <span className="currency-value-border">
                                  {amountValue1}
                                </span>
                            </h4>
                            </section>
                        </li>
                        <li>
                            <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.projectionLine3 }}></span></section>
                            <section><span className="float-right" dangerouslySetInnerHTML = {{ __html: this.props.content.projectionLine4 }}></span></section>
                        </li>
                    </ul>
                 </div>
              </div>
             <div>
                {this.isConfirm() }
             </div>
           </div>
    );
    },
});

module.exports = EditProjection;
