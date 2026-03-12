import { Leaf, Sun, Droplets } from "lucide-react";
import { motion } from "framer-motion";

interface PlantSuggestionCardProps {
  name: string;
  type: string;
  sunlight: string;
  watering: string;
  description: string;
  index?: number;
}

export default function PlantSuggestionCard({ name, type, sunlight, watering, description, index = 0 }: PlantSuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-nature transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          whileHover={{ rotate: 20 }}
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Leaf className="w-5 h-5 text-primary" />
        </motion.div>
        <div>
          <h3 className="font-display font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>
      <div className="flex gap-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          <Sun className="w-3 h-3 text-sun" />
          {sunlight}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          <Droplets className="w-3 h-3 text-primary" />
          {watering}
        </div>
      </div>
    </motion.div>
  );
}
