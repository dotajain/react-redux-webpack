import moment from 'moment';
import Urls from '../../data/Urls';
import UI from '../../data/UI';

module.exports = function () {
	this.Given(/^I have entered my current address$/, {timeout: 60 * 1000}, function (callback) {
		this.goTo(Urls.personalDetails('IM136', 'ben'))
			.then(() => callback());
	});

	this.Given(/^I have provided how long I have been at that address$/, function (callback) {
		callback();
	});

	this.When(/^the time at my current address is less than (\d+) years$/, {timeout: 60 * 1000}, function (years, callback) {
		this.addressIndex = 1;
		this.getAddress(this.addressIndex)
			.setMovedDate(moment().subtract(years - 1, 'year').format('DD-MM-YYYY'))
			.waitForExist(UI.address(2).section())
			.then(() =>
				this.takeScreenshot(`the time at my current address is less than ${years} years`)
					.then(() => callback()));
	});

	this.Then(/^I will be asked to provide my previous address$/, function (callback) {
		this.client.isExisting(UI.address(2).section()).then(isExisting => isExisting ? callback() : callback.fail());
	});

	this.Then(/^I will see the option to enter my previous postcode$/, function (callback) {
		callback.pending();
	});

	this.Then(/^I will see an option to use address look up$/, function (callback) {
		callback.pending();
	});

	this.Then(/^I will see an option to enter my previous address manually$/, function (callback) {
		callback.pending();
	});

	this.Given(/^I am on the previous address details section$/, function (callback) {
		this.addressIndex = 2;
		callback();
	});

	this.Given(/^I enter a postcode of "([^"]*)"$/, {timeout: 60 * 1000}, function (postcode, callback) {
		this.postcode = postcode;
		this.getAddress(this.addressIndex)
			.setPostcode(postcode)
			.then(() => this.takeScreenshot(`I enter a postcode of "${postcode}"`).then(() => callback()));
	});

	this.When(/^I select to use the address lookup function$/, {timeout: 30 * 1000}, function (callback) {
		this.getAddress(this.addressIndex)
			.search()
			.then(() => callback());
	});

	this.Then(/^I will see a list of addresses that match my postcode$/, {timeout: 60 * 1000}, function (callback) {
		this.client
			.waitForExist('#address-lookup', 5000)
			.then(() => this.takeScreenshot(`I will see a list of addresses that match my postcode`).then(() => callback()));
	});

	this.Then(/^I will be able to select an address$/, function (callback) {
		callback.pending();
	});

	this.Then(/^I will see my address filled in the fields the same as it is in the lookup function$/, function (callback) {
		callback.pending();
	});

	this.Given(/^I am able to select an address$/, function (callback) {
		callback.pending();
	});

	this.Then(/^I will see my address filled in the fields the same as it is in the lookup function including prefixs$/, function (callback) {
		callback.pending();
	});

	this.Then(/^The address are editable$/, function (callback) {
		callback.pending();
	});
};
