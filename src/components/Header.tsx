"use client";

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userEmail?: string;
}

export default function Header({ userEmail }: HeaderProps) {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="pt-12 pb-8 px-4 text-center relative">
      {userEmail && (
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <span className="text-xs text-text-muted hidden sm:inline">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-text-muted/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20"
          >
            Esci
          </button>
        </div>
      )}

      <div className="inline-block gradient-border mb-8">
        <div className="gradient-border-inner text-xs font-medium tracking-widest uppercase text-text-muted">
          Metodo Consulting Revolution
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
        Scrivi il tuo Reel.
        <br />
        <span className="gradient-text">Conquista il feed.</span>
      </h1>

      <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Compila i campi richiesti e l&apos;AI generer&agrave; 3 script di reels
        pronti per esser registrati e basati sul tuo stile comunicativo.
      </p>
    </header>
  );
}
