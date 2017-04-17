
/**
* @module Swipeable
*/

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import Pagination from './Pagination';

const AutoPlaySwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 500,
    color: '#57575f',
    fontSize: 23 + 'px',
    background: '#f3f3f3',
    textAlign: 'center',
    paddingBottom: 50 + 'px',
  },
};

const Swipeable = React.createClass({
  getInitialState() {
    return {
      index: 0,
    };
  },

  handleChangeIndex (index) {
    this.setState({
      index: index,
    });
  },

  render() {
      return (
          <div>
            <AutoPlaySwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
              <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <img src="../images/b/Alerts&Messages.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <img src="../images/b/Help.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Projections.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Insights.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/SavingsPots.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Payments.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Spending.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Sweeps.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/Tagging.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src="../images/b/timeline.png" alt="" title="" />
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              </div>

              <Pagination

                dots={10}
                index={this.state.index}
                onChangeIndex={this.handleChangeIndex}
              />

            </AutoPlaySwipeableViews>


          </div>
      );
  },
});

module.exports = Swipeable;
