'use strict';

jest.unmock('../../constants/TermsConditionConstants');
jest.unmock('../TermsConditionStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TermsConditionApiUtils = require('../../utils/TermsConditionApiUtils');
const TermsConditionConstants = require('../../constants/TermsConditionConstants');
const TermsConditionStore = require('../TermsConditionStore');
const TermsConditionActionCreator = require('../../actions/TermsConditionActionCreator');

describe('TermsCondition Store test cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
    let result;
    let getTcData = () => ({
        action: {
            actionType: TermsConditionConstants.GET_TC_DATA,
            data: []
        }
    });
    let sendTCData = (data) => ({
        action: {
            actionType: TermsConditionConstants.SEND_TC_DATA,
            data
        }
    });

    let GETTCDATASUCCESS = (data) => ({
        action: {
            actionType: TermsConditionConstants.GET_TC_DATA_SUCCESS,
            data
        }
    });

    describe('Api call for TermsCondition data1', () => {
        let data = {
            version: 'version',
            service: 'service',
            content: {
                ref: 'ref',
            }
        };
        callback(GETTCDATASUCCESS(data));

        it('should make api call', () => {
            expect(TermsConditionApiUtils.getTextUrl.mock.calls.length).toBe(1);
        });
    });

     let GETTCTEXTDATASUCCESS = (data) => ({
        action: {
            actionType: TermsConditionConstants.GET_TC_TEXT_DATA_SUCCESS,
            data
        }
    });

    describe('Api call for TermsCondition data2', () => {
        let data = {
            version: 'version',
            service: 'service',
            content: {
                ref: 'ref',
            }
        };
        callback(GETTCTEXTDATASUCCESS(data));
    });

let REQUESTACCEPTTC = (data) => ({
        action: {
            actionType: TermsConditionConstants.REQUEST_ACCEPT_TC,
            data
        }
    });

    describe('Api call for TermsCondition data4', () => {
        let data = {
            version: 'version',
            service: 'service',
            content: {
                ref: 'ref',
            }
        };
        callback(REQUESTACCEPTTC(data));

        it('should make api call', () => {
            expect(TermsConditionApiUtils.acceptedTermsAndConditions.mock.calls.length).toBe(1);
        });
    });

    describe('Api call for TermsCondition data3', () => {
        callback(getTcData());
        result = TermsConditionStore.getAll();

        it('should make api call', () => {
            expect(TermsConditionApiUtils.getTcData.mock.calls.length).toBe(2);
        });
    });

 describe('Api call for TermsCondition data5', () => {
        callback(getTcData());
        result = TermsConditionStore.getShowTC();

        it('should make api call', () => {
            expect(TermsConditionApiUtils.getTcData.mock.calls.length).toBe(2);
        });
    });

    describe('get all test cases success', () => {
        let _TcData= {

            version: 'version', 
            service: 'service', 
            content: {
              "ref": 'ref',
            }
   };
        beforeEach(() => {
            callback(sendTCData(_TcData));
            result = TermsConditionStore.getAll();
        });
        it('should have a TermsCondition Data value', () => {
            expect(result).toEqual(_TcData);
        })
    });

    describe('removeChangeListener', () => {
        const props = {
            content: {

            },
        };
        it('calls for the removeChangeListener', () => {
            // let node = document.createElement('div');
            // const render = (comp, el) => ReactDOM.render(comp, el);
            TermsConditionStore.removeChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });

    describe('addChangeListener', () => {
        const props = {
            content: {
            },
        };
        it('calls for the addChangeListener', () => {
            TermsConditionStore.addChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
});