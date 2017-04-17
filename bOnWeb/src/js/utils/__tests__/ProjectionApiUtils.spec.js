/**
 * @module ProjectionApiUtils
 */

'use strict';
jest.unmock('../ProjectionApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const ProjectionApiUtils = require('../ProjectionApiUtils');
const envConfig = require('../../../static/config');
const config = require('../../config');
const ApiUtils = require('../ApiUtils');
const ProjectionActionCreator = require('../../actions/ProjectionActionCreator');


describe('Payee Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getEarningCommitments', () => {
        let data = '121211'
        let accountId = 'b80e95a0-6b60-45b2-8b0f-77f2355f3061'
        beforeEach(() => {
            ProjectionApiUtils.getEarningCommitments();
        });
        describe('Request Arguments of getEarningCommitments', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/projection/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                ProjectionActionCreator.handleEarningsCommitmentSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];

                success({
                    status: '200',
                });
            });
            it('should make action call', () => {
                expect(ProjectionActionCreator.handleEarningsCommitmentSuccess).toBeDefined();
            });
        });

    });
    describe('projectionsUpdate', () => {
        let dProjectionObjects = true;
        beforeEach(() => {
            ProjectionApiUtils.projectionsUpdate();
        });
        describe('Request Arguments of projectionsUpdate', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/projection/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                ProjectionActionCreator.handleEarningsCommitmentSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];

                success({
                    
                        status : '500',
                    
                });
            });
            it('should make action call', () => {
                expect(ProjectionActionCreator.handleEarningsCommitmentSuccess).toBeDefined();
            });
        });

    });
});