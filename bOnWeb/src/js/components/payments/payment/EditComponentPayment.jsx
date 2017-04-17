/**
 * @module EditComponentPayment
 */
const React = require('react');
const ReactDOM = require('react-dom');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const EditPayment = require('./EditPayment');
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const Button = require('react-bootstrap/lib/Button');
const Measure = require('react-measure');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../config');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');
const NumberUtils = require('../../../utils/NumberUtils');

const EditComponentPayment = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: [PropTypes.string || PropTypes.number],
    },
    getInitialState() {
        return {
            show: false, cellClick: false,
            showView: false,
        };
    },
    componentWillMount() {
        this.setState({ leftMargin: (PaymentsStore.getLeftMargin() - 400) });
    },
    // enter event of overlay
    onEnter(e) {
        ReactDOM.findDOMNode(e).parentNode.className = 'overlayer';
        ReactDOM.findDOMNode(e).parentNode.addEventListener('touchend', this.tapOrClick, false);
    },
    // exit event of the overlay
    onExit(e) {
        ReactDOM.findDOMNode(e).parentNode.className = '';
        ReactDOM.findDOMNode(e).parentNode.removeEventListener('touchend', this.tapOrClick, false);
        PaymentsActionCreator.isEditPaymentExit(false);
    },
    tapOrClick(e) {
        if (e.target.className === 'overlayer') {
            ReactDOM.findDOMNode(e.target).className = '';
            this.setState({ show: false, cellClick: false });
        }
    },
    // Handles resize
    handleResize(e) {
        if (e.target.innerWidth === this.state.windowWidth) {
            this.setState({ leftMargin: (PaymentsStore.getLeftMargin() - 400) });
        } else {
            this.setState({ leftMargin: Math.abs(e.target.innerWidth - this.state.windowWidth) });
        }
    },
    // Set the states when edit clicked
    editClick(event) {
        this.setState({ show: true, cellClick: false, target: event.target });
    },
    // click event of the cell of row except edit button
    cellClick(event) {
        this.editClick(event);
        this.setState({ cellClick: true, showView: true });
    },
    // to set the states whne modal closed
    closed() {
        return this.setState({ show: false, cellClick: false });
    },
    // Returns the EditPayment
    editPayment() {
        let style = { 'marginLeft': (PaymentsStore.getLeftMargin() - 400) + 'px' };
        return (<Popover className= "payeeOverlay" id= "popover-trigger-click-root-close" style= { style } >
            <EditPayment showView={this.state.showView} type={this.props.rowData.payType} paymentData={this.props.rowData.category} accountId={this.props.rowData.fromAccId} id={this.props.rowData.id} contents={this.props.content} closed={this.closed} fromData={this.props.rowData.from}/>
        </Popover >
        );
    },
    // To show the overlay
    showOverlay() {
        if (this.state.show) {
            PaymentsActionCreator.isEditPaymentExit(true);
            return this.editPayment();
        } else {
            return <span id="blank" />;
        }
    },
    // Returns the cell based on columnName
    renderCell() {
        switch (this.props.metadata.columnName) {
            case StringConstant.mpEdit:
                return (<Measure
                    onMeasure={ dimensions => {
                        PaymentsActionCreator.setLeftMarginOverlay(dimensions.left);
                    } }
                >
                    <Overlay
                        rootClose
                        trigger="click"
                        placement="left"
                        overlay={this.showOverlay() }
                        onExit={this.onExit}
                        onEnter={this.onEnter}
                    >
                        <Button bsStyle="link" onClick={this.editClick}>{this.props.content.edit} </Button>
                    </Overlay>
                </Measure>);
            case StringConstant.mpWhen:
                let endDate = DateUtils.getMomentFromDateString(this.props.rowData.when);
                endDate = moment(endDate).format(config.dateFormatTimeline);
                return <label onClick={this.cellClick}>{endDate}</label>;
            case StringConstant.mpFrom:
                let css = PaymentsStore.getColorFromAccount(this.props.rowData.fromAccId);
                return <label className={`${css}`} onClick={this.cellClick}>{this.props.rowData.from}</label>;
            case StringConstant.mpTo:
                const accId = PaymentsStore.getAccIDByAccNumber(this.props.rowData.accNumber);
                css = PaymentsStore.getColorFromAccount(accId);

                return <label className={`${css}`} onClick={this.cellClick}>{this.props.rowData.to}</label>;
            case StringConstant.mpAmount:
                return <span ref="span" onClick={this.cellClick}>{NumberUtils.decimalFormat(this.props.data, 3, true) }</span>;
            default:
                return <span ref="span" onClick={this.cellClick}>{this.props.data}</span>;

        }
    },
    render() {
        return (
            <div>

                <Overlay
                    rootClose
                    trigger="click"
                    placement="left"
                    overlay={this.showOverlay() }
                    onExit={this.onExit}
                    onEnter={this.onEnter}
                >
                    {this.renderCell() }
                </Overlay>
            </div>);
    },
});

module.exports = EditComponentPayment;
