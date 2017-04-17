const React = require('react');
const { PropTypes } = React;
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const Button = require('react-bootstrap/lib/Button');

const AccountDetailsHeaderBar = React.createClass({
  propTypes:{
   onTagsClick: PropTypes.func,
  },

  onTagsClick() {
      FinancialStoriesActionCreator.setOpenSideBar();
    this.props.onTagsClick();
    },
  backClick() {
      // timeline
      AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
    },
  render() {
    return (

<div className="b container-fluid-full">
  <div className="main-container accountDetails" >
    <div className="scroll-wrapper">
      <div className="acc-top-row">
        <div className="row payments content-wrapper">
          <div className="acc-header clearfix">
            <div className="col-lg-4 col-md-4 col-sm-4  float-left"><a href="#">Done</a></div>
            <div className="col-lg-4 col-md-4 col-sm-4  align-right float-right"><span className="icon icon-tag"><a href="#"></a></span><span className="icon icon-help-questions"><a href="#"></a></span></div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 align-center">
              <div>
                <h3 className="show-desktop"><span className="icon icon-swipe-left"></span><span className="acc-name">B Current</span><span className="icon icon-swipe-right"></span></h3>
                <ul className="slider-nav">
                  <li className="active"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <h3 className="show-mobile">B Current</h3>
              <span className="current-value">&pound;4,093<span className="pence-l">.94</span></span>
              <p className="more-info">More information<span className="icon icon-small-dropdown"></span></p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="align-center moreInfo-col">
                <p><strong>12345678 65-4321</strong></p>
                <ul>
                  <li><span className="float-left">Available balance</span> <span className="float-right">&pound;3,511.<span className="pence-s">41</span></span></li>
                  <li><span className="float-left">Planned borrowing limit</span> <span className="float-right">&pound;1,000.<span className="pence-s">00</span></span></li>
                </ul>
                <p>This balance, which includes any overdraft, may also include items that haven't gone through yet.</p>
                <p>If you'd like to talk about this account, please call the team at B on 0800 1217365.</p>
              </div>
            </div>
          </div>
          <div className="tabcontainer">
            <div className="projection-slider"> <span className="icon icon-swipe-left float-left"></span>
              <ul className="float-left">
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
              </ul>
              <span className="icon icon-swipe-right float-right"></span> </div>
            <div className="col-lg-12">
              <div className="timeline-search">
                <input type="search" placeholder="Search" />
                <a className="clear-search" onClick=""></a> <a className="cancel-search" onClick=""></a> </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <p className="show-desktop">Showing 3 months up to 13 Jul 16</p>
            </div>
            <div className="col-lg-6 col-md-6 float-right">
              <ul className="nav nav-justified account-tabs float-right">
                <li className="active"> <a href="#">All</a> </li>
                <li> <a href="#">Money In</a> </li>
                <li> <a href="#">Money Out</a> </li>
                <li> <a href="#">Repeating</a> </li>
              </ul>
            </div>
            <div className="col-lg-12">
              <div className="account-1">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th width="5%"> <div className="checkbox">
                          <input type="checkbox" id="all" name="all" />
                          <label htmlFor="all"></label>
                        </div>
                      </th>
                      <th width="5%">#</th>
                      <th width="20%">First Name</th>
                      <th width="70%">Tables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width="5%"><div className="checkbox">
                          <input type="checkbox" id="1" name="1" />
                          <label htmlFor="1"></label>
                        </div></td>
                      <td width="5%">1</td>
                      <td width="20%">Michael</td>
                      <td width="70%">Are formatted like this</td>
                    </tr>
                    <tr>
                      <td><div className="checkbox">
                          <input type="checkbox" id="2" name="2" />
                          <label htmlFor="2"></label>
                        </div></td>
                      <td>2</td>
                      <td>Lucille</td>
                      <td>Do you like them?</td>
                    </tr>
                    <tr className="">
                      <td><div className="checkbox">
                          <input type="checkbox" id="3" name="3" />
                          <label htmlFor="3"></label>
                        </div></td>
                      <td>3</td>
                      <td>Success</td>
                      <td></td>
                    </tr>
                    <tr className="">
                      <td><div className="checkbox">
                          <input type="checkbox" id="4" name="4" />
                          <label htmlFor="4"></label>
                        </div></td>
                      <td>4</td>
                      <td>Danger</td>
                      <td></td>
                    </tr>
                    <tr className="">
                      <td><div className="checkbox">
                          <input type="checkbox" id="5" name="5" />
                          <label htmlFor="5"></label>
                        </div></td>
                      <td>5</td>
                      <td>Warning</td>
                      <td></td>
                    </tr>
                    <tr className="">
                      <td><div className="checkbox">
                          <input type="checkbox" id="6" name="6" />
                          <label htmlFor="6"></label>
                        </div></td>
                      <td>6</td>
                      <td>Active</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      
    );},
});
module.exports = AccountDetailsHeaderBar;
