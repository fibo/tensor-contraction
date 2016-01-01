/**
 * Tensor contraction
 *
 * @params {Function} addition
 * @params {Array} indicesPair
 * @params {Array} tensorDim
 * @params {Array} tensorData
 * @returns {Array} contractedTensorData
 */

function tensorContraction (addition, indicesPair, tensorDim, tensorData) {
  var contractedTensorData = []

  var i0 = indicesPair[0]
  var i1 = indicesPair[1]
  var dim0 = tensorDim[i0]
  var dim1 = tensorDim[i1]

  if (dim0 !== dim1) {
    throw new TypeError('Contraction indices does not have the same dimension: ' + i0 + '-th index = ' + dim0 + ' but ' + i1 + '-th index = ' + dim1)
  }

  return contractedTensorData
}

module.exports = tensorContraction
