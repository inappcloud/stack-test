var assert = require('assert');
var test = require('mocha').test;

function eq(actual, expected, done) {
  try {
    assert.deepEqual(actual, expected);
    done();
  } catch(e) {
    done(e);
  }
}

module.exports = {
  runTests: function(fn, testCases, hook) {
    testCases.forEach(function(testCase) {
      test(testCase.name, function(done) {
        fn(testCase.args).then(function(v) {
          if (testCase.output !== 'error') {
            if (testCase.output !== undefined) {
              eq(v, testCase.output, done);
            } else {
              done();
            }

            if (hook !== undefined) {
              hook(testCase);
            }
          } else {
            done(new Error('function should have returned an error'));
          }
        }).catch(function(e) {
          if (testCase.output === 'error') {
            done();
          } else {
            done(e);
          }
        });
      });
    });
  }
};
