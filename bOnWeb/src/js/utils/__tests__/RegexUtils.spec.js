jest.unmock('../RegexUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const RegexUtils = require('../RegexUtils');

describe('Config RegexUtils', function() {
	const runTest = testCase => {
		it(`should validate ${testCase.type} ${testCase.target} as ${testCase.expected}`, () => {
			const result = RegexUtils.isValid(testCase.target, RegexUtils.regexes[testCase.type]);
			expect(result).toBe(testCase.expected)
		})
	};

	describe('validate email', () => {

		const testCases = [
			{
				target: 'd!e#w$l%s&o\'*n@del.co',
				expected: true,
				type: 'email'
			},
			{
				target: 'd+e-w/l=s?o^n_q@del.co',
				expected: true,
				type: 'email'
			},
			{
				target: '\'d\'ew|s~on-q@del.co',
				expected: true,
				type: 'email'
			},
			{
				target: '!#$%&\'*+-/=?^_`{|}~@test.com',
				expected: true,
				type: 'email'
			},
			{
				target: 'john@smith.london',
				expected: true,
				type: 'email'
			},
			{
				target: 'john..smith@fail.com',
				expected: false,
				type: 'email'
			},
			{
				target: '.john.smith@fail.com',
				expected: false,
				type: 'email'
			},
			{
				target: 'john.smith@fail.com.',
				expected: false,
				type: 'email'
			},
			{
				target: 'john.smith@@fail.com',
				expected: false,
				type: 'email'
			},
			{
				target: 'john.smith@fai!l.com',
				expected: false,
				type: 'email'
			},
			{
				target: 'john.sm/ith@pass.com',
				expected: true,
				type: 'email'
			},
		];

		testCases.forEach(runTest);
	});

	describe('vaiidate alpha', () => {
		const testCases = [
			// alpha characters [a-zA-Z]
			{
				target: 'abc',
				expected: true,
				type: 'alpha'
			},
			{
				target: '12356',
				expected: false,
				type: 'alpha'
			},
			{
				target: '0',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'ddd(£sss',
				expected: false,
				type: 'alpha'
			},
			// hyphen [-] must be part of a double barrelled name and must
			// not be preceded / followed by spaces
			{
				target: 'some-thing',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'some- thing',
				expected: false,
				type: 'alpha'
			},
			// no foreign / country specific characters allowed
			{
				target: 'Déjà vu',
				expected: false,
				type: 'alpha'
			},
			// apostrophe ['] can only be used between alpha characters to define
			// names such as O’Neill (applies to non-personal customers / business names)
			{
				target: 'O\'Neill',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'James\' something',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'something \' else',
				expected: false,
				type: 'alpha'
			},
			// space [ ] - line cannot start or finish with a space [ ].
			// Space [ ] cannot appear as a consecutive character
			{
				target: ' something',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'something ',
				expected: false,
				type: 'alpha'
			},
			{
				target: ' something ',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'somet  hing',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'some thing else',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'matt dell',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'o\'dell',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'o-dell',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'newcastle upon tyne',
				expected: true,
				type: 'alpha'
			},
			{
				target: 'chester-le-street',
				expected: true,
				type: 'alpha'
			},
			{
				target: '-dell',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'dell-',
				expected: false,
				type: 'alpha'
			},
			{
				target: ' dell',
				expected: false,
				type: 'alpha'
			},
			{
				target: 'dell ',
				expected: false,
				type: 'alpha'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate alpha + special', () => {
		const testCases = [
			{
				target: ' test',
				expected: false,
				type: 'alphaSpecial'
			},
			{
				target: 'test ',
				expected: false,
				type: 'alphaSpecial'
			},
			{
				target: 'test1',
				expected: false,
				type: 'alphaSpecial'
			},
			{
				target: 't$$est',
				expected: false,
				type: 'alphaSpecial'
			},
			{
				target: '!test',
				expected: false,
				type: 'alphaSpecial'
			},
			{
				target: 'test?',
				expected: true,
				type: 'alphaSpecial'
			},
			{
				target: 'test!',
				expected: true,
				type: 'alphaSpecial'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate alphanumeric', () => {

		const testCases = [
			{
				target: 'A',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: ' Deloitte',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte  Digital',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte- Digital',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte -Digital',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte - Digital',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'St.George',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: '<h1>Deloitte</h1>',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: '#5435%^&',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'DS+A',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'asd/asd',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'asd;',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: '`asd',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: ' st. asdd',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: '` st. asdd',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'Déjà vu',
				expected: false,
				type: 'alphanumeric'
			},
			{
				target: 'St. John\'s',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Run\'s House',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte Digital',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Company Name',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'O\'Neills',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'James\'',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Deloitte-Digital',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'St. Johns Pharmaceuticals',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: 'Deloite 2015',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: '12345',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: '8Ball',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: '22/45',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: '1/1',
				expected: true,
				type: 'alphanumeric'
			},
			{
				target: '3-10',
				expected: true,
				type: 'alphanumeric'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate alphanumeric + punctuation', () => {
		const testCases = [
			{
				target: 'test 123',
				expected: false,
				type: 'alphanumericPunctuation'
			},
			{
				target: '22:00',
				expected: true,
				type: 'alphanumericPunctuation'
			},
			{
				target: '22,00',
				expected: true,
				type: 'alphanumericPunctuation'
			},
			{
				target: '22`00',
				expected: false,
				type: 'alphanumericPunctuation'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate alphanumeric + punctuation', () => {
		let testCases = [
			{
				target: 'test 123',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22:00',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22,00',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22`00',
				expected: false,
				type: 'addressLine1'
			}
		]

		testCases.forEach(runTest);
	});

	describe('validate alphanumeric + punctuation', () => {
		let testCases = [
			{
				target: 'test 123',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22:00',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22,00',
				expected: true,
				type: 'addressLine1'
			},
			{
				target: '22`00',
				expected: false,
				type: 'addressLine1'
			}
		]

		testCases.forEach(runTest);
	});

	describe('validate currency', () => {
		const testCases = [
			{
				target: 'a',
				expected: false,
				type: 'currency'
			},
			{
				target: '200',
				expected: true,
				type: 'currency'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate number', () => {
		const testCases = [
			{
				target: 'a',
				expected: false,
				type: 'number'
			},
			{
				target: '12#3',
				expected: false,
				type: 'number'
			},
			{
				target: '12.3',
				expected: false,
				type: 'number'
			},
			{
				target: '12:3',
				expected: false,
				type: 'number'
			},
			{
				target: '12-3',
				expected: false,
				type: 'number'
			},
			{
				target: '12O', // 'o' instead of zero
				expected: false,
				type: 'number'
			},
			{
				target: '1',
				expected: true,
				type: 'number'
			},
			{
				target: '1234567890',
				expected: true,
				type: 'number'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate phone', () => {
		const testCases = [
			// Disallow country code
			{
				target: '+447123456789',
				expected: false,
				type: 'phone'
			},
			{
				target: 'O123456789',
				expected: false,
				type: 'phone'
			},
			{
				target: '07123456789',
				expected: true,
				type: 'phone'
			},
			{
				target: '01234456789',
				expected: true,
				type: 'phone'
			},
						{
				target: '01234456789',
				expected: true,
				type: 'phone'
			},

			{
				target: '07311111111',
				expected: true,
				type: 'phone'
			},

			{
				target: '07422222222',
				expected: true,
				type: 'phone'
			},

			{
				target: '07533333333',
				expected: true,
				type: 'phone'
			},

			{
				target: '07624999999',
				expected: true,
				type: 'phone'
			},

			{
				target: '07788888888',
				expected: true,
				type: 'phone'
			},

			{
				target: '07877777777',
				expected: true,
				type: 'phone'
			},

			{
				target: '07966666666',
				expected: true,
				type: 'phone'
			},

			{
				target: '07911277777',
				expected: true,
				type: 'phone'
			},

			{
				target: '07911887654',
				expected: true,
				type: 'phone'
			},

			{
				target: '01311111111',
				expected: true,
				type: 'phone'
			},

			{
				target: '01422222222',
				expected: true,
				type: 'phone'
			},

			{
				target: '01533333333',
				expected: true,
				type: 'phone'
			},

			{
				target: '01624999999',
				expected: true,
				type: 'phone'
			},

			{
				target: '01788888888',
				expected: true,
				type: 'phone'
			},

			{
				target: '01877777777',
				expected: true,
				type: 'phone'
			},

			{
				target: '01966666666',
				expected: true,
				type: 'phone'
			},

			{
				target: '01911277777',
				expected: true,
				type: 'phone'
			},

			{
				target: '01911887654',
				expected: true,
				type: 'phone'
			},

			{
				target: '02311111111',
				expected: true,
				type: 'phone'
			},

			{
				target: '02422222222',
				expected: true,
				type: 'phone'
			},

			{
				target: '02533333333',
				expected: true,
				type: 'phone'
			},

			{
				target: '02624999999',
				expected: true,
				type: 'phone'
			},

			{
				target: '02788888888',
				expected: true,
				type: 'phone'
			},

			{
				target: '02877777777',
				expected: true,
				type: 'phone'
			},

			{
				target: '02966666666',
				expected: true,
				type: 'phone'
			},

			{
				target: '02911277777',
				expected: true,
				type: 'phone'
			},

			{
				target: '02911887654',
				expected: true,
				type: 'phone'
			},

			{
				target: '',
				expected: false,
				type: 'phone'
			},
			{
				target: '00000000000',
				expected: false,
				type: 'phone'
			},
			{
				target: '03000009999',
				expected: false,
				type: 'phone'
			},
			{
				target: '03300009999',
				expected: false,
				type: 'phone'
			},
			{
				target: '03400009999',
				expected: false,
				type: 'phone'
			},
			{
				target: '03700009999',
				expected: false,
				type: 'phone'
			},
			{
				target: '05512345678',
				expected: false,
				type: 'phone'
			},
			{
				target: '05612345678',
				expected: false,
				type: 'phone'
			},
			{
				target: '0800111111',
				expected: false,
				type: 'phone'
			},
			{
				target: '08003332222',
				expected: false,
				type: 'phone'
			},
			{
				target: '08084445555',
				expected: false,
				type: 'phone'
			},
			{
				target: '08455556666',
				expected: false,
				type: 'phone'
			},
			{
				target: '08440077777',
				expected: false,
				type: 'phone'
			},
			{
				target: '09012345678',
				expected: false,
				type: 'phone'
			},
			{
				target: '09112345678',
				expected: false,
				type: 'phone'
			},
			{
				target: '09812345678',
				expected: false,
				type: 'phone'
			},
			{
				target: '+44 (0)207 123 4567',
				expected: false,
				type: 'phone'
			},
			{
				target: '+44 20 7123 4567',
				expected: false,
				type: 'phone'
			},
			{
				target: '+44(0)2071234567',
				expected: false,
				type: 'phone'
			},
			{
				target: '+442071234567',
				expected: false,
				type: 'phone'
			},
			{
				target: '00442071234567',
				expected: false,
				type: 'phone'
			}

		];

		testCases.forEach(runTest);
	});

	describe('validate mobile phone', () => {
		const testCases = [
			// Disallow country code
			{
				target: '+447123456789',
				expected: false,
				type: 'mobilePhone'
			},
			{
				target: '447123456789',
				expected: false,
				type: 'mobilePhone'
			},
			// Disallow land-line
			{
				target: '01234567890',
				expected: false,
				type: 'mobilePhone'
			},
			{
				target: '07515747653',
				expected: true,
				type: 'mobilePhone'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate username', () => {
		const testCases = [
			{
				target: 'short',
				expected: false,
				type: 'username'
			},
			{
				target: 'inv@lid',
				expected: false,
				type: 'username'
			},
			{
				target: 'Robert\'); DROP TABLE ',
				expected: false,
				type: 'username'
			},
			{
				target: 'username12301230',
				expected: true,
				type: 'username'
			},
			{
				target: '2015John',
				expected: true,
				type: 'username'
			},

		];

		testCases.forEach(runTest);
	});

	describe('validate ntb username', () => {
		const testCases = [
			{
				target: 'short',
				expected: false,
				type: 'ntbusername'
			},
			{
				target: 'inv@lid',
				expected: false,
				type: 'ntbusername'
			},
			{
				target: 'Robert\'); DROP TABLE ',
				expected: false,
				type: 'ntbusername'
			},
			{
				target: 'username12301230',
				expected: true,
				type: 'ntbusername'
			},
			{
				target: '2015John',
				expected: true,
				type: 'ntbusername'
			},
			{
				target: '1234567890',
				expected: false,
				type: 'ntbusername'
			},
			{
				target: '12345678901',
				expected: true,
				type: 'ntbusername'
			},
			{
				target: '123456789d',
				expected: true,
				type: 'ntbusername'
			},
			{
				target: '123456789',
				expected: true,
				type: 'ntbusername'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate postcode', () => {
		const testCases = [
			{
				target: '2000 123',
				expected: false,
				type: 'postcode'
			},
			{
				target: '3#ll 3DF',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4 3',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP43 43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HPU GHP',
				expected: false,
				type: 'postcode'
			},
			{
				target: '434 343',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4 333',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HPU4 3GHP',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4 UGH',
				expected: false,
				type: 'postcode'
			},
			{
				target: '!P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '!P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '@P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '@P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '#P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '#P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '$P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '$P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '%P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '%P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '^P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '^P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '&P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '&P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '*P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '*P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '(P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '(P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ')P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ')P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '_P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '_P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '=P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '=P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '+P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '+P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '[P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '[P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ']P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ']P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '{P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '{P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '}P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '}P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ':P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ':P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ';P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ';P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '"P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '"P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '"P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '"P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '\'P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '\'P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '|P4 3U\'G',
				expected: false,
				type: 'postcode'
			},
			{
				target: '|P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '\\P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '\P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ',P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: ',P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '.P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '.P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '<P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '<P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '>P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '>P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '/P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '/P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '?P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '?P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4 3UG ',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP43UG ',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'H P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'H P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '-HP4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: '-HP43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'H-P4 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'H-P43UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4 -3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4- 3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'HP4--3UG',
				expected: false,
				type: 'postcode'
			},
			{
				target: 'G1A 2BQ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'G2 5TF',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'GB22 5TF',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'g2 5tf',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'GIR 0AA',
				expected: true,
				type: 'postcode'
			},
			// The following Postcodes should be whitelisted for testing purposes
			{
				target: 'X9 9RB',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9AA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9BF',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9AJ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9AB',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9TA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9LG',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9BH',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 9LF',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'X9 2TR',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE16 4QZ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE11 1AA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE98 1TL',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE98 1TL',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XEP O11',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE99 3GG',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE0 2AQ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1A 1AA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE18 3AN',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE7 4GJ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1P 2PR',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE2 7EJ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE12 8JS',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1H 9DW',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE 5GG',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1X 7XA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1X 7XF',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1 8NH',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1 1RJ',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1 1RN',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE1 1LE',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE24 99X',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE 0AA',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'XE12 8HJ',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'SW15 2DS',
				expected: true,
				type: 'postcode'
			},
			{
				target: 'EC1A 1BB',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'W1A 0AX',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'M1 1AE',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'B33 8TH',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'CR2 6XH',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'DN55 1PT',
				expected: true,
				type: 'postcode'
			},

			{
				target: 'W1K 7TN',
				expected: true,
				type: 'postcode'
			},

			{
				target: '',
				expected: false,
				type: 'postcode'
			},

			{
				target: 'kitten',
				expected: false,
				type: 'postcode'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate expirationDate', () => {
		const testCases = [
			{
				target: 'a',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '17',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '00179',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '0017',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '1317',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '1007',
				expected: false,
				type: 'expirationDate'
			},
			{
				target: '1017',
				expected: true,
				type: 'expirationDate'
			},
			{
				target: '0915',
				expected: true,
				type: 'expirationDate'
			},
		];

		testCases.forEach(runTest);
	});

	describe('validate password', () => {
		const testCases = [
			{
				target: 'a',
				expected: false,
				type: 'password'
			},
			{
				target: 'ab',
				expected: false,
				type: 'password'
			},
			{
				target: 'abc',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcd',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcde',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcdef',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcdefghijklmnopq',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcdefg3ijklmnopq',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcd234ijklmnopq',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcd2ijkopq',
				expected: false,
				type: 'password'
			},
			{
				target: '22222222',
				expected: false,
				type: 'password'
			},
			{
				target: 'aaaaaaaa',
				expected: false,
				type: 'password'
			},
			{
				target: 'aaaaaaaa!!',
				expected: false,
				type: 'password'
			},
			{
				target: '11111111!!',
				expected: false,
				type: 'password'
			},
			{
				target: 'pas123',
				expected: false,
				type: 'password'
			},
			{
				target: 'password1',
				expected: false,
				type: 'password'
			},
			{
				target: '123456789012345a',
				expected: false,
				type: 'password'
			},
			{
				target: 'passwo',
				expected: false,
				type: 'password'
			},
			{
				target: 'password',
				expected: false,
				type: 'password'
			},
			{
				target: '1234567890123456a',
				expected: false,
				type: 'password'
			},
			{
				target: 'abcdefg3!dd',
				expected: true,
				type: 'password'
			},
			{
				target: 'test!!123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass_word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass>word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass<word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass¬word123',
				expected: false,
				type: 'password'
			},
			{
				target: 'Pass\'word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass"word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass£word123',
				expected: false,
				type: 'password'
			},
			{
				target: 'Pass$word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass%word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass^word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass&word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass*word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass(word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass)word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass-word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass+word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass=word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass{word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass}word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass[word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass]word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass@word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass‘word123',
				expected: false,
				type: 'password'
			},
			{
				target: 'Pass~word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass#word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass?word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass/word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass\\word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass|word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass,word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass.word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass;word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'Pass:word123',
				expected: true,
				type: 'password'
			},
			{
				target: 'TESTtest12`',
				expected: false,
				type: 'password'
			},
			{
				target: 'TESTtest12¬',
				expected: false,
				type: 'password'
			}

		];

		testCases.forEach(runTest);
	});

	describe('validate date', () => {
		const testCases = [
			{
				target: 'a',
				expected: false,
				type: 'date'
			},
			{
				target: 'as-asd-asdd',
				expected: false,
				type: 'date'
			},
			{
				target: '00-00-2010',
				expected: false,
				type: 'date'
			},
			{
				target: '01-13-2010',
				expected: false,
				type: 'date'
			},
			{
				target: '32-10-2010',
				expected: false,
				type: 'date'
			},
			{
				target: '01-10-1010',
				expected: false,
				type: 'date'
			},
			{
				target: '02-04-0010',
				expected: false,
				type: 'date'
			},
			{
				target: '02-04-1800',
				expected: false,
				type: 'date'
			},
			{
				target: '1-1-99',
				expected: false,
				type: 'date'
			},
			{
				target: '01-01-2012',
				expected: true,
				type: 'date'
			},
			{
				target: '27-10-2020',
				expected: true,
				type: 'date'
			},
			{
				target: '30-02-2015',
				expected: true,
				type: 'date'
			},
			{
				target: '27-10-2020',
				expected: true,
				type: 'date'
			},
			{
				target: '01-01-2000',
				expected: true,
				type: 'date'
			},
			{
				target: '01-01-1980',
				expected: true,
				type: 'date'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate account name', () => {
		const testCases = [
			{
				target: 'this--acount',
				expected: true,
				type: 'accountName'
			},
			{
				target: ' -Account',
				expected: true,
				type: 'accountName'
			},
			{
				target: ' This account name:',
				expected: false,
				type: 'accountName'
			},
			{
				target: 'test account ',
				expected: true,
				type: 'accountName'
			},
			{
				target: 'Test $100',
				expected: false,
				type: 'accountName'
			},
			{
				target: 'Mon£y',
				expected: false,
				type: 'accountName'
			},
			{
				target: 'This account name: Test',
				expected: false,
				type: 'accountName'
			},
			{
				target: '$$$',
				expected: false,
				type: 'accountName'
			},
			{
				target: 'Client-name account!',
				expected: false,
				type: 'accountName'
			}
		];

		testCases.forEach(runTest);
	});

	describe('validate card PAN', () => {
		const testCases = [
			{
				target: '12345678901234567890',
				expected: false,
				type: 'debitCardPan'
			},
			{
				target: '000',
				expected: false,
				type: 'debitCardPan'
			},
			{
				target: '12345678901234567',
				expected: false,
				type: 'debitCardPan'
			},
			{
				target: '0000 0000 0000 0000',
				expected: false,
				type: 'debitCardPan'
			},
			{
				target: '0000-0000-0000-0000',
				expected: false,
				type: 'debitCardPan'
			},
			{
				target: '12345',
				expected: true,
				type: 'debitCardPan'
			},
			{
				target: '1234567890123456',
				expected: true,
				type: 'debitCardPan'
			},
			{
				target: '1234567890123456789',
				expected: true,
				type: 'debitCardPan'
			}
		];

		testCases.forEach(runTest);
	});
});
