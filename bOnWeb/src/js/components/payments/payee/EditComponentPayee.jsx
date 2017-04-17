/**
 * @module EditComponentPayee
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Button = require('react-bootstrap').Button;
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PayeeActionCreator = require('../../../actions/PayeeActionCreator');
const EditPayee = require('./EditPayee');
const { PropTypes } = React;
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const Measure = require('react-measure');
const NumberUtils = require('../../../utils/NumberUtils');

const EditComponentPayee = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.string,
    },
    getInitialState() {
        return { show: false, cellClick: false };
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
        PayeeActionCreator.isEditPayeeExit(true);
    },
    tapOrClick(e) {
        if (e.target.className === 'overlayer') {
            ReactDOM.findDOMNode(e.target).className = '';
            this.setState({ show: false, cellClick: false });
        }
    },
    // click event of the cell of row except edit button
    cellClick(event) {
        this.editClick(event);
        this.setState({ cellClick: true, showView: true });
    },
    // To show the overlay
    showOverlay() {
        if (this.state.show) {
            PayeeActionCreator.isEditPayeeExit(false);
            return this.editPayee();
        } else {
            return <span id="blank" />;
        }
    },
    // Returns the editPayee component in overlay
    editPayee() {
        let style = { 'marginLeft': (PaymentsStore.getLeftMargin() - 400) + 'px' };
        return (<Popover className = "payeeOverlay" id="popover-trigger-click-root-close" style= { style }>
            <EditPayee showView={this.state.showView} payeeData={this.props.rowData} id={this.props.rowData.id} contents={this.props.content} closed={this.closed}/>
        </Popover>
        );
    },
    // Set the states and calls PaymentsActionCreators rowClick method
    closed() {
        return this.setState({ show: false, cellClick: false });
    },
    // Set the states when edit clicked
    editClick1(event) {
        this.setState({ show: true, cellClick: false, target: event.target, showView: false });
    },
    // Set the states when edit clicked
    editClick(event) {
        this.setState({ show: true, cellClick: false, target: event.target, showView: false });
    },
    renderCell() {
        let rowVal = this.props.metadata.columnName === 'to_account.sort_code' ? NumberUtils.formatSortCode(this.props.data) : this.props.data;
        if (this.props.metadata.columnName === 'display_name') {
            return <span ref="span" onClick={this.cellClick}><strong>{rowVal}</strong></span>;
        } else return <span ref="span" onClick={this.cellClick}>{rowVal}</span>;
    },
    render() {
        return (
            <div > {
                this.props.metadata.columnName === 'edit' ?
                    <Measure onMeasure={ dimensions => {
                        PaymentsActionCreator.setLeftMarginOverlay(dimensions.left);
                    } }
                        >
                        <Overlay
                            placement="left"
                            rootClose
                            trigger="click"
                            overlay={this.showOverlay() }
                            onExit={this.onExit}
                            onEnter={this.onEnter}
                            >
                            <Button bsStyle="link" onClick={this.editClick}>{this.props.content.edit} </Button>
                        </Overlay>
                    </Measure>
                    :
                    <Overlay
                        placement="left"
                        rootClose
                        trigger="click"
                        overlay={this.showOverlay() }
                        onExit={this.onExit}
                        onEnter={this.onEnter}
                        >
                        {this.renderCell() }
                    </Overlay>
            }
            </div>);
    },
});

module.exports = EditComponentPayee;
