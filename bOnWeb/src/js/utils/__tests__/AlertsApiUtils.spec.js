/**
 * @module AlertssApiUtils
 */

'use strict';
jest.unmock('../AlertsApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config'); 

const AlertsApiUtils = require('../AlertsApiUtils');
const envConfig = require('../../../static/config');
const config = require('../../config');
const ApiUtils = require('../ApiUtils');
const AlertsActionCreator = require('../../actions/AlertsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');

 describe('Alerts Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
  describe('createAlert', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let data = '60'
            AlertsApiUtils.sendAlertData(data, accountId);
        });
        describe('Request Arguments of createAlert', () => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/alerts/balance/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsActionCreator.handleAlertsDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsActionCreator.handleAlertsDataSuccess.mock.calls[0][0]).toBeDefined();
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
     describe('editAlert', () => {
        beforeEach(() => {
            let accountId = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            let data = '60'
            AlertsApiUtils.sendEditAlertData(data, accountId);
        });
        describe('Request Arguments of createAlert', () => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/alerts/balance/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                AlertsActionCreator.handleEditAlertsDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '200',
                    }
                });
            });
            it('should make action call', () => {
                expect(AlertsActionCreator.handleEditAlertsDataSuccess.mock.calls).toBeDefined();
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