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
  var contractedTensorData = []

  // Sort indices pair, otherwise algorithm gets unnecessary complicated.
  indicesPair.sort()

  var i0 = indicesPair[0]
  var i1 = indicesPair[1]
  var dim0 = tensorDim[i0]
  var dim1 = tensorDim[i1]

  if (dim0 !== dim1) {
    throw new TypeError('Contraction indices does not have the same dimension: ' + i0 + '-th index = ' + dim0 + ' but ' + i1 + '-th index = ' + dim1 + '.')
  }

  var tensorOrder = tensorDim.length

  function copyArray (result, element) {
    result.push(element)

    return result
  }

  function sumOverPairedIndices (contractedCombination) {
    var firstCombination = contractedCombination.reduce(copyArray, [])
    firstCombination.splice(i0, 0, 0)
    firstCombination.splice(i1, 0, 0)

    var firstIndex = multiDimArrayIndex(tensorDim, firstCombination)

    var result = tensorData[firstIndex]

    for (var i = 1; i < dim0; i++) {
      var combination = contractedCombination.reduce(copyArray, [])
      combination.splice(i0, 0, i)
      combination.splice(i1, 0, i)

      var index = multiDimArrayIndex(tensorDim, combination)

      var element = tensorData[index]

      result = addition(result, element)
    }

    contractedTensorData.push(result)
  }

  // If given tensor has order 2, the contracted tensor will be a scalar
  // so it makes sense to return an element, not an array.
  // Furthermore, contractedTensorDim computed below will result in an empty
  // array so the sumOverPairedIndices function had to be called once directly.
  if (tensorOrder === 2) {
    sumOverPairedIndices([])

    return contractedTensorData[0]
  }

  // Follows generic algorithm valid for tensors of order greater than two.
  var contractedTensorDim = tensorDim.reduce(function (result, element, index) {
    if ((index !== i0) && (index !== i1)) {
      result.push(element)
    }

    return result
  }, [])

  contractedTensorDim
    .reduce(indicesPermutations, [])
    .forEach(sumOverPairedIndices)

  return contractedTensorData
}

module.exports = tensorContraction
