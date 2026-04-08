"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          setError("Email o password non corretti.");
        } else {
          setError(error.message);
        }
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Errore imprevisto. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 sm:p-10 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center mb-2">
              <img
                src="/logo-cr-white.png"
                alt="Consulting Revolution"
                className="h-8"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Reel Script Writer</h1>
            <p className="text-sm text-text-muted">
              Generatore di script per Instagram Reels
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                required
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20 transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-btn py-3 rounded-xl text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Accesso in corso...
                </>
              ) : (
                "Accedi"
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={async () => {
                if (!email) {
                  setError("Inserisci la tua email per recuperare la password.");
                  return;
                }
                setError(null);
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) {
                  setError(error.message);
                } else {
                  setError(null);
                  alert("Email di recupero inviata! Controlla la tua casella.");
                }
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Password dimenticata?
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
