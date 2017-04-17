Feature: DGW2-6 - Previous Overseas Address
	As a customer
	I want to be able to supply my previous overseas address

	Scenario: 1 - User has entered a previous address with a date less than 3 years ago
		Given I am on the Personal Details Page
		And I have provided a previous address
		When my address history is less than 3 years
		Then I will see two radio buttons on the screen, one for UK and the other for Overseas

	Scenario: 2 - User enters previous overseas address
		Given I am on the Personal Details Page
		And my address history is less than 3 years
		And I can see two radio buttons on the screen, one for UK and the other for Overseas
		When I select the Overseas radio button
		Then I see four text fields
		And I can manually add my overseas address
		And I can't see the address lookup
