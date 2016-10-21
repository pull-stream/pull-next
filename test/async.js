var assert = require('assert')
var pull = require('pull-stream')
var asyncNext = require('../async')

var arrays = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f']
]

pull(
  asyncNext(function (cb) {
    if (arrays.length === 0) cb(null, false)
    else cb(null, pull.values(arrays.shift()))
  }),
  pull.collect(function (err, data) {
    assert.ifError(err, 'no error')
    assert.deepEqual(
      data,
      ['a', 'b', 'c', 'd', 'e', 'f'],
      'pulls all data'
    )
  })
)
