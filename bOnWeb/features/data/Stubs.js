
const _auditInfo =  {
	"eligibility_questions": [
		{
			question: "Do you have or plan on having a compatible device to use the DYB proposition?",
			answer: "Y",
			consent: "Y",
			timestamp: "2015-08-12T11:31:29+01:00"
		},
		{
			question: "Are you 18 or over",
			answer: "Y",
			timestamp: "2015-08-12T11:31:29+01:00"
		},
		{
			question: "Are you a UK resident",
			answer: "Y",
			timestamp: "2015-08-12T11:31:29+01:00"
		},
	],
	documents: [
		{
			reason: "DATA PROTECTION",
			name: "DU1950.pdf",
			"content_type": "PDF",
			version: "1.0B",
			consent: "Y",
			timestamp: "2015-08-12T11:31:29+01:00"
		}
	]
};

const ben = {
	"name": "ben",
	"product": {
		"code": null
	},

	"applicants": [{
		"user_details":{
			"username":"michael110",
			"password":"password"
		},
		"personal_details": {

			"sex": "M",
			"dob": "1981-03-24",
			"marital_status": "MARRIED / CIVIL PARTNERSHIP",
			"number_of_dependents": "6",
			"nationality": "United Kingdom",
			"city_of_birth": "London",
			"country_of_birth": "UK",
			"name": {
				"title": "MR",
				"last_name": "AVALON",
				"first_name": "BEN",
				"middle_name": "test"
			},
			"residential_status": "OWNER",
			"addresses": [
				{
					"uk_address": {
						"house_number": "3",
						"street": "Forest Street",
						"address_line1": "1",
						"city": "TEST TOWN",
						"county": "Staffordshire",
						"postal_code": "X9 9BH",
						"selected_address": "1 CALLSCREEN LANE TEST TOWN LONDON",
						"address_reference": "nOGBRFAPfBwEDAQAAAAF4e1hAAAAAADMAUAA-"
					},
					"effective_period": {
						"from": "2010-02-02T00:00:00.001Z"
					}
				}]
		},
		"contact_details": {
			"phone":{
				"home": "01366887650",
				"mobile": "<real number here>"
			},
			"email": "<real email here>",
			"preferences" : {
				"contact": {
					"method" : "SMS",
					"time" : "MORNING",
					"phone" : "MOBILE"
				},
				"marketing": {
					"phone": "Y",
					"email": "N",
					"sms": "Y",
					"mail": "N"
				}
			}
		},
		"employment_details": [
			{
				"status": "FULL TIME",
				"description": "ARMED FORCES",
				"employer": {
					"name": "Deloitte"
				},
				"effective_period": {
					"from": "2010-02-01"

				}
			}
		],
		"account_usage_info": [
			{
				"usage_type": "CURRENT ACCOUNT",
				"purpose": "MAIN ACCOUNT RECEIVING INCOME",
				"funds_info": {
					"source": "EARNINGS DIRECT TO ACCOUNT",
					"amount": "123",
					"frequency": "MONTHLY"
				}
			}
		],
		"financial_details": {
			"income": {
				"gross_annual": "40000",
				"regular": {
					"net_amount": "2000",
					"frequency": "MONTHLY",
					"input_type":"NET MONTHLY INCOME"
				},
				"additional": {
					"net_amount": "500",
					"frequency": "MONTHLY",
					"input_type":"OTHER DIRECT TO ACCOUNT"
				}
			},
			"expenditure": {
				"mortgage": {
					"net_amount": "400",
					"frequency": "MONTHLY"
				},
				"others": {
					"net_amount": "300",
					"frequency": "MONTHLY"
				}
			},
			"tax": {
				"countries_of_citizenship": [
					"UK"
				],
				"identification_info": [
					{
						"country_of_residency": "UK",
						"missing_number_reason": "NOT AVAILABLE",
						"status": "ACTIVE",
						"number": "1111"
					}
				],
				"uk_taxpayer_only": "Y",
				"uk_citizen": "Y"
			}
		}
	}],
	"audit_info": _auditInfo
};

export default {
	ben
}
