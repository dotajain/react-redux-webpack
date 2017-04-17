/**
 * @module CreateSavingsPot
 */
const React = require('react');
const ReactDOM = require('react-dom');
const { PropTypes } = React;
const _ = require('lodash');
const moment = require('moment');
const config = require('../../config');

const SavingPotDatePicker = require('./SavingPotDatePicker');
const BasicModal = require('../common/modals/ModalB');

const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const AccountsStore = require('../../stores/AccountsStore');
const SavingsPotsStore = require('../../stores/SavingsPotsStore');
const HeaderComponent = require('../common/HeaderComponent');

const PotMessages = require('./PotMessages');

const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';
const extractAlphaNum = str => extract(str, '^[A-Za-z0-9 /-]+');

const CreateSavingsPot = React.createClass({
  propTypes: {
    potDetailsData: PropTypes.object,
    pots: PropTypes.array,
    content: PropTypes.object,
    getPotPageHandleClick: PropTypes.func,
    getSelectedAccountID: PropTypes.string,
    accountClass: PropTypes.string,
    editError: PropTypes.object,
  },
  getInitialState() {
    return {
      pots : {
        name : null,
        goal : {
          amount : {
            value : '£',
            currency : this.props.content.savingPotCurrencyType,
          },
          when : moment().format('YYYY-MM-DD'),
        },
        schedule : {
          recurrence : {
            frequency : {
              monthly : {
                interval : 1,
                day_of_month : 1,
              },
            },
            amount : {
              value :'£',
              currency : this.props.content.savingPotCurrencyType,
            },
          },
        },
      },
      potID: null,
      potBalanceValue: '£',
      headerMessage: this.props.content.savingPotCreateHeading,
      isDisabled: true,
      isCurrentBalanceDisabled: false,
      isDisabledDecrease: true,
      isDisabledSubmit: true,
      isNameDisabled: false,
      accountNumber: this._getAccountNumber(),
      format: 'YYYY-MM-DD',
      inputFormat: 'MMMM YYYY',
      mode: 'years',
      defaultText: this.props.content.savingPotDateDefaultText,
      isCreatePot: 'fade',
      startMinDate: moment(),
      isDuplicateModal: false,
      errorModal: false,
      isChanged: false,
      isGoalShaked: '',
      isBalanceShaked: '',
      isMonthlyContributionShaked: '',
      potGoalForEditPot: '£',
      potMonthlyContributionForEditPot: '£',
      isLoader: false,
    };
  },
  componentWillMount() {
    if (this.props.potDetailsData) {
      this.setState({
        pots : {
          name : this.props.potDetailsData.name,
          goal : {
            amount : {
              value : `£${this.props.potDetailsData.goal.amount.value}`,
              currency : this.props.potDetailsData.goal.amount.currency,
            },
            when : this.props.potDetailsData.goal.when,
          },
          schedule : {
            recurrence : {
              frequency : {
                monthly : {
                  interval : this.props.potDetailsData.schedule.recurrence.frequency.monthly.interval,
                  day_of_month : this.props.potDetailsData.schedule.recurrence.frequency.monthly.day_of_month,
                },
              },
              amount : {
                value : `£${this.props.potDetailsData.schedule.recurrence.amount.value}`,
                currency : this.props.potDetailsData.schedule.recurrence.amount.currency,
              },
            },
          },
        },
        potID: this.props.potDetailsData.id,
        potBalanceValue: `£${this.props.potDetailsData.balance.value}`,
        defaultText: moment(this.props.potDetailsData.goal.when).format('MMMM YYYY'),
        headerMessage: this.props.content.savingPotEditHeading,
        isDisabled: false,
        isDisabledDecrease: false,
        isDisabledSubmit: true,
        isNameDisabled: true,
        isCurrentBalanceDisabled: true,
        isChanged: true,
        potGoalForEditPot:this.props.potDetailsData.goal.amount.value,
        potMonthlyContributionForEditPot:this.props.potDetailsData.schedule.recurrence.amount.value,
        isLoader: false,
      });
    }

    if (!_.isEmpty(SavingsPotsStore.createPotData())) {
      const potsData = SavingsPotsStore.createPotData();
      this.setState({
        pots: potsData,
        isCreatePot: 'fade in',
        isDisabledSubmit: false,
        defaultText: moment(potsData.goal.when).format('MMMM YYYY'),
        potBalanceValue: `£${sessionStorage.getItem('potbalance')}`,
        isLoader: false,
        isChanged: true,
      });
    }

    if (!_.isEmpty(this.props.editError)) {
      this.setState({ errorModal: true, isLoader: false });
    }
  },
  _handlePotNameChange(e) {
    const pot = _.extend({}, this.state.pots);
    pot.name = extractAlphaNum(e.target.value);
    this.setState({ pots: pot, isLoader: false });
  },
  checkNumber(e) {
    const etarget = e.replace(/[^\d\.]*/g, '');
    const len = etarget.length;
    const index = etarget.indexOf('.');
    const dots = etarget.split('.').length;
    const beforeDecimalLen = etarget.split('.')[0].length;
    let isValid = true;
    if (beforeDecimalLen > 7 || Number(etarget) > 1000000 || etarget === '1000000.') {
        isValid = false;
    }
    if (dots > 2) {
        isValid = false;
    }
    if (index >= 0) {
        const CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
            isValid = false;
        }
    }
    return isValid;
  },
  _handlePotGoalChange(e) {
    const pot = _.extend({}, this.state.pots);
    const isValid = this.checkNumber(e.target.value);
    const buttonFlag = pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, '');
    const potBalance = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));

    const eTargetValue = e.target.value;
    let etarget;
    this.setState({ isGoalShaked: '', isLoader: false });
    if (isValid) {
      etarget = e.target.value.replace(/[^\d\.]*/g, '');
      if (this.props.potDetailsData) {
        if (Number(etarget) < Number(potBalance)) {
         this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
        } else if ((Number(etarget) !== Number(this.state.potGoalForEditPot)) || (Number(buttonFlag) !== Number(this.state.potMonthlyContributionForEditPot))) {
         this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
        } else {
        this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
        }
      }
      if (etarget === '') {
        pot.goal.amount.value = '£';
      } else if (etarget === '.' || etarget === '0.') {
        pot.goal.amount.value = '£0.';
      } else if (etarget === '0.0') {
        pot.goal.amount.value = '£0.0';
      } else if (etarget === '0.00') {
        pot.goal.amount.value = '£0.00';
      } else if (Number(etarget) === 0) {
        pot.goal.amount.value = '£0';
      } else {
        pot.goal.amount.value = `£${etarget}`;
      }
      this.setState({ pots: pot, isLoader: false }, () => {
        if (eTargetValue !== pot.goal.amount.value) {
          this.setState({ isGoalShaked: 'animated shake' });
        } else {
          this.setState({ isGoalShaked: '' });
        }
      let potValue;
      if (_.isNumber(pot.goal.amount.value)) {
        potValue = pot.goal.amount.value;
      } else {
        potValue = Number(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
      }
      let potScheduleValue;
      if (_.isNumber(pot.schedule.recurrence.amount.value)) {
        potScheduleValue = pot.schedule.recurrence.amount.value;
      } else {
        potScheduleValue = Number(pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      }
      if (potValue === 0 || potScheduleValue === 0) {
        this.setState({ isDisabledSubmit: true, isCreatePot: 'fade' });
      } else {
        if (!this.props.potDetailsData) {
          this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
        }
      }
      });
    } else {
      this.setState({ isGoalShaked: 'animated shake', isLoader: false });
     if (this.props.potDetailsData) {
       etarget = e.target.value.replace(/[^\d\.]*/g, '');
       if ((Number(etarget) !== Number(this.state.potGoalForEditPot)) || (Number(buttonFlag) !== Number(this.state.potMonthlyContributionForEditPot))) {
         this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
       } else {
         this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
       }
     } else {
       this.setState({ isDisabled: false });
     }
    }
  },
  _onKeyDown () {
    this.setState({ isGoalShaked: '', isLoader: false });
  },
  _onBalanceKeyDown () {
    this.setState({ isBalanceShaked: '', isLoader: false });
  },
  _onMonthlyContributionKeyDown () {
    this.setState({ isMonthlyContributionShaked: '', isLoader: false });
  },
  _getExpectedMonth() {
    let goalValue = parseFloat(this.state.pots.goal.amount.value.replace(/[^\d\.]*/g, ''));
    if (_.isNaN(goalValue)) {
        goalValue = 0;
      }
    let balanceValue = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));

    if (_.isNaN(balanceValue)) {
      balanceValue = 1;
    }
    let monthlyCotribution = parseFloat(this.state.pots.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
    if (_.isNaN(monthlyCotribution)) {
      monthlyCotribution = 0;
    }
    let totalMonths;
    if (goalValue === 0 || monthlyCotribution === 0) {
      totalMonths = 0;
    } else {
      const totalMonth1 = Math.floor(((goalValue - balanceValue) / monthlyCotribution));
      const valuee = (goalValue - balanceValue) / monthlyCotribution;
      if (valuee > totalMonth1) {
        totalMonths = Math.floor(((goalValue - balanceValue) / monthlyCotribution));
      } else {
        totalMonths = Math.floor(((goalValue - balanceValue) / monthlyCotribution)) - 1;
      }
    }

    let expectedMonths;
    if (goalValue === 0 || totalMonths === 0) {
      expectedMonths = moment().date(1).format('YYYY-MM-DD');
    } else {
      expectedMonths = moment().add(totalMonths, 'months').date(1).format('YYYY-MM-DD');
    }
    return expectedMonths;
  },
  _handlePotGoalBlur() {
    const pot = _.extend({}, this.state.pots);
    if (this.state.pots.goal.when === moment().format('YYYY-MM-DD') && this.state.isChanged) {
        pot.goal.when = moment(this._getExpectedMonth()).format('YYYY-MM-DD');
        this.setState({ pots: pot, isLoader: false });
      }
  },
  _handlePotBalanceChange(e) {
    const isValid = this.checkNumberForBalance(e.target.value);
    const eTargetValue = e.target.value;
    let etarget;
    this.setState({ isBalanceShaked: '', isLoader: false });
    if (isValid) {
      etarget = e.target.value.replace(/[^\d\.]*/g, '');
      if (etarget === '') {
        this.setState({ potBalanceValue: '£' });
      } else if (etarget === '.' || etarget === '0.') {
        this.setState({ potBalanceValue: '£0.' }, () => {
          if (eTargetValue !== this.state.potBalanceValue) {
            this.setState({ isBalanceShaked: 'animated shake' });
          } else {
            this.setState({ isBalanceShaked: '' });
          }
        });
      } else if (etarget === '0.0') {
        this.setState({ potBalanceValue: '£0.0' }, () => {
          if (eTargetValue !== this.state.potBalanceValue) {
            this.setState({ isBalanceShaked: 'animated shake' });
          } else {
            this.setState({ isBalanceShaked: '' });
          }
        });
      } else if (etarget === '0.00') {
        this.setState({ potBalanceValue: '£0.00' }, () => {
          if (eTargetValue !== this.state.potBalanceValue) {
            this.setState({ isBalanceShaked: 'animated shake' });
          } else {
            this.setState({ isBalanceShaked: '' });
          }
        });
      } else if (Number(etarget) === 0) {
        this.setState({ potBalanceValue: '£0' }, () => {
          if (eTargetValue !== this.state.potBalanceValue) {
            this.setState({ isBalanceShaked: 'animated shake' });
          } else {
            this.setState({ isBalanceShaked: '' });
          }
        });
      } else {
        this.setState({ potBalanceValue: `£${etarget}` }, () => {
          if (eTargetValue !== this.state.potBalanceValue) {
            this.setState({ isBalanceShaked: 'animated shake' });
          } else {
            this.setState({ isBalanceShaked: '' });
          }
        });
      }
    } else {
      this.setState({ isBalanceShaked: 'animated shake', isLoader: false });
    }
  },
  checkNumberForBalance(e) {
    const etarget = e.replace(/[^\d\.]*/g, '');
    const len = etarget.length;
    const index = etarget.indexOf('.');
    const dots = etarget.split('.').length;
    const beforeDecimalLen = etarget.split('.')[0].length;
    let isValid = true;
    let goalAmountValue;
    if (_.isNumber(this.state.pots.goal.amount.value)) {
      goalAmountValue = this.state.pots.goal.amount.value;
    } else {
      goalAmountValue = this.state.pots.goal.amount.value.replace(/[^\d\.]*/g, '');
    }
    let goalValueString = goalAmountValue;
    if (goalValueString === '') {
      goalValueString = 0;
    }
    const goalValue = parseFloat(goalValueString);
    if (goalAmountValue !== '') {
      if (Number(etarget) > goalValue) {
          isValid = false;
        }
      }
    if (beforeDecimalLen > 7 || Number(etarget) > 1000000 || etarget === '1000000.') {
        isValid = false;
    }
    if (dots > 2) {
        isValid = false;
    }
    if (index >= 0) {
        const CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
            isValid = false;
        }
    }
    return isValid;
  },
  _handlePotScheduleValueChange(e) {
    const pot = _.extend({}, this.state.pots);
    const isValid = this.checkNumber(e.target.value);
    const buttonFlag = pot.goal.amount.value.replace(/[^\d\.]*/g, '');
    const eTargetValue = e.target.value;
    const potBalance = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));
    let etarget;
    this.setState({ isMonthlyContributionShaked: '', isLoader: false });
    if (isValid) {
      etarget = e.target.value.replace(/[^\d\.]*/g, '');
      if (this.props.potDetailsData) {
        if (Number(etarget) < Number(potBalance)) {
         this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
        } else if ((Number(buttonFlag) !== Number(this.state.potGoalForEditPot)) || (Number(etarget) !== Number(this.state.potMonthlyContributionForEditPot))) {
         this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
       } else {
        this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
       }
      }
      if (etarget === '') {
        pot.schedule.recurrence.amount.value = '£';
      } else if (etarget === '0.' || etarget === '.') {
        pot.schedule.recurrence.amount.value = '£0.';
      } else if (etarget === '0.0') {
        pot.schedule.recurrence.amount.value = '£0.0';
      } else if (etarget === '0.00') {
        pot.schedule.recurrence.amount.value = '£0.00';
      } else if (Number(etarget) === 0) {
        pot.schedule.recurrence.amount.value = '£0';
      } else {
        pot.schedule.recurrence.amount.value = `£${etarget}`;
      }
      this.setState({ pots: pot }, () => {
        if (eTargetValue !== pot.schedule.recurrence.amount.value) {
          this.setState({ isMonthlyContributionShaked: 'animated shake' });
        } else {
          this.setState({ isMonthlyContributionShaked: '' });
        }
      const potScheduleValue = Number(pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      let potValue;
      if (_.isNumber(pot.goal.amount.value)) {
        potValue = pot.goal.amount.value;
      } else {
        potValue = Number(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
      }
      if (potScheduleValue === 0 || potValue === 0) {
        this.setState({ isDisabledSubmit: true, isCreatePot: 'fade' });
      } else {
        if (!this.props.potDetailsData) {
          this.setState({ isDisabledSubmit: false, isCreatePot: 'fade in' });
        }
      }
      });
      if (Number(etarget) > 10) {
        this.setState({ isDisabledDecrease: false });
      }
    } else {
      this.setState({ isMonthlyContributionShaked: 'animated shake', isLoader: false });
      if (this.props.potDetailsData) {
        etarget = e.target.value.replace(/[^\d\.]*/g, '');
        if ((Number(buttonFlag) !== Number(this.state.potGoalForEditPot)) || (Number(etarget) !== Number(this.state.potMonthlyContributionForEditPot))) {
         this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
       } else {
         this.setState({ isCreatePot: 'fade', isDisabledSubmit: true });
       }
      } else {
        this.setState({ isDisabled: false });
      }
    }
     if (Number(etarget) > 10) {
       this.setState({ isDisabledDecrease: false });
     }
  },
  _handlePotScheduleValueBlur() {
    const pot = _.extend({}, this.state.pots);
    if (this.state.pots.goal.when === moment().format('YYYY-MM-DD')) {
        pot.goal.when = moment(this._getExpectedMonth()).format('YYYY-MM-DD');
        this.setState({ pots: pot, isChanged: true, isLoader: false });
      }
  },
  _increment() {
    const pot = _.extend({}, this.state.pots);
    let potScheduleValue = this.state.pots.schedule.recurrence.amount.value;
    if (!_.isNumber(potScheduleValue)) {
      potScheduleValue = parseFloat(potScheduleValue.replace(/[^\d\.]*/g, ''));
    }
    if (_.isNaN(potScheduleValue)) {
      potScheduleValue = 0;
    }
    const roundOffValue = potScheduleValue % 10;
    if (roundOffValue !== 0) {
      const diff = 10 - roundOffValue;
      pot.schedule.recurrence.amount.value = `£${potScheduleValue + diff}`;
    } else {
       if (potScheduleValue >= 0 && potScheduleValue <= 500) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue + 10}`;
      } else if (potScheduleValue > 500 && potScheduleValue <= 990) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue + 50}`;
      } else if (potScheduleValue >= 1000 && potScheduleValue <= 10000) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue + 100}`;
      } else if (potScheduleValue >= 999999) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue + 0}`;
      } else {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue + 1000}`;
      }
    }
    this.setState({ pots: pot, isDisabledDecrease: false, isChanged: true, isLoader: false }, () => {
      this._handlePotScheduleValueBlur();
      const potScheduleValue = Number(pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      const potValue = Number(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
      if (potScheduleValue === 0 || potValue === 0) {
        this.setState({ isDisabledSubmit: true, isCreatePot: 'fade' });
      } else {
        this.setState({ isDisabledSubmit: false, isCreatePot: 'fade in' });
      }
    });
  },

  _decrement() {
    const pot = _.extend({}, this.state.pots);
    let potScheduleValue = this.state.pots.schedule.recurrence.amount.value;
    if (!_.isNumber(potScheduleValue)) {
      potScheduleValue = parseFloat(potScheduleValue.replace(/[^\d\.]*/g, ''));
    }
    if (_.isNaN(potScheduleValue)) {
      potScheduleValue = 0;
    }
    const roundOffValue = potScheduleValue % 10;
    if (roundOffValue !== 0) {
      pot.schedule.recurrence.amount.value = `£${potScheduleValue - roundOffValue}`;
    } else {
      if (potScheduleValue <= 0) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue}`;
      } else if (potScheduleValue > 0 && potScheduleValue <= 500) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue - 10}`;
      } else if (potScheduleValue > 500 && potScheduleValue <= 990) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue - 50}`;
      } else if (potScheduleValue >= 1000 && potScheduleValue <= 10000) {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue - 100}`;
      } else {
        pot.schedule.recurrence.amount.value = `£${potScheduleValue - 1000}`;
      }
    }
    this.setState({ pots: pot, isChanged: true, isLoader: false }, () => {
      this._handlePotScheduleValueBlur();
      const potScheduleValue = Number(pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      const potValue = Number(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
      if (potScheduleValue === 0 || potValue === 0) {
        this.setState({ isDisabledSubmit: true, isCreatePot: 'fade' });
      } else {
        this.setState({ isDisabledSubmit: false, isCreatePot: 'fade in' });
      }
    });
    if (potScheduleValue <= 10) {
      this.setState({ isDisabledDecrease: true });
    }
  },
  _getExpectedScheduleValue() {
    const selectedMonth = moment(moment(this.state.pots.goal.when).format('YYYY-MM'));
    const currentMonth = moment(moment().format('YYYY-MM'));
    const monthDiff = selectedMonth.diff(currentMonth, 'months') + 1;
    let goalValue = parseFloat(this.state.pots.goal.amount.value.replace(/[^\d\.]*/g, ''));
    if (_.isNaN(goalValue)) {
      goalValue = 0;
    }
    let balanceValue = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));
    if (_.isNaN(balanceValue)) {
      balanceValue = 0;
    }
    let monthlyCotribution;
     if (goalValue === 0) {
      monthlyCotribution = 0;
    } else {
      let calcContribution = ((goalValue - balanceValue) / (monthDiff));
      if (_.isInteger(calcContribution)) {
        monthlyCotribution = calcContribution.toFixed(0);
      } else {
        calcContribution = (calcContribution * 100);
        calcContribution = (Math.ceil(calcContribution)) / 100;
        monthlyCotribution = calcContribution.toFixed(2);
      }
    }
    return monthlyCotribution;
  },
  _handleDateChange(newDate) {
    const pot = _.extend({}, this.state.pots);
    pot.goal.when = newDate;
    const potGoalValue = Number(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
    this.setState({ pots: pot, isLoader: false }, () => {
      let potScheduleRefAmount;
      if (_.isNumber(this.state.pots.schedule.recurrence.amount.value)) {
        potScheduleRefAmount = parseFloat(this.state.pots.schedule.recurrence.amount.value);
      } else {
        potScheduleRefAmount = parseFloat(this.state.pots.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      }
      if (potScheduleRefAmount === 0 || _.isNaN(potScheduleRefAmount)) {
        const putaway = _.extend({}, this.state.pots);
        const putAwayValue = this._getExpectedScheduleValue();
        if (putAwayValue > 0) {
          putaway.schedule.recurrence.amount.value = `£${this._getExpectedScheduleValue()}`;
          if (potGoalValue > 0) {
            this.setState({ isCreatePot: 'fade in', isDisabledSubmit: false });
          }
          this.setState({ pots: putaway, isDisabledDecrease: false, isChanged: true });
        }
      }
    });
    if (this.props.potDetailsData) {
      this.setState({ isDisabledSubmit: false, isCreatePot: 'fade in', isLoader: false });
    }
  },
  _getCurrentPotPage() {
    SavingPotsActionCreator.getPotDetail(this.state.potID);
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_action_saving_goal_edit_cancel_edit_goal,
        event: 'click',
    });
  },

  _onSubmit(e) {
    e.preventDefault();
    const oldPots = this.props.pots;
    const oldPotName = _.map(oldPots, item => _.toUpper(item.name));
    if (_.includes(oldPotName, _.toUpper(this.state.pots.name))) {
      this.setState({ isDuplicateModal: true });
    } else {
      const pot = _.extend({}, this.state.pots);
      if (_.isNumber(this.state.pots.goal.amount.value)) {
        pot.goal.amount.value = parseFloat(this.state.pots.goal.amount.value);
      } else {
        pot.goal.amount.value = parseFloat(this.state.pots.goal.amount.value.replace(/[^\d\.]*/g, ''));
      }
      if (_.isNaN(pot.goal.amount.value)) {
        pot.goal.amount.value = 0;
      }
      if (_.isNumber(this.state.pots.schedule.recurrence.amount.value)) {
        pot.schedule.recurrence.amount.value = parseFloat(this.state.pots.schedule.recurrence.amount.value);
      } else {
        pot.schedule.recurrence.amount.value = parseFloat(this.state.pots.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      }
      if (_.isNaN(pot.schedule.recurrence.amount.value)) {
        pot.schedule.recurrence.amount.value = 0;
      }
      let potBalance;
      if (_.isNumber(this.state.potBalanceValue)) {
        potBalance = parseFloat(this.state.potBalanceValue);
      } else {
        potBalance = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));
      }
      if (_.isNaN(potBalance)) {
        sessionStorage.setItem('potbalance', 0);
      } else {
        sessionStorage.setItem('potbalance', potBalance);
      }
      SavingPotsActionCreator.getPotConfirmation(pot);
      this.setState({ isLoader: true });
    }
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_saving_goal_create,
        event: 'click',
    });
  },
  _onSave(e) {
    e.preventDefault();
    const pot = _.extend({}, this.state.pots);
    if (_.isNumber(this.state.pots.goal.amount.value)) {
      pot.goal.amount.value = parseFloat(this.state.pots.goal.amount.value);
    } else {
      pot.goal.amount.value = parseFloat(this.state.pots.goal.amount.value.replace(/[^\d\.]*/g, ''));
    }
    if (_.isNaN(pot.goal.amount.value)) {
      pot.goal.amount.value = 0;
    }
    if (_.isNumber(this.state.pots.schedule.recurrence.amount.value)) {
      pot.schedule.recurrence.amount.value = parseFloat(this.state.pots.schedule.recurrence.amount.value);
    } else {
      pot.schedule.recurrence.amount.value = parseFloat(this.state.pots.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
    }
    if (_.isNaN(pot.schedule.recurrence.amount.value)) {
      pot.schedule.recurrence.amount.value = 0;
    }
    SavingPotsActionCreator.getEditedPotData(this.state.potID, pot);
    this.setState({ isLoader: true });
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_saving_goal_edit,
        event: 'click',
    });
  },
  _getAccountNumber() {
    const seletedAccountData = AccountsStore.getAccountDetail(this.props.getSelectedAccountID);
    const accountNumber = _.last(_.split(seletedAccountData.number, '-'));
    return accountNumber;
  },
  _closeAlertModal() {
    ReactDOM.findDOMNode(this.refs.potName).focus();
    if (this.state.errorModal) {
      SavingPotsActionCreator.closetErrorModal();
    }
    this.setState({ isDuplicateModal: false, errorModal: false, isChanged: true, isLoader: false });
  },
  // Returns the modal for displaying message for editPayment
  _alertOnDuplicatePotName() {
    if (this.state.isDuplicateModal) {
      return (<BasicModal>
                <div className="modal_content">
                  <p>{this.props.content.savingPotModalText1}</p>
                </div>
                  <div className="modal_footer">
                    <button onClick={this._closeAlertModal}>{this.props.content.ok}</button>
                </div>
              </BasicModal>);
    }
  },
  _alertEditErrorModal() {
    if (this.state.errorModal) {
      return (<BasicModal>
                <div className="modal_content">
                  <h3>{this.props.editError.error.message}</h3>
                  <p>
                    {this.props.content.potSupportMessage1}<br/>
                    {this.props.content.potSupportMessage2}<br/>
                    {this.props.editError.error.quoteId}
                  </p>
                </div>
                  <div className="modal_footer">
                    <button onClick={this._closeAlertModal}>{this.props.content.ok}</button>
                </div>
              </BasicModal>);
    } else {
      return false;
    }
  },

  openFaq() {
    this.setState({ faqFlag: true });
  },
  closeFaq() {
    this.setState({ faqFlag: false });
  },
  _onPaste(e) {
    e.preventDefault();
  },
  render() {
    let content = this.props.content;
    const pot = this.state.pots;
    let goalValue;
    let potScheduleValue;
    let formSubmitButton;
    let headerCancelButton;
    let kitItOffLabel;
    let editClass;
    if (this.props.potDetailsData) {
      kitItOffLabel = content.savingpotcreationcolumn6;
      editClass = 'savingPot__edit';
    } else {
      kitItOffLabel = content.savingpotcreationcolumn2;
    }

    if (_.isString(pot.goal.amount.value)) {
      goalValue = parseFloat(pot.goal.amount.value.replace(/[^\d\.]*/g, ''));
      if (_.isNaN(goalValue)) {
        goalValue = 0;
      }
    } else {
      goalValue = parseFloat(pot.goal.amount.value);
    }

    let potBalance;
    if (_.isString(this.state.potBalanceValue)) {
      potBalance = parseFloat(this.state.potBalanceValue.replace(/[^\d\.]*/g, ''));
      if (_.isNaN(potBalance)) {
        potBalance = 0;
      }
    }
    if (_.isString(pot.schedule.recurrence.amount.value)) {
      potScheduleValue = parseFloat(pot.schedule.recurrence.amount.value.replace(/[^\d\.]*/g, ''));
      if (_.isNaN(potScheduleValue)) {
        potScheduleValue = 0;
      }
    } else {
      potScheduleValue = parseFloat(pot.schedule.recurrence.amount.value);
    }

    if (!this.props.potDetailsData) {
      headerCancelButton = (<button className="page-options" onClick={this.props.getPotPageHandleClick}>
				{content.savingsPotCancelButton}
			</button>);
      if (!this.state.isDisabledSubmit) {
        formSubmitButton = (<div className={`form-footer  ${this.state.isCreatePot}`}><button type="button" className="create-pot-button action-button" onClick={this._onSubmit}> {content.savingPotCreatePotButton} </button></div>);
      }
    } else {
      headerCancelButton = (<button className="page-options" onClick={this._getCurrentPotPage}>
				<span className="icon icon-page-back"></span> {content.savingsPotBackButton}
			</button>);
      if (!this.state.isDisabledSubmit) {
        formSubmitButton = (<div className={`form-footer  ${this.state.isCreatePot}`}><button type="button" className="create-pot-button action-button" onClick={this._onSave}> {content.savingPotConfirmChangeButton} </button></div>);
      }
    }

    let goalAmount = pot.goal.amount.value;
    if (_.isNumber(goalAmount)) {
      goalAmount = `£${goalAmount}`;
    }
    let balanceAmount = this.state.potBalanceValue;
    if (_.isNumber(balanceAmount)) {
      balanceAmount = `£${balanceAmount}`;
    }
    let monthlyAmount = pot.schedule.recurrence.amount.value;
    if (_.isNumber(monthlyAmount)) {
      monthlyAmount = `£${monthlyAmount}`;
    }
    if (!this.state.isLoader) {
      return (
        <div className="main-container from-top">
          {this._alertOnDuplicatePotName()}
          {this._alertEditErrorModal()}
          <div className={`savingPot__create ${this.props.accountClass} ${editClass}`}>

            <div className="savingpot_component__header row no-gutters">
              <div className="col-xs-3 text-left">
                {headerCancelButton}
              </div>
              <div className="col-xs-6 text-center">
                <div className="savingpot_component__header--title">
                  {this.state.headerMessage} {this.state.accountNumber}
                </div>
              </div>
              <div className="col-xs-3 text-right">
              </div>
            </div>
            <form action="" className="form-horizontal">
              <div className="row savingPot__create--component">
                <div className="col-sm-8 create--form">
                  <div className="create--form--box">
                      <div className="form-group potName">
                        <label htmlFor="potName" className="sr-only">{content.savingsPotNameLabel}</label>
                        <input autoComplete="off" type="text" autoFocus id="potName" ref="potName" value={pot.name} disabled={this.state.isNameDisabled} placeholder={content.savingsPotNameLabel} onChange={this._handlePotNameChange} maxLength="17" onPaste={this._onPaste}/>
                      </div>

                      <div className="form-group row no-gutters">
                        <label htmlFor="potGoal" className="col-xs-8 control-label">{content.savingpotcreationcolumn1}</label>
                        <div className="col-xs-4">
                            <input autoComplete="off" type="text" value={goalAmount} className={`form-control ${this.state.isGoalShaked}`} id="potGoal" placeholder="" onChange={this._handlePotGoalChange} onBlur={this._handlePotGoalBlur} onKeyDown={this._onKeyDown} onPaste={this._onPaste}/>
                        </div>
                      </div>

                      <div className="form-group row no-gutters">
                        <label htmlFor="potBalance" className="col-xs-8 control-label">{kitItOffLabel}</label>
                        <div className="col-xs-4 text-right">
                            <input autoComplete="off" type="text" value={balanceAmount} className={`form-control ${this.state.isBalanceShaked}`} id="potBalance" placeholder="" disabled={this.state.isCurrentBalanceDisabled} onChange={this._handlePotBalanceChange} onKeyDown={this._onBalanceKeyDown} onPaste={this._onPaste}/>
                        </div>
                      </div>

                      <div className="form-group row no-gutters">
                        <label htmlFor="potGoalDate" className="col-xs-8 control-label">{content.savingpotcreationcolumn3}</label>
                        <div className="col-xs-4 date-timePicker">
                          <SavingPotDatePicker
                            minDate={this.state.startMinDate}
                            dateTime={pot.goal.when}
                            format={this.state.format}
                            viewMode={this.state.mode}
                            inputFormat={this.state.inputFormat}
                            onChange={this._handleDateChange}
                            defaultText={this.state.defaultText}
                          />
                        </div>
                      </div>

                      <div className="form-group row no-gutters">
                        <label htmlFor="potScheduleValue" className="col-xs-7 control-label">{content.savingpotcreationcolumn4}</label>
                        <div className="col-xs-5">
                          <div className="numberAdjust">
                            <input autoComplete="off" type="text" value={monthlyAmount} className={`form-control ${this.state.isMonthlyContributionShaked}`} id="potScheduleValue" onChange={this._handlePotScheduleValueChange} onBlur={this._handlePotScheduleValueBlur} onKeyDown={this.state._onMonthlyContributionKeyDown} onPaste={this._onPaste}/>
                            <div className="btn-numberAdjust">
                              <button onClick={this._decrement} type="button" disabled={this.state.isDisabledDecrease}>
                                <img src="../images/b/icons/remove.svg" height="15" alt="" />
                              </button>
                              <button onClick={this._increment} type="button">
                                <img src="../images/b/icons/add.svg" height="15" alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="col-xs-4 create--messages">
                  <div className="potMessages">
                    <PotMessages
                        amountvalue={potScheduleValue}
                        goal={goalValue}
                        goalwhen={pot.goal.when}
                        balance={potBalance}
                        content={content}
                        isChanged={this.state.isChanged}
                    />
                  </div>
                </div>
              </div>
                {formSubmitButton}
            </form>
          </div>
        </div>
      );
    } else {
      return (<div>
                  <HeaderComponent selectedTab="savingpots" {...this.props} openFaq={this.openFaq}/>
                  <div className="main-container"><div className="chicken-loading fade in"></div></div>
                </div>);
    }
  },
});

module.exports = CreateSavingsPot;
