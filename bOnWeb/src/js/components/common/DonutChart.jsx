const React = require('react');
const NumberUtils = require('../../utils/NumberUtils');
const DonutChart = React.createClass({
  propTypes: {
    value: React.PropTypes.number,        // value the chart should show
    valuelabel: React.PropTypes.string,   // label for the chart
    size: React.PropTypes.number,         // diameter of chart
    strokewidth: React.PropTypes.number,   // width of chart line
    strokelinecap: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      value: 0,
      size: 200,
      strokewidth: 14,
    };
  },
  getInitialState() {
    return {
      value: 0,
    };
  },
  componentWillMount() {
    setTimeout(() => {
      this.setState({ value: this.props.value });
    }, 100);
  },
  render() {
    const halfsize = (this.props.size * 0.5);
    const radius = halfsize - (this.props.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((this.props.value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = { strokeWidth: this.props.strokewidth };
    const indicatorstyle = { strokeWidth: this.props.strokewidth, strokeDasharray: dashval };
    const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')';
    const percentValue = NumberUtils.formatAmount(Number(this.props.value));

    return (
      <svg width="100%" height="100%" className="donutchart" viewBox={`0 0 ${this.props.size} ${this.props.size}`}>
        <circle r="46%" cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
        <circle r="46%" cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
        <text className="donutchart-text" x={halfsize + 5} y={halfsize + 15} style={{textAnchor:'middle'}} >
          <tspan className="donutchart-text-val">{percentValue}</tspan>
          <tspan className="donutchart-text-percent">%</tspan>
        </text>
      </svg>
    );
  },
});

module.exports = DonutChart;
