/**
* @module TermsConditions
*/
const React = require('react');
const { PropTypes } = React;
const BrowserUtils = require('../../utils/BrowserUtils');
const TermsConditionStore = require('../../stores/TermsConditionStore');
const TermsConditions = React.createClass({
    propTypes: {
        content: PropTypes.object,
        closed: PropTypes.func,
        tcData : PropTypes.string,
    },
    getInitialState() {
        return {
            tcData: this.props.tcData,
            showTermsCondition: TermsConditionStore.getShowTC(),
        };
    },
    render() {
        const screenSize = BrowserUtils.getScreenSize();
        const screenWidth = screenSize ? screenSize.x : undefined;
        const isMobileDevice = screenWidth < 768;
        let style = { 'height': '315px', 'overflow-y': 'scroll', 'overflow-x': 'hidden', 'padding': '10px 0', '-ms-overflow-style': '-ms-autohiding-scrollbar' };
        let styleLoader = { 'height': '315px', 'overflow-y': 'hidden', 'overflow-x': 'hidden', 'padding': '10px 0', '-ms-overflow-style': '-ms-autohiding-scrollbar' };
        if (isMobileDevice) {
            style = { 'height': '370px', 'overflow-y': 'scroll', 'overflow-x': 'hidden', '-ms-overflow-style': '-ms-autohiding-scrollbar' };
        }

        return (
            this.state.showTermsCondition === false ? this.renderLoadingImage()
                :
                <div className="b container-fluid-full terms-conditions">
                    <div className=" modal-header text-center">
                        <h3 className="bold">{this.props.content.TnCHeading}</h3>
                        <h6 className="tc_head">{this.props.content.TCHead}</h6></div>
                    {this.state.tcData === '' ? <div className="loader-timeline" style={styleLoader}/> :
                        <div className="txt-content" style={style}>
                            <pre dangerouslySetInnerHTML={{ __html: this.state.tcData }}></pre>
                        </div>}

                    <div className=" modal-footer panel help_btn_panel">
                        <button onClick={ this.props.closed} className="help_btn" data-anchor="confirm-cancel-button" bsSize="large" role="button" bsSize="large" block dangerouslySetInnerHTML={{ __html: this.props.content.TCButton }}></button>
                    </div>
                </div>
        );
    },
});
module.exports = TermsConditions;
