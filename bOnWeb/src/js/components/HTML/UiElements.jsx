/**
 * @module UiElements
 */

// React
const React = require('react');
const { PropTypes } = React;
const config = require('../../config');

const Nav = require('react-bootstrap/lib/Nav');
const NavJustified = require('./NavJustified');

const HelpDemoComponent = require('../help/HelpDemoComponent');
const DateTimeField = require('react-bootstrap-datetimepicker-noicon');

const Swipeable = require('../common/Swipeable');
const Toggle = require('../common/Toggle');

let panelContent = 'panel-content account-1';


const UiElements = React.createClass({

	onChange(e) {
		// console.log(e.target.value);
		panelContent = "panel-content "+e.target.value;
		this.setState({});
	},

	propTypes: {
	  defaultChecked: PropTypes.bool,
	},

	getInitialState() {
    	return {
			toggled: true,
		}
	},

	


	render() {

		// For sample view reasons inline style's are added to some tags, 
		// but inline style's are not recommonded in B Web App

		let formiInline = {
			width: 200 + 'px'
		}
		let dropDown= {
			display: 'block',
			position: 'static'
		}
		let progressBar= {
			width: 30 + '%'
		}
		let progressWarning= {
			width: 60 + '%'
		}
		let progressSuccess= {
			width: 80 + '%'
		}
		let progressDanger= {
			width: 45 + '%'
		}
		let info= {
			border: 1 + 'px solid #ccc',
			padding: 4 + 'px',
			margin: -5 + 'px' + ' ' + 0 + ' ' + 20 + 'px' + ' ' + 0
		}
		let scroll= {
			overflow: 'scroll',
			height: 100 + 'vh',
			padding: 20 + 'px'
		}


		return (



			<div className="b container-fluid-full">
			    <div style={scroll}>
			        <div className="jumbotron">
			            <h1>B Web App Styleguide Template</h1>
			            <p>A quick preview of everything..</p>
			        </div>

			        <div className="jumbotron">
			            <a href="#tables">Tables</a>
			        </div>

			        <div className="row">

						<div className="col-lg-12">
		                    <div className="panel panel-default" id="account-state">
		                        <div className="panel-heading">Account states checkbox</div>
		                        <div className="panel-content">

		                        	<div className="col-lg-4">
			                        	<div className="checkbox-account account-1">
											<input type="checkbox" id="saving" name="saving" /> 
											<label htmlFor="saving">
												<h3>Account - 1</h3>
												<h5>12345667 | 23-43-46</h5>
												<h2>£1231<sub>.234 current</sub></h2>
												<h4>£1,123.45 available</h4>
											</label>
										</div>

										<div className="checkbox-account account-3">
											<input type="radio" id="current" name="select" value="current" /> 
											<label htmlFor="current">
												<h3>Account - 1</h3>
												<h5>12345667 | 23-43-46</h5>
												<h2>£1231<sub>.234 current</sub></h2>
												<h4>£1,123.45 available</h4>
											</label>
										</div>
										<div className="checkbox-account account-10">
											<input type="radio" id="mortgage" name="select" value="mortgage"/> 
											<label htmlFor="mortgage">
												<h3>Account - 1</h3>
												<h5>12345667 | 23-43-46</h5>
												<h2>£1231<sub>.234 current</sub></h2>
												<h4>£1,123.45 available</h4>
											</label>
										</div>
										<div className="checkbox-account account-10">
											<input type="radio" id="savings" name="select" value="savings" disabled /> 
											<label htmlFor="savings">
												<h3>Account - 1</h3>
												<h5>12345667 | 23-43-46</h5>
												<h2>£1231<sub>.234 current</sub></h2>
												<h4>£1,123.45 available</h4>
											</label>
										</div>







		                            </div>

		                        </div>
		                    </div>
		                </div>














			            <div className="col-lg-12">
			                <div className="panel panel-default" id="headings">
			                    <div className="panel-heading">Headings
			                    </div>
			                    <div className="panel-content">
			                        <div className="col-lg-6">
			                            <h1 className="page-header">Page Header</h1>
			                            <h1>h1 heading</h1>
			                            <h2>h2 heading</h2>
			                            <h3>h3 Page sections heading size</h3>
			                            <h4>h4 heading</h4>
			                            <h5>h5 heading</h5>
			                            <h6>h6 heading</h6>
			                        </div>
			                        <div className="col-lg-6">
			                            <h1 className=" current">Page Header </h1>
			                            <p style={info}>className = page-header current</p>
			                            <h1 className="savings">h1 heading</h1>
			                            <p style={info}>className = savings</p>
			                            <h2 className="loan">h2 heading</h2>
			                            <p style={info}>className = loan</p>
			                            <h3 className="credit_card">h3 heading</h3>
			                            <p style={info}>className = credit_card</p>
			                            <h4 className="mortgage">h4 heading</h4>
			                            <p style={info}>className = mortgage</p>
			                            <h5 className="savings">h5 heading</h5>
			                            <p style={info}>className = savings</p>
			                            <h6>h6 heading</h6>
			                        </div>
			                    </div>
							</div>
						</div>


						<div className="col-lg-12">
		                    <div className="panel panel-default" id="content-formatting">
		                        <div className="panel-heading">Content Formatting
		                        </div>
		                        <div className="panel-content">
		                            <p className="lead">This is a lead paragraph.</p>
		                            <p>This is an <b>ordinary paragraph</b> that is <i>long enough</i> to wrap to <u>multiple lines</u> so that you can see how the line spacing looks.</p>
		                            <p className="text-muted">Muted color paragraph.</p>

		                            <p><small>This is text in a <code>small</code> wrapper. <abbr title="No Big Deal">NBD</abbr>, right?</small>
		                            </p>
		                            <hr/>
		                            <div className="row">
		                                <address className="col-lg-4">
						                        <strong>Twitter, Inc.</strong>
						                        <br />
						                        795 Folsom Ave, Suite 600
						                        <br />
						                        San Francisco, CA 94107<br />
						                        <abbr title="Phone">P:</abbr> (123) 456-7890
					                        </address>
		                                <address className="col-lg-6">
						                        <strong>Full Name</strong><br />
						                        <a href="mailto:#">first.last@example.com</a>
					                        </address>
		                            </div>
		                            <hr/>
		                            <blockquote>Here's what a blockquote looks like... <small>Use <code>small</code> to identify the source.</small>
		                            </blockquote>
		                            <hr/>
		                            <div className="row">
		                                <div className="col-lg-4">
		                                    <ul>
		                                        <li>Normal Unordered List</li>
		                                        <li>Can Also Work
		                                            <ul>
		                                                <li>With Nested Children</li>
		                                            </ul>
		                                        </li>
		                                        <li>Adds Bullets to Page</li>
		                                    </ul>
		                                </div>
		                                <div className="col-lg-6">
		                                    <ol>
		                                        <li>Normal Ordered List</li>
		                                        <li>Can Also Work
		                                            <ol>
		                                                <li>With Nested Children</li>
		                                            </ol>
		                                        </li>
		                                        <li>Adds Bullets to Page</li>
		                                    </ol>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>


		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="headings">
		                        <div className="panel-heading">Symbol font references
		                        </div>
		                        <ul className="glyphs css-mapping">
									<li>
									  <div className="icon icon-small-dropdown"></div>
									  <input type="text" readonly="readonly" value="icon-small-dropdown" />
									</li>
									<li>
									  <div className="icon icon-item-dots"></div>
									  <input type="text" readonly="readonly" value="item-dots" />
									</li>
									<li>
									  <div className="icon icon-top"></div>
									  <input type="text" readonly="readonly" value="icon-top" />
									</li>
									<li>
									  <div className="icon icon-case-1"></div>
									  <input type="text" readonly="readonly" value="icon-case-1" />
									</li>
									<li>
									  <div className="icon icon-twitter"></div>
									  <input type="text" readonly="readonly" value="icon-twitter" />
									</li>
									<li>
									  <div className="icon icon-facebook"></div>
									  <input type="text" readonly="readonly" value="icon-facebook" />
									</li>
									<li>
									  <div className="icon icon-linkedin"></div>
									  <input type="text" readonly="readonly" value="icon-linkedin" />
									</li>
									<li>
									  <div className="icon icon-no"></div>
									  <input type="text" readonly="readonly" value="icon-no" />
									</li>
									<li>
									  <div className="icon icon-clear"></div>
									  <input type="text" readonly="readonly" value="icon-clear" />
									</li>
									<li>
									  <div className="icon icon-alerts"></div>
									  <input type="text" readonly="readonly" value="icon-alerts" />
									</li>
									<li>
									  <div className="icon icon-attention"></div>
									  <input type="text" readonly="readonly" value="icon-attention" />
									</li>
									<li>
									  <div className="icon icon-back"></div>
									  <input type="text" readonly="readonly" value="icon-back" />
									</li>
									<li>
									  <div className="icon icon-calendar"></div>
									  <input type="text" readonly="readonly" value="icon-calendar" />
									</li>
									<li>
									  <div className="icon icon-case"></div>
									  <input type="text" readonly="readonly" value="icon-case" />
									</li>
									<li>
									  <div className="icon icon-close"></div>
									  <input type="text" readonly="readonly" value="icon-close" />
									</li>
									<li>
									  <div className="icon icon-commitments"></div>
									  <input type="text" readonly="readonly" value="icon-commitments" />
									</li>
									<li>
									  <div className="icon icon-confirm"></div>
									  <input type="text" readonly="readonly" value="icon-confirm" />
									</li>
									<li>
									  <div className="icon icon-currency"></div>
									  <input type="text" readonly="readonly" value="icon-currency" />
									</li>
									<li>
									  <div className="icon icon-delete"></div>
									  <input type="text" readonly="readonly" value="icon-delete" />
									</li>
									<li>
									  <div className="icon icon-done"></div>
									  <input type="text" readonly="readonly" value="icon-done" />
									</li>
									<li>
									  <div className="icon icon-edit"></div>
									  <input type="text" readonly="readonly" value="icon-edit" />
									</li>
									<li>
									  <div className="icon icon-error"></div>
									  <input type="text" readonly="readonly" value="icon-error" />
									</li>
									<li>
									  <div className="icon icon-goals"></div>
									  <input type="text" readonly="readonly" value="icon-goals" />
									</li>
									<li>
									  <div className="icon icon-help-demo"></div>
									  <input type="text" readonly="readonly" value="icon-help-demo" />
									</li>
									<li>
									  <div className="icon icon-help-email"></div>
									  <input type="text" readonly="readonly" value="icon-help-email" />
									</li>
									<li>
									  <div className="icon icon-help-get-help"></div>
									  <input type="text" readonly="readonly" value="icon-help-get-help" />
									</li>
									<li>
									  <div className="icon icon-help-questions"></div>
									  <input type="text" readonly="readonly" value="icon-help-questions" />
									</li>
									<li>
									  <div className="icon icon-help-reminders"></div>
									  <input type="text" readonly="readonly" value="icon-help-reminders" />
									</li>
									<li>
									  <div className="icon icon-help-spending"></div>
									  <input type="text" readonly="readonly" value="icon-help-spending" />
									</li>
									<li>
									  <div className="icon icon-help-talk"></div>
									  <input type="text" readonly="readonly" value="icon-help-talk" />
									</li>
									<li>
									  <div className="icon icon-helps"></div>
									  <input type="text" readonly="readonly" value="icon-helps" />
									</li>
									<li>
									  <div className="icon icon-information"></div>
									  <input type="text" readonly="readonly" value="icon-information" />
									</li>
									<li>
									  <div className="icon icon-interest-rates"></div>
									  <input type="text" readonly="readonly" value="icon-interest-rates" />
									</li>
									<li>
									  <div className="icon icon-joint-account"></div>
									  <input type="text" readonly="readonly" value="icon-joint-account" />
									</li>
									<li>
									  <div className="icon icon-logout"></div>
									  <input type="text" readonly="readonly" value="icon-logout" />
									</li>
									<li>
									  <div className="icon icon-mail"></div>
									  <input type="text" readonly="readonly" value="icon-mail" />
									</li>
									<li>
									  <div className="icon icon-more"></div>
									  <input type="text" readonly="readonly" value="icon-more" />
									</li>
									<li>
									  <div className="icon icon-move"></div>
									  <input type="text" readonly="readonly" value="icon-move" />
									</li>
									<li>
									  <div className="icon icon-opt-out"></div>
									  <input type="text" readonly="readonly" value="icon-opt-out" />
									</li>
									<li>
									  <div className="icon icon-overdrafts"></div>
									  <input type="text" readonly="readonly" value="icon-overdrafts" />
									</li>
									<li>
									  <div className="icon icon-page-back"></div>
									  <input type="text" readonly="readonly" value="icon-page-back" />
									</li>
									<li>
									  <div className="icon icon-payees"></div>
									  <input type="text" readonly="readonly" value="icon-payees" />
									</li>
									<li>
									  <div className="icon icon-payments"></div>
									  <input type="text" readonly="readonly" value="icon-payments" />
									</li>
									<li>
									  <div className="icon icon-pound"></div>
									  <input type="text" readonly="readonly" value="icon-pound" />
									</li>
									<li>
									  <div className="icon icon-search"></div>
									  <input type="text" readonly="readonly" value="icon-search" />
									</li>
									<li>
									  <div className="icon icon-settings"></div>
									  <input type="text" readonly="readonly" value="icon-settings" />
									</li>
									<li>
									  <div className="icon icon-shopping"></div>
									  <input type="text" readonly="readonly" value="icon-shopping" />
									</li>
									<li>
									  <div className="icon icon-spending"></div>
									  <input type="text" readonly="readonly" value="icon-spending" />
									</li>
									<li>
									  <div className="icon icon-spends"></div>
									  <input type="text" readonly="readonly" value="icon-spends" />
									</li>
									<li>
									  <div className="icon icon-swipe-left"></div>
									  <input type="text" readonly="readonly" value="icon-swipe-left" />
									</li>
									<li>
									  <div className="icon icon-swipe-right"></div>
									  <input type="text" readonly="readonly" value="icon-swipe-right" />
									</li>
									<li>
									  <div className="icon icon-tag"></div>
									  <input type="text" readonly="readonly" value="icon-tag" />
									</li>
									<li>
									  <div className="icon icon-waiting"></div>
									  <input type="text" readonly="readonly" value="icon-waiting" />
									</li>
									<li>
									  <div className="icon icon-wallet"></div>
									  <input type="text" readonly="readonly" value="icon-wallet" />
									</li>
									<li>
									  <div className="icon icon-warning"></div>
									  <input type="text" readonly="readonly" value="icon-warning" />
									</li>
									<li>
									  <div className="icon icon-you"></div>
									  <input type="text" readonly="readonly" value="icon-you" />
									</li>
									<li>
									  <div className="icon icon-your-payments"></div>
									  <input type="text" readonly="readonly" value="icon-your-payments" />
									</li>
									<li>
									  <div className="icon icon-add"></div>
									  <input type="text" readonly="readonly" value="icon-add" />
									</li>
									</ul>
		                    </div>
		                </div>

		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="headings">
		                        <div className="panel-heading">App page options</div>
		                         <div className="panel-content">
			                        
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-payees"></span>
			                        	Manage who you pay
			                        </a>
			                        
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-your-payments"></span>
			                        	Manage your payments
			                        </a>

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-opt-out"></span>
			                        	Manage your payments
			                        </a>

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-edit"></span>
			                        	Edit Budget
			                        </a>

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-more"></span>
			                        	More
			                        </a> 

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-confirm"></span>
			                        	Ok
			                        </a>

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-close"></span>
			                        	I'm Not Interested
			                        </a>

			                        <br />
			                        <br />
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-add"></span>
			                        	Want to create a new Saving Pot? 
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-add"></span>
			                        	Create my alerts 
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-add"></span>
			                        	Create my sweeps 
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-add"></span>
			                        	Someone new?
			                        </a>

			                        <p></p>
			                        <p></p>
			                        <p></p>


			                        <a className="page-options opt-green">
			                        	<span className="icon icon-settings"></span>
			                        </a>

			                        <a className="page-options opt-green">
			                        	<span className="icon icon-tag"></span>
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-information"></span>
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-delete"></span>
			                        </a>
			                        <a className="page-options opt-green">
			                        	<span className="icon icon-help-questions"></span>
			                        </a>


									<p></p>
			                        <p></p>
			                        <p></p>

			                        <a className="page-options border opt-green">
			                        	<span className="icon icon-close"></span>
			                        	I'm Not Interested
			                        </a>

			                        <a className="page-options border opt-green">
			                        	<span className="icon icon-edit"></span>
			                        	Edit Budget
			                        </a> 

			                        <a className="page-options border opt-green">
			                        	<span className="icon icon-move"></span>
			                        	Move Money
			                        </a>
			                        <a className="page-options border opt-green">
			                        	<span className="icon icon-delete"></span>
			                        	Delete Saving Pot
			                        </a>
			                        

								</div>
		                    </div>
		                </div>


		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="headings">
		                        <div className="panel-heading">Tabs</div>
		                         <div className="panel-content account-2">

		                         	<NavJustified />

		                         	<div className="tab-content">
									    <div role="tabpanel" className="tab-pane active" id="home">...</div>
									    <div role="tabpanel" className="tab-pane" id="profile">...</div>
									    <div role="tabpanel" className="tab-pane" id="messages">...</div>
									    <div role="tabpanel" className="tab-pane" id="settings">...</div>
									  </div>

								</div>
		                    </div>
		                </div>






		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="account-state">
		                        <div className="panel-heading">Account states
		                        </div>
		                        <div className="panel-content">

		                            <div className="col-lg-4">
		                                <div className="account account-1 active">
		                                    <h3>Account - 1</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-1 active</p>
		                                <div className="account account-2 active">
		                                    <h3>Account - 2</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-2 active</p>
		                                <div className="account account-3 active">
		                                    <h3>Account - 3</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-3 active</p>
		                                <div className="account account-4 active">
		                                    <h3>Account - 4</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-4 active</p>
		                                <div className="account account-5 active">
		                                    <h3>Account - 5</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-5 active</p>
										<div className="account account-6 active">
		                                    <h3>Account - 6</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-6 active</p>
										<div className="account account-7 active">
		                                    <h3>Account - 7</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-7 active</p>
										<div className="account account-8 active">
		                                    <h3>Account - 8</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-8 active</p>
										<div className="account account-9 active">
		                                    <h3>Account - 9</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-9 active</p>

										<div className="account account-10 active">
		                                    <h3>Account - 10</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-10 active</p>
		                            </div>

		                            <div className="col-lg-4">
		                                <div className="account account-1 open">
		                                    <h3>Account - 1</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-1 open</p>
		                                <div className="account account-2 open">
		                                    <h3>Account - 2</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-2 open</p>
		                                <div className="account account-3 open">
		                                    <h3>Account - 3</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-3 open</p>
		                                <div className="account account-4 open">
		                                    <h3>Account - 4</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-4 open</p>
		                                <div className="account account-5 open">
		                                    <h3>Account - 5</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-5 open</p>
										<div className="account account-6 open">
		                                    <h3>Account - 6</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-6 open</p>
										<div className="account account-7 open">
		                                    <h3>Account - 7</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-7 open</p>
										<div className="account account-8 open">
		                                    <h3>Account - 8</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-8 open</p>
										<div className="account account-9 open">
		                                    <h3>Account - 9</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-9 open</p>

										<div className="account account-10 open">
		                                    <h3>Account - 10</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-10 open</p>
		                            </div>

									<div className="col-lg-4">
		                                <div className="account account-1 inactive">
		                                    <h3>Account - 1</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-1 inactive</p>
		                                <div className="account account-2 inactive">
		                                    <h3>Account - 2</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-2 inactive</p>
		                                <div className="account account-3 inactive">
		                                    <h3>Account - 3</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-3 inactive</p>
		                                <div className="account account-4 inactive">
		                                    <h3>Account - 4</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-4 inactive</p>
		                                <div className="account account-5 inactive">
		                                    <h3>Account - 5</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-5 inactive</p>
										<div className="account account-6 inactive">
		                                    <h3>Account - 6</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-6 inactive</p>
										<div className="account account-7 inactive">
		                                    <h3>Account - 7</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-7 inactive</p>
										<div className="account account-8 inactive">
		                                    <h3>Account - 8</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-8 inactive</p>
										<div className="account account-9 inactive">
		                                    <h3>Account - 9</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-9 inactive</p>

										<div className="account account-10 inactive">
		                                    <h3>Account - 10</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-10 inactive</p>
		                            </div>


		                            <div className="col-lg-4">
		                                <div className="account account-1 active selected">
		                                    <h3>Account - 1</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-1 active selected</p>
		                                <div className="account account-2 active selected">
		                                    <h3>Account - 2</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-2 active selected</p>
		                                <div className="account account-3 active selected">
		                                    <h3>Account - 3</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-3 active selected</p>
		                                <div className="account account-4 active selected">
		                                    <h3>Account - 4</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-4 active selected</p>
		                                <div className="account account-5 active selected">
		                                    <h3>Account - 5</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-5 active selected</p>
										<div className="account account-6 active selected">
		                                    <h3>Account - 6</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-6 active selected</p>
										<div className="account account-7 active selected">
		                                    <h3>Account - 7</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-7 active selected</p>
										<div className="account account-8 active selected">
		                                    <h3>Account - 8</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-8 active selected</p>
										<div className="account account-9 active selected">
		                                    <h3>Account - 9</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-9 active selected</p>

										<div className="account account-10 active selected">
		                                    <h3>Account - 10</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>className = account account-10 active selected</p>
		                            </div>

		                            <div className="col-lg-4">
		                                <div className="account account-1 open one-line">
		                                    <h3>Pay someone new</h3>
		                                </div>
		                                <p style={info}>className = account account-1 open one-line</p>
										<div className="account account-2 open one-line">
		                                    <h3>Pay someone new</h3>
		                                </div>
		                                <p style={info}>className = account account-2 open one-line</p>
										<div className="account account-3 open one-line">
		                                    <h3>Pay someone new</h3>
		                                </div>
		                                <p style={info}>className = account account-3 open one-line</p>
										<div className="account account-4 open one-line">
		                                    <h3>Pay someone new</h3>
		                                </div>
		                                <p style={info}>className = account account-4 open one-line</p>
										<div className="account account-5 open one-line">
		                                    <h3>Pay someone new</h3>
		                                </div>
		                                <p style={info}>className = account account-5 open one-line</p>
		                            </div>

		                            <div className="col-lg-4">
		                                <div className="account account-1 active">
		                                    <h3>Account - 1</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <ul className="options">
		                                    	<li>
		                                    		<label><input type="radio" alt="" /></label>
		                                    		<h5>Family Holiday</h5>
		                                    		<h3>£1200<sub>.00</sub></h3>
		                                    	</li>
		                                    	<li>
		                                    		<label><input type="radio" alt="" /></label>
		                                    		<h5>Not in a pot</h5>
		                                    		<h3>£8,818<sub>.90</sub></h3>
		                                    	</li>
		                                    </ul>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>
		                                Container className = account account-1 active <br />
		                                Inner container className = options</p>
		                                <div className="account account-2 active">
		                                    <h3>Account - 2</h3>
		                                    <h5>12345667 | 23-43-46</h5>
		                                    <ul className="options">
		                                    	<li>
		                                    		<label><input type="radio" alt="" /></label>
		                                    		<h5>Family Holiday</h5>
		                                    		<h3>£1200<sub>.00</sub></h3>
		                                    	</li>
		                                    	<li>
		                                    		<label><input type="radio" alt="" /></label>
		                                    		<h5>Not in a pot</h5>
		                                    		<h3>£8,818<sub>.90</sub></h3>
		                                    	</li>
		                                    </ul>
		                                    <h2>£1231<sub>.234 current</sub></h2>
		                                    <h4>£1,123.45 available</h4>
		                                </div>
		                                <p style={info}>
		                                Container className = account savings active<br />
		                                Inner container className = options savings open</p>
		                            </div>

		                        </div>
		                    </div>
		                </div>


		                


		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="timeline">
		                        <div className="panel-heading">Timeline
		                        </div>
		                        <div className="panel-content">

		                            <div className="timeline timeline-single-column">

		                                <span className="timeline-label">09.03.2016</span>
		                                <div className="timeline-item account-1">
		                                    <div className="timeline-point timeline-point-default">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Untagged</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">ATM</p>
		                                        </div>
		                                    </div>
		                                </div>

		                                <div className="timeline-item account-2">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Eating out</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Point of sale</p>
		                                        </div>
		                                    </div>
		                                </div>

		                                <div className="timeline-item account-3">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Eating out</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Point of sale</p>
		                                        </div>
		                                    </div>
		                                </div>


		                                <span className="timeline-label">08.03.2016</span>
		                                <div className="timeline-item account-4">
		                                    <div className="timeline-point timeline-point-default">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Style</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">POS</p>
		                                        </div>
		                                    </div>
		                                </div>

		                                <div className="timeline-item account-5">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Other</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Debit Card</p>
		                                        </div>
		                                    </div>
		                                </div>
										<div className="timeline-item account-6">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Other</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Debit Card</p>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="timeline-item account-7">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Other</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Debit Card</p>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="timeline-item account-9">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Other</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Debit Card</p>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="timeline-item account-10">
		                                    <div className="timeline-point timeline-point-blank">
		                                    </div>
		                                    <div className="timeline-event">
		                                        <div className="transactionInfo">
		                                            <h4>Transaction header text</h4>
		                                            <p><span className="icon icon-tag"></span>Other</p>
		                                        </div>
		                                        <div className="transactionFigure">
		                                            <h3>-£30.00</h3>
		                                            <p className="text-right">Debit Card</p>
		                                        </div>
		                                    </div>
		                                </div>

		                            </div>
		                            <p></p>
		                            <p></p>
		                            <p style={info}>add "account-(number)" names with className = timeline-item</p>
		                        </div>
		                    </div>
		                </div>

		                <div className="col-lg-12">
		                    <div className="panel panel-default" id="toggle">
		                        <div className="panel-heading">Toggles
		                        </div>
								<div className="panel-content">
		                        	<div className="col-lg-4">
										<p></p>
											<div className="toggle account-1">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-2">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-3">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-4">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-5">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
			                            <p style={info}>add "account-(number)" names with className = toggle</p>
			                        </div>
		                        

			                        <div className="col-lg-4">
			                        	<p></p>
											<div className="toggle account-6">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-7">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-8">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-9">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
										<p></p>
											<div className="toggle account-10">
												<Toggle
												defaultChecked={this.state.toggled}
												aria-label="No label tag"/>
											</div>
										<p></p>
			                        </div>
			                    </div>
		                    </div>
		                </div>


						<div className="col-lg-12">
		                    <div className="panel panel-default" id="tables">
		                        <div className="panel-heading">
		                        Tables

		                        <select id="accountSelector" ref="accountSelector" onChange={this.onChange}>
		                        	<option value="account-1">Account-1</option>
		                        	<option value="account-2">Account-2</option>
		                        	<option value="account-3">Account-3</option>
		                        	<option value="account-4">Account-4</option>
		                        	<option value="account-5">Account-5</option>
		                        	<option value="account-6">Account-6</option>
		                        	<option value="account-7">Account-7</option>
		                        	<option value="account-8">Account-8</option>
		                        	<option value="account-9">Account-9</option>
		                        	<option value="account-10">Account-10</option>
		                        </select>
		                        </div>
		                        <div className={panelContent}>
		                        <p></p>
                                    <ul className="nav nav-justified">
                                        <li className="active">
                                            <a href="#">Tab 1</a>
                                        </li>
                                        <li>
                                            <a href="#">Tab 2</a>
                                        </li>
                                        <li>
                                            <a href="#">Tab 3</a>
                                        </li>
                                    </ul>
                                     <p></p>
		                            <table className="table table-hover">
		                                <thead>
		                                    <tr>
		                                        <th width="5%">
			                                        <div className="checkbox">
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
		                                        <td width="5%">
		                                        	<div className="checkbox">
													  <input type="checkbox" id="1" name="1" /> 
													  <label htmlFor="1"></label>
													</div>
		                                        </td>
		                                        <td width="5%">1</td>
		                                        <td width="20%">Michael</td>
		                                        <td width="70%">Are formatted like this</td>
		                                    </tr>
		                                    <tr>
		                                        <td>
		                                        	<div className="checkbox">
													  <input type="checkbox" id="2" name="2" /> 
													  <label htmlFor="2"></label>
													</div>
		                                        </td>
		                                        <td>2</td>
		                                        <td>Lucille</td>
		                                        <td>Do you like them?</td>
		                                    </tr>
		                                    <tr className="">
		                                        <td>
		                                        	<div className="checkbox">
													  <input type="checkbox" id="3" name="3" /> 
													  <label htmlFor="3"></label>
													</div>
		                                        </td>
		                                        <td>3</td>
		                                        <td>Success</td>
		                                        <td></td>
		                                    </tr>
		                                    <tr className="">
		                                        <td>
		                                        	<div className="checkbox">
													  <input type="checkbox" id="4" name="4" /> 
													  <label htmlFor="4"></label>
													</div>
		                                        </td>
		                                        <td>4</td>
		                                        <td>Danger</td>
		                                        <td></td>
		                                    </tr>
		                                    <tr className="">
		                                        <td>
		                                        	<div className="checkbox">
													  <input type="checkbox" id="5" name="5" /> 
													  <label htmlFor="5"></label>
													</div>
		                                        </td>
		                                        <td>5</td>
		                                        <td>Warning</td>
		                                        <td></td>
		                                    </tr>
		                                    <tr className="">
		                                        <td>
		                                        	<div className="checkbox">
													  <input type="checkbox" id="6" name="6" /> 
													  <label htmlFor="6"></label>
													</div>
		                                        </td>
		                                        <td>6</td>
		                                        <td>Active</td>
		                                        <td></td>
		                                    </tr>
		                                </tbody>
		                            </table>
		                            <table className="table table-striped table-bordered table-condensed">
		                                <thead>
		                                    <tr>
		                                        <th>#</th>
		                                        <th>First Name</th>
		                                        <th>Tables</th>
		                                    </tr>
		                                </thead>
		                                <tbody>
		                                    <tr>
		                                        <td>1</td>
		                                        <td>Michael</td>
		                                        <td>This one is bordered and condensed</td>
		                                    </tr>
		                                    <tr>
		                                        <td>2</td>
		                                        <td>Lucille</td>
		                                        <td>Do you still like it?</td>
		                                    </tr>
		                                </tbody>
		                            </table>
		                        </div>

		                        <div className="panel panel-default" id="forms">
		                            <div className="panel-heading">Forms
		                            </div>
		                            <div className="panel-content">
		                                <form className="form-horizontal">
		                                    <div className="form-group">
		                                        <label htmlFor="inputEmail" className="col-lg-2 control-label">Text Field</label>
		                                        <div className="col-lg-10">
		                                            <input type="text" placeholder="Demo" />
		                                        </div>
		                                    </div>

		                                    <div className="form-group">
		                                        <label htmlFor="search" className="col-lg-2 control-label">Search</label>
		                                        <div className="col-lg-10">
		                                            <div className="timeline-search">
		                                            <input type="search" placeholder="Search" />
		                                            <a className="clear-search" onClick=""></a>
		                                            <a className="cancel-search" onClick=""></a>
		                                            </div>
		                                        
		                                        </div>
		                                    </div>

		                                    <div className="form-group">
		                                        <label htmlFor="number" className="col-lg-2 control-label">Currency</label>
		                                        <div className="col-lg-10">
		                                            <div className="currency"><label className="animated shake">£</label>
		                                            	<input type="number" placeholder="" />
		                                            </div>
		                                        </div>
		                                    </div>
		                                </form>
		                            </div>
		                        </div>
		                    </div>

		                    <div className="row">
		                        <div className="col-lg-12">
		                            <div className="panel panel-default" id="buttons">
		                                <div className="panel-heading">Buttons
		                                </div>
		                                <div className="panel-content">
		                                    <p>
		                                        <button type="button" className="btn btn-default">Default</button>
		                                        <button type="button" className="btn btn-primary">Primary</button>
		                                        <button type="button" className="btn btn-success">Success</button>
		                                        <button type="button" className="btn btn-info">Info</button>
		                                        <button type="button" className="btn btn-warning">Warning</button>
		                                        <button type="button" className="btn btn-danger">Danger</button>
		                                        <button type="button" className="btn btn-link">Link</button>
		                                    </p>
		                                    <p>
		                                        <button type="button" className="btn btn-primary btn-large">Large button</button>
		                                        <button type="button" className="btn btn-primary disabled">Disabled</button>
		                                        <button type="button" className="btn btn-primary">Default button</button>
		                                        <button type="button" className="btn btn-primary btn-small">Small button</button>
		                                        <button type="button" className="btn btn-primary btn-mini">Mini button</button>
		                                    </p>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>

		                
                        <div className="col-lg-12">
                            <div className="panel panel-default" id="navs">
                                <div className="panel-heading">Navs</div>
                                <div className="panel-content account-2">

                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="panel panel-default clearfix" id="dropdowns">
                                <div className="panel-heading">Dropdowns
                                </div>
                                <div className="panel-content">
                                    <p></p>
                                    <div className="dropdown">
                                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={dropDown}>
                                            <li className="dropdown-header">Dropdown header</li>
                                            <li className="disabled">
                                                <a tabIndex="-1" href="#">Action</a>
                                            </li>
                                            <li>
                                                <a tabIndex="-1" href="#">Another action</a>
                                            </li>
                                            <li>
                                                <a tabIndex="-1" href="#">Something else here</a>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <a tabIndex="-1" href="#">Separated link</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="panel panel-default clearfix" id="dropdowns">
                                <div className="panel-heading">Input types
                                </div>
                                <div className="panel-content">

                                    <p></p>

                                    <p>
                                        Try https://www.npmjs.com/package/react-native-simple-radio-button
                                    </p>

                                    <p></p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="panel panel-default" id="input-groups">
                                <div className="panel-heading">Input Groups
                                </div>
                                <div className="panel-content">
                                    <p></p>
                                    <div className="input-group">
                                        <span className="input-group-btn"><button className="btn btn-default" type="button">Go!</button></span>
                                        <input type="text" className="form-control" placeholder="Username" />
                                    </div>
                                    <p></p>
                                    <p></p>
                                    <div className="input-group">
                                        <input type="text" className="form-control input-large" />
                                        <span className="input-group-addon input-large">.00</span>
                                    </div>
                                    <p></p>
                                    <p></p>
                                    <div className="input-group">
                                        <span className="input-group-addon">$</span>
                                        <input type="text" className="form-control" />
                                        <span className="input-group-addon">.00</span>
                                    </div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
	
                        <div className="col-lg-12">
                            <div className="panel panel-default" id="alerts">
                                <div className="panel-heading">Alerts
                                </div>
                                <div className="panel-content">
                                    <div>
                                        <div className="alert alert-danger">
                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                            <strong>Oh snap!</strong> <a href="#" className="alert-link">Change a few things up</a> and try submitting again.
                                        </div>
                                        <div className="alert alert-success">
                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                            <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.
                                        </div>
                                        <div className="alert alert-warning">
                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                            <strong>Heads up!</strong> This <a href="#" className="alert-link">alert needs your attention</a>, but it's not super important.
                                        </div>
                                        <div className="alert alert-info">
                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                            <strong>Heads up!</strong> This <a href="#" className="alert-link">alert needs your attention</a>, but it's not super important.
                                        </div>
                                        <div className="alert alert-block">
                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                            <h4>Warning!</h4>
                                            <p>This is a block style alert.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="panel panel-default" id="progres">
                            	<div className="panel-heading">Progress Bar
                                </div>
	                            <div className=" panel-content ">
	                                <div className="progress ">
	                                    <div className="progress-bar progress-bar-info " style={progressBar}>Info</div>
	                                </div>
	                                <div className="progress progress-striped active ">
	                                    <div className="progress-bar progress-bar-success ">Success</div>
	                                </div>
	                                <div className="progress ">
	                                    <div className="progress-bar progress-bar-warning " style={progressBar}>Warning</div>
	                                </div>
	                                <div className="progress ">
	                                    <div className="progress-bar progress-bar-danger ">Danger</div>
	                                </div>
	                                <div className="progress "> Income
	                                    <div className="progress-bar progress-bar-success " style={progressSuccess}>Success</div>
	                                    <div className="progress-bar progress-bar-warning " style={progressWarning}>Warning</div>
	                                    <div className="progress-bar progress-bar-danger " style={progressDanger}>Danger</div>
	                                </div>
	                            </div>
	                        </div>
                        </div>
	                    <div className="col-lg-12 ">
	                        <div className="panel panel-default " id="media-object ">
	                            <div className="panel-heading ">Media Object
	                            </div>
	                            <div className="panel-content ">
	                                <p></p>
	                                <div className="media ">
	                                    <a className="pull-left " href="# "> <img className="media-object " src="https://app.divshot.com/img/placeholder-64x64.gif " /> </a>
	                                    <div className="media-body ">
	                                        <h4 className="media-heading ">Media heading</h4>
	                                        <p>This is the content for your media.</p>
	                                        <div className="media ">
	                                            <a className="pull-left " href="# "> <img className="media-object " src="https://app.divshot.com/img/placeholder-64x64.gif " /> </a>
	                                            <div className="media-body ">
	                                                <h4 className="media-heading ">Media heading</h4>
	                                                <p>This is the content for your media.</p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>

		                <div className="col-lg-12 ">
		                    <div className="panel panel-default " id="list-groups ">
		                        <div className="panel-heading ">List Groups
		                        </div>
		                        <div className="panel-content ">
		                            <div className="row ">
		                                <div className="col-lg-4 ">
		                                    <ul className="list-group ">
		                                        <li className="list-group-item ">Cras justo odio</li>
		                                        <li className="list-group-item ">Dapibus ac facilisis in</li>
		                                        <li className="list-group-item ">Morbi leo risus</li>
		                                        <li className="list-group-item ">Porta ac consectetur ac</li>
		                                        <li className="list-group-item ">Vestibulum at eros</li>
		                                    </ul>
		                                </div>
		                                <div className="col-lg-4 ">
		                                    <div className="list-group ">
		                                        <a href="# " className="list-group-item active ">Cras justo odio</a>
		                                        <a href="# " className="list-group-item ">Dapibus ac facilisis in</a>
		                                        <a href="# " className="list-group-item ">Morbi leo risus</a>
		                                        <a href="# " className="list-group-item ">Porta ac consectetur ac</a>
		                                        <a href="# " className="list-group-item ">Vestibulum at eros</a>
		                                    </div>
		                                </div>
		                                <div className="col-lg-4 ">
		                                    <div className="list-group ">
		                                        <a href="# " className="list-group-item active ">
		                                            <h4 className="list-group-item-heading ">List group item heading</h4>
		                                            <p className="list-group-item-text ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		                                        </a>
		                                        <a href="# " className="list-group-item ">
		                                            <h4 className="list-group-item-heading ">List group item heading</h4>
		                                            <p className="list-group-item-text ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		                                        </a>
		                                        <a href="# " className="list-group-item ">
		                                            <h4 className="list-group-item-heading ">List group item heading</h4>
		                                            <p className="list-group-item-text ">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		                                        </a>
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>


						
						<div className="col-lg-12 ">
		                    <div className="panel panel-default " id="list-groups ">
		                        <div className="panel-heading ">List Groups
		                        </div>
		                        <div className="panel-content ">

									<div className="gridSample">
						                <h3>Three equal columns</h3>
										<p>Get three equal-width columns <strong>starting at desktops and scaling to large desktops</strong>. On mobile devices, tablets and below, the columns will automatically stack.</p>
										<div className="row">
											<div className="col-md-4">.col-md-4</div>
											<div className="col-md-4">.col-md-4</div>
											<div className="col-md-4">.col-md-4</div>
										</div>

										<h3>Three unequal columns</h3>
										<p>Get three columns <strong>starting at desktops and scaling to large desktops</strong> of various widths. Remember, grid columns should add up to twelve for a single horizontal block. More than that, and columns start stacking no matter the viewport.</p>
										<div className="row">
											<div className="col-md-3">.col-md-3</div>
											<div className="col-md-6">.col-md-6</div>
											<div className="col-md-3">.col-md-3</div>
										</div>

										<h3>Two columns</h3>
										<p>Get two columns <strong>starting at desktops and scaling to large desktops</strong>.</p>
										<div className="row">
											<div className="col-md-8">.col-md-8</div>
											<div className="col-md-4">.col-md-4</div>
										</div>

										<h3>Full width, single column</h3>
										<p className="text-warning">No grid classes are necessary for full-width elements.</p>

										<hr/>

										<h3>Two columns with two nested columns</h3>
										<p>Per the documentation, nesting is easy—just put a row of columns within an existing column. This gives you two columns <strong>starting at desktops and scaling to large desktops</strong>, with another two (equal widths) within the larger column.</p>
										<p>At mobile device sizes, tablets and down, these columns and their nested columns will stack.</p>
										<div className="row">
										<div className="col-md-8">
										  .col-md-8
										  <div className="row">
										    <div className="col-md-6">.col-md-6</div>
										    <div className="col-md-6">.col-md-6</div>
										  </div>
										</div>
										<div className="col-md-4">.col-md-4</div>
										</div>

										<hr/>

										<h3>Mixed: mobile and desktop</h3>
										<p>The Bootstrap 3 grid system has four tiers of classes: xs (phones), sm (tablets), md (desktops), and lg (larger desktops). You can use nearly any combination of these classes to create more dynamic and flexible layouts.</p>
										<p>Each tier of classes scales up, meaning if you plan on setting the same widths for xs and sm, you only need to specify xs.</p>
										<div className="row">
											<div className="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
											<div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
										</div>
										<div className="row">
											<div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
											<div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
											<div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
										</div>
										<div className="row">
											<div className="col-xs-6">.col-xs-6</div>
											<div className="col-xs-6">.col-xs-6</div>
										</div>

										<hr/>

										<h3>Mixed: mobile, tablet, and desktop</h3>
										<p></p>
										<div className="row">
											<div className="col-xs-12 col-sm-6 col-lg-8">.col-xs-12 .col-sm-6 .col-lg-8</div>
											<div className="col-xs-6 col-lg-4">.col-xs-6 .col-lg-4</div>
										</div>
											<div className="row">
											<div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
											<div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
											<div className="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
										</div>

										<hr/>

										<h3>Column clearing</h3>
										<p><a href="http://getbootstrap.com/css/#grid-responsive-resets">Clear floats</a> at specific breakpoints to prevent awkward wrapping with uneven content.</p>
										<div className="row">
										<div className="col-xs-6 col-sm-3">
										  .col-xs-6 .col-sm-3
										  <br/>
										  Resize your viewport or check it out on your phone for an example.
										</div>
										<div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

										<div className="clearfix visible-xs"></div>

											<div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
											<div className="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
										</div>

										<hr/>

										<h3>Offset, push, and pull resets</h3>
										<p>Reset offsets, pushes, and pulls at specific breakpoints.</p>
										<div className="row">
											<div className="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
											<div className="col-sm-5 col-sm-offset-2 col-md-6 col-md-offset-0">.col-sm-5 .col-sm-offset-2 .col-md-6 .col-md-offset-0</div>
										</div>
										<div className="row">
											<div className="col-sm-6 col-md-5 col-lg-6">.col-sm-6 .col-md-5 .col-lg-6</div>
											<div className="col-sm-6 col-md-5 col-md-offset-2 col-lg-6 col-lg-offset-0">.col-sm-6 .col-md-5 .col-md-offset-2 .col-lg-6 .col-lg-offset-0</div>
										</div>
									</div>
								</div>
							</div>
						</div>
			        </div>
			    </div>
			</div>
		);
	},
});

module.exports = UiElements;
