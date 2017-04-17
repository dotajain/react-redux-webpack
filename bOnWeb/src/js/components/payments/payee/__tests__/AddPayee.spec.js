'use strict';
jest.unmock('../AddPayee');
jest.runAllTicks();
jest.runAllTimers();
jest.useFakeTimers();

const AddPayeeComponent = require('../AddPayee');
const PayeeStore = require('../../../../stores/PayeeStore');
const PayeeActionCreator = require('../../../../actions/PayeeActionCreator');
const Toggle = require('../../../common/Toggle');
const Helmet = require('react-helmet');
const ValidationConfig = require('../../../../config/validationConfig');
const HeaderInnerComponent = require('../../../common/HeaderInnerComponent');
const TimerMixin = require('react-timer-mixin');
const BasicModal = require('../../../common/modals/ModalB');
let _validField = [];
const _ = require('lodash');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const BrowserUtils = require('../../../../utils/BrowserUtils');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AddPayeeComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
let instance;
let component;
let response;
// BrowserUtils.isMobileView.mockReturnValue();
describe('AddPayeeComponent Test Cases', () => {
    let props = {
       content :{
           cancelTitle : 'Shubhuu',
           addNewPayeeBack: 'Shubhuu',
           addPayee:'add',
           display_name:'display_name',
           _validField:['display_name','name','sort_code','reference','account_number'],
        
           
       }
    };
    let _validField=[];
    beforeEach(() => {
      
        instance = TestUtils.renderIntoDocument(<AddPayeeComponent {...props}/>);
        component = shallowRender(props);
       // PayeeStore.getAddPayeeResponse.mockReturnValue(request);
        
    });
    it('should call componentWillUnmount ', () => {
        let instance = TestUtils.renderIntoDocument(<AddPayeeComponent {...props}/>);
        instance.componentWillUnmount();
    });
    describe('should call onChange function ', () => {        
        beforeEach(()=>{
           instance.makeInputValid = jest.genMockFunction();
          });
        let event = {
            target:{
                name: 'name',
                value:'Shubham'
            }
        }
        it("checking function onChange Valid Condtion",()=>{
        const validationResult = {
        isValid:true,
        minLengthValid:true,
        maxLengthValid:true,
        regexValid:true,
    };
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
         expect(instance.makeInputValid.mock.calls.length).toBe(1);
      });
     it("checking function shakeField",()=>{
        instance.shakeFields('name');
        setTimeout.mockReturnValue(200);
        expect(setTimeout.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(200);
        //expect(instance.shakeFields('name')).toBe();
  

     });  
    it("checking function onChange InValid  Regex If Condtion",()=>{
        const validationResult = {
        isValid:false,
        minLengthValid:true,
        maxLengthValid:true,
        regexValid:false,
    };      event = {
                   target:{
                       name:'name',
                       value:'',
                   }
               }     
            PayeeActionCreator.updateForm.mockReturnValue('name','value');
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
         expect(PayeeActionCreator.updateForm.mock.calls.length).toBe(2);
      });
       it("checking function onChange InValid  Regex Condtion Else Conditon",()=>{
        const validationResult = {
        isValid:false,
        minLengthValid:true,
        maxLengthValid:true,
        regexValid:false,
    };      event = {
                   target:{
                       name:'name',
                       value:'Shubham',
                   }
               }  
            PayeeActionCreator.updateForm.mockReturnValue('name','value');
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
       //  expect(PayeeActionCreator.updateForm.mock.calls.length).toBe(3);
      });
        it("checking function onChange InValid minLengthValid Condtion",()=>{
               event = {
                   target:{
                       name:'name',
                       value:'',
                   }
               }
        const validationResult = {
        isValid:false,
        minLengthValid:false,
        maxLengthValid:true,
        regexValid:true,
    };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
         expect(instance.makeInputInValid.mock.calls.length).toBe(1);
      });
    it("checking function onChange InValid maxLengthValid Condtion",()=>{
               event = {
                   target:{
                       name:'name',
                       value:'',
                   }
               }
        const validationResult = {
        isValid:false,
        minLengthValid:true,
        maxLengthValid:false,
        regexValid:true,
    };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
      });
       it("checking function onChange Else Condtion",()=>{
               event = {
                   target:{
                       name:'name',
                       value:'',
                   }
               }
        const validationResult = {
        isValid:false,
        minLengthValid:true,
        maxLengthValid:true,
        regexValid:true,
    };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onChange(event);    
      });


    });


    it("handleRadioClick method call showNickname=false",()=>{
        instance.state.showNickname=false;
        instance.handleRadioClick();
        expect(instance.state.showNickname).toBe(true);

    });
     it("handleRadioClick method call showNickname true",()=>{
        instance.state.showNickname=true;
        instance.handleRadioClick();
        expect(instance.state.showNickname).toBe(false);

    });
     it("goBack method call",()=>{
        instance.goBack();
         expect(PayeeActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
      it("makeInputValid method call",()=>{
        instance.makeInputValid('test');
         expect(instance.state._validField.indexOf('test')).not.toBe(-1);
    });
  it("makeInputValid method call2",()=>{
              instance.state._validField=['display_name','name','sort_code','reference','account_number'];
             instance.makeInputValid('sort_code');
         expect(instance.state._validField.indexOf('sort_code')).not.toBe(-1);
    });

 it("makeInInputValid method call",()=>{
        instance.state._validField=['display_name','name','sort_code','reference','account_number'];

        instance.makeInputInValid('display_name');
        console.log(instance.state._validField);
         expect(instance.state._validField.indexOf('display_name')).toBe(-1);
    });


    describe('AddPayeeComponent Success Test Cases', () => {

        beforeEach(() => {
       let request ={
          code:201,
          error:{
              message:'SUCCESS Message'
          },
        }
        PayeeStore.getAddPayeeResponse.mockReturnValue(request);     
    });
    it("addPayee method call",()=>{
        instance.addPayee();
        expect(instance.state.showLoader).toBe(true);

    });
      it("closeErrorPopup method call",()=>{
        instance.state.showError=true;
        instance.closeErrorPopup();
        expect(instance.state.showError).toBe(false);

    });
    it("checking function onStoreChange",()=>{
        instance.onStoreChange();
        expect(instance.state.showLoader).toBe(false);

    });
    describe("checking function checkValid",()=>{
         it("checking when showNickname true conditon",()=>{
          instance.state._validField=['display_name','name','sort_code','reference','account_number'];
         instance.state.showNickname=true;
        instance.checkValid();
        expect(instance.state.showLoader).toBe(false);
    });
      it("checking when checkValid",()=>{
         instance.setState({showNickname:true,_validField:'asdfg'});
        instance.checkValid();
        // expect(instance.state.showLoader).toBe(false);
    });
        it("checking when showNickname false conditon",()=>{
          props = {
              content:{
                  display_name:'account_number'
              }
          }
          instance = TestUtils.renderIntoDocument(<AddPayeeComponent {...props}/>)
        instance.state._validField=['display_name','name','sort_code','reference','account_number'];
         instance.state.showNickname=false;
        instance.state._validField.splice(0, 1);
        instance.checkValid();
      
      expect(instance.state.showLoader).toBe(false);

    });

    });
    });

     describe('AddPayeeComponent FAILURE Test Cases', () => {

        beforeEach(() => {
       let request ={
          code:422,
          error:{
              message:'Failure message'
          },
        }
        instance = TestUtils.renderIntoDocument(<AddPayeeComponent {...props}/>);
        component = shallowRender(props);
        PayeeStore.getAddPayeeResponse.mockReturnValue(request);      
    });
    it("checking function onStoreChange for failure",()=>{
        instance.onStoreChange();
        expect(instance.state.showLoader).toBe(false);

    });
    it("checking function updateValueState",()=>{
        let name = "name";
        let value ="shubham";
        instance.updateValueState(name,value);
        instance.setState({[name]:value,});
        expect(instance.state[name]).toBe(value);

    });

    });


    
   

});