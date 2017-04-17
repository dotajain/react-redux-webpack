/**
 * TermsConditionActionCreator
 * @class TermsConditionActionCreator
 */

jest.mock('../../stores/TermsConditionStore');
jest.unmock('../TermsConditionActionCreator');

const TermsConditionStore = require('../../stores/TermsConditionStore');
const TermsConditionActionCreator = require('../TermsConditionActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TermsConditionConstants = require('../../constants/TermsConditionConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('TermsConditionActionCreator', () => {

    beforeEach(() => {

    });
    it('Action to get all Terms and conditions data from API', () => {
        TermsConditionActionCreator.getTcData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('handleTcDataSuccess', () => {
    it('to check the function', () => {
        let response = {
            "category": "tandcs",
            "service": "b",
            "version": "v3.8",
            "content": {
                "ref": "termsandconditions/robots.txt"
            }
        }
        TermsConditionActionCreator.handleTcDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});

describe('handleTcTextDataSuccess', () => {
    it('to check the function', () => {
        let response = {
            "category": "tandcs",
            "service": "b",
            "version": "v3.8",
            "content": {
                "ref": "termsandconditions/robots.txt"
            }
        }
        TermsConditionActionCreator.handleTcTextDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('acceptTermsConditions', () => {
    beforeEach(() => {
        
    });
    it('Action to  handle Transaction Error from API', () => {
        TermsConditionActionCreator.acceptTermsConditions('error');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});