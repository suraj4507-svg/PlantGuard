import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CloudSun, MapPin, Leaf, Activity, ArrowRight, TrendingUp, ScanLine } from "lucide-react";
import Layout from "@/components/Layout";

interface ScanRecord {
  name: string;
  confidence: number;
  date: string;
  healthy: boolean;
}

const quickActions = [
  { icon: Search, title: "Detect Disease", desc: "Upload & analyze a leaf", link: "/detect", color: "bg-primary/10 text-primary" },
  { icon: CloudSun, title: "Weather Advice", desc: "Care tips for today", link: "/weather", color: "bg-sun/10 text-sun" },
  { icon: MapPin, title: "Find Nurseries", desc: "Nearby garden centers", link: "/nurseries", color: "bg-accent/10 text-accent" },
  { icon: Leaf, title: "Plant Advisor", desc: "Best plants for you", link: "/advisor", color: "bg-nature/10 text-nature" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
} as const;

export default function Dashboard() {
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("scanHistory");
    if (stored) {
      try {
        setRecentScans(JSON.parse(stored));
      } catch {
        setRecentScans([]);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Welcome back! Here's your plant health overview.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {quickActions.map((action) => (
            <motion.div key={action.title} variants={fadeUp}>
              <Link
                to={action.link}
                className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-card border border-border hover-lift"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}
                >
                  <action.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats + Recent */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 shadow-card border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-foreground">Recent Scans</h2>
            </div>
            <AnimatePresence mode="wait">
              {recentScans.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <ScanLine className="w-12 h-12 text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground font-medium">No scans yet</p>
                  <p className="text-sm text-muted-foreground/70 mb-4">Upload a plant leaf to get your first diagnosis</p>
                  <Link
                    to="/detect"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Start Scanning <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div key="scans" className="space-y-3">
                  {recentScans.map((scan, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${scan.healthy ? "bg-accent" : "bg-sun"}`} />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{scan.name}</p>
                          <p className="text-xs text-muted-foreground">{scan.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-sm font-bold text-primary">{scan.confidence}%</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
            className="gradient-nature rounded-2xl p-6 text-primary-foreground flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary-foreground/5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
            <div className="relative z-10">
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <Leaf className="w-10 h-10 mb-4 opacity-80" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold mb-2">Scan a New Plant</h2>
              <p className="opacity-80 mb-4 text-sm">Upload a photo of your plant leaf to get an instant AI-powered health analysis.</p>
              <Link
                to="/detect"
                className="group inline-flex items-center gap-2 bg-card text-primary px-6 py-2.5 rounded-full font-semibold w-fit hover:bg-card/90 transition-colors hover-scale"
              >
                Start Scan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
