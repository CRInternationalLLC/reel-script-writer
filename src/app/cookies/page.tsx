import Link from "next/link";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-white/80">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Torna all&apos;app</Link>
        <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-white/40 text-sm mb-10">Ultimo aggiornamento: 8 aprile 2026</p>

        <p className="mb-3">
          Il presente documento contiene informazioni in merito alle tecnologie di tracciamento
          utilizzate dalla piattaforma Reel Script Writer (di seguito, l&apos;&quot;Applicazione&quot;).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Titolare del trattamento</h2>
        <p className="mb-3">
          CR International LLC, con sede legale in 8 The Green Ste A, Dover, Delaware 19901, USA,
          in persona del legale rappresentante pro tempore Edoardo Barravecchia.<br />
          Email di contatto: <strong>info@consultingrevolution.agency</strong>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Cookie e strumenti di tracciamento utilizzati</h2>
        <p className="mb-3">
          <strong>Questa Applicazione non utilizza cookie di alcun tipo</strong>, ne&apos; di prima parte ne&apos; di terza parte.
          In particolare, non vengono utilizzati:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Cookie tecnici o di sessione:</strong> non necessari. L&apos;autenticazione e&apos; gestita da Supabase tramite token conservati nel browser.</li>
          <li><strong>Cookie analitici:</strong> non utilizzati. L&apos;Applicazione non integra Google Analytics, Meta Pixel, ne&apos; alcun altro strumento di analisi del traffico.</li>
          <li><strong>Cookie di profilazione o marketing:</strong> non utilizzati. L&apos;Applicazione non effettua attivita&apos; di profilazione pubblicitaria ne&apos; retargeting.</li>
          <li><strong>Cookie di terze parti:</strong> non presenti. L&apos;Applicazione non carica risorse esterne che possano impostare cookie sul dispositivo dell&apos;utente.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Tecnologie di autenticazione</h2>
        <p className="mb-3">
          L&apos;Applicazione utilizza Supabase Auth per la gestione dell&apos;autenticazione. I token di sessione
          sono gestiti in conformita&apos; con le best practice di sicurezza e non richiedono il consenso
          ai sensi della normativa sui cookie in quanto strettamente necessari al funzionamento del servizio.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Risorse esterne</h2>
        <p className="mb-3">
          Le connessioni a servizi esterni avvengono esclusivamente su azione dell&apos;utente:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Supabase Inc.</strong> — autenticazione e archiviazione dati.</li>
          <li><strong>Anthropic PBC</strong> — generazione script AI (comunicazione server-to-server, senza coinvolgimento del browser dell&apos;utente).</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Banner cookie</h2>
        <p className="mb-3">
          In conformita&apos; con l&apos;art. 122 del D.Lgs. 196/2003 e le Linee Guida del Garante per la protezione
          dei dati personali del 10 giugno 2021,{" "}
          <strong>l&apos;Applicazione non presenta un banner cookie</strong> in quanto non utilizza alcun cookie
          o strumento di tracciamento che richieda il consenso dell&apos;utente.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Come controllare i cookie nel browser</h2>
        <p className="mb-3">
          Sebbene questa Applicazione non imposti cookie, l&apos;utente puo&apos; verificare e gestire i cookie
          nel proprio browser:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Apple Safari</a></li>
          <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Microsoft Edge</a></li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Modifiche alla presente Cookie Policy</h2>
        <p className="mb-3">
          Il Titolare si riserva il diritto di apportare modifiche alla presente Cookie Policy.
          Qualora venissero introdotti cookie o strumenti di tracciamento in futuro, la presente
          policy verra&apos; aggiornata e verra&apos; implementato un banner di consenso conforme alla normativa vigente.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contatti</h2>
        <p className="mb-3">
          Per qualsiasi domanda relativa alla presente Cookie Policy:<br />
          <strong>CR International LLC</strong><br />
          Email: <strong>info@consultingrevolution.agency</strong>
        </p>
      </main>
      <Footer />
    </div>
  );
}
