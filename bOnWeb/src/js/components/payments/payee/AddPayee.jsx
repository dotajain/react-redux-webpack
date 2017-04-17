/**
 * @module AddPayeeComponent
 */
const React = require('react');
const PayeeStore = require('../../../stores/PayeeStore');
const config = require('../../../config');
const PayeeActionCreator = require('../../../actions/PayeeActionCreator');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
const { PropTypes } = React;
const Toggle = require('../../common/Toggle');
const Helmet = require('react-helmet');
const ValidationConfig = require('../../../config/validationConfig');
const HeaderInnerComponent = require('../../common/HeaderInnerComponent');
const TimerMixin = require('react-timer-mixin');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');
const RequiresAuthenticatedUser = require('../../RequiresAuthenticatedUser');
const AddPayeeComponent = React.createClass({

    propTypes: {
        content: PropTypes.object,
    },
    mixins: [TimerMixin],
    getInitialState() {
        // initializing the state values
        return {
            showNickname: false,
            _validField: [],
            name: '',
            sort_code: '',
            display_name: '',
            reference: '',
            account_number: '',
            formValid: false,
            showLoader: false,
            shakeSet: new Set(),
        };
    },
    componentWillMount() {
        // Adding listner for payee store change
        PayeeStore.addChangeListener(this.onStoreChange);
    },

    componentDidMount() {
        AnalyticsActionCreator.track({
            path: '/user/experience/view',
            action: 'Appeared',
        }, {
                description: 'PageLoaded',
        });
    },
    componentWillUnmount() {
        PayeeStore.removeChangeListener(this.onStoreChange);
    },
    // Function is called when there is change in payee store
    onStoreChange() {
        // Getting the Response of service call
        const response = PayeeStore.getAddPayeeResponse();
        switch (response.code) {
            // If response is success navigate to home page
            case 201:
                PayeeActionCreator.navigateToWebTask('WEB-PAYMENT-BACK');
                break;
            // If response is error show error popup
            case 422:
                this.setState(
                    {
                        showLoader: false,
                    }
                );
                // calling error Handler
                this.handleError();

                break;
        }
    },

    /*
     *Function :OnChange
     *Description: When user changes any input text,this function is called.
                   The function first validate the input and then put it in the store.
     *
     */
    onChange(e) {
        const evnt = e;
        // Getting the name and Value of input changed
        const name = e.target.name;
        const value = e.target.value.trimLeft();
        // validating the user input value for the input text
        const validationResult = ValidationConfig.validateData(name, value);
        // If validation criteria is matched
        if (validationResult.isValid) {
            // update the state
            this.updateValueState(name, value);
            // update the store
            PayeeActionCreator.updateForm(name, value);
            // make the input valid
            evnt.target.className = `${''}`;
            this.makeInputValid(name);
        } else {
            // If regex fails shake the input box
            if (!validationResult.regexValid) {
                if (value.length === 0) {
                    this.updateValueState(name, value);
                    PayeeActionCreator.updateForm(name, value);
                    this.makeInputInValid(name);
                }
                   this.shakeFields(name);
            //  e.target.className = `${' animated shake'}`;
            } else if (!validationResult.minLengthValid) {
                PayeeActionCreator.updateForm(name, value);
                this.updateValueState(name, value);
                this.makeInputInValid(name);
               evnt.target.className = `${' pay'}`;
            } else if (!validationResult.maxLengthValid) {
             this.shakeFields(name);
            }
        }
    },
    // handle eror change the showError to true so that popup will be visible
    handleError() {
        this.setState({ showError: true });
    },
    // close the error popup and make user input empty
    closeErrorPopup() {
        this.setState({ showError: false });
    },
    // Error Popup Show the error message coming from the services
    errorPopup() {
        // Getting error response from the store
        const response = PayeeStore.getAddPayeeResponse();
        return (<ErrorPopUpComponent error={response.error}
            closeErrorPopup={this.closeErrorPopup} content={this.props.content}
        />);
    },
    shakeFields(name) {
       this.refs[name].classList.add('animated');
        this.refs[name].classList.add('shake');
                this.state.shakeSet.add(name);
                setTimeout(function () {
                    for (const item of this.state.shakeSet) {
                       this.refs[name].classList.remove('animated');
                       this.refs[name].classList.remove('shake');
                        this.state.shakeSet.delete(item);
                    }
            }.bind(this), 200);
    },
    // making the input valid
    makeInputValid(name) {
        // checking whether the input name is present in the valid field array
        const index = this.state._validField.indexOf(name);
        // If not present add it in the aaray
        if (index === -1) {
            this.state._validField.push(name);
        }
    },
    // make the form input invalid
    makeInputInValid(name) {
        // checking whether the input name is present in the valid field array
        const index = this.state._validField.indexOf(name);
        // If present remove it in the aaray
        if (index !== -1) {
            this.state._validField.splice(index, 1);
        }
    },
    // updating the store value
    updateValueState(name, value) {
        this.setState({
            [name]: value,
        });
    },
    // To handle radio button click event
    handleRadioClick() {
        this.setState(
            {
                showNickname: !this.state.showNickname,
            }
        );
        if (this.state.showNickname === true) {
            this.makeInputInValid(this.props.content.display_name);
            this.setState(
                {
                    display_name: '',
                }
            );
        }
        PayeeActionCreator.updateForm('single_use', this.state.showNickname);
    },
    // To call add payee form PayeeActionCreator
    addPayee() {
        this.setState(
            {
                showLoader: true,
            }
        );
        // Calling Add Payee Service Call
        PayeeActionCreator.addPayee();
        AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
                }, {
                    description: config.analytics.analytics_name_add_payee,
                    event: 'click',
            });
    },
    // To navigate back to payment page
    goBack() {
        PayeeActionCreator.navigateToWebTask('WEB-PAYMENT-BACK');
        PaymentsActionCreator.setTabChanged(true);
    },
    // check whether the form is valid or not
    checkValid() {
        // if save detail is true check array length to be 5 for valid form
        if (this.state.showNickname) {
            if (this.state._validField.length === 5) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.state._validField.length === 4) {
                return true;
            }
        }
        return false;
    },
    // Showing loader when there is a service call
    renderLoader() {
        return (<div className="chicken-loading"> </div>);
    },
    render() {
        return (
            <div>
                {this.state.showLoader ? this.renderLoader() :
                    <div className="b container-fluid-full">
                        <Helmet title="Payments" />
                        <HeaderInnerComponent cancelTitle={this.props.content.cancelTitle} title={this.props.content.addNewPayeeHeader} cancelClick={this.goBack}/>
                        <div className="main-container inner">
                            <div className="scroll-wrapper">
                                <div className="addNewPayee content-wrapper">
                                    <div className="row">
                                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12 ">
                                            <ul className="form-wrapper">
                                                <li>
                                                    <section>{this.props.content.payeeName}
                                                    </section>
                                                    <section>
                                                        <input type="text" className="addPayeeInput" ref="name" name="name" onChange={this.onChange} value={this.state.name} placeholder={this.props.content.placeHolderContent} autoComplete="off" />
                                                    </section>
                                                </li>
                                                <li>
                                                    <section>{this.props.content.payeeSortCode}
                                                    </section>
                                                    <section>
                                                        <input type="text" ref={this.props.content.payeeRequestPacket_sort_code} name={this.props.content.payeeRequestPacket_sort_code} onChange={this.onChange} value={this.state.sort_code} placeholder={this.props.content.placeHolderContent} autoComplete="off"/>
                                                    </section>
                                                </li>
                                                <li>
                                                    <section>{this.props.content.payeeAccountNumber}
                                                    </section>
                                                    <section>
                                                        <input type="text" ref={this.props.content.payeeRequestPacket_account_number} name={this.props.content.payeeRequestPacket_account_number} onChange={this.onChange} value={this.state.account_number} placeholder={this.props.content.placeHolderContent} autoComplete="off" />
                                                    </section>
                                                </li>
                                                <li>
                                                    <section>{this.props.content.payeeReference}
                                                    </section>
                                                    <section>
                                                        <input type="text" ref={this.props.content.payeeRequestPacket_reference} name={this.props.content.payeeRequestPacket_reference} onChange={this.onChange} value={this.state.reference} placeholder={this.props.content.placeHolderContent} autoComplete="off" />
                                                    </section>
                                                </li>
                                                {this.state.showNickname ? <li>
                                                    <section>{this.props.content.payeeNickName}
                                                    </section>
                                                    <section>
                                             <input type="text" ref={this.props.content.payeeRequestPacket_nick_name} name={this.props.content.payeeRequestPacket_nick_name} onChange={this.onChange} value={this.state.display_name} placeholder={this.props.content.placeHolderContent} autoComplete="off" />
                                                    </section>
                                                </li>
                                                    : null}
                                                <li>
                                                    <section>{this.props.content.saveDetails}
                                                    </section>
                                                    <section>
                                                        <div className="toggle">
                                                            <Toggle
                                                                aria-label="No label tag" checked={this.state.showNickname} onChange={this.handleRadioClick}
                                                            />
                                                        </div>
                                                    </section>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {this.checkValid() ? <button type="button" className="pay-btn-success" onClick={this.addPayee}>{this.props.content.addPayee}</button> : null }
                                </div>
                                {this.state.showError ? this.errorPopup() : null }
                            </div>
                        </div>
                    </div>}
            </div>
        );
    },
});
 module.exports = RequiresAuthenticatedUser(AddPayeeComponent);
