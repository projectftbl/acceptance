module.exports = function(rules, tags) {
  var testRule = function(rule) {
    for (var i = 0, length = rule.length; i < length; i++) {

      if (rule[i][0] === '~') {
        if (tags.indexOf(rule[i].slice(1)) >= 0) {
          return false;
        }
      } else {
        if (tags.indexOf(rule[i]) < 0) {
          return false;
        }
      }
    }

    return true;
  };

  if (!rules || rules.length === 0) return true;
  
  for (var i = 0, length = rules.length; i < length; i++) {
    if (!rules[i].length || testRule(rules[i])) {
      return true;
    }
  }

  return false;
};
