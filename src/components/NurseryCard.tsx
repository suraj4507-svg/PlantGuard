import { MapPin, Phone, Star } from "lucide-react";
import { motion } from "framer-motion";

interface NurseryCardProps {
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  index?: number;
}

export default function NurseryCard({ name, address, phone, rating, distance, index = 0 }: NurseryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-nature transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-display font-bold text-foreground">{name}</h3>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{distance}</span>
      </div>
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
          >
            <Star className={`w-4 h-4 ${i < rating ? "text-sun fill-sun" : "text-muted"}`} />
          </motion.div>
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
      </div>
      <div className="space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          {address}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          {phone}
        </div>
      </div>
    </motion.div>
  );
}
