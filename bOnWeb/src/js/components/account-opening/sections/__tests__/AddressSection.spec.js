jest.unmock('../AddressSection');
jest.unmock('../../address/CurrentAddress');
jest.unmock('../../address/PreviousAddress');
jest.unmock('../../../common/ComponentHeader');


// React
const React = require('react');
const ReactDOM = require('react-dom');
const config = require('../../../../config');
const _ = require('lodash');
const moment = require('moment');

// React Addons
const TestUtils = require('react-addons-test-utils');
const update = require('react-addons-update');

// Component
const AddressSection = require('../AddressSection');

const CurrentAddress = require('../../address/CurrentAddress');
const PreviousAddress = require('../../address/PreviousAddress');

const AccountOpeningActions = require ('../../../../actions/AccountOpeningActions');
const PostcodeActions = require('../../../../actions/PostcodeActions');

var ValidationUtils = require('../../../../Utils/ValidationUtils');

// Constants
const AccountOpeningConstants = {
	GROUP_PAGE_1: null,
};

ValidationUtils.isKeyValid.mockReturnValue(true);

let yearsAgo = seed => moment().subtract(seed, 'years').format('DD-MM-YYYY')

describe('AddressSection', function() {

	var instance;
	var content = {
		addressInvalidMessage: 'error in postcode',
		previousAddressSubtitle: 'test'
	};
	var addressStub  = [{
		dateMoved: yearsAgo(1)
	}, {
		dateMoved: yearsAgo(2)
	}];
	var el = document.createElement('div');

	// Render an instance of the component
	function renderComponent(addressList, isExistingCustomer) {
		instance = ReactDOM.render(
			<AddressSection
				name="specList"
				group="specGroup"
				addressList={addressList}
				content={content}
				arrayName="address"
				validations={{}}
				isExistingCustomer={isExistingCustomer || false} />,
				el
		);
	}

	afterEach(() => {
		instance = undefined;
	})

	describe('when no address information has been entered', () => {
		beforeEach(() => {
			renderComponent();
		});

		it('should should show a current address', () => {
			TestUtils.findRenderedComponentWithType(instance, CurrentAddress);
		});

		describe('when the current address does not over the past 3 years', () => {
			beforeEach(() => {
				renderComponent([{
					dateMoved: yearsAgo(1)
				}]);
			});

			it('should display a previous address component', () => {
				TestUtils.findRenderedComponentWithType(instance, PreviousAddress);
			});

			it('should correctly set the address id', () => {
				expect(TestUtils.findRenderedComponentWithType(instance, PreviousAddress).props.addressId).toBe(2);
			});

			describe('when remove is called', () => {
				let component;

				beforeEach(() => {
					component = TestUtils.findRenderedComponentWithType(instance, PreviousAddress);
					component.props.onRemove();
				});

				it('should reset the address' ,() => {
					expect(AccountOpeningActions.resetAddress.mock.calls.length).toBe(1);
				});
			});
		});

		describe('when there are more addresses than the maxNumberOfAddresses', () => {
			beforeEach(() => {
				renderComponent(_.map(_.range(config.maxNumberOfAddresses + 1), i => ({dateMoved: yearsAgo(i)})));
			});

			it('should not render more than maxNumberOfAddresses', () => {
				expect(TestUtils.scryRenderedComponentsWithType(instance, PreviousAddress).length).toBe(14);
			});
		});


		describe('when the previous address does not cover the past 3 years', () => {
			beforeEach(() => {
				renderComponent([{
					dateMoved: yearsAgo(1)
				}, {
					dateMoved: yearsAgo(2)
				}]);
			});

			it('should display 2 previous address components', () => {
				expect(TestUtils.scryRenderedComponentsWithType(instance, PreviousAddress).length).toBe(2);
			});
		});

		describe('when the two previous addresses have the same date', () => {
			beforeEach(() => {
				renderComponent([{
					dateMoved: yearsAgo(1)
				}, {
					dateMoved: yearsAgo(2)
				}, {
					dateMoved: yearsAgo(2)
				}]);
			});

			it('should display 2 previous address components', () => {
				expect(TestUtils.scryRenderedComponentsWithType(instance, PreviousAddress).length).toBe(2);
			});
		});
	});

	describe('isValidExistingPostcode', () => {

		beforeEach(() => {
			renderComponent();
		});

		it('returns true for existing customers with an address', () => {
			expect(instance.isValidExistingPostcode(addressStub, true)).toBeTruthy();
		});

		it('returns false for existing customers and NO address', () => {
			expect(instance.isValidExistingPostcode(undefined, true)).not.toBeTruthy();
		});

		it('returns true for new to bank with an address', () => {
			expect(instance.isValidExistingPostcode(addressStub, false)).toBeTruthy();
		});

		it('returns true for new to bank and NO address', () => {
			expect(instance.isValidExistingPostcode(undefined, false)).toBeTruthy();
		});
	});

	describe('forceValidationFail', () => {

		beforeEach(() => {
			AccountOpeningActions.updateValidation.mockClear();
			instance = ReactDOM.render(
				<AddressSection
					name="specList"
					group="specGroup"
					addressList={undefined}
					content={content}
					arrayName="address"
					validations={{}}
					isExistingCustomer={true} />,
				document.createElement('div')
			);
		});

		it('Fires action to force readOnly errors to be flagged', () => {
			expect(AccountOpeningActions.updateValidation.mock.calls[0]).toEqual(
				['GROUP_PAGE_1', 'addresses', false]
			);
		});
	});

	describe('WHEN a date moved is updated to cover 3 years', () => {
		let data;
		beforeEach(() => {
			PostcodeActions.clearLoadedAddressList.mockClear();

			data = [{
				dateMoved: yearsAgo(1),
			}, {
				dateMoved: yearsAgo(2),
			}, {
				dateMoved: yearsAgo(3)
			}];
			renderComponent(data);

			data = update(data, {
				0: { dateMoved: { $set: yearsAgo(5) } }
			});

			renderComponent(data);
		});

		it('should remove the tail addresses', () => {
			expect(AccountOpeningActions.clearAddress.mock.calls.length).toBeGreaterThan(0);
		});

		it('should request the correct range to be removed from the address list', () => {
			expect(_.last(AccountOpeningActions.clearAddress.mock.calls)[0][0]).toBe(1);
			expect(_.last(AccountOpeningActions.clearAddress.mock.calls)[0][1]).toBe(2);
		});

		it('should clear the postcode searches', () => {
			expect(PostcodeActions.clearLoadedAddressList.mock.calls.length).toBe(1);
		});

		it('should request the correct range to be removed from the postcode search', () => {
			expect(PostcodeActions.clearLoadedAddressList.mock.calls[0][0][0]).toBe(2);
			expect(PostcodeActions.clearLoadedAddressList.mock.calls[0][0][1]).toBe(3);
		});
	});

	describe('WHEN the last address item is set to a valid date', () => {
		let data;
		beforeEach(() => {
			data = [{
				dateMoved: yearsAgo(1),
			}, {
				dateMoved: '',
			}];
			el = document.createElement('div');

			renderComponent(data);

			data = update(data, {
				1: { dateMoved: { $set: yearsAgo(5) } }
			});

			AccountOpeningActions.clearAddress.mockClear();
			renderComponent(data);
		});

		it('should not be removed', () => {
			expect(AccountOpeningActions.clearAddress.mock.calls.length).toBe(0)
		});
	});

	describe('WHEN and existing customer has an invalid address', () => {
		beforeEach(() => {
			renderComponent();
			renderComponent(undefined, true);
		});

		it('should display an error msg', () => {
			var errorMsg = ReactDOM.findDOMNode(instance).innerHTML;
			expect(errorMsg).toBe(content.addressInvalidMessage);
		});
	});

});
