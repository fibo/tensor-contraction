# tensor-contraction

> implements [tensor contraction][1] on a single [mixed tensor](https://en.wikipedia.org/wiki/Mixed_tensor)

## Install

With [npm](https://www.npmjs.com/) do

```
npm install tensor-contraction --save
```

## Usage

Signature is `(addition, tensorData, indicesPair)` where
* **addition** is a function that defines the scalar operator used
* **tensorData** is an array that defines the tensor components
* **indicesPair** is an array of two elements that indicates which indices will be used for contraction

It returns the **contractedTensorData** array given by the [tensors contraction][1].

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/tensor-contraction/blob/master/test.js).

Let's use common real addition.

```
var tensorContraction = require('tensor-contraction')

function addition (a, b) { return a + b }
```

## License

[MIT](http://g14n.info/mit-license/)

  [1]: https://en.wikipedia.org/wiki/Tensor_contraction "tensor contraction"
