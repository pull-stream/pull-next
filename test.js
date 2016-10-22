var next = require('./')
var pull = require('pull-stream')
var test = require('tape')

test('sequence of value streams', function (t) {
  var arrays = [['a','b'],['c','d']]
  pull(
    next(function () {
      return arrays.length ? pull.values(arrays.shift()) : false
    }),
    pull.collect(function (err, data) {
      t.ifError(err, 'no error')
      t.deepEqual(data, ['a','b','c','d'], 'collects all values')
      t.end()
    })
  )
})
