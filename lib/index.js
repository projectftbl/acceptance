var getYadda = require('./yadda')
  , decode = require('./decode')
  , seleniumStandalone = require('selenium-standalone');

module.exports = function(opts) {
  var options = //assign(opts || {}, {
                  {
                    stepFilePatterns: [ 'test/steps/*.js' ]
                  , featureFilePatterns: [ 'test/features/*.feature' ]
                  , localisation: 'English'
                  , browser: 'chrome'
                  , reporter: 'mochawesome'
                  , tags: []
                  };

  seleniumStandalone.start({ seleniumArgs: [] }, function() {
    var mocha = decode(options.featureFilePatterns, getYadda(options), options);
    
    mocha.run(function() {
      process.exit();
    });
  });
};
