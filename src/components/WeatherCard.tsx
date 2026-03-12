import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  advice: string;
}

export default function WeatherCard({ temperature, humidity, windSpeed, condition, advice }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">{condition}</h3>
          <p className="text-sm text-muted-foreground">Current Conditions</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <Thermometer className="w-5 h-5 text-destructive mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{temperature}°C</p>
          <p className="text-xs text-muted-foreground">Temp</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <Droplets className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{humidity}%</p>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <Wind className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{windSpeed} km/h</p>
          <p className="text-xs text-muted-foreground">Wind</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-sm text-foreground font-semibold mb-1">🌱 Plant Care Advice</p>
        <p className="text-sm text-muted-foreground">{advice}</p>
      </div>
    </motion.div>
  );
}
