var React = require('react')

var About = React.createClass({
  render: function () {
    return <div className="about">
      <h1>Hexo Admin 插件</h1>
      <p><strong>目标：提供一个很棒的后台来管理你的博客。</strong></p>
      <p>
        相关连接:
        <ul>
          <li><a href="http://hexo.io">Hexo 官网</a></li>
          <li><a href="https://github.com/jaredly/hexo-admin">本插件的 Github</a></li>
          <li><a href="https://github.com/52cik/hexo-admin">本插件的 Github (中文版)</a></li>
        </ul>
      </p>
    </div>
  }
})

module.exports = About

