'use strict';

window.stubConfig = (function () {
	var apiBaseUrl = 'http://localhost:3000/stubs';

	// Authentication Stub Urls
	var authenticationUrl = apiBaseUrl + '/authentication-stub/';
	var authenticationStub = {
		GetBankIDConnection: authenticationUrl + 'GetBankIDConnection.json',
		AcceptTermsAndConditionsConnection: authenticationUrl + 'AcceptTermsAndConditionsConnection.json',
		GetAcceptedTermsAndConditionsConnection: authenticationUrl + 'GetAcceptedTermsAndConditionsConnection.json',
		GetChallengesConnection_EnrolmentCustomerNumber: authenticationUrl + 'GetChallengesConnection_EnrolmentCustomerNumber.json',
		GetChallengesConnection_EnrolmentDateOfBirth: authenticationUrl + 'GetChallengesConnection_EnrolmentDateOfBirth.json',
		GetChallengesConnection_EnrolmentOTP: authenticationUrl + 'GetChallengesConnection_EnrolmentOTP.json',
		GetChallengesConnection_EnrolmentPartialPassword: authenticationUrl + 'GetChallengesConnection_EnrolmentPartialPassword.json',
		GetChallengesConnection_EnrolmentPPSecurityQuestion: authenticationUrl + 'GetChallengesConnection_EnrolmentPPSecurityQuestion.json',
		GetChallengesConnection_EnrolmentAcn: authenticationUrl + 'GetChallengesConnection_EnrolmentAcn.json',
		GetChallengesConnection_SecurityQuestion: authenticationUrl + 'GetChallengesConnection_SecurityQuestion.json',
		GetChallengesConnection_DebitCard: authenticationUrl + 'GetChallengesConnection_DebitCard.json',
		GetCredentialsConnection_AllCredentials: authenticationUrl + 'GetCredentialsConnection_AllCredentials.json',
		GetCredentialsConnection: authenticationUrl + 'GetCredentialsConnection.json',
		GetSecurityQuestionsConnection: authenticationUrl + 'GetSecurityQuestionsConnection.json',
		GetTermsAndConditionsURLConnection: authenticationUrl + 'GetTermsAndConditionsURLConnection.json',
		GetUsersConnection: authenticationUrl + 'GetUsersConnection.json',
		GetCurrentUserdata: authenticationUrl + 'GetCurrentUserdata.json',
		SaveDeviceSecretConnection: authenticationUrl + 'SaveDeviceSecretConnection.json',
		VerifyDeviceSecretConnection: authenticationUrl + 'VerifyDeviceSecretConnection.json',
		GetPublicKeyConnection: authenticationUrl + 'GetPublicKeyConnection.json',
		GetToken: authenticationUrl + 'GetToken.json',

	};
	var timelineUrl = apiBaseUrl + '/timeline-stub/';
	var timelineStub = {
		'AccountListConnection': timelineUrl + 'AccountListConnection.json',
		'AccountDetailsConnection-05985dae-d2de-4ebc-ab0a-79093081bde5': timelineUrl + 'AccountDetailsConnection-05985dae-d2de-4ebc-ab0a-79093081bde5.json',
		'AccountDetailsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16': timelineUrl + 'AccountDetailsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16.json',
		'AccountDetailsConnection-3420d6c1-fb60-4ac5-a226-0d741f498ad2': timelineUrl + 'AccountDetailsConnection-3420d6c1-fb60-4ac5-a226-0d741f498ad2.json',
		'AccountDetailsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276': timelineUrl + 'AccountDetailsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276.json',
		'AccountDetailsConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061': timelineUrl + 'AccountDetailsConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		'AccountDetailsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f': timelineUrl + 'AccountDetailsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f.json',
		'TimelineListConnection': timelineUrl + 'TimelineListConnection.json',
		'TimelineSearchSuggestion': timelineUrl + 'TimelineSearchSuggestion.json',
		'FilteredTransactionListConnection': timelineUrl + 'FilteredTransactionListConnection-22.json',
	};
	var nbaUrl = apiBaseUrl + '/NBA-stub/';
	var nbaStub = {
		'NBAComponent': nbaUrl + 'NBAMortage.json',
	};
	var tcStub = apiBaseUrl + '/TermsCondition-stub/TermsCondition.json';


	var FinanicalStoriesUrl = apiBaseUrl + '/financialstories-stub/';
	var financialStoresStub = {
		FinancialStoriesConnectionMicroTransactions: FinanicalStoriesUrl + 'FinancialStoriesConnection-microTransactions-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		FinancialStoriesConnectionCashpoint: FinanicalStoriesUrl + 'FinancialStoriesConnection-cashpoint-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		FinancialStoriesConnectionInsAndOuts: FinanicalStoriesUrl + 'FinancialStoriesConnection-insAndOuts-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		FinancialStoriesConnectionProjection: FinanicalStoriesUrl + 'GetProjectionConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',

		TransactionHistoryList: FinanicalStoriesUrl + 'TransactionListConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		TransactionHistoryListSaving: FinanicalStoriesUrl + 'TransactionListConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f.json',
		TransactionHistoryFilterList: FinanicalStoriesUrl + 'FilteredTransactionListConnection-8.json',
		AccountTranSearchTextList: FinanicalStoriesUrl + 'SuggestiveTermsConnection.json',
		TransactionHistorySearchList: FinanicalStoriesUrl + 'FilteredTransactionListConnection-22.json',
		TagConnection: FinanicalStoriesUrl + 'TagListConnection.json',
		AccountDetailsCurrentConnection: timelineUrl + 'AccountDetailsConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		AccountDetailsCreditConnection: timelineUrl + 'AccountDetailsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16.json',
		AccountDetailsLoanConnection: timelineUrl + 'AccountDetailsConnection-05985dae-d2de-4ebc-ab0a-79093081bde5.json',
		AccountDetailsMortgageConnection: timelineUrl + 'AccountDetailsConnection-3420d6c1-fb60-4ac5-a226-0d741f498ad2.json',
		AccountDetailsSavingsConnection: timelineUrl + 'AccountDetailsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f.json',
		AccountDetailsSavings1Connection: timelineUrl + 'AccountDetailsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276.json',
	};
	var projectionsUrl = apiBaseUrl + '/projections-stub/';
	var projectionsStub = {
		ProjectionConnection: projectionsUrl + 'GetProjectionConnection1.json',
		ProjectionAlertsConnection: projectionsUrl + 'GetProjectionsAlertsConnection.json',
		ProjectionEarningsAndCommitments: projectionsUrl + 'GetProjectionPreferencesConnection1.json',
	};
	var alertsandsweepsurl = apiBaseUrl + '/alerts-sweeps-stubs/';
	var alertsNsweeps = {
		GetSweepsAlertsConnectionStub: alertsandsweepsurl + 'GetSweepsAlertsConnection.json',
		GetAlertsConnectionStub: alertsandsweepsurl + 'GetAlertsConnection.json',
		GetProjectionsAlertsConnectionStub: alertsandsweepsurl + 'GetProjectionsAlertsConnection.json',
		//avadhut added
		DeleteSweepsConnectionStub: alertsandsweepsurl + 'DeleteSweeps.json',
	};

	var paymentUrl = apiBaseUrl + '/payments-stub/';
	var paymentStub = {
		PaymentListConnection: paymentUrl + 'BeneficiaryListConnection.json',
		PotListConnection: paymentUrl + 'GetPotsConnection.json',
		MakePaymentConnection: paymentUrl + 'MakePaymentSuccess.json',
		StandingOrderConnection: paymentUrl + 'StandingOrderList.json',
		DirectDebitsListConnection: paymentUrl + 'DirectDebitsList.json',
		DeletedPaymentConnection: paymentUrl + 'DeletePayment.json',
		DeletePayeeListConnection: paymentUrl + 'DeletePayee.json',
		MandateListConnection: paymentUrl + 'StandingOrderList.json',
		DirectDebitListConnection: paymentUrl + 'DirectDebitListConnection.json',
		SOPaymentUpdateConnection: paymentUrl + 'SOPaymentUpdateConnection.json',
		'GetPotsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16': paymentUrl + 'GetPotsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16.json',
		'GetPotsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276': paymentUrl + 'GetPotsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276.json',
		'GetPotsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f': paymentUrl + 'GetPotsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f.json',
		AddPayeeConnection: paymentUrl + 'AddPayeeConnection.json',
	};

	var savingspotsUrl = apiBaseUrl + '/savingspots-stub/';
	var savingspotsStub = {
		'GetPotsConnection-05985dae-d2de-4ebc-ab0a-79093081bde5': savingspotsUrl + 'GetPotsConnection-05985dae-d2de-4ebc-ab0a-79093081bde5.json',
		'GetPotsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16': savingspotsUrl + 'GetPotsConnection-084c7a11-c91a-45ef-baea-2fd0e9556e16.json',
		'GetPotsConnection-3420d6c1-fb60-4ac5-a226-0d741f498ad2': savingspotsUrl + 'GetPotsConnection-3420d6c1-fb60-4ac5-a226-0d741f498ad2.json',
		'GetPotsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276': savingspotsUrl + 'GetPotsConnection-a91fe657-4605-42c7-96f1-3e1cc8555276.json',
		'GetPotsConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061': savingspotsUrl + 'GetPotsConnection-b80e95a0-6b60-45b2-8b0f-77f2355f3061.json',
		'GetPotsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f': savingspotsUrl + 'GetPotsConnection-ee8948b5-e443-408a-a2cd-1af9b29fdd5f.json',
	};
	var spendingsUrl = apiBaseUrl + '/spending-stub/';
	var spendingStub = {
		GetBudgetConnection: spendingsUrl + 'GetBudgetConnection.json',
		SpendListConnection: spendingsUrl + 'SpendListConnection.json',
		GetBudgetPreferencesConnection: spendingsUrl + 'GetBudgetPreferencesConnection.json',
		CurrentTransactionListConnection: spendingsUrl + 'CurrentTransactionListConnection.json',
		CreditCardTransactionListConnection: spendingsUrl + 'CreditCardTransactionListConnection.json',
		LoanTransactionListConnection: spendingsUrl + 'LoanTransactionListConnection.json',
		MortgageTransactionListConnection: spendingsUrl + 'MortgageTransactionListConnection.json',
		SavingsTransactionListConnection: spendingsUrl + 'SavingsTransactionListConnection.json',
		TagListConnection: spendingsUrl + 'TagListConnection.json',
		TransactionListConnection: spendingsUrl + 'TransactionListConnection.json',
     };

	return {
		authenticationStub: authenticationStub,
		timelineStub: timelineStub,
		tcStub: tcStub,
		nbaStub: nbaStub,
		financialStoresStub: financialStoresStub,
		alertsNsweeps: alertsNsweeps,
		projectionsStub: projectionsStub,
		paymentStub: paymentStub,
		savingspotsStub: savingspotsStub,
		spendingStub: spendingStub,
	};
})();
