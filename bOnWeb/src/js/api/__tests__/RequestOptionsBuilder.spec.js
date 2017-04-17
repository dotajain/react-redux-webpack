jest.unmock('../RequestOptionsBuilder');
jest.unmock('../../config/ProductData');

var React = require('react');
var TestUtils = require('react-addons-test-utils');

var _ = require('lodash');

var Builder = require('../RequestOptionsBuilder');
const BrandUtils = require('../../utils/BrandUtils');

var { productTypes } = require('../../config/productData');

const executeTest = test => {
	it(test.desc, () => {
		const { url, method } = test.execute();
		expect(url).toEqual(test.url);
		expect(method).toEqual(test.method);
	});
}

describe('RequestOptionsBuilder', () => {
	describe('saveCase', () => {
		describe('when no productType is supplied', () => {
			it('should throw an error', () => {
				expect(() => Builder.saveCase()).toThrow(new Error('No productType defined for sending case'));
			});
		});

		const testCases = [{
			desc: 'should create current',
			execute: () => Builder.saveCase(productTypes.Current),
			method: 'POST',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}',
		}, {
			desc: 'should create current - null caseid',
			execute: () => Builder.saveCase(productTypes.Current, null),
			method: 'POST',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}',
		}, {
			desc: 'should create current - undefined caseid',
			execute: () => Builder.saveCase(productTypes.Current, undefined),
			method: 'POST',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}',
		}, {
			desc: 'should update current',
			execute: () => Builder.saveCase(productTypes.Current, 'CS-1234'),
			method: 'PUT',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}/CS-1234/tasks/capture/actions/update',
		}, {
			desc: 'should create savings',
			execute: () => Builder.saveCase(productTypes.Savings),
			method: 'POST',
			url: '/banks/{bank-id}/cases/csap/savings/{case-subtype}',
		}, {
			desc: 'should update savings',
			execute: () => Builder.saveCase(productTypes.Savings, 'CS-1234'),
			method: 'PUT',
			url: '/banks/{bank-id}/cases/csap/savings/{case-subtype}/CS-1234/tasks/capture/actions/update',
		}];

		_.forEach(testCases, executeTest);
	});

	describe('submitCase', () => {
		describe('when no productType is supplied', () => {
			it('should throw an error', () => {
				expect(() => Builder.submitCase()).toThrow(new Error('No productType defined for sending case'));
			});
		});

		describe('when no case is supplied', () => {
			it('should throw an error', () => {
				expect(() => Builder.submitCase({})).toThrow(new Error('No case id defined for sending case'));
			});
		});

		const testCases = [{
			desc: 'should submit current',
			execute: () => Builder.submitCase(productTypes.Current, 'CS-1234'),
			method: 'PUT',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}/CS-1234/tasks/capture/actions/submit',
		}, {
			desc: 'should submit savings',
			execute: () => Builder.submitCase(productTypes.Savings, 'CS-1234'),
			method: 'PUT',
			url: '/banks/{bank-id}/cases/csap/savings/{case-subtype}/CS-1234/tasks/capture/actions/submit',
		}];

		_.forEach(testCases, executeTest);
	});

	describe('getCase', () => {
		describe('when no productType is supplied', () => {
			it('should throw an error', () => {
				expect(() => Builder.getCase()).toThrow(new Error('No productType defined for sending case'));
			});
		});

		describe('when no case is supplied', () => {
			it('should throw an error', () => {
				expect(() => Builder.getCase({})).toThrow(new Error('No case id defined for sending case'));
			});
		});

		const testCases = [{
			desc: 'should get current',
			execute: () => Builder.getCase(productTypes.Current, 'CS-1234'),
			method: 'GET',
			url: '/banks/{bank-id}/cases/csap/current/{case-subtype}/CS-1234/tasks/capture',
		}, {
			desc: 'should get savings',
			execute: () => Builder.getCase(productTypes.Savings, 'CS-1234'),
			method: 'GET',
			url: '/banks/{bank-id}/cases/csap/savings/{case-subtype}/CS-1234/tasks/capture',
		}];

		_.forEach(testCases, executeTest);
	});
});
