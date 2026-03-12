import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Sprout, Shield, Leaf } from "lucide-react";
import type { Treatment } from "@/utils/getTreatment";

interface DiseaseResultCardProps {
  diseaseName: string;
  confidence: number;
  treatment: Treatment | null;
  imageUrl?: string;
}

export default function DiseaseResultCard({ diseaseName, confidence, treatment, imageUrl }: DiseaseResultCardProps) {
  const isHealthy = diseaseName.toLowerCase() === "healthy";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="space-y-6"
    >
      {/* Result header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-card border border-border overflow-hidden relative"
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <div className="flex flex-col md:flex-row gap-6 relative">
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt="Analyzed plant"
              className="w-32 h-32 rounded-xl object-cover shadow-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            />
          )}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-2"
            >
              {isHealthy ? (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: 2 }}>
                  <CheckCircle className="w-6 h-6 text-accent" />
                </motion.div>
              ) : (
                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <AlertTriangle className="w-6 h-6 text-sun" />
                </motion.div>
              )}
              <h2 className="font-display text-2xl font-bold text-foreground">{diseaseName}</h2>
            </motion.div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className={`h-full rounded-full ${isHealthy ? "gradient-leaf" : "gradient-nature"}`}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-sm font-bold text-primary"
              >
                {confidence.toFixed(1)}%
              </motion.span>
            </div>
            {treatment && <p className="text-sm text-muted-foreground">{treatment.description}</p>}
          </div>
        </div>
      </motion.div>

      {treatment && !isHealthy && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Sprout, color: "text-accent", title: "Organic Treatment", content: treatment.organicTreatment },
            { icon: Shield, color: "text-primary", title: "Chemical Treatment", content: treatment.chemicalTreatment },
            { icon: Leaf, color: "text-nature", title: "Prevention", content: null, list: treatment.prevention },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -3 }}
              className="bg-card rounded-2xl p-5 shadow-card border border-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <h3 className="font-display font-bold text-foreground">{card.title}</h3>
              </div>
              {card.content ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
              ) : (
                <ul className="text-sm text-muted-foreground space-y-1">
                  {card.list?.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
