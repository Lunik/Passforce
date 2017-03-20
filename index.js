var Prompt = require('prompt-password')

var section = require('./section.js')
var Tester = require('./tester.js')
var OuputFormater = require('./formatOutput.js')

var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password',
  name: 'password'
})

prompt.run()
.then(function(password) {
  console.log(section)
  var tester = new Tester(password)
  console.log(OuputFormater({
  	results: tester.run(),
  	total: tester.total()
  }))
})

