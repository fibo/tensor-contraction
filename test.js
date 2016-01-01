var tensorContraction = require('./index')
var test = require('tape')

function addition (a, b) { return a + b }

var contraction = tensorContraction.bind(null, addition)

test('matrix trace', function (t) {
  t.plan(1)

  t.equal(contraction([0, 1], [3, 3], [1, 2, 3,
                                       4, 5, 6,
                                       7, 8, 9]), 15)
})

test('indices pair check', function (t) {
  t.plan(1)

  t.throws(function () {
    contraction([0, 1], [3, 2], [1, 2, 3,
                                 4, 5, 6])
  }, /Contraction indices does not have the same dimension: 0-th index = 3 but 1-th index = 2/)
})
