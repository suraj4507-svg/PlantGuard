import * as tf from "@tensorflow/tfjs"

export function preprocessImage(imageElement) {

  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([224,224])
    .expandDims()
    .toFloat()
    .div(255)

  return tensor
}