
const React = require('react');
const assign = require('lodash/assign');
const { PropTypes } = React;

// needs props maxPage, currentPage, nextFunction, prevFunction
const GridPagination = React.createClass({
    propTypes: {
        setPage: PropTypes.func,
        next: PropTypes.func,
        currentPage: PropTypes.number,
        maxPage: PropTypes.number,
        previous: PropTypes.string,
        useGriddleStyles: PropTypes.bool,
        previousIconComponent: PropTypes.string,
        previousText: PropTypes.string,
        nextText: PropTypes.string,
        nextIconComponent: PropTypes.string,
        previousClassName: PropTypes.string,
        nextClassName: PropTypes.string,
    },
    getDefaultProps() {
        return {
            'maxPage': 0,
            'nextText': '',
            'previousText': '',
            'currentPage': 0,
            'useGriddleStyles': true,
            'nextClassName': 'griddle-next',
            'previousClassName': 'griddle-previous',
            'nextIconComponent': null,
            'previousIconComponent': null,
        };
    },
    pageChange(event) {
        this.props.setPage(parseInt(event.target.value, 10) - 1);
    },
    render() {
        let previous = '';
        let next = '';

        if (this.props.currentPage > 0) {
            previous = <button type="button" onClick={this.props.previous} style={this.props.useGriddleStyles ? { 'color': '#222', border: 'none', background: 'none', margin: '0 0 0 10px' } : null}>{this.props.previousIconComponent}{this.props.previousText}</button>;
        }

        if (this.props.currentPage !== (this.props.maxPage - 1)) {
            next = <button type="button" onClick={this.props.next} style={this.props.useGriddleStyles ? { 'color': '#222', border: 'none', background: 'none', margin: '0 10px 0 0' } : null}>{this.props.nextText}{this.props.nextIconComponent}</button>;
        }

        let leftStyle = null;
        let middleStyle = null;
        let rightStyle = null;

        if (this.props.useGriddleStyles === true) {
            const baseStyle = {
                'float': 'left',
                minHeight: '1px',
                marginTop: '5px',
            };

            rightStyle = assign({ textAlign: 'right', width: '34%' }, baseStyle);
            middleStyle = assign({ textAlign: 'center', width: '33%' }, baseStyle);
            leftStyle = assign({ width: '33%' }, baseStyle);
        }

        const options = [];

        for (let i = 1; i <= this.props.maxPage; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }

        return (
            <div style={this.props.useGriddleStyles ? { minHeight: '35px' } : null }>
                <div className={this.props.previousClassName} style={leftStyle}>{previous}</div>
                <div className="griddle-page" style={middleStyle}>
                    <select value={this.props.currentPage + 1} onChange={this.pageChange}>
                        {options}
                    </select> / {this.props.maxPage}
                </div>
                <div className={this.props.nextClassName} style={rightStyle}>{next}</div>
            </div>
        );
    },
});

module.exports = GridPagination;
