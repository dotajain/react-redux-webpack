'use strict';

jest.unmock('../EditPayee');

const EditPayee = require('../EditPayee');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Table = require('react-bootstrap/lib/Table');
const EditPaymentStore = require('../../../../stores/EditPaymentStore');
const PayeeActionCreator = require('../../../../actions/PayeeActionCreator');
const RegexUtils = require('../../../../utils/RegexUtils');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const ValidationConfig = require('../../../../config/validationConfig');
const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditPayee
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('Button Component Test Cases', () => {
    let props = {
        isMobileView :true,
        onClick:jest.fn(),
        contents: {
            cancel: 'Cancel',
            DELETE_PAYEE_TYPE: 'DELETE_PAYEE',
        },
        payeeData: {
            "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
            "account": {
                "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                "sort_code": "654321",
                "account_number": "12345678",
            },
            "to_account": {
                "sort_code": "654321",
                "account_number": "43214321",
                "name": "John Black",
            },
            "display_name": "John Black ",
            "reference": "88228822",
            "permissions": {
                "can_edit_reference": true,
                "can_set_date_in_future": true,
                "can_delete": true,
            },
        },
        handleError: jest.fn(),
    };
    it('should call componentDidMount ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.componentDidMount();
    });
    it('should call componentWillUnmount ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.componentWillUnmount();
    });
    it('should call onStoreChange ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 201,
            type: 'DELETE_PAYEE',
        });
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ isDelete: true });
        instance.onStoreChange();
        expect(instance.state.isDelete).toBe(false);
    });
    it('should call onStoreChange for else condition of 201 case ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 201,
            type: 'DELETE_PAYEE',
        });
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ isDelete: false });
        instance.onStoreChange();
        expect(instance.state.isDelete).toBe(false);
    });
    it('should call onStoreChange for type other than DELETE_PAYEE ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 201,
            type: 'DELETE_PAYEEs',
        });
        PaymentsActionCreator.getFromPayeeList.mockReturnValue();
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.deletePayee();
        instance.onStoreChange();
    });
    it('should call onStoreChange for type DELETE_PAYEE ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 201,
            type: 'DELETE_PAYEE',
        });
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ isDelete: false });
        instance.onStoreChange();
          expect(instance.state.isDelete).toBe(false);
    });
    it('should call onStoreChange else condition ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue(undefined);
        let isDelete = true;
        let instance = TestUtils.renderIntoDocument(<EditPayee isDelete={isDelete} {...props}/>);
        instance.onStoreChange();
    });
    it('should call onStoreChange for case 422', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 422,
            type: 'DELETE_PAYEEs',
            error: {
                message: 'adsfdfdf',
            },
        });
        PaymentsActionCreator.getFromPayeeList.mockReturnValue();
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onStoreChange();
    });
    it('should call onChange  ', () => {
        let e = {
            target: {
                value: '12',
                name: 'editDone',
            },
        };
          ValidationConfig.validateData.mockReturnValue({
            isValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let isDelete = true;
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
        expect(instance.onChange).toBeDefined();
    });
    it('should call onChange else part ', () => {
        let e = {
            target: {
                value: '12',
                name: 'editDone',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
         expect(instance.onChange).toBeDefined();
    });
    it('should call onChange else part of validation result ', () => {
        let e = {
            target: {
                value: '12',
                name: 'dsd',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: false,
            regexValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
         expect(instance.onChange).toBeDefined();
    });
    it('should call onChange else part of validation result ', () => {
        let e = {
            target: {
                value: '12',
                name: 'editDone',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: false,
            // regexValid: false,
            maxLengthValid: false,
            minLengthValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
         expect(instance.onChange).toBeDefined();
    });
    it('should call onChange elseif part of validation result ', () => {
        let e = {
            target: {
                value:'12',
                name: 'editDone',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: false,
            regexValid: true,
            maxLengthValid: false,
            minLengthValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
         expect(instance.onChange).toBeDefined();
    });
    it('should call onChange elseif part for maxLengthValid of validation result ', () => {
        let e = {
            target: {
                value:'12',
                name: 'dsd',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: false,
            regexValid: true,
            maxLengthValid: true,
            minLengthValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
    });
     it('should call onChange if part for regexValid of validation result ', () => {
        let e = {
            target: {
                value:'',
                name: 'editDone',
            }

        };

        ValidationConfig.validateData.mockReturnValue({
            isValid: false,
            regexValid: false,
            maxLengthValid: true,
            minLengthValid: true,
        });
        ValidationConfig.getValidationObjet.mockReturnValue('dsd');
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.onChange(e);
    });
    it('should call makeInputValid ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue(undefined);
        let isDelete = true;
        let instance = TestUtils.renderIntoDocument(<EditPayee isDelete={isDelete} {...props}/>);
        // instance.state._validField.indexOf('Nick Name');
        instance.makeInputValid();
    });
    it('should call renderTableRow ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        // instance.state._validField.indexOf('Nick Name');
        instance.renderTableRow('efefe');
    });
    it('should call makeInputValid ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue(undefined);
        let isDelete = true;
        let instance = TestUtils.renderIntoDocument(<EditPayee isDelete={isDelete} {...props}/>);
        // instance.state._validField.indexOf('Nick Name');
        instance.makeInputInValid();
    });
    it('should call closeErrorPopup ', () => {
        /*EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            error:{
                message:'ssss',
            },
        });*/
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        /* instance.setState({ showNickname: false,
                         name:'',
                         sort_code:'',
                         display_name:'',
                         reference:'',
                         account_number:'',
                         formValid:false });*/
        instance.closeErrorPopup();
    });
    it('should call errorPopup ', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            error: {
                message: 'ssss',
            },
        });
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.errorPopup();
    });
    it('should call msgPopup ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ deleteFlag: true });
        instance.msgPopup();
        expect(instance.state.deleteFlag).toBeTruthy();
    });
    it('should call showokPopup ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showokPopup: true });
        instance.showokPopup();
        instance.editPayee();
        expect(instance.state.showokPopup).toBeTruthy();
    });
    it('should call closeokPopup ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showokPopup: false });
        instance.closeokPopup();
        expect(instance.state.showokPopup).toBe(false);
    });
    it('should call hideViewPayee ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showView: false });
        instance.hideViewPayee();
        expect(instance.state.showView).toBe(false);
    });
    it('should call deleteBenificiary ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ deleteFlag: true });
        instance.deleteBenificiary();
        expect(instance.state.deleteFlag).toBeTruthy();
    });
    it('should call closed ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ deleteFlag: false, showAnimation: false });
        instance.closed();
        expect(instance.state.deleteFlag).toBe(false);
    });
    it('should call editDone ', () => {
        PayeeActionCreator.isEditPayeeExit.mockReturnValue(false);
        PayeeActionCreator.editPayee.mockReturnValue();
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showokPopup: false });
        instance.editDone();
        expect(instance.state.showokPopup).toBe(false);
    });
    it('should call setshowView ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showView: true });
        instance.setshowView();
        expect(instance.state.showView).toBeTruthy();
    });
       it('should call checkValid ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ _validField: 'sdfghfdgtgd' });
        instance.checkValid();
        // expect(instance.state.showView).toBeTruthy();
    });
     it('should call shakeInput ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        // instance.setState({ _validField: 'sdfghfdgtgd' });
        instance.shakeInput('editDone');
        // expect(instance.state.showView).toBeTruthy();
    });
    
    it('should call setshowView else part ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showView: false });
        instance.setshowView();
        expect(instance.state.showView).toBe(true);
    });
    it('should call handleError ', () => {
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        instance.setState({ showError: true });
        instance.handleError();
        expect(instance.state.showError).toBeTruthy();
    });
    it('should call makeInputInValid ', () => {
        let name = 'asdf';
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        // instance.setState({ showError: true });
        instance.makeInputInValid(name);
        // expect(instance.state.showError).toBeTruthy();
    });
    it('should call updateValueState ', () => {
        let name = 'asdf';
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        // instance.setState({ showError: true });
        instance.updateValueState(name);
        // expect(instance.state.showError).toBeTruthy();
    });
    // it('should call textBlur ', () => {
    //     let e = {
    //         target: {
    //             value: '12',
    //             name: 'dsd',
    //         },
    //     };
    //     let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
    //     instance.setState({ showokPopup: false });
    //     instance.textBlur(e);
    // });
    //   it('should call txtChange ', () => {
    //     let e = {
    //         target: {
    //             value: '12',
    //             className : 'dsd',
    //         },
    //         preventDefault:jest.fn(),
    //     };
    //     let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
    //     instance.setState({ showokPopup: false });
    //     instance.txtChange(e);
    // });
    xit('should call keyPress ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },
            key: '2',
            preventDefault: jest.fn(),
        };
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        RegexUtils.isValid.mockReturnValue(true);
        //  instance.setState({ showokPopup: false });
        instance.keyPress(e);
    });
    xit('should call keyPress else condition ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },
            key: '2',
            preventDefault: jest.fn(),
        };
        let instance = TestUtils.renderIntoDocument(<EditPayee {...props}/>);
        RegexUtils.isValid.mockReturnValue(false);
        //  instance.setState({ showokPopup: false });
        instance.keyPress(e);
    });
    it('should return EditPayee jsx', () => {
        let component = shallowRender(props);
        expect(component).toEqualJSX(
              <div className="main-container from-top">
    <span />
    <span />
  <div className="row no-gutters pay-Header">
    <div className="col-xs-3">
       <a
         className="page-options opt-green float-left"
         onClick={function noRefCheck() {}}
       >
         Cancel
       </a>
     </div>

      <div className="col-xs-6" />
      <div className="col-xs-3 text-right">
       <a
          ref="editDone"
          className="page-options opt-green inactive"
          id="editDone"
         onClick={function noRefCheck() {}}
       />
     </div>
   </div>

    <div className="scroll-wrapper">
      <div className="edit-table">
        <ul>
          <li className="first-part">
            <section />
            <section>
              <input
                autoComplete="off"
               name={undefined}
                onChange={function noRefCheck() {}}
                placeholder={undefined}
                type="text"
                value="John Black "
              />
            </section>
          </li>
          <li className="first-part">
            <section>
             Name
            </section>
            <section>
              <input
                autoComplete="off"
                className=""
                name={undefined}
                onChange={function noRefCheck() {}}
                placeholder={undefined}
                type="text"
                value="John Black"
              />
            </section>
          </li>
          <li className="first-part">
            <section />
            <section>
              <input
                autoComplete="off"
                name={undefined}
                onChange={function noRefCheck() {}}
                placeholder={undefined}
                type="text"
                value="654321"
              />
            </section>
          </li>
          <li className="first-part">
            <section />
            <section>
              <input
                autoComplete="off"
                name={undefined}
                onChange={function noRefCheck() {}}
                placeholder={undefined}
                type="text"
                value="43214321"
              />
            </section>
          </li>
          <li className="first-part">
            <section />
            <section>
              <input
                autoComplete="off"
                name={undefined}
                onChange={function noRefCheck() {}}
                placeholder={undefined}
                type="text"
                value="88228822"
             />
            </section>
          </li>
        </ul>
     </div>

      <div className="row delete-button">
        <div className="col-xs-12 text-center padding-top padding-bottom">
          <a
            className="payeeOverlayBtn"
            onClick={function noRefCheck() {}}
          />
        </div>
      </div>
   </div>
 </div>
        );
    });
});