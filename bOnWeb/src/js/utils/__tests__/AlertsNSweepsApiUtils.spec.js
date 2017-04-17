/**
 * @module AlertsNSweepsApiUtils
 */

'use strict';
jest.unmock('../AlertsNSweepsApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');

const AlertsNSweepsApiUtils = require('../AlertsNSweepsApiUtils');
const envConfig = require('../../../static/config');
const config = require('../../config');
const ApiUtils = require('../ApiUtils');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');

describe('AlertsNSweeps Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getAlertsList', () => {
        beforeEach(() => {
            let refreshList = false;
            AlertsNSweepsApiUtils.getAlertsData(refreshList);
        });
        describe('Request Arguments of getting Sweeps List', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/alerts/balance/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleAlertsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleAlertsSuccess.mock.calls).toBeDefined();
            });
        });
    });
    describe('getSweepsList', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            AlertsNSweepsApiUtils.getSweepsData(accountId);
        });
        describe('Request Arguments of getting Sweeps List', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/sweeps');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleSweepsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleSweepsSuccess.mock.calls).toBeDefined();
            });
        });

        describe('it has error', () => {
            let success;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleSweepListError.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        error: '{code:404}',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleSweepListError.mock.calls).toBeDefined();
            });
        });
    });
    describe('getProjectionsList', () => {
        beforeEach(() => {
            let refreshList = false;
            AlertsNSweepsApiUtils.getProjectionAlertsData(refreshList);
        });
        describe('Request Arguments of getting Projections List', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/projection/alerts');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleProjectionAlertsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleProjectionAlertsSuccess.mock.calls).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleProjectionListError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleProjectionListError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getSweepsList', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            AlertsNSweepsApiUtils.getAccountDetails(accountId);
        });
        describe('Request Arguments of getting Sweeps List', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsNSweepsActionCreator.handleAccountDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsNSweepsActionCreator.handleAccountDetailsSuccess.mock.calls).toBeDefined();
            });
        });
    });
});