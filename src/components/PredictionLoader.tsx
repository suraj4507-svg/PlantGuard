import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function PredictionLoader() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <Leaf className="w-8 h-8 text-primary" />
      </motion.div>
      <div className="text-center">
        <p className="font-semibold text-foreground">Analyzing your plant...</p>
        <p className="text-sm text-muted-foreground mt-1">Running AI detection model</p>
      </div>
      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-nature rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
