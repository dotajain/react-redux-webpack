'use strict'

jest.unmock('../ProjectionSettings');


const React = require('react');
const ReactDOM = require('react-dom');
const ProjectionSettings = require('../ProjectionSettings');
const Helmet = require('react-helmet');
const TestUtils = require('react-addons-test-utils');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const Nav = require('react-bootstrap/lib/Nav');
const Navbar = require('react-bootstrap/lib/Navbar');
const NavItem = require('react-bootstrap/lib/NavItem');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const EarningAndCommitmentComponent = require('../EarningAndCommitmentComponent');
const EssentialSpendingsComponent = require('../EssentialSpendingsComponent');
const AlertsNotificationsComponent = require('../AlertsNotificationsComponent');
const optOutCancelText = "cancel";

const FinancialStoriesModal = require('../../tag/FinancialStoriesModal');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProjectionSettings
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Projection Setting', () => {
    let component;
    let props = {
        optOutFlag: false,
        cancelFlag: false,
        content: {
            projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
        }
    };
    let props2 = {
        optOutFlag: true,
        cancelFlag: true,
        content: {
            projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
        }
    };
    component = shallowRender(props);
    let component2 = shallowRender(props2);
    it('expect to equal JSX', () => {
        expect(component).toEqualJSX(
            <div className="settings-main-wrapper">
                <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <p><a href="#" onClick={undefined}>
                            Back
                        </a>
                        </p>
                        </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">

                        </div>
                    <div className='clear'></div>
                    <div className='setting-nav'>
                    <Tabs activeKey={undefined} onSelect={undefined} id="controlled-tab-example" bsStyle="pills">
                        <Tab eventKey={1} title="Earnings & Commitments"><EarningAndCommitmentComponent content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}} data={undefined}
                            getEarningsId={undefined}
                            /></Tab>
                                                    <Tab eventKey={2} title={undefined}><EssentialSpendingsComponent
                            content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}}
                            data = {undefined}
                            selectTag  ={undefined}
                            modifiedUserTag={undefined}
                            modifiedTags={undefined}
                            /></Tab>
                                                    <Tab eventKey={3} title={undefined}><AlertsNotificationsComponent
                            content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}}
                            alertsAmountValue = {undefined}
                            changeTheValue = {undefined}
                            notificationFlag = {undefined}
                            notificationAlert = {undefined}
                            changeTheNotificationFlag={undefined}
                            /></Tab>
                    </Tabs><div className='clear'></div></div>
                    </div>
                {props.optOutFlag ? <FinancialStoriesModal
                    header={undefined}
                    content={undefined}
                    confirmCancel={undefined}
                    yesButton
                    cancelButton
                    cancelText={optOutCancelText}
                    onClickDeleteTag = {() => {}}
                    yesText={optOutSuccessText}/> : null}
                {props.cancelFlag ? <FinancialStoriesModal
                    header={undefined}
                    content={undefined}
                    confirmCancel={undefined}
                    yesButton
                    cancelButton
                    cancelText={undefined}
                    onClickDeleteTag = {() => {}}
                    yesText={undefined}/> : null}

                    <button className="action-button white" onClick={undefined}/>
            </div>)
    })
    it('expect to equal JSX', () => {
        expect(component2).toEqualJSX(
            <div className="settings-main-wrapper">
                <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <p><a href="#" onClick={undefined}>
                            Back
                        </a>
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    </div>
                    <div className='clear'></div>
                    <div className='setting-nav'>
                        <Tabs activeKey={undefined} onSelect={undefined} id="controlled-tab-example" bsStyle="pills">
                            <Tab eventKey={1} title="Earnings & Commitments"><EarningAndCommitmentComponent  content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}} data={undefined}
                                getEarningsId={undefined}
                                /></Tab>
                                                            <Tab eventKey={2} title={undefined}><EssentialSpendingsComponent
                                data = {undefined}
                                selectTag  ={undefined}
                                content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}}
                                modifiedUserTag={undefined}
                                modifiedTags={undefined}
                                /></Tab>
                                                            <Tab eventKey={3} title={undefined}><AlertsNotificationsComponent
                                alertsAmountValue = {undefined}
                                changeTheValue = {undefined}
                                notificationFlag = {undefined}
                                notificationAlert = {undefined}
                                content={{projectionSettingsEarningsAndCommitments: 'Earnings & Commitments'}}
                                changeTheNotificationFlag={undefined}
                                /></Tab>
                        </Tabs><div className='clear'></div></div>
                    </div>
                    {props2.optOutFlag ? <FinancialStoriesModal
                        header={undefined}
                        content={undefined}
                        confirmCancel={true}
                        yesButton
                        cancelButton
                        cancelText={undefined}
                        onClickDeleteTag = {undefined}
                        yesText={undefined}/> : null}
                    {props2.cancelFlag ? <FinancialStoriesModal
                        header={undefined}
                        content={undefined}
                        confirmCancel={true}
                        yesButton
                        cancelButton
                        cancelText={undefined}
                        onClickDeleteTag = {undefined}
                        yesText={undefined}/> : null}
                    <button className="action-button white" onClick={undefined}/>
            </div>);
    });

    describe('get initial state of component', () => {
        let props = {
        optOutFlag: false,
        cancelFlag: false,
        content: {
            projectionSettingsEarningsAndCommitments: 'Earnings & Commitments',
        }
    };
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        let component = ReactDOM.render(<ProjectionSettings {...props} />, node);
        let result = {
            value: null, 
            dLeaveSetup: false
        }
        it('should make call to get stores from store', () => {
            expect(component.getInitialState()).toEqual(result);
        });

    });
})
