import Link from "next/link";
import Image from "next/image";
import logoCr from "../../public/logo-cr-white.png";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-dark py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Image
          src={logoCr}
          alt="Consulting Revolution"
          height={24}
          className="h-6 w-auto"
        />
        <div className="flex items-center gap-2 text-sm">
          <Link href="/privacy" className="text-white/60 hover:text-white/90 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/terms" className="text-white/60 hover:text-white/90 transition-colors">
            Termini di Servizio
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/cookies" className="text-white/60 hover:text-white/90 transition-colors">
            Cookie Policy
          </Link>
        </div>
        <p className="text-white/30 text-xs">
          &copy; 2026 CR International LLC &mdash; Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}
