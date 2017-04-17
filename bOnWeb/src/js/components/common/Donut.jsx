const React = require('react');
const DonutChart = require('./DonutChart');

const Donut = React.createClass({
  getInitialState(){
    return{
      donutval:0
    }
  },

  updateVal(e){
    this.setState({donutval:e.target.value})
  },

  render(){
    return(
      <div>
        <DonutChart value={this.state.donutval} />
        <br/>
        <label>Enter a value from 1-100<br/>
          <input onChange={this.updateVal} type="number" min="0" max="100" />
        </label>
      </div>
    )
  }
});

module.exports = Donut;