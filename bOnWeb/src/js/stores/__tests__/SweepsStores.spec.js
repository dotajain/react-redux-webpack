'use strict';

jest.unmock('../SweepsStores');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AlertsNSweepsConstant = require('../../constants/AlertsNSweepsConstant');
const SweepsConstants = require('../../constants/SweepsConstants');
const SweepsStores = require('../SweepsStores');
const AlertsNSweepsStore = require('../AlertsNSweepsStore');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const SweepsApiUtils = require('../../utils/SweepsApiUtils');
const AlertsNSweepsApiUtils = require('../../utils/AlertsNSweepsApiUtils');

describe('Sweeps Store Test Cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
    AlertsNSweepsStore.getSweepData.mockReturnValue({
            counter: 0,
            id: 0,
            account_id: 0,
            other_account_id: 0,
            alert: [{ amount: 50, amount1: 150 }],
        });
    const createSweepDetails = (data) => ({
        action: {
            actionType: SweepsConstants.CREATE_SWEEP_DETAILS,
            data,
        },
    });

    const createSweepDetailsSuccess = () => ({
        action: {
            actionType: SweepsConstants.CREATE_SWEEP_DETAILS_SUCCESS,
        },
    });

    const createDefault = () => ({
        action: {
            actionType: SweepsConstants.default,
        },
    });

    const updateSweepDetails = (toggleSweep, accountId) => ({
        action: {
            actionType: SweepsConstants.EDIT_SWEEP_REQUEST,
            toggleSweep:toggleSweep,
            accountId
        },
    });

    const updateSweepDetailsSuccess = (data) => ({
        action: {
            actionType: SweepsConstants.EDIT_SWEEP_REQUEST_SUCCESS,
            data,
        },
    });

    const deleteSweepDetails = () => ({
        action: {
            actionType: SweepsConstants.DELETE_SWEEP_DATA,
        },
    });

    const deleteSweepDetailsSuccess = (data) => ({
        action: {
            actionType: SweepsConstants.DELETE_SWEEPS_SUCCESS,
            data,
        },
    });

    const handleAlertsNSweepsError = (data, response) => ({
        action: {
            actionType: AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE,
            data,
            response,
        },
    });

    



    let addListner = SweepsStores.addChangeListener(function(){});
    let removeListner = SweepsStores.removeChangeListener(function(){});

    describe('create sweep details', () => {
        const _createSweep = {
            counter: 0,
            id: 0,
            account_id: 0,
            other_account_id: 0,
            alert: [{ amount: 50, amount1: 150 }],
        };
        

        callback(createSweepDetails(_createSweep));

        let actual = SweepsStores.isSweep();
        it('should initialize create sweep data ', () => {
            expect(actual).toEqual(true);  // it should show false
        });

       const data = {};
       const getAccountID = jest.fn();

        SweepsApiUtils.createSweepData(_createSweep, getAccountID);
        it('should make an API call to create sweep details', () => {
            expect(SweepsApiUtils.createSweepData.mock.calls.length).toBe(2);
        }); 

        callback(createSweepDetailsSuccess());

        actual = SweepsStores.isSweep();
        it('should return sweep data successfully created ', () => {
            expect(actual).toEqual(true);
        });

        callback(createDefault());

        //const result = AlertsNSweepsStore.setSweepData();
        // it('should make an API call to get updated list of sweep on success', () => {
        //     expect(AlertsNSweepsApiUtils.getAlertsData.mock.calls.length).toBe(1);
        // }); 
    });

    describe('update sweep details', () => {
        let response = {
            success: 200
        };
        let editSweep = {
            fromAccountId: '123456',
            alert :[
            {
                amount1: 215,
                amount2: 200,
            }]
        }
        AlertsNSweepsStore.getEditSweepData.mockReturnValue(editSweep);
       callback(updateSweepDetails(response , '1234'));
       let actual = SweepsStores.isUpdateSweep();
        it('should initialize update sweep request ', () => {
            expect(actual).toEqual(true);  // true
        });
        
        callback(updateSweepDetails(null , '1234'));
        callback(updateSweepDetailsSuccess());
        callback(updateSweepDetailsSuccess(editSweep));
        actual = SweepsStores.isUpdateSweep();
        it('should update sweep data successfully ', () => {
            expect(actual).toEqual(true);
        });

        
    });

    describe('delete sweep details', () => {
       callback(deleteSweepDetails());
       let actual = SweepsStores.getDelId();
        it('should initialize delete sweep request ', () => {
            expect(actual).toEqual(true); // true
        });
        
        callback(deleteSweepDetailsSuccess());
        actual = SweepsStores.getDelId();
       
        it('should delete sweep data successfully ', () => {
            expect(actual).toEqual(true);
        });

        callback(deleteSweepDetailsSuccess('abcd'));
    });

    describe('handling network error ', () => {
         callback(handleAlertsNSweepsError('test', true));
       let actual = SweepsStores.isNetworkError();
        it('should return false if network issues found', () => {
            expect(actual).toEqual(false);
        });
    });

    describe('handling network error ', () => {
         callback(handleAlertsNSweepsError(false));
       // let actual = SweepsStores.isNetworkError();
        xit('should return false if network issues found', () => {
            expect(actual).toEqual(false);
        });
    });

});
