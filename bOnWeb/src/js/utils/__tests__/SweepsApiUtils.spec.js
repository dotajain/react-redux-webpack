/**
 * @module SweepsApiUtils
 */

'use strict';
jest.unmock('../SweepsApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config'); 

const SweepsApiUtils = require('../SweepsApiUtils');
const envConfig = require('../../../static/config');
const config = require('../../config');
const ApiUtils = require('../ApiUtils');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');

 describe('Sweeps Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
  describe('createSweep', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let data = '60'
            SweepsApiUtils.createSweepData(data, accountId);
        });
        describe('Request Arguments of createSweep', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/sweeps');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SweepsActionCreator.handleCreateSweepSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(SweepsActionCreator.handleCreateSweepSuccess.mock.calls).toBeDefined();
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
     describe('editSweep', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let data = '60'
            let sweepId = 'uuid'
            SweepsApiUtils.editSweepData(data, accountId, sweepId);
        });
        describe('Request Arguments of edit Sweep', () => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/sweeps/uuid');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SweepsActionCreator.handleEditSweepSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(SweepsActionCreator.handleEditSweepSuccess.mock.calls).toBeDefined();
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
     describe('deleteSweep', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let sweepId = 'uuid'
            SweepsApiUtils.deleteSweepData(accountId, sweepId);
        });
        describe('Request Arguments of delete Sweep', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('DELETE');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/sweeps/uuid');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SweepsActionCreator.handleDeleteSweepsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '204',
                    }
                });
            });
            it('should make action call', () => {
                expect(SweepsActionCreator.handleDeleteSweepsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleAlertsNSweepsError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong",
                    body: {
                        code :500
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleAlertsNSweepsError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
});