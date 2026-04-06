import * as tf from "@tensorflow/tfjs"

let cachedModel: tf.GraphModel | null = null

export async function loadModel(): Promise<tf.GraphModel> {
  if (!cachedModel) {
    cachedModel = await tf.loadGraphModel("/model/model.json")
  }
  return cachedModel
}