'use strict';

jest.unmock('../ProjectionsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const ProjectionsConstants = require('../../constants/ProjectionsConstants');
const AlertsNSweepsStore = require('../AlertsNSweepsStore');
const ProjectionsStore = require('../ProjectionsStore');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const SweepsApiUtils = require('../../utils/SweepsApiUtils');
const ProjectionsApiUtils = require('../../utils/ProjectionsApiUtils');


describe('Projections stores Test Cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];

    AlertsNSweepsStore.getEditProjectionAlertData.mockReturnValue({ alert: [{ amount: 100.20,enabled: true }] });
    const updateProjectionDetails = (data, accountId) => ({
        action: {
            actionType: ProjectionsConstants.UPDATE_PROJECTION_DETAILS,
            toggleProjection: data,
            accountId,
        },
    });

    const handleUpdateSuccess = (data) => ({
        action: {
            actionType: ProjectionsConstants.UPDATE_PROJECTION_DETAILS_SUCCESS,
            data,
        },
    });

    const setProjectionEdited = (data) => ({
        action: {
            actionType: ProjectionsConstants.RESET_UPDATION_FLAG,
            data,
        },
    });

    const createDefault = () => ({
        action: {
            actionType: ProjectionsConstants.default,
        },
    });

    let addListner = ProjectionsStore.addChangeListener(function(){});
    let removeListner = ProjectionsStore.removeChangeListener(function(){});
    

    describe('toggle projection', () => {
        let toggleProjection = 'toggleProjection';
        callback(updateProjectionDetails(true, true));
        let actual = ProjectionsStore.isUpdateProjection();
        it('should toggle to edit projection', () => {
            expect(actual).toEqual(false);
        });

        callback(updateProjectionDetails(null, '1234'));
         callback(createDefault());
    });

     describe('toggle projection', () => {
        callback(updateProjectionDetails(false));
        xit('should toggle to edit projection', () => {
            expect(actual).toEqual(false);
        });
    });

    describe('updated projections', () => {
        const data = {
              "account" : {
                   "id" : "0",
                   "number" : "90389378378383"
                },
           "thresholds": {
                "lower": {
                  "amount": {
                    "value": 20.00,
                    "currency": "GBP"
                  }
                }
               },"external_notification" : true
        }

        callback(handleUpdateSuccess(data));
        let actual = ProjectionsStore.isUpdateProjection();
         it('should update projection data ', () => {
            expect(actual).toEqual(true);
        }); 


    });

    describe('reset updation projection', () => {
        let _editProjectionsData = true;
        callback(setProjectionEdited(_editProjectionsData));
        let actual = ProjectionsStore.isUpdateProjection();
        it('should toggle to edit projection', () => {
            expect(actual).toEqual(false);
        });
    });


});