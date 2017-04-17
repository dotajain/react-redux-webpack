'use strict';

jest.unmock('../TileComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const TileComponent = require('../TileComponent');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const moment = require('moment');
const config = require('../../../config');
const _monthsList = [];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TileComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Tile Component page', () => {

    FinancialStoriesStore.getState.mockReturnValue({
        transactionHistoryData: [{
            id: '12345',
            description: 'description',
            date: '19-DEC-91',
            type: 'type',
            tag: 'tag',
            amount: 'amount',
            balance: 'balance',
            city: 'city',
        }]
    });


    describe('Tile Component page functions check', () => {

        let component;
        let props = {
            dropDownData: {
                "hits": {
                    "total": 1,
                    "hits": [
                        {
                            "_type": "transaction",
                            "_index": "transactions_2016_09_19",
                            "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                            "_source": {
                                "other_account": {
                                    "number": null,
                                    "sort_code": null,
                                    "bank": null,
                                    "name": "RT 1 C WIEC MHZAPG",
                                    "uuid": null
                                },
                                "details": {
                                    "balances": {
                                        "current": {
                                            "value": 1400,
                                            "currency": "GBP"
                                        }
                                    },
                                    "cashback": {
                                        "value": 0,
                                        "currency": "GBP"
                                    },
                                    "timestamps": {
                                        "settled": 1473980400000,
                                        "local_transacted": null
                                    },
                                    "amount": {
                                        "value": -570,
                                        "currency": "GBP"
                                    },
                                    "reference": null,
                                    "fx": {
                                        "fee": {
                                            "international": {
                                                "value": 0,
                                                "currency": "GBP"
                                            },
                                            "processing": {
                                                "value": 0,
                                                "currency": "GBP"
                                            }
                                        },
                                        "local_amount": {
                                            "value": -0.5,
                                            "currency": "GBP"
                                        },
                                        "rate": 1
                                    },
                                    "posted": false,
                                    "debit_credit": "debit",
                                    "when": "2016-09-19T08:05:00.000Z",
                                    "type": "Direct Debit",
                                    "narrative": {
                                        "medium": "RBS Edinburgh",
                                        "additional_medium": null,
                                        "large": "RBS Edinburgh",
                                        "legacy": null,
                                        "small": "RBS Edinburgh",
                                        "additional_large": null,
                                        "additional_short": null
                                    }
                                },
                                "ordinal": "20152090000000000000000001",
                                "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "archived": false,
                                "suggested_terms": "RBS Edinburgh",
                                "mandate": {
                                    "sequence_number": "6877"
                                },
                                "metadata": {
                                    "payment_method": {
                                        "pan_masked": null,
                                        "cheque_number": null
                                    },
                                    "categories": null,
                                    "tags": [
                                        {
                                            "path": "\/eating out",
                                            "value": "Eating out",
                                            "id": 34130,
                                            "archived": false,
                                            "scheme": "NAG Categories"
                                        }
                                    ],
                                    "where": {
                                        "county": null,
                                        "geo_location": {
                                            "longitude": 0,
                                            "latitude": 0
                                        },
                                        "country": {
                                            "name": null,
                                            "code": null
                                        },
                                        "city": null
                                    }
                                },
                                "this_account": {
                                    "number": "40012813",
                                    "sort_code": "827018",
                                    "bank": null,
                                    "name": null,
                                    "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                }
                            },
                            "sort": [
                                1474272300000,
                                "20152090000000000000000001"
                            ],
                            "_score": null
                        },
                    ],
                }
            },
            tileType: 'microTransactions',
            content: {
                MicroTransaction: "microTransactions",
                Cashpoint: "cashpoint",
                InAndOut: "insAndOuts",
                Projection: "projection",
                CurrencySign: "-£",
                tile1Header: 'So far you havent spent  on things under a tenner this month',
                tile1Footer: 'Take a closer look...',
                tile2Header: 'Great news, looks like you ll be in the green till payday',
                tile2Footer: 'Go to Projections',
                tile3Header: 'You\'ve taken out in cash so far this month ',
                tile3Footer: 'Take a closer look...',
                tile4Header: 'Nothing\'s in or out of your account so far',
                tile4Footer: 'Take a closer look...',
                tile4HeaderNoData: 'We can\'t show you this story right now',
                tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                accountDetailsInprogressHeader: 'In progress',
                accountDetailsInprogressContent: 'This is still going through',
                inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                cashpoint_footerText: 'You usually take out {sum} at a time',
                noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                noTransactionFound: 'No transactions found',
                transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                micro_footerText: 'That\'s about {sum} a pop',
                currency: 'GBP',
                asc: 'asc',
                desc: 'desc',
                threeMonths: '3 months',
                customRange: 'Custom Range',
                doneButton: 'doneButton',
            },
            data: {
                aggregations: {
                    "debit": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "credit": {
                        "doc_count": 0,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "totals_of_debit_and_credits": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
        let onClickStub;
        const content = {

        }

        beforeEach(() => {
            onClickStub = jest.genMockFn();

            component = TestUtils.renderIntoDocument(
                <TileComponent onClick={onClickStub}	content={content} {...props}
                    />
            );

        });

        it('should run onClick event', () => {
            const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
            component.doneClick = onClickStub;

            onClickStub();
            // TestUtils.Simulate.click(pageoptions);
            _.map(pageoptions, page => {

             		 TestUtils.Simulate.click(page);
            });

            expect(onClickStub).toBeCalled();
        });

        it('on month change fxn', () => {

            let e = {
                target: {
                    value: 10,
                }
            };
            component.onMonthChange(e);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });
        it('on month change fxn to cover else condition', () => {

            let e = {
                target: {
                    value: -1,
                }
            };
            component.onMonthChange(e);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Tile Service Call fxn', () => {
            let actualMonth = -1;
            component.getTileServiceCall(actualMonth);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Tile Service Call fxn for switch case equals cashpoint', () => {
            let actualMonth = -1;
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'cashpoint',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent {...props}
                    />
            );
            component.getTileServiceCall(actualMonth);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Tile Service Call fxn for switch case equals insAndOuts', () => {
            let actualMonth = -1;
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'insAndOuts',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getTileServiceCall(actualMonth);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Tile Service Call fxn for switch case equals hello', () => {
            let actualMonth = -1;
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getTileServiceCall(actualMonth);
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Months List fxn', () => {
            component.getMonthsList();
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Months List fxn to cover ', () => {
            component.getMonthsList();
            //	expect(component.props.onChangeIndex).toBe('hello');
        });


        it('get Doc Count fxn', () => {
            component.getDocCount();
            //	expect(component.props.onChangeIndex).toBe('hello');
        });


        it('get Footer In And Out Text fxn', () => {
            component.getFooterInAndOutText();
            //	expect(component.props.onChangeIndex).toBe('hello');
        });

        it('get Footer In And Out Text fxn with no data, in props', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: false,
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getFooterInAndOutText();
        });

        xit('get Footer In And Out Text fxn with no data, in props', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data1: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getFooterInAndOutText();
        });

        it('get Footer In And Out Text fxn with no buckets, in props', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getFooterInAndOutText();
        });

        it('get Footer In And Out Text fxn with no creditsum, in props', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": [20, 40]
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            expect('getFooterInAndOutText: ', () => {
                let component = TestUtils.renderIntoDocument(
                    <TileComponent  {...props}
                        />
                );
                component.getFooterInAndOutText();
            });
            expect('getFooterInAndOutText: ', () => {
                props.data.aggregations.totals_of_debit_and_credits.filtered_by_date.buckets = undefined;
                let component1 = TestUtils.renderIntoDocument(
                    <TileComponent  {...props}
                        />
                );
                component1.setState({ selectedMonth: '' })
                component1.getFooterInAndOutText();
            });
        });

        it('get Footer In And Out Text fxn with creditsum, in props', () => {
            let date = moment().subtract(0, 'months').format('YYYY-MM');
            console.log('date for get footer in' + date);
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": [20, 40]
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            sum: 100,
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getFooterInAndOutText();
        });
        // expect('getFooterInAndOutText: ', () => {
        //     props.data.aggregations.totals_of_debit_and_credits.filtered_by_date.buckets = undefined;
        //     let component1 = TestUtils.renderIntoDocument(
        //         <TileComponent  {...props}
        //             />
        //     );
        //     component1.setState({ selectedMonth: '' })
        //     component1.getFooterInAndOutText();
        // });


        it('get Footer In And Out Text fxn with creditsum, in props', () => {
            let date = moment().subtract(0, 'months').format('YYYY-MM');
            console.log('date for get footer in' + date);
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "credit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": [20, 40]
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "debit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            sum: 100,
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getFooterInAndOutText();
        });

        it('get header In And Out Text fxn with this.props.data = false', () => {
            let props = {
                data: false,
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data1: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getHeaderInAndOutText();
        });

        xit('get header In And Out Text fxn with this.props.data.selectedMonth = 2', () => {   //x
            let props = {
                data: {
                    selectedMonth: 2,
                },
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data1: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getHeaderInAndOutText();
        });//////////////

        it('get header In And Out Text fxn with this.props.data.selectedMonth = 2', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    selectedMonth: 2,
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets1": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with no buckets, in props', () => {
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'hello',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets1": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };
            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with selectedMonth is 10 and sum negative, in props', () => {
            let date = moment().subtract(10, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 10 });
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with selectedMonth is 10 and sum 0, in props', () => {
            let date = moment().subtract(10, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": 0
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 10 });
            component.getHeaderInAndOutText();
        });

       it('get header In And Out Text fxn with selectedMonth is 10 and sum positive, in props', () => {
            let date = moment().subtract(10, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": 10
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 10 });
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with sum 0, in props', () => {
            let date = moment().subtract(10, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": 0
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            // component.setState({ selectedMonth: 10 });
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with selectedMonth is 0 and sum positive, in props', () => {
            let date = moment().subtract(0, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": 10
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 0 });
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn with selectedMonth is 0 and sum negative, in props', () => {
            let date = moment().subtract(0, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -10
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 0 });
            component.getHeaderInAndOutText();
        });

        ////////////////
        it('get header In And Out Text fxn with selectedMonth is 25 and sum negative, in props', () => {
            let date = moment().subtract(0, 'months').format('YYYY-MM');
            let props = {
                dropDownData: {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                        ],
                    }
                },
                tileType: 'microTransactions',
                content: {
                    MicroTransaction: "microTransactions",
                    Cashpoint: "cashpoint",
                    InAndOut: "insAndOuts",
                    Projection: "projection",
                    CurrencySign: "-£",
                    tile1Header: 'So far you havent spent  on things under a tenner this month',
                    tile1Footer: 'Take a closer look...',
                    tile2Header: 'Great news, looks like you ll be in the green till payday',
                    tile2Footer: 'Go to Projections',
                    tile3Header: 'You\'ve taken out in cash so far this month ',
                    tile3Footer: 'Take a closer look...',
                    tile4Header: 'Nothing\'s in or out of your account so far',
                    tile4Footer: 'Take a closer look...',
                    tile4HeaderNoData: 'We can\'t show you this story right now',
                    tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                    accountDetailsInprogressHeader: 'In progress',
                    accountDetailsInprogressContent: 'This is still going through',
                    inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                    inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                    inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                    inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                    inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                    inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                    inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                    cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                    cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                    cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                    cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                    cashpoint_footerText: 'You usually take out {sum} at a time',
                    noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                    noTransactionFound: 'No transactions found',
                    transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                    transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                    micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                    micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                    micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                    micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                    micro_footerText: 'That\'s about {sum} a pop',
                    currency: 'GBP',
                    asc: 'asc',
                    desc: 'desc',
                    threeMonths: '3 months',
                    customRange: 'Custom Range',
                    doneButton: 'doneButton',
                },
                data: {
                    selectedMonth: 25,
                    aggregations: {
                        "debit": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "credit": {
                            "doc_count": 0,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -13.21
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        "totals_of_debit_and_credits": {
                            "doc_count": 5,
                            "filtered_by_date": {
                                "buckets": [
                                    {
                                        "doc_count": 5,
                                        "key": "8",
                                        "monthly_spend": {
                                            "avg": -2.6420000000000003,
                                            "min": -5.0,
                                            "count": 5,
                                            "max": 0,
                                            "sum": -10
                                        },
                                        "key_as_string": date,
                                        "most_popular_transaction": {
                                            "buckets": [
                                                {
                                                    "key": -5.0,
                                                    "doc_count": 5
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
            };

            let component = TestUtils.renderIntoDocument(
                <TileComponent  {...props}
                    />
            );
            component.setState({ selectedMonth: 0 });
            component.getHeaderInAndOutText();
        });

        it('get header In And Out Text fxn setting state selected month', () => {

            component.setState({ selectedMonth: 1 });
            component.getHeaderInAndOutText();
        });


        it('get getFooterCashPointText fxn setting state selected month', () => {

            component.setState({ selectedMonth: 1 });
            component.getFooterCashPointText();
        });

    });


    it('should on getPanelData', () => {

        let props = {
            dropDownData: {
                "hits": {
                    "total": 1,
                    "hits": [
                        {
                            "_type": "transaction",
                            "_index": "transactions_2016_09_19",
                            "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                            "_source": {
                                "other_account": {
                                    "number": null,
                                    "sort_code": null,
                                    "bank": null,
                                    "name": "RT 1 C WIEC MHZAPG",
                                    "uuid": null
                                },
                                "details": {
                                    "balances": {
                                        "current": {
                                            "value": 1400,
                                            "currency": "GBP"
                                        }
                                    },
                                    "cashback": {
                                        "value": 0,
                                        "currency": "GBP"
                                    },
                                    "timestamps": {
                                        "settled": 1473980400000,
                                        "local_transacted": null
                                    },
                                    "amount": {
                                        "value": -570,
                                        "currency": "GBP"
                                    },
                                    "reference": null,
                                    "fx": {
                                        "fee": {
                                            "international": {
                                                "value": 0,
                                                "currency": "GBP"
                                            },
                                            "processing": {
                                                "value": 0,
                                                "currency": "GBP"
                                            }
                                        },
                                        "local_amount": {
                                            "value": -0.5,
                                            "currency": "GBP"
                                        },
                                        "rate": 1
                                    },
                                    "posted": false,
                                    "debit_credit": "debit",
                                    "when": "2016-09-19T08:05:00.000Z",
                                    "type": "Direct Debit",
                                    "narrative": {
                                        "medium": "RBS Edinburgh",
                                        "additional_medium": null,
                                        "large": "RBS Edinburgh",
                                        "legacy": null,
                                        "small": "RBS Edinburgh",
                                        "additional_large": null,
                                        "additional_short": null
                                    }
                                },
                                "ordinal": "20152090000000000000000001",
                                "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "archived": false,
                                "suggested_terms": "RBS Edinburgh",
                                "mandate": {
                                    "sequence_number": "6877"
                                },
                                "metadata": {
                                    "payment_method": {
                                        "pan_masked": null,
                                        "cheque_number": null
                                    },
                                    "categories": null,
                                    "tags": [
                                        {
                                            "path": "\/eating out",
                                            "value": "Eating out",
                                            "id": 34130,
                                            "archived": false,
                                            "scheme": "NAG Categories"
                                        }
                                    ],
                                    "where": {
                                        "county": null,
                                        "geo_location": {
                                            "longitude": 0,
                                            "latitude": 0
                                        },
                                        "country": {
                                            "name": null,
                                            "code": null
                                        },
                                        "city": null
                                    }
                                },
                                "this_account": {
                                    "number": "40012813",
                                    "sort_code": "827018",
                                    "bank": null,
                                    "name": null,
                                    "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                }
                            },
                            "sort": [
                                1474272300000,
                                "20152090000000000000000001"
                            ],
                            "_score": null
                        },
                    ],
                }
            },
            tileType: 'microTransactions',
            content: {
                MicroTransaction: "microTransactions",
                Cashpoint: "cashpoint",
                InAndOut: "insAndOuts",
                Projection: "projection",
                CurrencySign: "-£",
                tile1Header: 'So far you havent spent  on things under a tenner this month',
                tile1Footer: 'Take a closer look...',
                tile2Header: 'Great news, looks like you ll be in the green till payday',
                tile2Footer: 'Go to Projections',
                tile3Header: 'You\'ve taken out in cash so far this month ',
                tile3Footer: 'Take a closer look...',
                tile4Header: 'Nothing\'s in or out of your account so far',
                tile4Footer: 'Take a closer look...',
                tile4HeaderNoData: 'We can\'t show you this story right now',
                tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                accountDetailsInprogressHeader: 'In progress',
                accountDetailsInprogressContent: 'This is still going through',
                inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                cashpoint_footerText: 'You usually take out {sum} at a time',
                noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                noTransactionFound: 'No transactions found',
                transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                micro_footerText: 'That\'s about {sum} a pop',
                currency: 'GBP',
                asc: 'asc',
                desc: 'desc',
                threeMonths: '3 months',
                customRange: 'Custom Range',
                doneButton: 'doneButton',
            },
            data: {
                hits: {
                    hits: {
                        total: 10,
                    }
                },
                aggregations: {
                    "debit": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "credit": {
                        "doc_count": 0,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "totals_of_debit_and_credits": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
        let component = TestUtils.renderIntoDocument(
            <TileComponent {...props}
                />
        );
        component.getPanelData();
        expect(component.state.financialStoriesClass).toBe(undefined);

    });
    it('should on getPanelData', () => {

        let props = {
            dropDownData: {
                "hits": {
                    "total": 1,
                    "hits": [
                        {
                            "_type": "transaction",
                            "_index": "transactions_2016_09_19",
                            "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                            "_source": {
                                "other_account": {
                                    "number": null,
                                    "sort_code": null,
                                    "bank": null,
                                    "name": "RT 1 C WIEC MHZAPG",
                                    "uuid": null
                                },
                                "details": {
                                    "balances": {
                                        "current": {
                                            "value": 1400,
                                            "currency": "GBP"
                                        }
                                    },
                                    "cashback": {
                                        "value": 0,
                                        "currency": "GBP"
                                    },
                                    "timestamps": {
                                        "settled": 1473980400000,
                                        "local_transacted": null
                                    },
                                    "amount": {
                                        "value": -570,
                                        "currency": "GBP"
                                    },
                                    "reference": null,
                                    "fx": {
                                        "fee": {
                                            "international": {
                                                "value": 0,
                                                "currency": "GBP"
                                            },
                                            "processing": {
                                                "value": 0,
                                                "currency": "GBP"
                                            }
                                        },
                                        "local_amount": {
                                            "value": -0.5,
                                            "currency": "GBP"
                                        },
                                        "rate": 1
                                    },
                                    "posted": false,
                                    "debit_credit": "debit",
                                    "when": "2016-09-19T08:05:00.000Z",
                                    "type": "Direct Debit",
                                    "narrative": {
                                        "medium": "RBS Edinburgh",
                                        "additional_medium": null,
                                        "large": "RBS Edinburgh",
                                        "legacy": null,
                                        "small": "RBS Edinburgh",
                                        "additional_large": null,
                                        "additional_short": null
                                    }
                                },
                                "ordinal": "20152090000000000000000001",
                                "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "archived": false,
                                "suggested_terms": "RBS Edinburgh",
                                "mandate": {
                                    "sequence_number": "6877"
                                },
                                "metadata": {
                                    "payment_method": {
                                        "pan_masked": null,
                                        "cheque_number": null
                                    },
                                    "categories": null,
                                    "tags": [
                                        {
                                            "path": "\/eating out",
                                            "value": "Eating out",
                                            "id": 34130,
                                            "archived": false,
                                            "scheme": "NAG Categories"
                                        }
                                    ],
                                    "where": {
                                        "county": null,
                                        "geo_location": {
                                            "longitude": 0,
                                            "latitude": 0
                                        },
                                        "country": {
                                            "name": null,
                                            "code": null
                                        },
                                        "city": null
                                    }
                                },
                                "this_account": {
                                    "number": "40012813",
                                    "sort_code": "827018",
                                    "bank": null,
                                    "name": null,
                                    "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                }
                            },
                            "sort": [
                                1474272300000,
                                "20152090000000000000000001"
                            ],
                            "_score": null
                        },
                    ],
                }
            },
            tileType: 'microTransactions',
            content: {
                MicroTransaction: "microTransactions",
                Cashpoint: "cashpoint",
                InAndOut: "insAndOuts",
                Projection: "projection",
                CurrencySign: "-£",
                tile1Header: 'So far you havent spent  on things under a tenner this month',
                tile1Footer: 'Take a closer look...',
                tile2Header: 'Great news, looks like you ll be in the green till payday',
                tile2Footer: 'Go to Projections',
                tile3Header: 'You\'ve taken out in cash so far this month ',
                tile3Footer: 'Take a closer look...',
                tile4Header: 'Nothing\'s in or out of your account so far',
                tile4Footer: 'Take a closer look...',
                tile4HeaderNoData: 'We can\'t show you this story right now',
                tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
                accountDetailsInprogressHeader: 'In progress',
                accountDetailsInprogressContent: 'This is still going through',
                inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
                inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
                inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
                inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
                inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
                inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
                inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
                cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
                cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
                cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
                cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
                cashpoint_footerText: 'You usually take out {sum} at a time',
                noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
                noTransactionFound: 'No transactions found',
                transactionReTag: '{TranNo} transaction has been retagged {TagName}',
                transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
                micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
                micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
                micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
                micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
                micro_footerText: 'That\'s about {sum} a pop',
                currency: 'GBP',
                asc: 'asc',
                desc: 'desc',
                threeMonths: '3 months',
                customRange: 'Custom Range',
                doneButton: 'doneButton',
            },
            data: {
                hits: {
                    hits: {
                        total: 1,
                    }
                },
                aggregations: {
                    "debit": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "credit": {
                        "doc_count": 0,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    "totals_of_debit_and_credits": {
                        "doc_count": 5,
                        "filtered_by_date": {
                            "buckets": [
                                {
                                    "doc_count": 5,
                                    "key": "8",
                                    "monthly_spend": {
                                        "avg": -2.6420000000000003,
                                        "min": -5.0,
                                        "count": 5,
                                        "max": 0,
                                        "sum": -13.21
                                    },
                                    "key_as_string": "2016-07-07T00:00:00.000+01:00",
                                    "most_popular_transaction": {
                                        "buckets": [
                                            {
                                                "key": -5.0,
                                                "doc_count": 5
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
        props.data.aggregations.debit.filtered_by_date.buckets = undefined;
        let component = TestUtils.renderIntoDocument(
            <TileComponent {...props}
                />
        );
        component.getHeaderInAndOutText();
        component.getHeaderCashPointText();

    });




    //  xdescribe('customer registration page', () => {

    //             // FinancialStoriesStore.getState.mockReturnValue({
    //             //     transactionHistoryData: [{
    //             //         id: '12345',
    //             //         description: 'description',
    //             //         date: '20-OCT-16',
    //             //         type: 'type',
    //             //         tag: 'tag',
    //             //         amount: 'amount',
    //             //         balance: 'balance',
    //             //         city: 'city',
    //             //     }]
    //             // });

    //             let component;
    //             let props = {
    //                 tileType: 'microTransactions',
    //                 content: {
    //                     MicroTransaction: "microTransactions",
    //                     Cashpoint: "cashpoint",
    //                     InAndOut: "insAndOuts",
    //                     Projection: "projection",
    //                     CurrencySign: "-£",
    //                     tile1Header: 'So far you havent spent  on things under a tenner this month',
    //                     tile1Footer: 'Take a closer look...',
    //                     tile2Header: 'Great news, looks like you ll be in the green till payday',
    //                     tile2Footer: 'Go to Projections',
    //                     tile3Header: 'You\'ve taken out in cash so far this month ',
    //                     tile3Footer: 'Take a closer look...',
    //                     tile4Header: 'Nothing\'s in or out of your account so far',
    //                     tile4Footer: 'Take a closer look...',
    //                     tile4HeaderNoData: 'We can\'t show you this story right now',
    //                     tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
    //                     accountDetailsInprogressHeader: 'In progress',
    //                     accountDetailsInprogressContent: 'This is still going through',
    //                     inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
    //                     inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
    //                     inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
    //                     inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
    //                     inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down',
    //                     inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
    //                     inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
    //                     cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
    //                     cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
    //                     cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
    //                     cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
    //                     cashpoint_footerText: 'You usually take out {sum} at a time',
    //                     noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
    //                     noTransactionFound: 'No transactions found',
    //                     transactionReTag: '{TranNo} transaction has been retagged {TagName}',
    //                     transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
    //                     micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
    //                     micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
    //                     micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
    //                     micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
    //                     micro_footerText: 'That\'s about {sum} a pop',
    //                     currency: 'GBP',
    //                     asc: 'asc',
    //                     desc: 'desc',
    //                     threeMonths: '3 months',
    //                     customRange: 'Custom Range',
    //                     doneButton: 'doneButton',
    //                 },
    //                 data: {
    //                     aggregations: {
    //                         "debit": {
    //                             "doc_count": 5,
    //                             "filtered_by_date": {
    //                                 "buckets": [
    //                                     {
    //                                         "doc_count": 5,
    //                                         "key": "8",
    //                                         "monthly_spend": {
    //                                             "avg": -2.6420000000000003,
    //                                             "min": -5.0,
    //                                             "count": 5,
    //                                             "max": 0,
    //                                             "sum": -13.21
    //                                         },
    //                                         "key_as_string": "2016-07-07T00:00:00.000+01:00",
    //                                         "most_popular_transaction": {
    //                                             "buckets": [
    //                                                 {
    //                                                     "key": -5.0,
    //                                                     "doc_count": 5
    //                                                 }
    //                                             ]
    //                                         }
    //                                     }
    //                                 ]
    //                             }
    //                         },
    //                         "credit": {
    //                             "doc_count": 0,
    //                             "filtered_by_date": {
    //                                 "buckets": [
    //                                     {
    //                                         "doc_count": 5,
    //                                         "key": "8",
    //                                         "monthly_spend": {
    //                                             "avg": -2.6420000000000003,
    //                                             "min": -5.0,
    //                                             "count": 5,
    //                                             "max": 0,
    //                                             "sum": -13.21
    //                                         },
    //                                         "key_as_string": "2016-07-07T00:00:00.000+01:00",
    //                                         "most_popular_transaction": {
    //                                             "buckets": [
    //                                                 {
    //                                                     "key": -5.0,
    //                                                     "doc_count": 5
    //                                                 }
    //                                             ]
    //                                         }
    //                                     }
    //                                 ]
    //                             }
    //                         },
    //                         "totals_of_debit_and_credits": {
    //                             "doc_count": 5,
    //                             "filtered_by_date": {
    //                                 "buckets": [
    //                                     {
    //                                         "doc_count": 5,
    //                                         "key": "8",
    //                                         "monthly_spend": {
    //                                             "avg": -2.6420000000000003,
    //                                             "min": -5.0,
    //                                             "count": 5,
    //                                             "max": 0,
    //                                             "sum": -13.21
    //                                         },
    //                                         "key_as_string": "2016-07-07T00:00:00.000+01:00",
    //                                         "most_popular_transaction": {
    //                                             "buckets": [
    //                                                 {
    //                                                     "key": -5.0,
    //                                                     "doc_count": 5
    //                                                 }
    //                                             ]
    //                                         }
    //                                     }
    //                                 ]
    //                             }
    //                         }
    //                     }
    //                 },
    //             };
    //             let onClickStub;
    //             const content = {

    //             }

    //             beforeEach(() => {
    //                 onClickStub = jest.genMockFn();

    //                 component = TestUtils.renderIntoDocument(
    //                     <TileComponent onClick={onClickStub}	content={content} {...props}
    //                         />
    //                 );
    //             });

    //             it('get Months List fxn', () => {
    //                 component.getMonthsList();
    //                 //	expect(component.props.onChangeIndex).toBe('hello');
    //             });
    //         });
});
