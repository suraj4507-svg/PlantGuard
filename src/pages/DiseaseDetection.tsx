import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import UploadBox from "@/components/UploadBox";
import PredictionLoader from "@/components/PredictionLoader";
import DiseaseResultCard from "@/components/DiseaseResultCard";
import { predictDisease, type PredictionResult } from "@/utils/predictDisease";
import { getTreatment, type Treatment } from "@/utils/getTreatment";

export default function DiseaseDetection() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageSelect = async (_file: File, preview: string) => {
    setImagePreview(preview);
    setResult(null);
    setError(null);
  };

  const runPrediction = async () => {
    if (!imagePreview) return;

    setLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imagePreview;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const prediction = await predictDisease(img);
      setResult(prediction);
      const t = await getTreatment(prediction.diseaseName);
      setTreatment(t);

      // Save to scan history
      const scanRecord = {
        name: prediction.diseaseName,
        confidence: parseFloat(prediction.confidence.toFixed(1)),
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        healthy: prediction.diseaseName.toLowerCase() === "healthy",
      };
      const existing = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      localStorage.setItem("scanHistory", JSON.stringify([scanRecord, ...existing].slice(0, 20)));
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        "Could not run prediction. Make sure the TensorFlow.js model files are in /public/model/ (model.json, group1-shard1.bin, group1-shard2.bin)."
      );
    } finally {
      setLoading(false);
    }
  };

  const treatmentData = treatment;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Upload a photo of a plant leaf and our AI will analyze it for diseases.
          </p>
        </motion.div>

        <UploadBox onImageSelect={handleImageSelect} />

        {imagePreview && !loading && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
            <button
              onClick={runPrediction}
              className="gradient-nature text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-nature"
            >
              Analyze Plant 🔬
            </button>
          </motion.div>
        )}

        {loading && (
          <div className="mt-8">
            <PredictionLoader />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <div className="mt-8">
            <DiseaseResultCard
              diseaseName={result.diseaseName}
              confidence={result.confidence}
              treatment={treatmentData}
              imageUrl={imagePreview || undefined}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
