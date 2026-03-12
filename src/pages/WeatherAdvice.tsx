import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import WeatherCard from "@/components/WeatherCard";
import { CloudSun, Umbrella, Sun, Snowflake, Loader2, MapPin } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  advice: string;
}

function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 65) return "Rainy";
  if (code <= 67) return "Freezing Rain";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Rain Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorm";
}

function getPlantAdvice(temp: number, humidity: number, windSpeed: number, code: number): string {
  if (code >= 95) return "Thunderstorm alert! Move potted plants indoors. Secure garden structures. Avoid working in the garden.";
  if (code >= 61) return "Heavy rain expected. Ensure proper drainage. Check for waterlogging. Delay fertilizer application until rain stops.";
  if (code >= 51) return "Light rain — great natural watering! Skip manual watering today. Watch for slug and snail activity.";
  if (temp >= 38) return "Extreme heat! Water deeply in early morning and evening. Provide shade cloth for sensitive plants. Mulch heavily to retain moisture.";
  if (temp >= 32) return "Hot conditions — water plants early morning to reduce evaporation. Monitor for heat stress signs like wilting leaves.";
  if (temp <= 5) return "Near freezing! Protect tender plants with frost cloth. Move tropical plants indoors. Reduce watering frequency.";
  if (humidity >= 80) return "High humidity increases fungal disease risk. Ensure good air circulation. Avoid overhead watering. Inspect leaves for mildew.";
  if (humidity <= 30) return "Very dry air. Increase watering frequency. Mist tropical houseplants. Use mulch to conserve soil moisture.";
  if (windSpeed >= 30) return "Strong winds! Stake tall plants. Provide windbreaks. Water more frequently as wind dries soil faster.";
  return "Good growing conditions! Water as needed, inspect for pests, and enjoy your garden. Perfect time for planting and transplanting.";
}

const seasonalTips = [
  { icon: Sun, title: "Summer", tips: ["Water early morning", "Provide shade cloth", "Mulch heavily", "Watch for pests"] },
  { icon: Umbrella, title: "Monsoon", tips: ["Improve drainage", "Apply fungicide preventively", "Stake tall plants", "Reduce watering"] },
  { icon: Snowflake, title: "Winter", tips: ["Protect from frost", "Reduce watering frequency", "Add compost", "Prune dead branches"] },
];

export default function WeatherAdvice() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Detecting location...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Reverse geocode for location name
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || geoData.address?.state || "Your Location";
          setLocationName(city);
        }

        // Fetch weather from Open-Meteo (free, no API key)
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );
        const data = await res.json();
        const current = data.current;

        const condition = getWeatherCondition(current.weather_code);
        const advice = getPlantAdvice(current.temperature_2m, current.relative_humidity_2m, current.wind_speed_10m, current.weather_code);

        setWeather({
          temperature: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          condition,
          advice,
        });
      } catch {
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        // Fallback to Pune
        setLocationName("Pune (default)");
        fetchWeather(18.5204, 73.8567);
      }
    );
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sun/10 flex items-center justify-center">
              <CloudSun className="w-5 h-5 text-sun" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Weather Advice</h1>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <p className="text-muted-foreground">{locationName}</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Fetching weather for your location...</p>
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-8">
              {error}
            </motion.div>
          ) : weather ? (
            <motion.div key="weather" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 max-w-md">
              <WeatherCard {...weather} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <h2 className="text-2xl font-bold text-foreground mb-6">Seasonal Care Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {seasonalTips.map((season, i) => (
            <motion.div
              key={season.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <season.icon className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-foreground">{season.title}</h3>
              </div>
              <ul className="space-y-2">
                {season.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
