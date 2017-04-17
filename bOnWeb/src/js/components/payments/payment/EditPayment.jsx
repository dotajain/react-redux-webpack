/**
 * @module EditPayment
 */
const React = require('react');
const { PropTypes } = React;
const EditDDPayment = require('./EditDDPayment');
const EditSOPayment = require('./EditSOPayment');
const StringConstant = require('../../../constants/StringConstants');

const EditPayment = React.createClass({
    propTypes: {
        contents: PropTypes.object,
        confirmCancel: PropTypes.bool,
        paymentData: PropTypes.string,
        closed: PropTypes.func,
        id:PropTypes.string,
        showView:PropTypes.bool,
        accountId:PropTypes.string,
        fromData:PropTypes.string,
        onClick:PropTypes.func,
        isMobileView: PropTypes.bool,
        type:PropTypes.string,
    },

    getInitialState() {
        return { isConfirming: this.props.confirmCancel };
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            isConfirming: nextProps.confirmCancel,
        });
    },
    // Set the isConfirming state
    confirmCancel() {
        this.setState({
            isConfirming: false,
        });
    },
    // shows the modal based on condition for DD and SO
    showModal() {
        if (this.props.paymentData === StringConstant.DDPayment) {
            return (<EditDDPayment showView={this.props.showView} contents={this.props.contents} accountId={this.props.accountId} id={this.props.id} closed={this.props.closed} isMobileView={this.props.isMobileView} fromData={this.props.fromData} onClick={this.props.onClick}/>);
        }
        if (this.props.paymentData === StringConstant.SOPayment) {
            return (<EditSOPayment type={this.props.type} showView={this.props.showView} accountId={this.props.accountId} contents={this.props.contents} id={this.props.id} closed={this.props.closed} fromData={this.props.fromData} onClick={this.props.onClick} isMobileView={this.props.isMobileView}/>);
        }
    },
    render() {
        return (<div className="full-height">
          {this.showModal()}
        </div>);
    },
});
module.exports = EditPayment;
