var mocha = require('mocha')
  , decodeStepToTest = require('./step')
  , webdriverIO = require('webdriverio')
  , shouldRun = require('./shouldRun');

var getScenarioTags = function(scenario) {
	var tags = Object.keys(scenario.annotations) || [];

	return tags.map(function(tag) {
		return '@' + tag;
	});
};

module.exports = function(scenario, yadda, tags, browser) {
  var suite = new mocha.Suite(scenario.title)
    , browser = webdriverIO.remote({ desiredCapabilities: { browserName: browser }})
    , ctx = { annotations: scenario.annotations };

  suite.enableTimeouts(false);

  if (shouldRun(tags, getScenarioTags(scenario))) {

    suite.beforeAll('init browser', function(done) {
      browser.init().then(function() {
        ctx.browser = browser;
      }).call(done);
    });

    suite.afterAll('close browser', function(done) {
      browser.end().call(done);
    });

    scenario.steps.forEach(function(step) {
      suite.addTest(decodeStepToTest(step, ctx, yadda));
    });
    
  } else {
    scenario.steps.forEach(function(step) {
      suite.addTest(new Mocha.Test(step));
    });
  }

  return suite
};
