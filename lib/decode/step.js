var mocha = require('mocha')
  , yadda = require('../yadda');

module.exports = function(step, ctx, yadda) {
  return new mocha.Test(step, function(done) {
    yadda.yadda([ step ], { ctx: ctx }, done);
  });
};
