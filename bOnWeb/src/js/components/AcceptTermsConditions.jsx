/**
* @module TermsConditions
*/
const React = require('react');
const { PropTypes } = React;
const BrowserUtils = require('../utils/BrowserUtils');
const TermsConditionStore = require('../stores/TermsConditionStore');
const TermsConditionActionCreator = require('../actions/TermsConditionActionCreator');
const AcceptTermsConditions = React.createClass({
    propTypes: {
        content: PropTypes.object,
        closed: PropTypes.func,
    },
    getInitialState() {
      return {
        tcData: '',
      };
    },
    componentDidMount() {
      TermsConditionStore.addChangeListener(this.onStoreChange);
      TermsConditionActionCreator.getTcData();
    },
    componentWillUnmount() {
      TermsConditionStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange() {
      this.setState({ tcData: TermsConditionStore.getAll() });
    },
    acceptTandC() {
      TermsConditionActionCreator.acceptTermsConditions();
    },
    render() {
        const screenSize = BrowserUtils.getScreenSize();
        const screenWidth = screenSize ? screenSize.x : undefined;
        const isMobileDevice = screenWidth < 768;
        let style = { 'height': '315px', 'overflow-y': 'scroll', 'overflow-x': 'hidden', 'padding': '10px 10px', '-ms-overflow-style': '-ms-autohiding-scrollbar' };
        if (isMobileDevice) {
            style = { 'height': '300px', 'overflow-y': 'scroll', 'overflow-x': 'hidden', '-ms-overflow-style': '-ms-autohiding-scrollbar' };
          }

        return (
            <div className="terms-conditions">
                <div className=" modal-header text-center">
                    <h3 className="bold">{this.props.content.TnCHeading}</h3>
                    <h6 className="tc_head">{this.props.content.TCHead}</h6></div>
                <div className="txt-content" style={style}>
                      <pre>{this.state.tcData}</pre>
                </div>

                <div className="modal-footer panel help_btn_panel">
                    <button onClick={this.acceptTandC} className="help_btn" data-anchor="confirm-cancel-button" bsSize="large" role="button" bsSize="large" block >Accept</button>
                </div>
            </div>
        );
    },
});
module.exports = AcceptTermsConditions;
