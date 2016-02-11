var fs = require('fs')
  , path = require('path')
  , mocha = require('mocha')
  , yadda = require('yadda')
  , parser = new yadda.parsers.FeatureParser()
  , decodeScenarioToSuite = require('./scenario');

var getTitle = function(item) {
  return item.title + '\n' + item.description.join(' ') + '\n';
};

var overlayFeatureAnnotations = function(scenario, annotations) {
  Object.keys(annotations).forEach(function(annotation) {
    scenario.annotations[annotation] = scenario.annotations[annotation] || annotations[annotation];
  });

  return scenario;
};

module.exports = function(path, yadda, options) {
  var feature = parser.parse(fs.readFileSync(path, 'UTF-8'))
    , suite = new mocha.Suite(getTitle(feature));

  feature.scenarios.forEach(function(scenario) {
    scenario = overlayFeatureAnnotations(scenario, feature.annotations);
    suite.addSuite(decodeScenarioToSuite(scenario, yadda, options.tags, options.browser));
  });
  
  return suite;
};
