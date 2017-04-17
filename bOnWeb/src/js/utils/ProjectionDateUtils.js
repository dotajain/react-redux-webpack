
const React = require('react');
const moment = require('moment');
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ProjectionDateUtils = {
    // date conversion
    dateConversion(value) {
        if (value !== '') {
            
            const fullDate = new Date(value);
            const day = fullDate.getDate();
            const month = fullDate.getMonth();
            const year = fullDate.getFullYear();
            const dateStr = ('0' + day).slice(-2) + ' ' + monthName[month].substr(0, 3) + ' ' + year.toString().substr(2, 4);
            return (<td>{dateStr}</td>);
        }
    },
    dateOrdinal(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    },
    getDaysCount(newOne) {
        let currentDate = moment();
        let end = moment(newOne);
        let differ = end.diff(currentDate,'days');
        let dispDate = moment(newOne).date();
        let dispMonth = moment(newOne).month();
        return differ + ' ' + 'days on the' + ' ' + ('0' + dispDate).slice(-2) + this.dateOrdinal(dispDate) + ' ' + 'of' + ' ' + monthName[dispMonth];
    },

};

module.exports = ProjectionDateUtils;