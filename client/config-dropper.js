
var React = require('react/addons')
var AutoList = require('./auto-list')
var moment = require('moment')
var _ = require('lodash')
var cx = React.addons.classSet;

var dateFormat = 'YYYY-MM-DD HH:mm'

function toText(lst, map) {
  return lst.map((name) => map[name] || name)
}

var ConfigDropper = React.createClass({
  getInitialState: function () {
    var tac = this.props.tagsAndCategories
    return {
      open: false,
      date: moment(this.props.post.date).format(dateFormat),
      tags: toText(this.props.post.tags, tac.tags),
      categories: toText(this.props.post.categories, tac.categories),
      keywords: this.props.post.keywords,
      description: this.props.post.description,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.post === this.props.post) {
      return
    }
    var tac = nextProps.tagsAndCategories
    this.setState({
      date: moment(nextProps.post.date).format(dateFormat),
      tags: toText(nextProps.post.tags, tac.tags),
      categories: toText(nextProps.post.categories, tac.categories),
      keywords: nextProps.post.keywords,
      description: nextProps.post.description,
    })
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      document.addEventListener('mousedown', this._globalMouseDown)
    }
    if (!this.state.open && prevState.open) {
      document.removeEventListener('mousedown', this._globalMouseDown)
    }
  },

  _globalMouseDown: function (e) {
    var mine = this.getDOMNode()
    var node = e.target
    while (node) {
      if (!node.parentNode) return
      node = node.parentNode;
      if (node === document.body) break;
      if (node === mine) return;
    }
    this._onClose()
  },

  _toggleShow: function () {
    if (this.state.open) {
      this.save()
    }
    this.setState({
      open: !this.state.open
    })
  },

  _onClose: function () {
    this.save()
    this.setState({open: false})
  },

  _onChangeKeywords: function (e) {
    this.setState({
      keywords: e.target.value
    })
  },

  _onChangeDesc: function (e) {
    this.setState({
      description: e.target.value
    })
  },

  _onChangeDate: function (e) {
    this.setState({
      date: e.target.value
    })
  },

  _onChange: function (attr, value) {
    var update = {}
    update[attr] = value
    this.setState(update);
  },

  save: function () {
    var date = moment(this.state.date)
    if (!date.isValid()) {
      date = moment(this.props.post.date)
    }
    var tac = this.props.tagsAndCategories
    var tags = toText(this.props.post.tags, tac.tags)
    var categories = toText(this.props.post.categories, tac.categories)
    var keywords = this.props.post.keywords
    var description = this.props.post.description

    var textDate = date.toISOString()
    if (textDate === this.props.post.date &&
        _.isEqual(this.state.categories, categories) &&
        _.isEqual(this.state.tags, tags) &&
        _.isEqual(this.state.keywords, keywords) &&
        _.isEqual(this.state.description, description)) {
      return
    }
    this.props.onChange({
      date: date.toISOString(),
      categories: this.state.categories,
      tags: this.state.tags,
      keywords: this.state.keywords,
      description: this.state.description
    })
  },

  config: function () {
    return <div className="config">
      <div className="config_section">
        <div className="config_section-title">日期</div>
        <input
          className="config_date"
          value={this.state.date}
          onChange={this._onChangeDate}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">标签</div>
        <AutoList
          options={this.props.tagsAndCategories.tags}
          values={this.state.tags}
          onChange={this._onChange.bind(null, 'tags')}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">分类</div>
        <AutoList
          options={this.props.tagsAndCategories.categories}
          values={this.state.categories}
          onChange={this._onChange.bind(null, 'categories')}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">关键词</div>
        <input
          className="config_date"
          value={this.state.keywords}
          onChange={this._onChangeKeywords}/>
      </div>
      <div className="config_section">
        <div className="config_section-title">描述</div>
        <textarea
          className="config_date"
          value={this.state.description}
          onChange={this._onChangeDesc}/>
      </div>
    </div>
  },

  render: function () {
    return <div className={cx({
        "config-dropper": true,
        "config-dropper--open": this.state.open
      })}>
      <div className="config-dropper_handle"
           onClick={this._toggleShow}>
        <i className="fa fa-gear"/>
      </div>
      {this.state.open && this.config()}
    </div>
  }
})

module.exports = ConfigDropper
