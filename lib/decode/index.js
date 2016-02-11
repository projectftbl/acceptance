var Mocha = require('mocha')
	, features = require('./features');

module.exports = function(patterns, yadda, options) {
  var suites = features(patterns, yadda, options)
    , master = new Mocha({ reporter: options.reporter });
  
  suites.forEach(function(suite) {
    master.suite.addSuite(suite);
  });

  return master;
};
