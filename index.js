var indicesPermutations = require('indices-permutations')
var multiDimArrayIndex = require('multidim-array-index')

/**
 * Computes tensor contraction
 *
 * @params {Function} addition
 * @params {Array} indicesPair
 * @params {Array} tensorDim
 * @params {Array} tensorData
 * @returns {Array} contractedTensorData
 */

function tensorContraction (addition, indicesPair, tensorDim, tensorData) {
  console.log(arguments)
  // Sort indices pair, otherwise algorithm gets unnecessary complicated.
  indicesPair.sort()

  var p0 = indicesPair[0]
  var p1 = indicesPair[1]
  var dim0 = tensorDim[p0]
  var dim1 = tensorDim[p1]

  if (dim0 !== dim1) {
    throw new TypeError('Contraction indices does not have the same dimension: ' + p0 + '-th index = ' + dim0 + ' but ' + p1 + '-th index = ' + dim1 + '.')
  }

  var tensorOrder = tensorDim.length

  var varyingTensorDim = tensorDim.reduce(function (result, element, index) {
    if ((index === p0) || (index === p1)) {
      result.push(element)
    }

    return result
  }, [])

  console.log('varyingTensorDim'+varyingTensorDim)
  function copyArray (result, element) {
    result.push(element)

    return result
  }

  // Since it is a reduce callback, previous argument is necessary but ignored.
  function sumOverVaryingTensorDim (previous, pairCombination) {
    console.log(pairCombination)
    var result = null

    var index0 = pairCombination[0]
    var index1 = pairCombination[1]

    function addToResult (varyingCombination) {
      console.log('varyingCombination'+varyingCombination)

      var combination = varyingCombination.reduce(copyArray, [])
      combination.splice(p0, 0, index0)
      combination.splice(p1, 0, index1)
      console.log('combination'+combination)

      var index = multiDimArrayIndex(tensorDim, combination)

      var element = tensorData[index]

      if (result === null) {
        result = element
      } else {
        result = addition(result, element)
      }
      debugger
    }

    varyingTensorDim
      .reduce(indicesPermutations, [])
      .forEach(addToResult)

    return result
  }

  var contractedTensorData = [dim0, dim1].reduce(indicesPermutations, [])
                                         .reduce(sumOverVaryingTensorDim, [])

  // If given tensor has order 2, the contracted tensor will be a scalar
  // so it makes sense to return an element, not an array.
  if (tensorOrder === 2) {
//    return contractedTensorData[0]
  } else {
    return contractedTensorData
  }
}

module.exports = tensorContraction
