import * as tf from "@tensorflow/tfjs"

export async function loadModel(){

const model = await tf.loadGraphModel("/model/model.json")

return model

}