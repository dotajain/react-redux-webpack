/**
 * @module EditComponentArchive
 */
const React = require('react');
const ReactDOM = require('react-dom');
const PaymentsStore = require('../../../stores/PaymentsStore');
const ViewArchiveComponent = require('./ViewArchiveComponent');
const NumberUtils = require('../../../utils/NumberUtils');
const { PropTypes } = React;
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const StringConstant = require('../../../constants/StringConstants');
const Measure = require('react-measure');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../config');

const EditComponentArchive = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.string || PropTypes.number,
    },
    getInitialState() {
        return { show: false, cellClick: false, custGrid: false };
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
    },
    tapOrClick(e) {
        if (e.target.className === 'overlayer') {
            ReactDOM.findDOMNode(e.target).className = '';
            this.setState({ show: false, cellClick: false });
        }
    },
    // Set the states when edit clicked
    editClick(event) {
        this.setState({ show: true, cellClick: false, target: event.target, showView: false });
    },
    // Set the states when edit clicked
    editClick1(event) {
        this.setState({ show: true, cellClick: false, target: event.target, showView: false });
    },
    // Set the states and calls PaymentsActionCreators rowClick method
    closed() {
        return this.setState({ show: false, cellClick: false });
    },
    // Returns the EditPayment
    editPayment() {
        let style = { 'marginLeft': (PaymentsStore.getArchivedLeftMargin() - 400) + 'px' };
        return (<Popover className = "payeeOverlay" id="popover-trigger-click-root-close" style= { style }>
            <ViewArchiveComponent showView={this.state.showView} archieveData={this.props.rowData} id={this.props.rowData.id} contents={this.props.content} closed={this.closed}/>
        </Popover>
        );
    },
    // To show the overlay
    showOverlay() {
        if (this.state.show) {
            return this.editPayment();
        } else {
            return <span id="blank" />;
        }
    },
    // Set the states when clicked
    rowClick() {
        this.setState({ show: true, rootClose: true });
    },
    // click event of the cell of row except edit button
    cellClick(event) {
        this.editClick(event);
        this.setState({ cellClick: true, showView: true });
    },
    // Sends rowClick data to PaymentsActionCreator
    handleClick(e) {
        this.setState({ target: e.target, show: !this.state.show });
    },
    // Returns the cell based on columnName
    renderCell() {
        switch (this.props.metadata.columnName) {
            case StringConstant.mpWhen:
                if (this.props.rowData.when === undefined) {
                    return <label onClick={this.cellClick}>-</label>;
                } else {
                    let endDate = DateUtils.getMomentFromDateString(this.props.rowData.when);
                    endDate = moment(endDate).format(config.dateFormatTimeline);
                    return <label onClick={this.cellClick}>{endDate}</label>;
                }
            case StringConstant.mpAmount:
                if (this.props.rowData.amount === undefined) {
                    return <label onClick={this.cellClick}>-</label>;
                } else {
                    return <label onClick={this.cellClick}>{NumberUtils.decimalFormat(this.props.rowData.amount, 3, true) }</label>;
                }
            case StringConstant.Type:
                return (<Measure
                    onMeasure={ dimensions => {
                        PaymentsActionCreator.setLeftMarginArchivedOverlay(dimensions.left);
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
                        <span ref="span" onClick={this.cellClick}>{this.props.data}</span>
                    </Overlay>
                </Measure>);
            case StringConstant.mpFrom:
                let css = PaymentsStore.getColorFromAccount(this.props.rowData.fromAccId);
                return <span className={`${css}`} ref="span" onClick={this.cellClick}>{this.props.data}</span>;
            case StringConstant.mpTo:
                const accId = PaymentsStore.getAccIDByAccNumber(this.props.rowData.accNumber);
                css = PaymentsStore.getColorFromAccount(accId);

                return <span className={`${css}`} ref="span" onClick={this.cellClick}>{this.props.data}</span>;
            default:
                return <span ref="span" onClick={this.cellClick}>{this.props.data}</span>;

        }
    },
    render() {
        return (

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
        );
    },
});
module.exports = EditComponentArchive;
