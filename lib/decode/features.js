var path = require('path')
  , glob = require('glob-all')
  , feature = require('./feature');

module.exports = function(patterns, yadda, options) {
  patterns = patterns.map(function(pattern) {
    return path.join(process.cwd(), pattern);
  });

  return glob.sync(patterns).map(function(path) {
    return feature(path, yadda, options);
  });
};
