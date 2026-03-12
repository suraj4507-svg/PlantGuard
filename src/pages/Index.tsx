import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Search, CloudSun, MapPin, ArrowRight, Shield, Sprout, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  { icon: Search, title: "Disease Detection", desc: "Upload a leaf photo and our AI identifies diseases instantly.", link: "/detect" },
  { icon: Sprout, title: "Treatment Advice", desc: "Get organic & chemical treatment recommendations.", link: "/detect" },
  { icon: CloudSun, title: "Weather Advice", desc: "Plant care tips based on current weather conditions.", link: "/weather" },
  { icon: MapPin, title: "Find Nurseries", desc: "Locate nearby plant nurseries and garden centers.", link: "/nurseries" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
} as const;
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 100 } },
} as const;

export default function Index() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated bg elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: 80 + i * 40,
                height: 80 + i * 40,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20 - i * 5, 0],
                x: [0, 10 + i * 3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4 animate-wiggle" />
              AI-Powered Plant Care
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Keep Your Plants{" "}
              <motion.span
                className="text-primary inline-block"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Healthy
              </motion.span>{" "}
              & Thriving
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Detect plant diseases instantly with AI, get treatment recommendations, 
              and access expert plant care advice — all from your browser.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/detect"
                className="group inline-flex items-center justify-center gap-2 gradient-nature text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all shadow-nature hover-scale"
              >
                Start Detection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-3 rounded-full font-semibold border border-border hover:bg-muted transition-colors hover-scale"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative animated leaves */}
        <motion.div
          animate={{ y: [-10, 15, -10], rotate: [45, 50, 45] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-primary/15"
        >
          <Leaf className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -15, 10], rotate: [-12, -8, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 text-accent/15"
        >
          <Leaf className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [5, -20, 5], rotate: [20, 30, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-1/4 text-secondary/30"
        >
          <Leaf className="w-12 h-12" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground text-lg">Smart tools for smarter plant care</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Link
                to={f.link}
                className="group block bg-card rounded-2xl p-6 shadow-card border border-border hover-lift h-full"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                >
                  <f.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "99%", label: "Detection Accuracy" },
            { value: "6+", label: "Disease Types" },
            { value: "<2s", label: "Analysis Time" },
            { value: "100%", label: "Client-Side" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-nature rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary-foreground/5"
                style={{ width: 200 + i * 100, height: 200 + i * 100, right: -50 + i * 30, top: -50 + i * 20 }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 5 + i * 2, repeat: Infinity }}
              />
            ))}
          </div>
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield className="w-14 h-14 text-primary-foreground/80 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Protect Your Garden Today</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Upload a photo of your plant leaf and get an instant AI diagnosis with treatment recommendations.
            </p>
            <Link
              to="/detect"
              className="group inline-flex items-center gap-2 bg-card text-primary px-8 py-3 rounded-full font-semibold hover:bg-card/90 transition-colors hover-scale"
            >
              Try Disease Detection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
