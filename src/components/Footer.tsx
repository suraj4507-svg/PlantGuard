import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary mb-3">
              <Leaf className="w-6 h-6" />
              PlantGuard
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered plant health detection helping gardeners and farmers protect their crops with smart technology.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="font-display font-bold text-foreground mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { to: "/detect", label: "Disease Detection" },
                { to: "/weather", label: "Weather Advice" },
                { to: "/advisor", label: "Plant Advisor" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-muted-foreground hover:text-primary transition-colors story-link">
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="font-display font-bold text-foreground mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built with 🌿 for plant lovers everywhere.<br />
              Powered by TensorFlow.js & React.
            </p>
          </motion.div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2026 PlantGuard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
