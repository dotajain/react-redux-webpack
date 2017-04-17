'use strict';

const TimelineTransactions = jest.genMockFromModule('../TimelineTransactions');

function render() {
return "<div>TimelineTransactions</div>";
}

function timelineBody()
{
  return "<div>TimelineTransactions</div>";  
}

TimelineTransactions.render = render;
TimelineTransactions.timelineBody = timelineBody;


module.exports = TimelineTransactions;
