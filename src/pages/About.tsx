import { motion } from "framer-motion";
import { Leaf, Brain, Shield, Heart } from "lucide-react";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Leaf className="w-4 h-4" />
            About PlantGuard
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Protecting Plants with AI</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            PlantGuard uses cutting-edge machine learning to help gardeners and farmers detect plant diseases early, 
            get treatment recommendations, and grow healthier crops.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Brain, title: "AI-Powered", desc: "TensorFlow.js model runs directly in your browser — no data leaves your device." },
            { icon: Shield, title: "Reliable Detection", desc: "Trained on thousands of plant leaf images for accurate disease identification." },
            { icon: Heart, title: "Made for Everyone", desc: "Simple interface designed for home gardeners, students, and farmers alike." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">How It Works</h2>
          <div className="space-y-4">
            {[
              "Upload a photo of your plant leaf through our simple drag-and-drop interface.",
              "Our TensorFlow.js model analyzes the image directly in your browser — fast and private.",
              "Get instant results with disease identification, confidence scores, and treatment plans.",
              "Access organic and chemical treatment options along with prevention tips.",
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full gradient-nature text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-muted-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
