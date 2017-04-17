'use strict';

jest.unmock('../PayeeComponent');
jest.mock('../../../../stores/PaymentsStore');
const PayeeComponent = require('../PayeeComponent');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const BrowserUtils = require('../../../../utils/BrowserUtils');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<PayeeComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
// BrowserUtils.isMobileView.mockReturnValue();
describe('PayeeComponent Test Cases', () => {
    let props = {
        data: {
            "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
            "account": {
                "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                "sort_code": "654321",
                "account_number": "12345678"
            },
            "to_account": {
                "sort_code": "654321",
                "account_number": "43214321",
                "name": "John Black"
            },
            "display_name": "John Black ",
            "reference": "88228822",
            "permissions": {
                "can_edit_reference": true,
                "can_set_date_in_future": true,
                "can_delete": true
            },
        },
        onClick: jest.genMockFn(),
        display: true,
    };
    beforeEach(() => {
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
    });
    it('should call setRadioCSS', () => {
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        PaymentsStore.getNextTask.mockReturnValue('RP');
        instance.setRadioCSS();
    });
    it('should call setRadioCSS', () => {
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        PaymentsStore.getNextTask.mockReturnValue('To');
        instance.setRadioCSS();
    });
    it('should call setRadioCSS for CNFRM case', () => {
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        PaymentsStore.getNextTask.mockReturnValue('CNFRM');
        instance.setRadioCSS();
    });
    it('should call setRadioCSS for From case', () => {
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        PaymentsStore.getNextTask.mockReturnValue('From');
        // PaymentsStore.IsPayeeSame('4bbcfd9d-c1b4-4a65-a694-b347711612e7');
        instance.setRadioCSS();
    });
    it('should call handleChange', () => {
        let e = {
            target: {
                checked: false,
            },
        };
        PaymentsStore.IsPayeeSame.mockReturnValue(true);
        BrowserUtils.isMobileView.mockReturnValue(true);
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        instance.handleChange(e);
    });
    it('should call handleChange else part', () => {
        let e = {
            target: {
                checked: false,
            },
        };
        PaymentsStore.IsPayeeSame.mockReturnValue(false);
        BrowserUtils.isMobileView.mockReturnValue(false);
        let instance = TestUtils.renderIntoDocument(<PayeeComponent {...props}/>);
        instance.handleChange(e);
    });

    it('should return PayeeComponent jsx', () => {
        let component = shallowRender(props);
        expect(component).toEqualJSX(
            <div className="checkbox-account payee account-11">
   <input
     defaultChecked={false}
      disabled={true}
     id="4bbcfd9d-c1b4-4a65-a694-b347711612e7"
     name="groupTo"
     onClick={function noRefCheck() {}}
     type="radio"
     value="4bbcfd9d-c1b4-4a65-a694-b347711612e7"
   />
   <label htmlFor="4bbcfd9d-c1b4-4a65-a694-b347711612e7">
     <h3 className="group-to">
        John Black
     </h3>
     <h5>
        43214321 |
     </h5>
     <h4>
       Reference
     </h4>
     <h2 className="group-to">
       88228822
     </h2>
   </label>
 </div>
        );


    });



});