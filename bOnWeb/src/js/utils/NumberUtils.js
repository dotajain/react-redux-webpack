/**
 * @class NumberUtils
 */

const config = require('../config');
const _ = require('lodash');
const NumberUtils = {
	/**
	 * Append a currency by replacing a {} in string with the value given (and the currency sign on the front).
   * This function will also use toFixed to format the number.
	 * @param  {string} string   string with {} to be replaced
   * @param  {number} value    the value to be formatted and added to string
	 * @return {string} The resulting string after the replace.
	 */
    appendCurrency(string, value) {
        const regEx = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
        // formatting to display thousands value with comma
        if (value !== undefined) {
            if (value < 0) {
                // to handle negetive value
                return string.replace('{}', `-${config.currencySign}${Math.abs(value).toFixed(config.currencyDecimals).replace(regEx, ',')}`);
            } else {
                return string.replace('{}', config.currencySign + value.toFixed(config.currencyDecimals).replace(regEx, ','));
            }
        }
    },
    appendCurrencyNoDecimal(string, value) {
        const regEx = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
        // formatting to display thousands value with comma
        if (value < 0) {
            // to handle negetive value
            return string.replace('{}', `-${config.currencySign}${Math.abs(value).toFixed(config.currencyDecimals).replace(regEx, ',')}`);
        } else {
            let currencyValue;
            if (_.isInteger(value)) {
                currencyValue = string.replace('{}', config.currencySign + value.toFixed(0).replace(regEx, ','));
            } else {
                currencyValue = string.replace('{}', config.currencySign + value.toFixed(config.currencyDecimals).replace(regEx, ','));
            }
            return currencyValue;
        }
    },
    // Added to format Sort Code in XX-XX-XX
    formatSortCode(sortCode) {
        return sortCode !== null ? `${sortCode.slice(0, 2)}-${sortCode.slice(2, 4)}-${sortCode.slice(-2)}` : null;
    },

    formatCreditCard(creditcard) {
        return creditcard !== null ? `${creditcard.slice(0, 4)} ${creditcard.slice(4, 8)} ${creditcard.slice(8, 12)} ${creditcard.slice(-4)}` : null;
    },

    // Added to format Sort Code in XX-XXXX
    formatAccountSortCode(sortCode) {
        return sortCode !== null ? `${sortCode.slice(0, 2)}-${sortCode.slice(-4)}` : null;
    },

    formatAmount(amount) {
        if (amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return amount;
    },
	/**
	 * convert the amont into comma seperator format
	 * @param integer input: amount value
	 * @param integer n: length of decimal
	 * @param integer x: length of sections
	 */
    decimalFormat(input, x, isShowCurrency = true) {
        const n = config.currencyDecimals;
        const num = parseFloat(input);
        const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';

        return (isShowCurrency === true ? config.currencySign : '') + num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    },
};

module.exports = NumberUtils;
