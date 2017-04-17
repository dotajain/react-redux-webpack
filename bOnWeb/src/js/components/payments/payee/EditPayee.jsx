/**
 * @module EditPayeeComponent
 */
const React = require('react');
const { PropTypes } = React;
const EditPaymentStore = require('../../../stores/EditPaymentStore');
const PayeeActionCreator = require('../../../actions/PayeeActionCreator');
const BasicModal = require('../../common/modals/ModalB');
const ValidationConfig = require('../../../config/validationConfig');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');
const EditPayeeComponent = React.createClass({
    propTypes: {
        contents: PropTypes.object,
        payeeData: PropTypes.object,
        closed: PropTypes.func,
        showView: PropTypes.bool,
        onClick: PropTypes.func,
        isMobileView:PropTypes.bool,
    },
    // Setting Initial state
    getInitialState() {
        return {
            deleteFlag: false,
            isDelete: false,
            showView: this.props.showView,
            isDoneShow: '',
            _validField: [],
            showokPopup: false,
            showAnimation: false,
            name: this.props.payeeData.to_account.name,
            sort_code: this.props.payeeData.to_account.sort_code,
            display_name: this.props.payeeData.display_name,
            reference: this.props.payeeData.reference,
            account_number: this.props.payeeData.to_account.account_number,
            showViewData: {
                name: this.props.payeeData.to_account.name,
                sort_code: this.props.payeeData.to_account.sort_code,
                display_name: this.props.payeeData.display_name,
                reference: this.props.payeeData.reference,
                account_number: this.props.payeeData.to_account.account_number,
            },
            formValid: true,
            showError: false,
            shakeSet: new Set(),
            beneficiary_id: this.props.payeeData.id,
        };
    },
    componentWillMount() {
        EditPaymentStore.addChangeListener(this.onStoreChange);
    },
    componentDidMount() {
        this.setupStore();
    },

    componentWillUnmount() {
        EditPaymentStore.removeChangeListener(this.onStoreChange);
    },
    // Function is called when there is change in payee store
    onStoreChange() {
        // getting the response for Edit Payee
        const response = EditPaymentStore.getEditPaymentResponse();
        if (response !== undefined) {
            // Switch case for reponse of code is 201 it is success and else error
            switch (response.code) {
                case 201:
                    // if user perform delete payee close the overlay
                    if (this.state.isDelete) {
                        PayeeActionCreator.isEditPayeeExit(true);
                        this.state.isDelete = false;
                    }
                    if (response.type !== this.props.contents.DELETE_PAYEE_TYPE) {
                        // if it is edit
                        this.state.beneficiary_id = response.id;
                        PayeeActionCreator.updateBenificiaryId(response.id);
                        this.setState({
                            showViewData: {
                                name: this.state.name,
                                sort_code: this.state.sort_code,
                                display_name: this.state.display_name,
                                reference: this.state.reference,
                                account_number: this.state.account_number,
                            },
                            showView: true,
                        });
                    }
                    break;
                case 422:
                    this.handleError();
                    break;
            }
            this.setState({ showAnimation: false });
        }
    },
    onChange(e) {
        const evnt = e;
        const name = e.target.name;
        const value = e.target.value.trimLeft();
        const validationResult = ValidationConfig.validateData(name, value);
        if (validationResult.isValid) {
            this.refs[name].classList.remove('invalid');
            this.updateValueState(name, value);
            PayeeActionCreator.updateEditForm(name, value);
            this.makeInputValid(name);
        } else {
            if (!validationResult.regexValid) {
                if (value.length === 0) {
                    this.updateValueState(name, value);
                    PayeeActionCreator.updateEditForm(name, value);
                    this.makeInputInValid(name);
                }

                this.shakeInput(e.target.name);
            } else if (!validationResult.minLengthValid) {
                 if (value.length === 0) {
                      this.refs[name].classList.remove('invalid');
                       this.shakeInput(e.target.name);
                 }
                PayeeActionCreator.updateEditForm(name, value);
                this.updateValueState(name, value);
                this.makeInputInValid(name);
                evnt.target.className = `${' invalid'}`;
            } else if (!validationResult.maxLengthValid) {
                this.shakeInput(e.target.name);
            }
        }

        this.checkValid();
    },
    setUpEditPayee() {

    },
    // To setup store for viewing payee data
    setupStore() {
        const updateFields = {};
        const fieldValue = {};
        // updating All field on edit payee load
        fieldValue[this.props.contents.payeeRequestPacket_nick_name] = this.props.payeeData.display_name;
        fieldValue[this.props.contents.payeeRequestPacket_sort_code] = this.props.payeeData.to_account.sort_code;
        fieldValue[this.props.contents.payeeRequestPacket_Name] = this.props.payeeData.to_account.name;
        fieldValue[this.props.contents.payeeRequestPacket_reference] = this.props.payeeData.reference;
        fieldValue[this.props.contents.single_use] = false;
        fieldValue[this.props.contents.payeeRequestPacket_account_number] = this.props.payeeData.to_account.account_number;
        this.state._validField = [this.props.contents.NAME, this.props.contents.payeeRequestPacket_account_number, this.props.contents.payeeRequestPacket_nick_name, this.props.contents.payeeRequestPacket_sort_code, this.props.contents.payeeRequestPacket_reference];
        updateFields.fieldValue = fieldValue;
        updateFields.accountId = this.props.payeeData.account.id;
        updateFields.benificiaryId = this.props.payeeData.id;
        PayeeActionCreator.updateAllEditFiled(updateFields);
    },
    // to set view mode on cancel click
    setshowView() {
         if (this.props.isMobileView && this.state.showView) {
      this.props.onClick(false);
    }
        this.setState({ showView: true });
        // Please Don't Delete the commented code
        //    this.setState({
        //                         name: this.state.showViewData.name,
        //                         sort_code: this.state.showViewData.sort_code,
        //                         display_name: this.state.showViewData.display_name,
        //                         reference: this.state.showViewData.reference,
        //                         account_number: this.state.showViewData.account_number,
        //                 });
       // if (this.props.onClick !== undefined) {
           // this.props.onClick(false);
      //  }
    },
  shakeInput(name) {
       this.refs[name].classList.add('animated');
        this.refs[name].classList.add('shake');
                this.state.shakeSet.add(name);
                setTimeout(function () {
                    for (const item of this.state.shakeSet) {
                       this.refs[name].classList.remove('animated');
                       this.refs[name].classList.remove('shake');
                        this.state.shakeSet.delete(item);
                    }
                // this.removeCss();
        }.bind(this), 200);
    },
    handleError() {
        this.setState({ showError: true });
    },
    errorPopup() {
        const response = EditPaymentStore.getEditPaymentResponse();
        return (<ErrorPopUpComponent error={response.error}
            closeErrorPopup={this.closeErrorPopup} content={this.props.contents}
        />);
    },
    // To edit Payee first delete the payee and then add the payee with the changes
    editPayee() {
        this.setState({ showokPopup: true });
    },
    // To delete the beneficiary
    deleteBenificiary() {
        this.setState({ deleteFlag: true });
    },
    // To set the deleteFlag
    closed() {
        this.setState({ deleteFlag: false });
        this.setState({ showAnimation: false });
    },
    // To send detetePayeeRequestPacket to PayeeActionCreator
    deletePayee() {
        // this.setState({ showAnimation: false });
        this.setState({ deleteFlag: false,
            showAnimation: true });
        const detetePayeeRequestPacket = {
            beneficiary_id: this.state.beneficiary_id,
            accountId: this.props.payeeData.account.id,
        };
        this.state.isDelete = true;
        PayeeActionCreator.deletePayee(detetePayeeRequestPacket);
    },
    // To display the modal
    msgPopup() {
        if (this.state.deleteFlag === true) {
            return (<BasicModal>
                <div className="modal_content">
                    <p>{this.props.contents.deletePayeePopUp}</p>
                </div>
                <div className="modal_footer">
                    <button onClick={this.closed}>{this.props.contents.cancel}</button>
                    <button onClick={this.deletePayee}><strong>{this.props.contents.ok}</strong></button>
                </div>
            </BasicModal>);
        } else {
            return <span />;
        }
    },
    editDone() {
        PayeeActionCreator.isEditPayeeExit(false);
        PayeeActionCreator.editPayee();

        this.setState({
            showokPopup: false,
            showAnimation: true,
        });
    },
    // returns the popup when ok clicked
    showokPopup() {
        if (this.state.showokPopup === true) {
            return (<BasicModal>
                <div className="modal_content done-payee">
                    <p>{this.props.contents.editpopupStartText}</p>
                    <p>{this.props.contents.editpopupEndText}</p>
                </div>
                <div className="modal_footer">
                    <button onClick={this.closeokPopup}>{this.props.contents.cancel}</button>
                    <button onClick={this.editDone}>{this.props.contents.ok}</button>
                </div>
            </BasicModal>);
        } else {
            return <span />;
        }
    },
    // Sets the showokPopup to false when clicked
    closeokPopup() {
        this.setState({ showokPopup: false });
    },
    // Sets the showView to false when clicked
    hideViewPayee() {
        this.setState({
            showView: false,
            name: this.state.showViewData.name,
            sort_code: this.state.showViewData.sort_code,
            display_name: this.state.showViewData.display_name,
            reference: this.state.showViewData.reference,
            account_number: this.state.showViewData.account_number,
         });
    const fieldValue = {};
	fieldValue[this.props.contents.payeeRequestPacket_nick_name] = this.state.showViewData.name;
	fieldValue[this.props.contents.payeeRequestPacket_sort_code] = this.state.showViewData.sort_code;
	fieldValue[this.props.contents.payeeRequestPacket_Name] = this.state.showViewData.display_name;
	fieldValue[this.props.contents.payeeRequestPacket_reference] = this.state.showViewData.reference;
	fieldValue[this.props.contents.single_use] = false;
	fieldValue[this.props.contents.payeeRequestPacket_account_number] = this.state.showViewData.account_number;
	this.state._validField = [this.props.contents.NAME, this.props.contents.payeeRequestPacket_account_number, this.props.contents.payeeRequestPacket_nick_name, this.props.contents.payeeRequestPacket_sort_code, this.props.contents.payeeRequestPacket_reference];
	PayeeActionCreator.updateEditPayeeDataShowView(fieldValue);
    },
    closeErrorPopup() {
        this.setState({ showError: false });
    },
    makeInputValid(name) {
        const index = this.state._validField.indexOf(name);
        if (index === -1) {
            this.state._validField.push(name);
        }
    },
    makeInputInValid(name) {
        const index = this.state._validField.indexOf(name);

        if (index !== -1) {
            this.state._validField.splice(index, 1);
        }
    },

    updateValueState(name, value) {
        this.setState({
            [name]: value,
        });
    },
    checkValid() {
        if (this.state._validField.length === 5) {
            this.setState({
                formValid: false,
            });
            this.refs['editDone'].classList.remove('inactive');
        } else {
              this.refs['editDone'].classList.add('inactive');
            this.setState({ formValid: true });
            return false;
        }
    },
    // render header buttons for mobile view
    renderButtonForMobileView() {
        return (<div>{ this.props.isMobileView ? <a className="page-options opt-green" onClick={this.setshowView}><span className = "icon icon-swipe-left"></span>{this.props.contents.back}</a> : ''}</div>);
    },
    // Render Header for edit and view a particular payee
    renderHeader() {
        const header = (<div className = "row no-gutters pay-Header">
            <div className="col-xs-3">
                { this.state.showView ? this.renderButtonForMobileView() :
                    <a className="page-options opt-green float-left" onClick={this.setshowView}>{this.props.contents.cancel}</a>}
            </div>
            <div className="col-xs-6"></div>

            <div className="col-xs-3 text-right">
                { this.state.showView ?
                    <a className="page-options opt-green" onClick={this.hideViewPayee}>{this.props.contents.edit}</a>


                    : <a className="page-options opt-green inactive" id="editDone" ref ="editDone" onClick={this.editPayee}>{this.props.contents.done}</a>


                }
            </div>
        </div>);


        return header;
    },
    // renders nickname for view/edit
    renderNickName() {
        const nickName = this.state.showView ? this.state.showViewData.display_name
            :
            <input type="text" name={this.props.contents.payeeRequestPacket_nick_name} ref={this.props.contents.payeeRequestPacket_nick_name} onChange={this.onChange} placeholder={this.props.contents.placeHolderContent} value={this.state.display_name} autoComplete="off"/>;
        return this.renderTableRow(this.props.contents.payeeNickName, nickName);
    },
    // renders name for view/edit
    renderName() {
        const name = this.state.showView ? this.state.showViewData.name
            :
            <input type="text" className="" ref={this.props.contents.payeeRequestPacket_Name} name={this.props.contents.payeeRequestPacket_Name} onChange={this.onChange} placeholder={this.props.contents.placeHolderContent} value={this.state.name} autoComplete="off"/>;
        return this.renderTableRow('Name', name);
    },
    // renders sort code for view/edit
    renderSortCode() {
        const sortCode = this.state.showView ? this.state.showViewData.sort_code :
            <input type="text" ref={this.props.contents.payeeRequestPacket_sort_code} name={this.props.contents.payeeRequestPacket_sort_code} onChange={this.onChange} placeholder={this.props.contents.placeHolderContent} value={this.state.sort_code} autoComplete="off"/>;
        return this.renderTableRow(this.props.contents.editSortCode, sortCode);
    },
    // renders account number for view/edit
    renderAccountNumber() {
        const accountNumber = this.state.showView ? this.state.showViewData.account_number
            :
            <input type="text" ref={this.props.contents.payeeRequestPacket_account_number} name={this.props.contents.payeeRequestPacket_account_number} onChange={this.onChange} placeholder={this.props.contents.placeHolderContent} value={this.state.account_number} autoComplete="off"/>;
        return this.renderTableRow(this.props.contents.PayeeAccountNumber, accountNumber);
    },
    // renders reference for view/edit
    renderReference() {
        const reference = this.state.showView ? this.state.showViewData.reference :
            <input type="text" ref={this.props.contents.payeeRequestPacket_reference} name={this.props.contents.payeeRequestPacket_reference} onChange={this.onChange} placeholder={this.props.contents.placeHolderContent} value={this.state.reference} autoComplete="off"/>;
        return this.renderTableRow(this.props.contents.reference, reference);
    },
    // renders animated image
    renderLoadingImage() {
        return <div className="chicken-loading" ></div>;
    },
    renderTableRow(name, value) {
        if (name === 'Name' || name === this.props.contents.reference) {
            return (<li className = "first-part">
                <section>{name}</section>
                <section >{value}</section>
            </li>);
        } else {
            return (<li>
                <section>{name}</section>
                <section >{value}</section>
            </li>);
        }
    },
    render() {
        return (
            <div className = "main-container from-top">
                {this.state.showAnimation && this.renderLoadingImage() }

                {this.state.showError ? this.errorPopup() : null }
                {this.msgPopup() }
                {this.showokPopup() }
                {this.renderHeader() }
                <div className = "scroll-wrapper">
                    <div className = "edit-table">
                        <ul>
                            {this.renderNickName() }

                            {this.renderName() }

                            {this.renderSortCode() }

                            {this.renderAccountNumber() }

                            {this.renderReference() }
                        </ul>
                    </div>
                    {this.state.showView ?
                        <div className = "row padding-bottom">
                            <div className="col-xs-12 text-center padding-top padding-bottom">
                                &nbsp;
                            </div>
                        </div>
                        :
                        <div className = "row delete-button">
                            <div className="col-xs-12 text-center padding-top padding-bottom">
                                <a onClick={ this.deleteBenificiary } className="payeeOverlayBtn">{this.props.contents.deleteBenificiary}</a>
                            </div>
                        </div>}
                </div>
            </div>
        );
    },
});

module.exports = EditPayeeComponent;
