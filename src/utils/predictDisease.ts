import * as tf from "@tensorflow/tfjs"
import { getDiseaseName } from "./diseaseMapper"

export type PredictionResult = {
  diseaseName: string
  confidence: number
}

let cachedModel: tf.GraphModel | null = null

async function getModel() {
  if (!cachedModel) {
    cachedModel = await tf.loadGraphModel("/model/model.json")
  }
  return cachedModel
}

export async function predictDisease(_model: tf.LayersModel | undefined, image: HTMLImageElement): Promise<PredictionResult> {
  const graphModel = await getModel()

  const tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
    .div(255)

  const out = await graphModel.executeAsync(tensor)
  const prediction = Array.isArray(out) ? (out[0] as tf.Tensor) : (out as tf.Tensor)
  const data = Array.from(await prediction.data())
  const max = Math.max(...data)
  const index = data.indexOf(max)

  tf.dispose([tensor, prediction])
  return {
    diseaseName: getDiseaseName(index),
    confidence: max * 100,
  }
}
