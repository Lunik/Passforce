var Usage = require('command-line-usage')

var banner = require('./banner.js')

var sections = [
  {
    content: banner,
    raw: true
  }
]

module.exports = Usage(sections)