/**
 * @module MyTags
 */
const React = require('react');
const { PropTypes } = React;
const TagItem = require('./TagItem');

const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const RegexUtils = require('../../../utils/RegexUtils');
const MyTags = React.createClass({

    propTypes: {
        deleteTag: PropTypes.func,
        flagForAddTag: PropTypes.bool,
        flagForEditTag: PropTypes.bool,
        onTagInfoClick: PropTypes.func,
        handleKeyPress: PropTypes.func,
        handleAddTagButton: PropTypes.func,
        handleChangeOfTag: PropTypes.func,
        data: PropTypes.array,
        getClass: PropTypes.func,
        assignTag: PropTypes.func,
        content: PropTypes.object,
        noTagSelection: PropTypes.bool,
    },

    getInitialState() {
        return {
            confirmCancel: false,
        };
    },

    componentWillReceiveProps() {
        this.setState({ confirmCancel: false });
    },

    onFocus(event) {
        event.target.value.length === 0 ? this.setState({ displayDelTag: false }) : this.setState({ displayDelTag: true });
	},

    onPaste(event) {
        event.preventDefault();
	},

    onBlur() {
        setTimeout(() => {
            this.setState({ displayDelTag: false });
        }, 150);
	},

    onKeyPress(event) {
        if (!RegexUtils.isValid(event.key, RegexUtils.regexes.customTag)) {
                event.preventDefault();
        }
        event.target.value.length === 0 ? this.setState({ displayDelTag: false }) : this.setState({ displayDelTag: true });
        this.props.handleKeyPress(event);
	},
    contentMyTags() {
        if (this.props.data) {
            let myTags = this.props.data.map((mytag, i) =>
                <li key={i}>
                    <TagItem flagForAddTag={this.props.flagForAddTag} flagForEditTag={this.props.flagForEditTag} handleChangeOfTag={this.props.handleChangeOfTag} mytag={mytag} assignTag={this.props.assignTag} deleteTag={this.props.deleteTag} getClass={this.props.getClass} content={this.props.content}/>
                </li>
            );
            return (
                <ul>
                    {myTags}
                </ul>
            );
        }
    },

    clearTag() {
    const event = { target:{ value:'' } };
    this.refs.addNewTagInput.value = '';
    this.setState({ displayDelTag: false });
    this.props.handleChangeOfTag(event);
  },
    render() {
        if (FinancialStoriesStore.getTagLoadStatus()) {
        return (
            <div className={`tag-list ${this.props.noTagSelection ? 'tagIndex' : ''}`}>
                {(!this.props.flagForEditTag && !this.props.flagForAddTag) && <span className="icon icon-information" onClick={this.props.onTagInfoClick}></span>}
                <div>{this.contentMyTags() }</div>

                {!this.props.flagForEditTag &&
                    <div className="add-tag text-center">
                        {!this.props.flagForAddTag &&
                            (this.props.data && this.props.data.length < 5) &&
                            <button
                                name={this.props.content.addNewTagModal}
                                className="btn btn-link"
                                onClick={this.props.handleAddTagButton}
                            >
                                {this.props.content.addNewTagModal}
                            </button>
                        }
                        {this.props.flagForAddTag &&

                            <div className="input-tag">
                                <span className="icon icon-tag"></span>
                                <input onPaste={this.onPaste} onBlur={this.onBlur} onFocus={this.onFocus} type="text" maxLength={16} ref="addNewTagInput"
                                onChange={this.props.handleKeyPress} pattern={RegexUtils.regexes.customTag} autoFocus
                                onKeyPress={this.onKeyPress} onKeyUp={this.onKeyPress}
                                />
                                 <a onClick={this.clearTag} className="searchClear" style={{ display:`${this.state.displayDelTag ? 'block' : 'none'}` }}>
                                    <span className="icon icon-clear"></span>
                                </a>
                            </div>

                        }
                    </div>
                }

            </div>);
        } else {
			return (<div className="loader-sidebar"></div>);
		}
    },
});
module.exports = MyTags;
