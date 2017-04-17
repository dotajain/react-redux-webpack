Feature: DGW2-4 - As a user when I select my previous address from lookup, my address prefix is displayed in the form
	As a customer
	That lives at an address that has an address prefix
	Such as 1/2 1 Turnberry Road G11 5AF
	I should be able to correctly load

	Scenario: 1 - User has lived in their current address for less than 3 years
		Given I have entered my current address
		And I have provided how long I have been at that address
		When the time at my current address is less than 3 years
		Then I will be asked to provide my previous address
		And I will see the option to enter my previous postcode
		And I will see an option to use address look up
		And I will see an option to enter my previous address manually

	Scenario: 2 - User uses the address search function that returns previous address
		Given I have entered my current address
		And the time at my current address is less than 3 years
		And I am on the previous address details section
		And I enter a postcode of "G11 5AF"
		When I select to use the address lookup function
		Then I will see a list of addresses that match my postcode
		And I will be able to select an address
		Then I will see my address filled in the fields the same as it is in the lookup function

	Scenario: 3 - User previous address is fully displayed in form including prefixs
		Given I have entered my current address
		And the time at my current address is less than 3 years
		And I am on the previous address details section
		And I enter a postcode of "G11 5AF"
		And I select to use the address lookup function
		And I will see a list of addresses that match my postcode
		And I am able to select an address
		Then I will see my address filled in the fields the same as it is in the lookup function including prefixs
		And The address are editable

