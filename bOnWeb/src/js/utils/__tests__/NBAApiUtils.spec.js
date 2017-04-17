'use strict';
jest.unmock('../../../static/config');
jest.unmock('../../config');
jest.unmock('../NBAApiUtils');

const NBAActionCreator = require('../../actions/NBAActionCreator');
const envConfig = require('../../../static/config');
const config = require('../../config');
const ApiUtils = require('../ApiUtils');
const NBAApiUtils = require('../NBAApiUtils');
let args = '';

describe('NBAApiUtils test cases', () => {
	beforeEach(() => {
		ApiUtils.makeAjaxCall.mockClear();
	})
	describe('getNBAData test cases',() => {
		describe('Request Arguments of getNBAData',() => {
			beforeEach(() => {
				NBAApiUtils.getNBAData();
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it ('should have set the correct method', () => {
				expect(args.method).toBe('GET');
			});
			it ('should construct the correct url', () => {
				expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/matchAll/insights?form_factor=tablet');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				NBAActionCreator.handleNBADataSuccess.mockClear();
				NBAApiUtils.getNBAData();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					containers: []
				});
			});
			it('should make action call', () => {
				expect(NBAActionCreator.handleNBADataSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				NBAActionCreator.handleNBADataError.mockClear();
				NBAApiUtils.getNBAData();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error : "Something went wrong"
				});
			});
			it('should make action call', () => {
				expect(NBAActionCreator.handleNBADataError.mock.calls[0][0]).toBeDefined();
			});
		});
	});

	
// it('For envConfig.stubConfig', () => {
//             let node = document.createElement('div');
//             let back = jest.genMockFn();
//             const render = (comp, el) => ReactDOM.render(comp, el);
//             instance = ReactDOM.render(<AnyQuestions {...props} />, node);
//             instance.setState({ name: 'load' });
//             instance.getNBAData();
//         });


});
