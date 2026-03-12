import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import PlantSuggestionCard from "@/components/PlantSuggestionCard";

const plants = [
  { name: "Snake Plant", type: "Indoor • Succulent", sunlight: "Low-Medium", watering: "Every 2-3 weeks", description: "Air-purifying and nearly indestructible. Perfect for beginners and low-light spaces." },
  { name: "Basil", type: "Herb • Annual", sunlight: "Full Sun", watering: "Daily", description: "Fragrant culinary herb. Great for kitchen gardens and companion planting with tomatoes." },
  { name: "Lavender", type: "Perennial • Flowering", sunlight: "Full Sun", watering: "Weekly", description: "Drought-tolerant flowering herb with calming fragrance. Attracts pollinators." },
  { name: "Tomato", type: "Vegetable • Annual", sunlight: "Full Sun", watering: "Regular", description: "Popular garden vegetable. Requires staking and regular feeding for best yields." },
  { name: "Aloe Vera", type: "Indoor • Succulent", sunlight: "Bright Indirect", watering: "Every 3 weeks", description: "Medicinal succulent with soothing gel. Easy care and air purifying properties." },
  { name: "Marigold", type: "Annual • Flowering", sunlight: "Full Sun", watering: "Regular", description: "Cheerful pest-repelling flowers. Excellent companion plant for vegetable gardens." },
  { name: "Mint", type: "Herb • Perennial", sunlight: "Partial Shade", watering: "Regular", description: "Fast-growing aromatic herb. Best grown in containers to prevent spreading." },
  { name: "Fern", type: "Indoor • Foliage", sunlight: "Low Light", watering: "Keep moist", description: "Lush tropical foliage plant. Thrives in humid bathrooms and shaded areas." },
];

export default function PlantAdvisor() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-nature" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Plant Advisor</h1>
          </div>
          <p className="text-muted-foreground mb-8">Discover the best plants for your space and skill level.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plants.map((plant, i) => (
            <PlantSuggestionCard key={plant.name} {...plant} index={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
