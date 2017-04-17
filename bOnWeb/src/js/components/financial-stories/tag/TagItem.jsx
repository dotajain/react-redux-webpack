/**
 * @module TagItem
 */
const React = require('react');
const { PropTypes } = React;
const RegexUtils = require('../../../utils/RegexUtils');

const TagItem = React.createClass({
  propTypes:{
    deleteTag: PropTypes.func,
    flagForAddTag:PropTypes.bool,
    flagForEditTag:PropTypes.bool,
    mytag:PropTypes.object,
    handleKeyPress:PropTypes.func,
    handleAddTagButton:PropTypes.func,
    handleChangeOfTag:PropTypes.func,
    data : PropTypes.array,
    getClass:PropTypes.func,
    assignTag:PropTypes.func,
    content: PropTypes.object,
  },
  getInitialState() {
			return {
			displayDelTag: false,
			};
	},
   onKeyPress(event) {
    if (!RegexUtils.isValid(event.key, RegexUtils.regexes.customTag)) {
        event.preventDefault();
    }
    event.target.value.length === 0 ? this.setState({ displayDelTag: false }) : this.setState({ displayDelTag: true });
    this.props.handleChangeOfTag(event);
	},
   onFocus(event) {
    event.target.value.length === 0 ? this.setState({ displayDelTag: false }) : this.setState({ displayDelTag: true });
	},
  onBlur() {
    setTimeout(() => {
        this.setState({ displayDelTag: false });
    }, 150);
	},
  onPaste(event) {
        event.preventDefault();
	},
  assignTag() {
    this.props.assignTag(this.props.mytag);
  },
  deleteTag() {
    this.props.deleteTag(this.props.mytag);
  },
  clearTag() {
    const event = { target:{ value:'' } };
    this.refs.userTag.value = '';
    this.setState({ displayDelTag: false });
    this.props.handleChangeOfTag(event);
  },
  render() {
    return (
            <div className="edit-tag">
                {(!this.props.flagForEditTag && !this.props.flagForAddTag) ?
                  <span onClick={this.assignTag} className={`icon icon-tag ${this.props.getClass(this.props.mytag.id)}`}>
                  <label>{this.props.mytag.value}</label>
                  </span>
                  :
                  <div className="input-tag">
                  <span className={`icon icon-tag ${this.props.getClass(this.props.mytag.value)}`}></span>
                    <input onPaste={this.onPaste} onBlur={this.onBlur} onFocus={this.onFocus} maxLength={16} className={`${this.props.getClass(this.props.mytag.value)}`} type="text" ref="userTag" disabled={(!this.props.flagForEditTag && !this.props.flagForAddTag)} id={this.props.mytag.id}
                    defaultValue={this.props.mytag.value} style={{ border:'none' }}
                    onChange={this.props.handleChangeOfTag} onKeyPress={this.onKeyPress} onKeyUp={this.onKeyPress} pattern={RegexUtils.regexes.customTag}
                    />
                    <a onClick={this.clearTag} className="searchClear" style={{ display:`${this.state.displayDelTag ? 'block' : 'none'}` }}>
                      <span className="icon icon-clear"></span>
                    </a>
                    <a className="float-right" onClick={this.deleteTag}>{this.props.content.deleteButton}</a>
                   </div>
                }
            </div>

    );
  },

});

module.exports = TagItem;
