/**
 * @module RepeatPayment
 */

const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');
const DateTimeField = require('react-bootstrap-datetimepicker-noicon');
const Select = require('react-select-box');
const Toggle = require('../../common/Toggle');
const config = require('../../../config');
const DateUtils = require('../../../utils/DateUtils');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const RegexUtils = require('../../../utils/RegexUtils');
const PaymentsStore = require('../../../stores/PaymentsStore');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');
const BasicModal = require('../../common/modals/ModalB');

const RepeatPayment = React.createClass({
    propTypes: {
        content: PropTypes.object,
        onClick: PropTypes.func,
        referenceData: PropTypes.string,
        repeatAccountValid: PropTypes.bool,
        showWhen: PropTypes.bool,
    },
    getInitialState() {
        const defaultValue = DateUtils.getShortString();
        const endingDetails = PaymentsStore.getEndingDetails();
        const startDate = endingDetails.dtStart;
        let endMinDate = moment();
        if (moment().format('YYYY-MM-DD HH.mm.SS') > moment().format('YYYY-MM-DD 16.00.00')) {
            endMinDate = moment().add(2, StringConstant.Days);
        } else if (startDate !== StringConstant.Tomorrow && startDate !== StringConstant.Today) {
            const a = this.getNumberOfDays(startDate);
            endMinDate = moment().add(a, StringConstant.Days);
        }
        return {
            open: true,
            isChecked: false,
            isClicked: false,
            defaultValue,
            selectedValue: null,
            endingDetails: endingDetails,
            value: PaymentsStore.isRepeatOn(),
            startMinDate: moment(),
            startMaxDate: null,
            endMinDate: endMinDate,
            showEnding: false,
            reference: this.props.referenceData,
            isRepeatShowForPot: false,
            showTime: false,
        };
    },
    componentWillMount() {
        PaymentsStore.addChangeListener(this.onStoreChange);
        if (PaymentsStore.getNextTask() === StringConstant.RP) {
            this.setState({ showEnding: true });
        }
        if (PaymentsStore.getConfirmBack()) {
            PaymentsActionCreator.setBackConfirm(false);
        }
        this.setState({ reference: PaymentsStore.getEndingDetails().reference });
        this.setState({ isRepeatShowForPot: true });
    },
    componentDidMount() {
        this.disableDates();
    },
    componentWillUnmount() {
        PaymentsStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange() {
        this.setState({ reference: PaymentsStore.getEndingDetails().reference });

        // focus the textbox
        if (PaymentsStore.getEndingDetails().stopitwhenText === StringConstant.Nooftimes && this.refs.noOfTimes !== undefined) {
            if (this.refs.noOfTimes.value.length === 0) {
                ReactDOM.findDOMNode(this.refs.noOfTimes).focus();
            }
        }

        this.disableDates();
    },
    // Returns the number of days
    getNumberOfDays(date) {
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const part = date.split('-');
        const secondDate = new Date(part[2], part[1] - 1, part[0]);
        return Math.round(Math.abs((currentDate.getTime() - secondDate.getTime()) / (oneDay)));
    },

    // Gets The Ending Details For Ending Condition
    getEndingDetails() {
        switch (PaymentsStore.getEndingDetails().stopitwhenText) {
            case StringConstant.Pickadate: return this.dateTimeField();
            case StringConstant.Nooftimes: return this.textField();
        }
    },
    // Selects the Option From Often Dropdwon
    setSelOften(e) {
        const data = {
            type: StringConstant.setSelOften,
            value: e,
        };
        PaymentsActionCreator.checkEndData(data);
    },
    // Handles the value after checking the Checkbox
    handleCheck(e) {
        const data = {
            type: StringConstant.isRepeat,
            value: e.target.checked,
        };
        PaymentsActionCreator.checkEndData(data);
        this.setState({ isClicked: false, open: e.target.checked });
    },
    // Picks the date whenever selected
    pickStopItWhen(e) {
        this.setState({
            showEnding: true,
        });

        // this.setEndText(e);
        const data = {
            type: StringConstant.stop,
            value: e,
        };
        PaymentsActionCreator.checkEndData(data);
    },
    // Returns DateTimeField For Ending Details
    dateTimeField() {
        let endDate = PaymentsStore.getEndingDetails().end;
        if (endDate !== StringConstant.chooseDate && endDate !== StringConstant.Tomorrow) {
            endDate = DateUtils.getMomentFromDateString(endDate);
            endDate = moment(endDate).format(config.dateFormatTimeline);
        }

        return (
            <DateTimeField ref="dtEnd" defaultText={endDate} minDate={this.state.endMinDate}
                readOnly dateTime={this.state.value || this.state.defaultValue} format={config.dateFormat} inputFormat={config.dateFormatTimeline} mode ="date" onChange={this.dtEnd}
            />
        );
    },
    // Returns Textbox to enter number of times for ending
    textField() {
        return (
            <input type="text" className= "transfer-ref" name="noOfTimes" defaultValue={PaymentsStore.getEndingDetails().end} ref="noOfTimes" minLength={1}
                maxLength={3} onKeyPress={this.keyPress} required onChange={this.txtBlur}
                placeholder=" "
            />
        );
    },
    // Sends the selected values to the parent
    nextClicked() {
        this.props.onClick();
    },
    // Enable the lable when selected
    enableLabel() {
        this.setState({
            isClicked: false,
        });
    },
    // Selects the value for Start Date
    dtStart(e) {
        const a = this.getNumberOfDays(e);
        this.setState({
            endMinDate: moment().add(a + 1, StringConstant.Days),
        });
        const data = {
            type: StringConstant.dtStart,
            value: this.checkDate(e),
        };

        PaymentsActionCreator.checkEndData(data);
    },
    // Selects the value for End Date
    dtEnd(e) {
        const a = this.getNumberOfDays(e);
        this.setState({
            startMaxDate: moment().add(a + 1, StringConstant.Days),
        });
        const data = {
            type: StringConstant.end,
            value: this.checkDate(e),
        };
        PaymentsActionCreator.checkEndData(data);
    },
    // Handles The Textbox Value When Changed
    txtBlur(e) {
        if (parseInt(e.target.value) > StringConstant.noOfTimesLimit || parseInt(e.target.value) === 0) {
            this.refs.noOfTimes.classList.add('invalid');
            const data = {
                type: StringConstant.end,
                value: '',
            };
            PaymentsActionCreator.checkEndData(data);
        } else {
            this.refs.noOfTimes.classList.remove('invalid');
            const data = {
                type: StringConstant.end,
                value: e.target.value,
            };
            PaymentsActionCreator.checkEndData(data);
        }
    },

    // returns how often data
    showHowOften() {
        return (
            <li key="often">
                <section>{this.props.content.howOften} </section>
                <section className="user-input">
                    <Select ref="selOften" value={PaymentsStore.getEndingDetails().oftenText} label={this.props.content.chooseValue} onChange={this.setSelOften}>
                        <option value="weekly" >{this.props.content.Weekly}</option>
                        <option value="2 weekly">{this.props.content.twoWeekly}</option>
                        <option value="3 weekly">{this.props.content.threeWeekly}</option>
                        <option value="4 weekly">{this.props.content.fourWeekly}</option>
                        <option value="1 monthly">{this.props.content.monthly}</option>
                        <option value="2 monthly">{this.props.content.twoMonthly}</option>
                        <option value="3 monthly">{this.props.content.threeMonthly}</option>
                        <option value="6 monthly">{this.props.content.sixMonthly}</option>
                        <option value="12 monthly">{this.props.content.anually}</option>
                    </Select>
                </section>
            </li>
        );
    },

    // returns start date
    showStartDate() {
        const endDetails = PaymentsStore.getEndingDetails();
        let startDate = endDetails.dtStart;
        const endDate = endDetails.end;
        const stopitwhenText = endDetails.stopitwhenText;
        let minDate = null;
        if (moment().format('YYYY-MM-DD HH.mm.SS') > moment().format('YYYY-MM-DD 16.00.00')) {
            minDate = moment().add(2, StringConstant.Days);
        } else {
            minDate = moment().add(1, StringConstant.Days);
        }

        if (startDate !== StringConstant.chooseDate && startDate !== StringConstant.Tomorrow) {
            startDate = DateUtils.getMomentFromDateString(startDate);
            startDate = moment(startDate).format(config.dateFormatTimeline);
        }
        if (stopitwhenText === StringConstant.Pickadate && endDate !== StringConstant.Today && endDate !== StringConstant.chooseDate && endDate !== StringConstant.Tomorrow) {
            const a = this.getNumberOfDays(endDate);
            this.state.startMaxDate = moment().add(a, StringConstant.Days);
        }

        return (
            <li key="start">
                <section>{this.props.content.startDate}</section>
                <section>
                    <DateTimeField ref="dtStart" defaultText={startDate} mode ="date" minDate={minDate} maxDate={this.state.startMaxDate}
                        readOnly dateTime={this.state.value || this.state.defaultValue} format={config.dateFormat} inputFormat={config.dateFormatTimeline} onChange={this.dtStart}
                    />
                </section>
            </li>
        );
    },

    // returns stop it when data
    showStopItWhen() {
        return (

            <li key="stop">
                <section>{this.props.content.stopitWhen}</section>
                <section className="user-input">
                    <Select ref="selStop" value={PaymentsStore.getEndingDetails().stopitwhenText} onChange={this.pickStopItWhen}>
                        <option value={StringConstant.Pickadate} >{this.props.content.pickdate}</option>
                        <option value={StringConstant.Nooftimes}>{this.props.content.noOfTimes}</option>
                        <option value={StringConstant.whenicancel} >{this.props.content.whenIcancel}</option>
                    </Select>
                </section>
            </li>

        );
    },

    // returns ending data
    showEndingData() {
        if (PaymentsStore.getEndingDetails().stopitwhenText !== StringConstant.whenicancel) {
            const endText = PaymentsStore.getEndingDetails().stopitwhenText === StringConstant.Pickadate ? this.props.content.endDate : this.props.content.howManyTimes;
            return (
                <li key="ending">
                    <section>{endText}</section>
                    <section>{this.getEndingDetails() } </section>
                </li>
            );
        }
    },
    // check date for today and tommorrow
    checkDate(firstDate) {
        if (firstDate === StringConstant.Today || firstDate === StringConstant.Tomorrow || firstDate === StringConstant.chooseDate) {
            return firstDate;
        }
        // chck for today
        if (moment(DateUtils.getAPIDateString(firstDate)).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
            return StringConstant.Today;
        } else if (moment(DateUtils.getAPIDateString(firstDate)).format('YYYY-MM-DD') === moment(new Date()).add(1, 'days').format('YYYY-MM-DD')) {
            return StringConstant.Tomorrow;
        } else return firstDate;
    },
    // Sets the state for confirmCancel on cancel click
    closed() {
        this.setState({
            showTime: false,
        });
        const data = {
            type: StringConstant.dtWhen,
            value: this.checkDate(PaymentsStore.getEndingDetails().when),
        };
        PaymentsActionCreator.checkEndData(data);
    },
    showTimeUpPopup() {
        if (this.state.showTime) {
            return (<BasicModal>
                <div className="modal_content credit-modal">
                    <h3>{this.props.content.validationHead}</h3>
                    <p>{this.props.content.validationMsg}</p>
                </div>
                <div className="modal_footer">
                    <button	onClick={ this.closed }>Ok</button>
                </div>
            </BasicModal>);
        }
    },
    // Checks the when Date
    checkWhenDate(e) {
        const data = {
            type: StringConstant.dtWhen,
            value: this.checkDate(e),
        };
        PaymentsActionCreator.checkEndData(data);
        if (this.checkDate(this.checkDate(e)) === StringConstant.Tomorrow
            && moment().format('YYYY-MM-DD HH.mm.SS') > moment().format('YYYY-MM-DD 16.00.00')) {
            this.setState({ showTime: true });
        }
    },
    // Sends data to PaymentsActionCreator when reference changed
    refBlur(e) {
        if (e.target.value.length < 19) {
            const data = {
                type: StringConstant.reference,
                value: e.target.value,
            };
            PaymentsActionCreator.checkEndData(data);
        }
    },
    // Validate the amount
    keyPress(e) {
        const evnt = e;
        const isValid = RegexUtils.isValid(e.key, RegexUtils.regexes.number);
        if (isValid) {
            return true;
        } else {
            evnt.target.className = evnt.target.className.replace('animated shake', '');
            evnt.target.className += ' animated shake';
            evnt.preventDefault();
        }
    },
    disableDates() {
        if (ReactDOM.findDOMNode(this.refs.dtWhen) !== null) {
            ReactDOM.findDOMNode(this.refs.dtWhen).children[2].children[0].readOnly = true;
            let whenDate = PaymentsStore.getEndingDetails().when;

            if (whenDate !== StringConstant.Today && whenDate !== StringConstant.Tomorrow) {
                whenDate = DateUtils.getMomentFromDateString(whenDate);
                whenDate = moment(whenDate).format(config.dateFormatTimeline);
            }
            ReactDOM.findDOMNode(this.refs.dtWhen).children[2].children[0].value = whenDate;
        }
        if (ReactDOM.findDOMNode(this.refs.dtStart) !== null) {
            ReactDOM.findDOMNode(this.refs.dtStart).children[2].children[0].readOnly = true;
            let dtStart = PaymentsStore.getEndingDetails().dtStart;
            if (dtStart !== StringConstant.Today && dtStart !== StringConstant.Tomorrow && dtStart !== StringConstant.chooseDate) {
                dtStart = DateUtils.getMomentFromDateString(dtStart);
                dtStart = moment(dtStart).format(config.dateFormatTimeline);
            }
            ReactDOM.findDOMNode(this.refs.dtStart).children[2].children[0].value = dtStart;
        }

        if (ReactDOM.findDOMNode(this.refs.dtEnd) !== null) {
            ReactDOM.findDOMNode(this.refs.dtEnd).children[2].children[0].readOnly = true;
            let dtEnd = PaymentsStore.getEndingDetails().end;

            if (dtEnd !== StringConstant.Today && dtEnd !== StringConstant.Tomorrow && dtEnd !== StringConstant.chooseDate) {
                dtEnd = DateUtils.getMomentFromDateString(dtEnd);
                dtEnd = moment(dtEnd).format(config.dateFormatTimeline);
            }

            ReactDOM.findDOMNode(this.refs.dtEnd).children[2].children[0].value = dtEnd;
        }
    },
    renderWhen() {
        let whenDate = PaymentsStore.getEndingDetails().when;
        whenDate = this.checkDate(whenDate);

        if (whenDate !== StringConstant.Today && whenDate !== StringConstant.Tomorrow) {
            whenDate = DateUtils.getMomentFromDateString(whenDate);
            whenDate = moment(whenDate).format(config.dateFormatTimeline);
        }
        return (<DateTimeField ref="dtWhen" defaultText={whenDate} format={config.dateFormat} readOnly
            dateTime={this.state.value || this.state.defaultValue } inputFormat={config.dateFormatTimeline} onChange={this.checkWhenDate} mode ="date" minDate={this.state.startMinDate}
        />);
    },
    render() {
        const repeatOption = [];
        if (PaymentsStore.getEndingDetails().isRepeat) {
            repeatOption.push(this.showHowOften());
            repeatOption.push(this.showStartDate());
            repeatOption.push(this.showStopItWhen());
            repeatOption.push(this.showEndingData());
        }


        // this.disableDates();
        let refCss = String.EmptyString;
        let readOnly = true;
        if (PaymentsStore.getPaymentType()) {
            refCss = 'transfer-ref';
            readOnly = false;
        }

        return (
            <div>
                {!PaymentsStore.isSameSavingSelectedPots() &&
                    <ul className="form-wrapper">
                        {PaymentsStore.getReferenceFlag() === true ? <li className = "ref-field">
                            <section>{this.props.content.reference}</section>
                            <section><input type="text" className={refCss} value={this.state.reference} placeholder={this.props.content.referenceText}
                                onChange={this.refBlur} readOnly={readOnly}
                            /></section>
                        </li> : StringConstant.EmptyString}

                        {PaymentsStore.getEndingDetails().isRepeat === false &&
                            <li >
                                <section>{this.props.content.when} </section>
                                <section>
                                    {this.props.repeatAccountValid ?
                                        this.renderWhen() : PaymentsStore.getEndingDetails().when}
                                </section>
                            </li>
                        }

                        { !PaymentsStore.isOneOffPayment() &&
                            <li>
                                <section>{this.props.content.repeatPayment}</section>
                                <section>
                                    {this.props.repeatAccountValid ?
                                        <div className="toggle">
                                            <Toggle
                                                aria-label="No label tag" defaultChecked={PaymentsStore.getEndingDetails().isRepeat} ref="chkRepeat" onChange={this.handleCheck}
                                            />
                                        </div> : this.props.content.No
                                    }
                                </section>
                            </li>
                        }
                        {
                            PaymentsStore.getEndingDetails().isRepeat === true && this.props.repeatAccountValid &&
                            repeatOption.map(option => {
                                return option;
                            })
                        }

                    </ul> }
                {this.showTimeUpPopup() }
            </div>

        );
    },
});

module.exports = RepeatPayment;
