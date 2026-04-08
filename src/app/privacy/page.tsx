import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-white/80">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Torna all&apos;app</Link>
        <h1 className="text-3xl font-bold text-white mb-2">Informativa sulla Privacy</h1>
        <p className="text-white/40 text-sm mb-10">Ultimo aggiornamento: 8 aprile 2026</p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Titolare del trattamento</h2>
        <p className="mb-3">
          CR International LLC, con sede legale in 8 The Green Ste A, Dover, Delaware 19901, USA,
          in persona del legale rappresentante pro tempore Edoardo Barravecchia
          (&quot;noi&quot;, &quot;nostro&quot;), e&apos; il titolare del trattamento dei dati personali raccolti tramite la piattaforma
          Reel Script Writer.
        </p>
        <p className="mb-3">Email di contatto: <strong>info@consultingrevolution.agency</strong></p>
        <p className="mb-3">
          Il Titolare non ha designato un Responsabile della Protezione dei Dati (DPO),
          in quanto non ricorrono le condizioni di cui all&apos;art. 37 del GDPR.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Dati raccolti</h2>
        <p className="mb-3">Raccogliamo le seguenti categorie di dati personali:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Dati di registrazione:</strong> indirizzo email, password (conservata esclusivamente in forma di hash crittografico, mai in chiaro).</li>
          <li><strong>Contenuti caricati dall&apos;utente:</strong> documenti PDF caricati per l&apos;estrazione del testo e la generazione di script.</li>
          <li><strong>Script generati:</strong> testi prodotti dall&apos;intelligenza artificiale basati sugli input dell&apos;utente.</li>
          <li><strong>Dati tecnici:</strong> indirizzo IP (raccolto al momento della registrazione per finalita&apos; di audit GDPR).</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Finalita&apos; del trattamento e base giuridica</h2>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Esecuzione del contratto (Art. 6(1)(b) GDPR):</strong> fornitura del servizio di generazione script, gestione dell&apos;account utente.</li>
          <li><strong>Consenso (Art. 6(1)(a) GDPR):</strong> registrazione al servizio e accettazione della presente informativa.</li>
          <li><strong>Interesse legittimo (Art. 6(1)(f) GDPR):</strong> sicurezza della piattaforma, prevenzione frodi, miglioramento del servizio.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Processo decisionale automatizzato</h2>
        <p className="mb-3">
          Il servizio utilizza algoritmi di intelligenza artificiale (Anthropic Claude) per generare script
          per Instagram Reels basati sugli input dell&apos;utente. Gli script generati hanno natura esclusivamente
          di suggerimento e non producono effetti giuridici ne&apos; incidono in modo analogo significativamente sull&apos;interessato.
          L&apos;utente mantiene piena discrezionalita&apos; nell&apos;utilizzo dei risultati.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Responsabili del trattamento (sub-processori)</h2>
        <p className="mb-3">Per erogare il servizio, ci avvaliamo dei seguenti fornitori terzi:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Anthropic PBC</strong> (USA) — generazione script AI tramite il modello Claude.</li>
          <li><strong>Supabase Inc.</strong> (USA) — autenticazione utenti e archiviazione dati.</li>
          <li><strong>Netlify Inc.</strong> (USA) — hosting dell&apos;applicazione.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Trasferimento dati extra-UE</h2>
        <p className="mb-3">
          I sub-processori indicati hanno sede negli Stati Uniti. Il trasferimento dei dati e&apos;
          effettuato sulla base del EU-US Data Privacy Framework (DPF) e/o delle Clausole Contrattuali
          Standard (SCC) approvate dalla Commissione Europea.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Conservazione dei dati</h2>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Account attivo:</strong> i dati vengono conservati per l&apos;intera durata dell&apos;account.</li>
          <li><strong>Cancellazione dell&apos;account:</strong> tutti i dati personali vengono eliminati permanentemente entro 30 giorni dalla richiesta.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. Diritti dell&apos;interessato</h2>
        <p className="mb-3">In qualita&apos; di interessato, hai diritto a:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li><strong>Diritto di accesso (Art. 15)</strong></li>
          <li><strong>Diritto di rettifica (Art. 16):</strong> puoi aggiornare i tuoi dati contattandoci via email.</li>
          <li><strong>Diritto alla cancellazione (Art. 17):</strong> puoi richiedere l&apos;eliminazione del tuo account e di tutti i dati associati.</li>
          <li><strong>Diritto alla portabilita&apos; (Art. 20)</strong></li>
          <li><strong>Diritto di opposizione (Art. 21):</strong> puoi opporti al trattamento contattandoci via email.</li>
          <li><strong>Diritto di limitazione (Art. 18):</strong> puoi richiedere la limitazione del trattamento contattandoci via email.</li>
          <li><strong>Diritto di reclamo:</strong> hai il diritto di presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Violazione dei dati (Data Breach)</h2>
        <p className="mb-3">In caso di violazione dei dati personali, provvederemo a:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>Notificare l&apos;autorita&apos; di controllo competente entro 72 ore dalla scoperta della violazione (Art. 33 GDPR).</li>
          <li>Comunicare la violazione agli interessati senza ingiustificato ritardo qualora presenti un rischio elevato (Art. 34 GDPR).</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Cookie e tecnologie di tracciamento</h2>
        <p className="mb-3">
          Per informazioni sui cookie e le tecnologie di tracciamento, si prega di consultare la nostra{" "}
          <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300">Cookie Policy</Link>.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">11. Modifiche alla presente informativa</h2>
        <p className="mb-3">
          Ci riserviamo il diritto di aggiornare la presente informativa. In caso di modifiche sostanziali,
          ne daremo comunicazione tramite email con almeno 15 giorni di preavviso.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">12. Contatti</h2>
        <p className="mb-3">
          Per qualsiasi domanda relativa alla privacy dei tuoi dati:<br />
          <strong>CR International LLC</strong><br />
          Email: <strong>info@consultingrevolution.agency</strong>
        </p>
      </main>
      <Footer />
    </div>
  );
}
