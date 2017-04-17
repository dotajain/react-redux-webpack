/**
 * @module ProjectionsApiUtils
 */

'use strict';
jest.unmock('../ProjectionsApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config'); 

const ProjectionsApiUtils = require('../ProjectionsApiUtils');
const ApiUtils = require('../ApiUtils');
const ProjectionsActionCreator = require('../../actions/ProjectionsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const scope_id = 'default';
 

 describe('Projections Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
  describe('updateProjection', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let data = {
     "thresholds": {
        "lower": {
          "amount": {
            "value": 20.00,
            "currency": "GBP"
          }
        }
       },"external_notification" : true
};
            ProjectionsApiUtils.editProjectionData(data, accountId);
        });
        describe('Request Arguments of updateProjection', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/projection/alerts');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                ProjectionsActionCreator.handleEditProjectionAlertsDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(ProjectionsActionCreator.handleEditProjectionAlertsDataSuccess.mock.calls).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleAlertsNSweepsError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleAlertsNSweepsError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
});