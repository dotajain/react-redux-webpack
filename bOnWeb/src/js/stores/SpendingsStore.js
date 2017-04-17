/**
 * @module SpendingsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const AppConstants = require('../constants/AppConstants');

const EventEmitter = require('events').EventEmitter;
const SpendingsConstants = require('../constants/SpendingsConstants');
const SpendingsUtils = require('../utils/SpendingsUtils');
const NumberUtils = require('../utils/NumberUtils');
const _ = require('lodash');
const moment = require('moment');


const CHANGE_EVENT = 'change';

let _collectAccountID = [];
let _accountList = [];
let _updatedAccountIds = [];
let _getBudgetConnectionData = {};
let _getSpendListConnectionData = {};
let _getBudgetPreferencesConnectionData = {};
let _hasBudgetPreferencesError = false;
let _hasBudgetPreferences = false;
let _getTagListConnectionData = {};
let _isCreateBudgetPage;
let _transactionsData = [];
let _potDataSpendings = [];
let _monthlyContributionPots;
let _transactionsTagName;

let _isAccountSuccesss = false;
let _isSpendSuccess = false;
let _isTagSuccess = false;
let _isAccountModal = false;
let _isBudgetSuccess = false;
let _isEarningPage = false;
let _isTransactionPage = false;
let _transactionPageSize = 200;
let _spendingPageToLoad;
let accountCounter;
let _createBudgetSortedData;
let _isTransitionPageLoad;
let _isNetworkError = false;
let _isInterNalServerError = false;
let _isError = false;

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const firstDay = new Date(y, m, 1);

const breakItDownPacket = {
  'template' : {
    'file' : 'breakDownOfSpend',
  },
  'params' : {
    'tag_name_field' : 'metadata.tags.value',
    'tag_archived_field' : 'metadata.tags.archived',
    'date_lower_bound' : moment(firstDay).subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss.[000+0100]'),
    'date_field' : 'details.when',
    'tag_id_field' : 'metadata.tags.id',
    'amount_currency_field' : 'details.amount.currency',
    'category_name_field' : 'metadata.categories.value',
    'date_upper_bound' : 'now',
    'size' : 2,
    'account_list' : [

    ],
    'histogram_interval' : 'month',
    'amount_field' : 'details.amount.value',
    'category_id_field' : 'metadata.categories.id',
    'category_archived_field' : 'metadata.categories.archived',
  },
};

const tagListPacket = {
    'template': {
        'file': 'matchAllWithFilter',
    },
    'params': {
        'from': 0,
        'filter_value': [

        ],
        'start_date': null,
        'order': null,
        'sort_field': null,
        'size': null,
        'end_date': 'now',
        'filter_field': null,
        'account_list': null,
    },
};

const earningDefaultObj = {
    'period' : {
        'scope' : 'monthly',
        'net_income' : {
            'value' : 0,
            'currency' : 'GBP',
        },
    },
};

const SpendingsStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
    // to get all acoount list
	getAll() {
		return _accountList || [];
	},
    getBudgetPreferencesConnectionData() {
		return _getBudgetPreferencesConnectionData || earningDefaultObj;
	},
    getTagListConnectionData() {
        const tagList = _getTagListConnectionData;
        const tagListData = [];
        _.map(tagList.tags, item => {
        if (item.value !== 'Earnings') {
            const obj = {
                key: item.id.toString(),
                name: item.value,
                archived: item.archived || false,
                path: item.path,
                tag_budget: true,
                category_budgets: false,
            };
            tagListData.push(obj);
        }
        });
        _.map(tagList.categories, item => {
        if (item.value !== 'Earnings') {
            const obj = {
                key: item.id.toString(),
                name: item.value,
                archived: item.archived || false,
                path: item.path,
                tag_budget: false,
                category_budgets: true,
            };
            tagListData.push(obj);
        }
        });
		return tagListData;
	},
	getBudgetConnectionData() {
        const budgetList = _getBudgetConnectionData;
        const tag_budgets = budgetList.tag_budgets;
        const category_budgets = budgetList.category_budgets;
        const budgetListData = [];

        _.map(tag_budgets, item => {
        if (item.tag.value !== 'Earnings') {
            let path = null;
            if (item.tag.path) {
                path = item.tag.path;
            }
            const obj = {
                key: item.tag.id.toString(),
                name: item.tag.value,
                archived: item.tag.archived,
                path: path,
                target_amount: item.target_amount.value,
                tag_budget: true,
                category_budgets: false,
            };
            budgetListData.push(obj);
        }
        });
        _.map(category_budgets, item => {
        if (item.category.value !== 'Earnings') {
            let path = null;
            if (item.category.path) {
                path = item.category.path;
            }
            const obj = {
                key: item.category.id.toString(),
                name: item.category.value,
                archived: item.category.archived,
                path: path,
                target_amount: item.target_amount.value,
                tag_budget: false,
                category_budgets: true,
            };
            budgetListData.push(obj);
        }
        });
		return budgetListData;
	},
    getSpendListConnectionData() {
        const spendList = _getSpendListConnectionData;
        const budgetListData = this.getBudgetConnectionData();
        const tagListData = this.getTagListConnectionData();
        const currentMonth = moment().format('YYYY-MM');
        const lastMonth = moment(currentMonth).subtract(1, 'months').format('YYYY-MM');

        const otherAccountSpends = spendList.aggregations.other_accounts;
        const creditCardSpends = spendList.aggregations.credit_cards;

        const spendDataObj = {
            other_accounts: [],
            credit_cards: [],
            allAccountSpendData: [],
            earningValueFromSpend: [],
        };
        _.map(otherAccountSpends, spends => {
            _.map(spends, data => {
                _.map(data, items => {
                    const key = [];
                    const tagName = [];
                    const currentMonthValue = [];
                    const lastMonthValue = [];
                    let isJoint = true;
                    let isArchived = false;
                    let path = null;
                    let isMonth = true;
                    let tag_budget = false;
                    let category_budgets = true;
                    _.map(items.month.buckets, item => {
                        if (moment(item.key_as_string).format('YYYY-MM') === currentMonth) {
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            currentMonthValue.push(_.head(_.map(item.spend.buckets, amounts => amounts.amount.value)));
                        }
                        if (moment(item.key_as_string).format('YYYY-MM') === lastMonth) {
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            lastMonthValue.push(_.head(_.map(item.spend.buckets, amounts => amounts.amount.value)));
                        }
                        if (moment(item.key_as_string).format('YYYY-MM') !== lastMonth && moment(item.key_as_string).format('YYYY-MM') !== currentMonth) {
                            isMonth = false;
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            currentMonthValue.push(0);
                            lastMonthValue.push(0);
                        }
                        if (items.tag_name) {
                            tag_budget = true;
                        }
                        if (items.cat_name) {
                            category_budgets = true;
                        }
                    });

                    let currentMonthAmount;
                    if (_.isEmpty(currentMonthValue)) {
                        currentMonthAmount = 0;
                    } else {
                        currentMonthAmount = currentMonthValue[0];
                    }

                    let lastMonthAmount;
                    if (_.isEmpty(lastMonthValue)) {
                        lastMonthAmount = 0;
                    } else {
                        lastMonthAmount = lastMonthValue[0];
                    }
                    _.map(budgetListData, item => {
                        if (items.key === item.key) {
                            isArchived = item.archived;
                            path = item.path;
                            category_budgets = item.category_budgets;
                        }
                    });
                    _.map(tagListData, item => {
                        if (_.isEqual(items.key, item.key)) {
                            isJoint = false;
                            tag_budget = item.tag_budget;
                            category_budgets = item.category_budgets;
                        }
                    });
                    if (key[0] && tagName[0] !== 'Earnings') {
                        const obj = {
                            key: key[0],
                            name: tagName[0],
                            last_month: lastMonthAmount,
                            current_month: currentMonthAmount,
                            archived: isArchived,
                            joint: isJoint,
                            path: path,
                            last_month_flag: isMonth,
                            tag_budget: tag_budget,
                            category_budgets: category_budgets,
                        };
                        spendDataObj.allAccountSpendData.push(obj);
                        spendDataObj.other_accounts.push(obj);
                    } else {
                        spendDataObj.earningValueFromSpend.push(lastMonthAmount);
                    }
                });
            });
        });
        _.map(creditCardSpends, spends => {
            _.map(spends, data => {
                _.map(data, items => {
                    const key = [];
                    const tagName = [];
                    const currentMonthValue = [];
                    const lastMonthValue = [];
                    let isJoint = true;
                    let isArchived = false;
                    let path = null;
                    let isMonth = true;
                    let tag_budget = false;
                    let category_budgets = true;
                    _.map(items.month.buckets, item => {
                        if (moment(item.key_as_string).format('YYYY-MM') === currentMonth) {
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            currentMonthValue.push(_.head(_.map(item.spend.buckets, amounts => amounts.amount.value)));
                        }
                        if (moment(item.key_as_string).format('YYYY-MM') === lastMonth) {
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            lastMonthValue.push(_.head(_.map(item.spend.buckets, amounts => amounts.amount.value)));
                        }

                        if (moment(item.key_as_string).format('YYYY-MM') !== lastMonth && moment(item.key_as_string).format('YYYY-MM') !== currentMonth) {
                            isMonth = false;
                            key.push(items.key);
                            if (items.tag_name) {
                                tagName.push(_.head(_.map(items.tag_name.buckets, tagName => tagName.key)));
                            }
                            if (items.cat_name) {
                                tagName.push(_.head(_.map(items.cat_name.buckets, tagName => tagName.key)));
                            }
                            currentMonthValue.push(0);
                            lastMonthValue.push(0);
                        }
                        if (items.tag_name) {
                            tag_budget = true;
                        }
                        if (items.cat_name) {
                            category_budgets = true;
                        }
                    });
                    _.map(budgetListData, item => {
                        if (items.key === item.key) {
                            isArchived = item.archived;
                            path = item.path;
                            category_budgets = item.category_budgets;
                            tag_budget = item.tag_budget;
                        }
                    });
                    _.map(tagListData, item => {
                        if (_.isEqual(items.key, item.key)) {
                            isJoint = false;
                            tag_budget = item.tag_budget;
                            category_budgets = item.category_budgets;
                        }
                    });

                    let currentMonthAmount;
                    if (_.isEmpty(currentMonthValue)) {
                        currentMonthAmount = 0;
                    } else {
                        currentMonthAmount = currentMonthValue[0];
                    }

                    let lastMonthAmount;
                    if (_.isEmpty(lastMonthValue)) {
                        lastMonthAmount = 0;
                    } else {
                        lastMonthAmount = lastMonthValue[0];
                    }
                    if (key[0] && tagName[0] !== 'Earnings') {
                        const obj = {
                            key: key[0],
                            name: tagName[0],
                            last_month: lastMonthAmount,
                            current_month: currentMonthAmount,
                            archived: isArchived,
                            joint: isJoint,
                            path: path,
                            last_month_flag: isMonth,
                            tag_budget: tag_budget,
                            category_budgets: category_budgets,
                        };
                        spendDataObj.allAccountSpendData.push(obj);
                        spendDataObj.credit_cards.push(obj);
                    } else {
                        spendDataObj.earningValueFromSpend.push(lastMonthAmount);
                    }
                });
            });
        });

		return spendDataObj;
	},
    getmonthlyContributionPots() {
        _monthlyContributionPots = 0;
		_.map(_potDataSpendings, pots => {
			_.map(pots, pot => {
				_monthlyContributionPots = _monthlyContributionPots + pot.schedule.recurrence.amount.value;
			});
		});
		return _monthlyContributionPots;
	},

    spendMonthPageData() {
        const spendData = this.getSpendListConnectionData();
        const allAccountSpendData = spendData.allAccountSpendData;
        const otherAccountData = spendData.other_accounts;
        const creditCardData = spendData.credit_cards;

        // get Unique Spend items by key
        const totalBucketItems = _.unionBy(allAccountSpendData, 'key');
        const spendPageData = [];
        const totalCurrentMonthValue = [];
        const totalLastMonthValue = [];
        if (_.isEmpty(otherAccountData) && _.isEmpty(creditCardData)) {
            const obj = {
                key: 1,
                name: 'Untagged',
                last_month: 0,
                current_month: 0,
                archived: false,
                joint: false,
                path: null,
                difference: 0,
                message: 'Great news, you have no untagged transactions.',
                last_month_flag: false,
                tag_budget: false,
                category_budgets: false,
            };
            spendPageData.push(obj);
        } else {
            _.map(totalBucketItems, items => {
                const key = [];
                const tagName = [];
                const currentMonthValue = [0, 0];
                const lastMonthValue = [0, 0];
                _.map(otherAccountData, item => {
                    if (items.key === item.key) {
                        key.push(item.key);
                        tagName.push(item.name);
                        currentMonthValue[0] = item.current_month;
                        lastMonthValue[0] = item.last_month;
                    }
                });

                _.map(creditCardData, item => {
                    if (items.key === item.key) {
                        key.push(item.key);
                        tagName.push(item.name);
                        currentMonthValue[1] = item.current_month;
                        lastMonthValue[1] = item.last_month;
                    }
                });
                const totalCurrentMonth = currentMonthValue[0] - currentMonthValue[1];
                const totalLastMonth = lastMonthValue[0] - lastMonthValue[1];
                const difference = Math.abs(totalLastMonth) - Math.abs(totalCurrentMonth);
                totalCurrentMonthValue.push(totalCurrentMonth);
                totalLastMonthValue.push(totalLastMonth);
                let message;
                const diffRoundOffAmount = NumberUtils.appendCurrency('{}', Math.abs(difference));
                if (tagName[0] === 'Untagged') {
                    message = 'How about tagging these transactions?';
                } else if (difference === 0) {
                    message = 'no difference!';
                } else if (difference < 0) {
                    message = `${diffRoundOffAmount} more than last month`;
                } else {
                    message = `${diffRoundOffAmount} less than last month`;
                }

                let hasSpendValue;
                if (currentMonthValue[0] === 0 && currentMonthValue[1] === 0 && lastMonthValue[0] === 0 && lastMonthValue[1] === 0) {
                    hasSpendValue = true;
                }

                if (hasSpendValue && tagName[0] === 'Untagged') {
                    const obj = {
                        key: key[0],
                        name: tagName[0],
                        last_month: totalLastMonth,
                        current_month: totalCurrentMonth,
                        archived: items.archived,
                        joint: items.joint,
                        path: items.path,
                        difference: difference,
                        message: 'Great news, you have no untagged transactions.',
                        last_month_flag: items.last_month_flag,
                        category_budgets: items.category_budgets,
                        tag_budget: items.tag_budget,
                    };
                    spendPageData.push(obj);
                } else if (hasSpendValue) {
                    return false;
                } else {
                    const obj = {
                        key: key[0],
                        name: tagName[0],
                        last_month: totalLastMonth,
                        current_month: totalCurrentMonth,
                        archived: items.archived,
                        joint: items.joint,
                        path: items.path,
                        difference: difference,
                        message: message,
                        last_month_flag: items.last_month_flag,
                        category_budgets: items.category_budgets,
                        tag_budget: items.tag_budget,
                    };
                    spendPageData.push(obj);
                }
            });
        }
        const allItms = spendPageData;
        let hasUntagged = false;
        _.map(spendPageData, item => {
            if (item.name === 'Untagged') {
                hasUntagged = true;
            }
        });


        if (!hasUntagged) {
            const obj = {
                key: 1,
                name: 'Untagged',
                last_month: 0,
                current_month: 0,
                archived: false,
                joint: false,
                path: null,
                difference: 0,
                message: 'Great news, you have no untagged transactions.',
                last_month_flag: false,
                tag_budget: false,
                category_budgets: false,
            };
            allItms.push(obj);
        }

        const spendDataObj = {
            spendPageSortedData: [],
            current_month: totalCurrentMonthValue,
            last_month: totalLastMonthValue,
        };

        const items = _.groupBy(allItms, b => b.current_month);
        const item = _.map(items, i => _.orderBy(i, ['last_month'], ['asc']));
        _.map(item, i => _.map(i, j => spendDataObj.spendPageSortedData.push(j)));

        return spendDataObj;
    },

    spendBudgetPageData() {
        const spendPageData = this.spendMonthPageData().spendPageSortedData;
        const budgetListData = this.getBudgetConnectionData();
        const tagListData = this.getTagListConnectionData();
        const spendData = this.getSpendListConnectionData();
        const otherAccountData = spendData.other_accounts;
        const creditCardData = spendData.credit_cards;

        const all_spend_budget_data = [];

        _.map(spendPageData, item => all_spend_budget_data.push(item));
        _.map(budgetListData, item => all_spend_budget_data.push(item));

        const budgetBucket = _.unionBy(all_spend_budget_data, 'key');
        const budgetPageData = [];

        _.map(budgetBucket, items => {
            const key = [null, null];
            const tagName = [null, null];
            const target_amount = [0, 0];
            const archived = [false, false];
            const path = [null, null];
            let isJoint = true;
            let tag_budget = false;
            _.map(spendPageData, item => {
                if (items.key === item.key) {
                    key[0] = item.key;
                    tagName[0] = item.name;
                    target_amount[0] = item.current_month;
                    archived[0] = false;
                    path[0] = null;
                }
            });
            _.map(budgetListData, item => {
                if (items.key === item.key) {
                    key[1] = item.key;
                    tagName[1] = item.name;
                    target_amount[1] = item.target_amount;
                    archived[1] = item.archived;
                    path[1] = item.path;
                }
            });
            _.map(tagListData, item => {
                if (_.isEqual(items.key, item.key)) {
                    isJoint = false;
                    tag_budget = item.tag_budget;
                }
            });
            if (_.isEmpty(otherAccountData) && _.isEmpty(creditCardData)) {
                isJoint = false;
            }
            let name;
            let id;
            let status;
            let difference;
            if (target_amount[0] === 0) {
                difference = Math.abs(target_amount[1]) - 0;
            } else if (target_amount[1] === 0) {
                difference = null;
            } else {
                difference = Math.abs(target_amount[1]) - Math.abs(target_amount[0]);
            }

            if (difference === 0 && target_amount[1] > 0) {
                difference = 100;
            }


            if (!key[0]) {
                id = key[1];
            } else {
                id = key[0];
            }
            if (!tagName[0]) {
                name = tagName[1];
            } else {
                name = tagName[0];
            }
            const diffRoundOffAmount = NumberUtils.appendCurrency('{}', Math.abs(difference));
            if (isJoint && target_amount[1] === 0) {
                status = '-';
            } else {
                if (!difference && name === 'Untagged') {
                    status = 'How about tagging these transactions?';
                } else if (!difference) {
                    status = 'No budget set yet';
                } else if (difference < 0) {
                    status = `${diffRoundOffAmount} over budget!`;
                } else {
                    status = `${diffRoundOffAmount} left to spend`;
                }
                if (difference === 100 && target_amount[1] > 0) {
                    status = 'Nothing left to spend';
                }
            }

            if (target_amount[0] === 0 && target_amount[1] === 0 && name === 'Untagged') {
                const obj = {
                    key: id,
                    name: name,
                    current_month: 0,
                    target_amount: target_amount[1],
                    archived: archived[1],
                    path: path[1],
                    message: 'Great news, you have no untagged transactions.',
                    difference: difference,
                    joint: isJoint,
                    category_budgets: items.category_budgets,
                    tag_budget: tag_budget,
                };
                budgetPageData.push(obj);
            } else if (target_amount[0] === 0 && target_amount[1] === 0) {
                return false;
            } else {
                const obj = {
                    key: id,
                    name: name,
                    current_month: target_amount[0],
                    target_amount: target_amount[1],
                    archived: archived[1],
                    path: path[1],
                    message: status,
                    difference: difference,
                    joint: isJoint,
                    category_budgets: items.category_budgets,
                    tag_budget: tag_budget,
                };
                budgetPageData.push(obj);
            }
        });

        // let budgetSortedData;
        const sortedItem = [];
        const items = _.groupBy(budgetPageData, b => b.current_month);
        const item = _.map(items, i => _.orderBy(i, ['target_amount'], ['desc']));
        _.map(item, i => _.map(i, j => sortedItem.push(j)));
        return sortedItem;
    },

    createBudgetPageData() {
        const spendPageData = this.spendMonthPageData().spendPageSortedData;
        const budgetListData = this.getBudgetConnectionData();
        const spendtListData = this.getSpendListConnectionData();
        const tagListData = this.getTagListConnectionData();
        const potValue = this.getmonthlyContributionPots();

        const allSpendsListData = [];
        _.map(spendtListData.other_accounts, item => allSpendsListData.push(item));
        _.map(spendtListData.credit_cards, item => allSpendsListData.push(item));
        _.map(budgetListData, item => allSpendsListData.push(item));
        _.map(tagListData, item => allSpendsListData.push(item));

        const allListUnionData = _.unionBy(allSpendsListData, 'key');
        const createBudgetData = [];
        if (potValue > 0) {
            const obj = {
                key: 'spend_pot_key',
                name: 'Pots',

                target_amount: potValue,
                archived: false,

                last_month: 0,
                joint: false,
                earnings: this.getBudgetPreferencesConnectionData(),
                tag_budget: false,
                category_budgets: false,
            };
            createBudgetData.push(obj);
        }
        _.map(allListUnionData, items => {
            let target_amount = 0;
            let isArchived = false;
            let isJoint = false;
            let lastMonthValue = 0;
            _.map(spendPageData, item => {
                if (items.key === item.key) {
                    if (item.last_month_flag) {
                        lastMonthValue = item.last_month;
                    }
                    isJoint = item.joint;
                }
            });
            _.map(budgetListData, item => {
                if (items.key === item.key) {
                    target_amount = item.target_amount;
                    isArchived = item.archived;
                }
            });


            if (items.name !== 'Untagged' && !isArchived && !isJoint) {
                const obj = {
                    key: items.key,
                    name: items.name,

                    target_amount: target_amount,
                    archived: isArchived,

                    last_month: lastMonthValue,
                    joint: isJoint,
                    tag_budget: items.tag_budget,
                    category_budgets: items.category_budgets,
                };
                createBudgetData.push(obj);
            }
        });


        const createBudgetSortedData = [];
        const items = _.groupBy(createBudgetData, b => b.last_month);
        const item = _.map(items, i => _.orderBy(i, ['name'], ['asc']));
        _.map(item, i => _.map(i, j => createBudgetSortedData.push(j)));

        return createBudgetSortedData;
    },

    updatedCreateBudgetData() {
        return _createBudgetSortedData || this.createBudgetPageData();
    },

    updatedAccountIds() {
        return _updatedAccountIds;
    },
    isCreateBudgetPage() {
        return _isCreateBudgetPage || false;
    },
    getTransactionDetails() {
        const transactionListData = _transactionsData;
        const accountList = _accountList;
        const transactionData = {
            'tableData': [],
            'totalData': transactionListData.hits.total,
        };

        _.map(transactionListData.hits.hits, items => {
            const accNumber = items._source.this_account.number;
            const acc = [];
            let accname;

            _.map(accountList.accounts, (account, i) => {
                const accountNumebr = _.split(account.number, '-');
                if (accNumber === accountNumebr[1]) {
                    acc.push((i % 10) + 1);
                    accname = account.product.name;
                }
            });

            const _accountIndex = _.head(acc);

            const object = {
                date: null,
                description: null,
                type: null,
                tag: null,
                amount: null,
                account: null,
                inProgress: false,
                accIndex: _accountIndex,
            };

            object.date = items._source.details.when;
            object.description = items._source.details.narrative.small;

            object.account = accname;

            if (items._source.metadata.where.city) {
                object.description = `${items._source.details.narrative.small} ${items._source.metadata.where.city}`;
            }

            object.type = items._source.details.type;

            if (items._source.metadata.categories) {
                object.tag = items._source.metadata.categories[0].value;
            }

            if (items._source.metadata.tags) {
                object.tag = items._source.metadata.tags[0].value;
            }

            object.amount = items._source.details.amount.value;

            if (!items._source.details.posted) {
                object.inProgress = true;
            }

            transactionData.tableData.push(object);
        });

        return transactionData;
    },
    transactionsTagName () {
        return _transactionsTagName;
    },
    isError () {
        if (_isError) {
            return true;
        } else {
            return false;
        }
    },
    isLoadPage () {
        if (_isAccountSuccesss && _isSpendSuccess && _isTagSuccess || _isCreateBudgetPage || _isEarningPage || _isTransactionPage) {
            return true;
        } else {
            return false;
        }
    },
    isAccountModal () {
        return _isAccountModal;
    },
    isBudgetSuccess () {
        return _isBudgetSuccess;
    },
    isEarningPage () {
        return _isEarningPage;
    },
    isTransactionPage () {
        return _isTransactionPage;
    },
    spendingPageToLoad() {
        return _spendingPageToLoad || 1;
    },
    transactionPageSize () {
        return _transactionPageSize;
    },
    hasBudgetPreferences () {
        return _hasBudgetPreferences;
    },
    hasBudgetPreferencesError () {
        return _hasBudgetPreferencesError;
    },
    isTransitionPageLoad () {
        return _isTransitionPageLoad;
    },
    isNetworkError () {
        return _isNetworkError;
    },
    isInterNalServerError () {
        return _isInterNalServerError;
    },
});

SpendingsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	switch (action.actionType) {

        case SpendingsConstants.REQUEST_ALL_ACCOUNTS:
            _isInterNalServerError = false;
            _isNetworkError = false;
            _spendingPageToLoad = null;
            _isCreateBudgetPage = false;
            _isEarningPage = false;
            _isAccountSuccesss = false;
            _isTransactionPage = false;
            _collectAccountID = [];
			SpendingsUtils.getAccountsList();
			break;

        case SpendingsConstants.REQUEST_ALL_ACCOUNTS_SUCCESS:
            _isInterNalServerError = false;
            _isNetworkError = false;
            _isAccountSuccesss = false;
            _accountList = action.data;
            _.map(_accountList.accounts, account => {
                if (account.actions_available['/account/pots']) {
                    _collectAccountID.push(account.id);
                }
            });
            if (_.isEmpty(_updatedAccountIds)) {
                _updatedAccountIds = [];
                breakItDownPacket.params.account_list = [];
                _.map(_accountList.accounts, account => {
                    if (account.actions_available['/account/transactions/read']) {
                        breakItDownPacket.params.account_list.push(account.id);
                    }
                    if (account.actions_available['/account/transactions/read']) {
                        _updatedAccountIds.push(account.id);
                    }
                });
            }
            SpendingsUtils.getSpendListConnectionData(breakItDownPacket);
			break;
        case AppConstants.NAVIGATE_TO_WEB_TASK:
            if (action.data.taskId !== 'WEB-OPEN-SPENDINGS') {
                _updatedAccountIds = [];
            }
            break;
        case SpendingsConstants.REQUEST_ALL_ACCOUNTS_ERROR:
            if (!action.data) {
                _isInterNalServerError = false;
                _isNetworkError = true;
            } else if (action.data.error.code === '500') {
                _isNetworkError = false;
                _isInterNalServerError = true;
            } else {
                _isInterNalServerError = false;
                _isNetworkError = false;
                _isAccountSuccesss = false;
                _isError = true;
            }
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_ALL_SELECTED_ACCOUNTS:
            _isNetworkError = false;
            _isAccountModal = true;
            _updatedAccountIds = breakItDownPacket.params.account_list;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_CLOSE_ACCOUNT_MODAL:
            _isNetworkError = false;
            _isAccountModal = false;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION:
            _isNetworkError = false;
            _isSpendSuccess = false;
            _isAccountModal = false;
            _updatedAccountIds = action.data;
            breakItDownPacket.params.account_list = [];
            _.map(_updatedAccountIds, ids => {
                breakItDownPacket.params.account_list.push(ids);
			});
            SpendingsUtils.getSpendListConnectionData(breakItDownPacket);
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS:
            _isNetworkError = false;
            _isAccountSuccesss = true;
            _isSpendSuccess = true;
            _isAccountModal = false;
            _getSpendListConnectionData = action.data;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_ERROR:
            _isAccountSuccesss = false;
            _isSpendSuccess = false;
            _isError = true;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_TAG_LIST_CONNECTION:
            _isNetworkError = false;
             _isTagSuccess = false;
            SpendingsUtils.getTagListConnectionData();
            break;

        case SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_SUCCESS:
            _isNetworkError = false;
            _isTagSuccess = true;
            _getTagListConnectionData = action.data;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_ERROR:
            if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
                _isTagSuccess = false;
                _isError = true;
            }
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.REQUEST_SPENDING_PAGE_ON_TOGGLE:
            _isNetworkError = false;
            _spendingPageToLoad = action.data;
            if (_spendingPageToLoad === 3) {
                _isBudgetSuccess = true;
                _isEarningPage = true;
                _isCreateBudgetPage = false;
            }
            if (_isAccountSuccesss && _isSpendSuccess && _isTagSuccess) {
                SpendingsStore.emitChange();
            }
            break;
        case SpendingsConstants.REQUEST_SPENDING_PAGE_ON_BACK:
            _isNetworkError = false;
            if (action.data === 'from-createbudget') {
                _isCreateBudgetPage = false;
                _spendingPageToLoad = 1;
                _monthlyContributionPots = 0;
            }
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.REQUEST_BUDGET_CONNECTION:
            _isNetworkError = false;
            _isBudgetSuccess = false;
            SpendingsUtils.getBudgetConnectionData();
            break;

        case SpendingsConstants.REQUEST_BUDGET_CONNECTION_SUCCESS:
            _isNetworkError = false;
            _isBudgetSuccess = true;
            _getBudgetConnectionData = action.data;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_BUDGET_CONNECTION_ERROR:
            _isNetworkError = false;
            _isBudgetSuccess = false;
            _getBudgetConnectionData = {};
            _spendingPageToLoad = 2;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.UPDATE_BUDGET_CONNECTION:
            _isNetworkError = false;
            SpendingsUtils.updateBudgetConnectionData(action.data);
            break;
        case SpendingsConstants.UPDATE_BUDGET_CONNECTION_SUCCESS:
            _isNetworkError = false;
            SpendingsUtils.getBudgetConnectionData();
            break;

        case SpendingsConstants.UPDATE_BUDGET_CONNECTION_ERROR:
            if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
            }
            SpendingsUtils.getBudgetConnectionData();
            break;

        case SpendingsConstants.REQUEST_EARNING_PAGE:
            _isNetworkError = false;
            _isEarningPage = true;
            _isCreateBudgetPage = false;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION:
            _isNetworkError = false;
            earningDefaultObj.period.net_income.value = 0;
            _hasBudgetPreferencesError = false;
            SpendingsUtils.getBudgetPreferencesConnectionData();
            break;

        case SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_SUCCESS:
            _isNetworkError = false;
            _hasBudgetPreferences = false;
            _hasBudgetPreferencesError = false;
            _getBudgetPreferencesConnectionData = action.data;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_ERROR:
            _isNetworkError = false;
            _hasBudgetPreferences = true;
            _hasBudgetPreferencesError = true;
            earningDefaultObj.period.net_income.value = null;
            _getBudgetPreferencesConnectionData = earningDefaultObj;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION:
            _isNetworkError = false;
            _hasBudgetPreferences = false;
            _getBudgetPreferencesConnectionData = action.data;
            SpendingsUtils.updateBudgetPreferencesConnectionData(_getBudgetPreferencesConnectionData);
            break;

        case SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_SUCCESS:
            _isNetworkError = false;
            _getBudgetPreferencesConnectionData = action.data;
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_ERROR:
            if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
            }
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_SPENDING_PAGE:
            _isNetworkError = false;
            SpendingsUtils.getBudgetPreferencesConnectionData();
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_EDIT_BUDGET_PAGE:
            _isNetworkError = false;
            _isAccountSuccesss = true;
            _isTagSuccess = true;
            _isSpendSuccess = true;
            _isCreateBudgetPage = true;
            _isEarningPage = false;
            SpendingsStore.emitChange();
            break;

        case SpendingsConstants.REQUEST_TRANSACTIONS:
            _isNetworkError = false;
            tagListPacket.params.filter_value = [];
            _transactionsTagName = action.data.name;
            tagListPacket.params.filter_value.push(action.data.filter_value);
            tagListPacket.params.filter_field = action.data.filter_field;
            tagListPacket.params.start_date = action.data.start_date;
            tagListPacket.params.order = action.data.order;
            tagListPacket.params.size = action.data.size;
            tagListPacket.params.sort_field = action.data.sort_field;
            tagListPacket.params.account_list = _updatedAccountIds;
            _isAccountSuccesss = false;
            _isTagSuccess = false;
            _isSpendSuccess = false;
            _isCreateBudgetPage = false;
            _isTransactionPage = false;
            SpendingsUtils.transactionData(tagListPacket);
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.REQUEST_NEXT_TRANSACTIONS:
            _isNetworkError = false;
            tagListPacket.params.size = action.data;
            _transactionPageSize = action.data;
             _isTransitionPageLoad = true;
            SpendingsUtils.transactionData(tagListPacket);
            break;
        case SpendingsConstants.REQUEST_TRANSACTIONS_ON_SORT:
            _isNetworkError = false;
            tagListPacket.params.order = action.data.order;
            tagListPacket.params.sort_field = action.data.sort_field;
            tagListPacket.params.size = 200;
            _isTransitionPageLoad = true;
            SpendingsUtils.transactionData(tagListPacket);
            break;
        case SpendingsConstants.REQUEST_TRANSACTIONS_SUCCESS:
            _isNetworkError = false;
            _isAccountSuccesss = true;
            _isTagSuccess = true;
            _isSpendSuccess = true;
            _isCreateBudgetPage = false;
            _isTransactionPage = true;
            _isTransitionPageLoad = false;
            _transactionsData = action.data;
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.REQUEST_TRANSACTIONS_ERROR:
            if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
            }
            SpendingsStore.emitChange();
            break;
        case SpendingsConstants.REQUEST_POT_DATA_SPENDINGS:
            _isNetworkError = false;
            _isAccountSuccesss = false;
            _isTagSuccess = false;
            _isSpendSuccess = false;
            _isCreateBudgetPage = false;
            _isEarningPage = false;
            _isTransactionPage = false;
            _potDataSpendings = [];
            accountCounter = 0;
            _createBudgetSortedData = null;
            _.map(_collectAccountID, collectAccID => {
                SpendingsUtils.getPotsDataSpendings(collectAccID);
            });
            break;
        case SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_SUCCESS:
            _isNetworkError = false;
            accountCounter++;
            _isAccountSuccesss = true;
            _isTagSuccess = true;
            _isSpendSuccess = true;
            _potDataSpendings.push(action.data.pots);
            _isEarningPage = false;
            _isCreateBudgetPage = true;
            _isTransactionPage = true;
            if (_spendingPageToLoad === 3) {
                _isCreateBudgetPage = false;
                _isEarningPage = true;
            }
            if (_collectAccountID.length === accountCounter) {
                SpendingsStore.emitChange();
            }
			break;

        case SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_ERROR:
            _isAccountSuccesss = true;
            _isTagSuccess = true;
            _isSpendSuccess = true;
             _isCreateBudgetPage = true;
            _isEarningPage = false;
            if (_spendingPageToLoad === 3) {
                _isCreateBudgetPage = false;
                _isEarningPage = true;
            }
            _potDataSpendings = [];
            SpendingsStore.emitChange();
			break;
        case SpendingsConstants.UPDATED_CREATE_BUDGET_DATA:
            _isNetworkError = false;
            _createBudgetSortedData = action.data;
            SpendingsStore.emitChange();
            break;
        default:
	}
});
module.exports = SpendingsStore;
