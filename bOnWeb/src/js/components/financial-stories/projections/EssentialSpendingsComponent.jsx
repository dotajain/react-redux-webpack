/**
 * @module Essential spend component
 */
const React = require('react');
const Helmet = require('react-helmet');
const Table = require('react-bootstrap/lib/Table');
const ProjectionStore = require('../../../stores/ProjectionStore');
const ProjectionActionCreator = require('../../../actions/ProjectionActionCreator');
const Button = require('react-bootstrap/lib/Button');
const _ = require('lodash');

let categoryTags = [];
let userTags = [];

const EssentialSpendingsComponent = React.createClass({

    modifiedTags(id) {
        this.props.modifiedTags(id);
    },
    modifiedUserTag(id) {
        this.props.modifiedUserTag(id);
    },
    cbTags() {
        if (this.props.data.essential_spend != undefined) {
            categoryTags = ProjectionStore.getCategoryTags();
            let cbTags = this.props.data.essential_spend.categories.map((cbtag) => {
                let tagstyle;
                let value = _.indexOf(categoryTags, cbtag.id);
                let className = value < 0 ? '' : 'selected';
                return (<p className={className} onClick={this.modifiedTags.bind(this, cbtag.id)} key={cbtag.id} id={cbtag.id}>{cbtag.value}</p>);
            }

            );
            return (<div className="tags">{cbTags}</div>);
        }
    },
    userTags() {
        if (this.props.data.essential_spend != undefined) {
            userTags = ProjectionStore.getUserTags();
            let usertags = this.props.data.essential_spend.tags.map((usertag) => {
                let tagstyle;
                let value = _.indexOf(userTags, usertag.id);
                let className = value < 0 ? '' : 'selected';
                return (<p className={className} onClick={this.modifiedUserTag.bind(this, usertag.id)} key={usertag.id} id={usertag.id}>{usertag.value}</p>);
            }

            );
            return (<div className="tags">{usertags}</div>);
        }
    },
    render() {
        return (
            <div >
                <Helmet title="Projections" />
                <div >
                    <div >
                        <div className="settings-content-wrapper">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


                                        <div id="essential-tab-container">
                                            <p className="tab-header">{this.props.content.projectionSettingsEssentialSpendingHeader}</p>
                                            <div className="tags-container">
                                                <p className="title-tag">{this.props.content.projectionSettingsEssentialSpendingOurTags}</p>
                                                {this.cbTags()}
                                                <p className="title-tag">{this.props.content.projectionSettingsEssentialSpendingYourTags}</p>
                                                {this.userTags()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
});

module.exports = EssentialSpendingsComponent;
