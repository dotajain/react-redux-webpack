/**
 * @module CreateBudgetProgress
*/

const React = require('react');
const { PropTypes } = React;


const CreateBudgetProgress = React.createClass({
  propTypes: {
    content: PropTypes.object,
    totalBudgetValue: PropTypes.number,
    potValue: PropTypes.number,
    earning: PropTypes.number,
  },

  render() {
    const content = this.props.content;
    const totalBudgetValue = this.props.totalBudgetValue;
    const potValue = this.props.potValue;
    const earning = this.props.earning;

    let percentage;
    let potPercentage;
    let potClass;
    let className;
    let icon;
    let potIcon;

    const diff = earning - totalBudgetValue;
    const diff2 = earning - potValue;
    if (diff < 0) {
      percentage = (totalBudgetValue * 100) / earning;
    } else {
      percentage = Math.round((totalBudgetValue * 100) / earning);
    }

    if (diff2 < 0) {
      potPercentage = (potValue * 100) / earning;
    } else {
      potPercentage = Math.round((potValue * 100) / earning);
    }

    if (percentage > 100) {
      className = 'progress-bar progress-bar-danger';
      icon = <span className="icon icon-attention"></span>;
    } else {
      className = 'progress-bar progress-bar-success pot-green';
    }
    if (percentage >= 100) {
      percentage = 100;
    } else {
      percentage;
    }

    if (potPercentage > 100) {
      potClass = 'progress-bar progress-bar-danger';
      potIcon = <span className="icon icon-attention"></span>;
    } else {
      potClass = 'progress-bar progress-bar-success';
    }
    if (potPercentage >= 100) {
      potPercentage = 100;
    } else {
      potPercentage;
    }

    let addFadeClass;
    let addFadeClass2;

    if (potPercentage > 10) {
      addFadeClass = 'fade in';
    } else {
      addFadeClass = 'fade';
    }
    if (percentage > (potPercentage + 13)) {
      addFadeClass2 = 'fade in';
    } else {
      addFadeClass2 = 'fade';
    }

    let shadowClass;
    let shadowClass2;

    if (potPercentage > 87 && potPercentage < 99) {
      shadowClass = 'shadow';
    }
    if (percentage > 87 && percentage < 99) {
      shadowClass2 = 'shadow';
    }

    return (
      <div className="spendings-progressbar">
          <div className="progress">
            <span>{content.spendingProgressText3}</span>
            <div className={`${className} ${shadowClass2}`} role="progressbar" style={{ width: `${percentage}%` }} ref="budgetWidth">
              <span className={addFadeClass2}>{content.spendingProgressText1}</span>
              {icon}
            </div>
            <div className={`${potClass} ${shadowClass}`} role="progressbar" style={{ width: `${potPercentage}%` }} ref="spendWidth">
              <span className={addFadeClass}>{content.spendingProgressText2}</span>
              {potIcon}
            </div>
          </div>
      </div>
    );
	},
});

module.exports = CreateBudgetProgress;
