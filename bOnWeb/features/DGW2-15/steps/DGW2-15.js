//import expect from 'chai';
var expect = require('chai').expect;
import Urls from '../../data/Urls';
import UI from '../../data/UI';

module.exports = function () {
	this.Given(/^I have agreed to the terms and conditions$/, {timeout: 60 * 1000}, function (callback) {
		this.goTo(Urls.landingPage('IM540', 'ben'))
			.click(UI.landingPage.isExistingCustomerNoBtn)
			.click(UI.landingPage.acceptTsAndCs)
			.click(UI.landingPage.initialQuestionsNext)
			.then(() => callback());
	});

	this.Given(/^I have provided my Personal details accurately$/, function () {
		//using stub
	});

	this.Given(/^I have provided my current address accurately$/, function () {
		//using stub
	});


	this.Given(/^I have provided my contact details accurately$/, {timeout: 60 * 1000}, function (callback) {
		let mobileNo = '07891241616';
		let email = 'p.curley@waracle.com'
		this.client
			.moveToObject(UI.PersonalDetailsPage.mobileNumber)
				.setValue(UI.PersonalDetailsPage.mobileNumber, mobileNo)
			.moveToObject(UI.PersonalDetailsPage.emailAddress)
				.setValue(UI.PersonalDetailsPage.emailAddress, email)
			.moveToObject(UI.PersonalDetailsPage.emailAddressConfirm)
				.setValue(UI.PersonalDetailsPage.emailAddressConfirm, email)
			.then(() => callback());
	});

	this.Given(/^I have selected my preferred contact$/, function () {
		//using stub
	});

	this.Given(/^I have saved my application$/, {timeout: 60 * 1000}, function (callback) {
		let username = new Date().getTime();
		let password = 'TESTtest123';
		this.client
			.moveToObject(UI.PersonalDetailsPage.unsavedUsername)
				.setValue(UI.PersonalDetailsPage.unsavedUsername, username)
			.moveToObject(UI.PersonalDetailsPage.password)
				.setValue(UI.PersonalDetailsPage.password, password)
			.moveToObject(UI.PersonalDetailsPage.passwordConfirm)
				.setValue(UI.PersonalDetailsPage.passwordConfirm, password)
			.click(UI.PersonalDetailsPage.personalDetailsNextBtn)
			.waitForExist(UI.PersonalDetailsPage.personalDetailsNextBtn, 60 * 1000, true)
			.then(() => callback());
	});

	this.Given(/^I can see the Employment details page$/, {timeout: 60 * 1000}, function (callback) {
		// borks in phantom
		this.client
			//.waitForExist(UI.EmploymentDetailsPage.pageWrapper, 60 * 1000)
			//.then(() => callback());
			.getUrl()
			.then((url) => {
				setTimeout(() => {
					expect(url).to.match(/\/step-2/);
				    callback();
				}, 10);

			});
	});

	this.Given(/^I have selected an employment status that requires an employment date$/, function (callback) {
	  //using stub
	  callback();
	});

	this.Given(/^I have selected my occupation$/, function () {
		//using stub
	});

	this.Given(/^I have provided my employment start date$/, function () {
		//using stub
	});

	this.When(/^my employment start date is less than the date of my birth \+ (\d+) years$/, {timeout: 60 * 1000}, function (arg1, callback) {
		this.client
			.moveToObject(UI.EmploymentDetailsPage.employmentStartDate)
				.setValue(UI.EmploymentDetailsPage.employmentStartDate, '24-03-1997')
			.moveToObject(UI.EmploymentDetailsPage.employmentStartDateWrapper)
			.then(() => callback());
	});

	this.Then(/^I will be informed that the information I have entered is invalid$/, {timeout: 60 * 1000}, function (callback) {
		this.client
			.getAttribute(UI.EmploymentDetailsPage.employmentStartDateWrapper, 'className')
			.then((attr) => {
				setTimeout(() => {
					expect(attr).to.match(/error/)
					callback();
				}, 10);
			});
	});

	this.Then(/^I will see an error message prompting me to correct my input$/, function (callback) {
		this.client
			.getText('.info-message.error')
			.then((text) => {
				setTimeout(() => {
					expect(text).to.equal('Please check the start date. It needs to be in the past. Click on the month/year to start entering your dates. There’s no need to scroll. The date entered should be formatted DD-MM-YYYY.')
				    callback();
				}, 10);
			});
	});


	this.When(/^I enter valid information$/, function (callback) {
	this.client
		.moveToObject(UI.EmploymentDetailsPage.employmentStartDate)
			.setValue(UI.EmploymentDetailsPage.employmentStartDate, '25-03-1997')
		.moveToObject(UI.EmploymentDetailsPage.employmentStartDateWrapper)
		.then(() => callback());
	});

	this.Then(/^the error message will disappear$/, function (callback) {
		this.client
			.isExisting('.info-message.error', 60 * 1000)
			.then((doesExist) => {
				console.log(doesExist)
				setTimeout(() => {
					expect(doesExist).to.equal(false);
				    callback();
				}, 10);
			});

	});

	this.Then(/^I will not be prompted to correct my selection$/, function (callback) {
		this.client
			.waitForExist(UI.EmploymentDetailsPage.employmentStartDateWrapper, 60 * 1000)
			.getAttribute(UI.EmploymentDetailsPage.employmentStartDateWrapper, 'className')
			.then((attr) => {
				setTimeout(() => {
					expect(attr).to.match(/complete/)
					callback();
				}, 10);
			});
	});

};
