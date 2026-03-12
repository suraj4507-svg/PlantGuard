import { useState, useRef } from "react"
import * as tf from "@tensorflow/tfjs"

import { preprocessImage } from "../utils/preprocessImage"
import { predictDisease } from "../utils/predictDisease"
import { getDiseaseName } from "../utils/diseaseMapper"
import { loadModel } from "../utils/loadModel"
import { supabase } from "../lib/supabase"

export default function Detect() {

  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<{ disease: string; treatment: { organic?: string; chemical?: string; prevention?: string } | null } | null>(null)
  const [loading, setLoading] = useState(false)

  const imageRef = useRef<HTMLImageElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files[0]

    if (!file) return

    const url = URL.createObjectURL(file)

    setImage(url)
  }

  async function analyzePlant() {

    if (!imageRef.current) return

    setLoading(true)

    const model = await loadModel()

    const tensor = preprocessImage(imageRef.current)

    const index = await predictDisease(undefined, imageRef.current)

    const disease = getDiseaseName(index)

    let data: { organic?: string; chemical?: string; prevention?: string } | null = null
    if (supabase) {
      const res = await supabase
        .from("treatments")
        .select("*")
        .eq("disease", disease)
        .single()
      data = res.data as { organic?: string; chemical?: string; prevention?: string } | null
    }

    setResult({
      disease,
      treatment: data
    })

    setLoading(false)
  }

  return (

    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Plant Disease Detection 🌿
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {image && (
        <div>

          <img
            ref={imageRef}
            src={image}
            alt="plant"
            className="w-full rounded-lg mb-4"
          />

          <button
            onClick={analyzePlant}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Detect Disease
          </button>

        </div>
      )}

      {loading && (
        <p className="mt-4">Analyzing plant...</p>
      )}

      {result && (

        <div className="mt-6 border p-4 rounded-lg">

          <h2 className="text-xl font-semibold">
            Disease: {result.disease}
          </h2>

          <p className="mt-2">
            Organic Treatment: {result.treatment?.organic}
          </p>

          <p>
            Chemical Treatment: {result.treatment?.chemical}
          </p>

          <p>
            Prevention: {result.treatment?.prevention}
          </p>

        </div>

      )}

    </div>
  )
}
