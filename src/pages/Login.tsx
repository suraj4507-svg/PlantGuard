import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { ensureProfile, signIn, parseAuthError, resendConfirmation, resetPassword } from "@/utils/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    signIn(email.trim(), password).then(async ({ data, error }) => {
      if (error) {
        const mapped = parseAuthError(error);
        setError(mapped.message);
        return;
      }
      if (data.session) {
        await ensureProfile();
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-primary mb-2">
            <Leaf className="w-8 h-8" />
            PlantGuard
          </Link>
          <p className="text-muted-foreground">Welcome back! Sign in to your account.</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full gradient-nature text-primary-foreground py-2.5 rounded-xl font-semibold transition-opacity hover:opacity-90"
            >
              Sign In
            </button>
          </form>
          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
          <div className="flex items-center justify-between mt-3 text-sm">
            <button
              type="button"
              onClick={() => {
                setInfo(null);
                resendConfirmation(email.trim(), window.location.origin).then(({ error }) => {
                  if (error) setError(parseAuthError(error).message);
                  else setInfo("Confirmation email sent. Check your inbox.");
                });
              }}
              className="text-primary hover:underline disabled:opacity-60"
              disabled={!email}
            >
              Resend confirmation
            </button>
            <button
              type="button"
              onClick={() => {
                setInfo(null);
                resetPassword(email.trim(), window.location.origin).then(({ error }) => {
                  if (error) setError(parseAuthError(error).message);
                  else setInfo("Password reset email sent.");
                });
              }}
              className="text-primary hover:underline disabled:opacity-60"
              disabled={!email}
            >
              Forgot password
            </button>
          </div>
          {info && <p className="text-sm text-muted-foreground mt-2">{info}</p>}
          <p className="text-sm text-muted-foreground text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
