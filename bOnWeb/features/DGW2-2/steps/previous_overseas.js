import camelCase from 'lodash/camelCase';
import moment from 'moment';
import Urls from '../../data/Urls';
import UI from '../../data/UI';

module.exports = function () {
	this.Given(/^I am on the Personal Details Page$/, {timeout: 60 * 1000}, function (callback) {
		this.goTo(Urls.personalDetails('IM136', 'ben'))
			.then(() => callback());
	});

	this.Given(/^I have provided a previous address$/, {timeout: 60 * 1000}, function (callback) {
		callback();
	});

	this.When(/^my address history is less than (\d+) years$/, function (years, callback) {
		this.getAddress(1)
			.setMovedDate(moment().subtract(years - 1, 'year').format('DD-MM-YYYY'))
			.waitForExist(UI.address(2).section())
			.then(() => this.takeScreenshot('my address history is less than three years').then(() => callback()));
	});

	this.Then(/see two radio buttons on the screen, one for UK and the other for Overseas$/, function (callback) {
		/*this.client
			.isExisting('.address-type-2')
			.then(isExisting => {
				if (!isExisting) {
					throw new Error('no country selection');
				}
			})
			.then(() => callback());
			*/
		callback.pending();
	});

	this.When(/^I select the Overseas radio button$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^I see four text fields$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^I can manually add my overseas address$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^I can't see the address lookup$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});
};
