Feature: DGW2-15 - As a user when I set my employment start date before my date of my birth + 16 years then I get an error message
	As a user
    When I set my employment start date before my date of my birth + 16 years
    Then I get an error message

    Scenario: 1 - User enters invalid employment date (date less than their DOB+16years)
        Given I have agreed to the terms and conditions
        And I have provided my Personal details accurately
        And I have provided my current address accurately
        And I have provided my contact details accurately
        And I have selected my preferred contact
        And I have saved my application
        And I can see the Employment details page
        And I have selected an employment status that requires an employment date
        And I have selected my occupation
        And I have provided my employment start date
        When my employment start date is less than the date of my birth + 16 years
        Then I will be informed that the information I have entered is invalid
        And I will see an error message prompting me to correct my input

    Scenario: 2 - User corrects invalid employment date after prompting (DOB+16 years)
        Given I have agreed to the terms and conditions
        And I have provided my Personal details accurately
        And I have provided my current address accurately
        And I have provided my contact details accurately
        And I have selected my preferred contact
        And I have saved my application
        And I can see the Employment details page
        And I have selected an employment status that requires an employment date
        And I have selected my occupation
        And I have provided my employment start date
        When my employment start date is less than the date of my birth + 16 years
        And I will see an error message prompting me to correct my input
        When I enter valid information
        Then the error message will disappear
        And I will not be prompted to correct my selection



