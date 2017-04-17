
var React = require('react');

var GridThatsAll = React.createClass({
    getDefaultProps: function(){
        return {
            "thatsAllMessage": "That's all we can find. Try changing your date range?"
        }
    },
    render: function(){
        var that = this;

        return(
            <div className="accountTransactionGridBottomText">{this.props.thatsAllMessage}</div>
        );
    }
});

module.exports = GridThatsAll;
