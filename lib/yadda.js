var path = require('path')
  , glob = require('glob-all')
  , yadda = require('yadda');

var getStepsLibrary = function(patterns, localisation) {
  var lib = localisation ? yadda.localisation[localisation].library() : new yadda.Library();

  patterns = patterns.map(function(pattern) {
    return path.join(process.cwd(), pattern);
  });

  glob.sync(patterns).forEach(function(path) {
    require(path)(lib);
  });

  return lib;
};

module.exports = function(options) {
  return new yadda.Yadda(getStepsLibrary(options.stepFilePatterns, options.localisation));
};
