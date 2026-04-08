import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-white/80">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Torna all&apos;app</Link>
        <h1 className="text-3xl font-bold text-white mb-2">Termini di Servizio</h1>
        <p className="text-white/40 text-sm mb-10">Ultimo aggiornamento: 8 aprile 2026</p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Oggetto del servizio</h2>
        <p className="mb-3">
          Reel Script Writer e&apos; una piattaforma di generazione automatizzata di script per Instagram Reels
          basata sull&apos;intelligenza artificiale, sviluppata da CR International LLC
          (8 The Green Ste A, Dover, Delaware 19901, USA).
          Il servizio genera script seguendo la metodologia Consulting Revolution
          e fornisce testi pronti per la produzione di contenuti video.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Requisiti per la registrazione</h2>
        <p className="mb-3">
          Per utilizzare il servizio e&apos; necessario creare un account fornendo un indirizzo email valido
          e una password. L&apos;utente e&apos; responsabile della riservatezza delle proprie credenziali
          e di tutte le attivita&apos; svolte tramite il proprio account.
        </p>
        <p className="mb-3">
          <strong>Il servizio e&apos; riservato a persone fisiche di eta&apos; pari o superiore a 18 anni</strong> o a persone
          giuridiche. Registrandosi, l&apos;utente dichiara di avere almeno 18 anni o di agire
          per conto di un&apos;entita&apos; giuridica debitamente autorizzata.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Obblighi dell&apos;utente</h2>
        <p className="mb-3">L&apos;utente si impegna a:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>Caricare esclusivamente documenti di cui possiede i diritti o per i quali ha ottenuto le necessarie autorizzazioni.</li>
          <li>Non caricare contenuti illeciti, offensivi, diffamatori o contrari all&apos;ordine pubblico.</li>
          <li>Non utilizzare il servizio per scopi illeciti, fraudolenti o contrari alla legge.</li>
          <li>Non tentare di accedere ad account, dati o funzionalita&apos; non autorizzate.</li>
          <li>Non utilizzare gli script generati per diffondere informazioni false o fuorvianti.</li>
        </ul>
        <p className="mb-3">
          <strong>CR International LLC non si assume alcuna responsabilita&apos; in merito ai contenuti
          caricati dall&apos;utente ne&apos; all&apos;uso che l&apos;utente fa degli script generati.</strong>
        </p>
        <p className="mb-3">
          L&apos;utente si impegna a manlevare e tenere indenne CR International LLC da qualsiasi pretesa,
          danno, costo o spesa derivanti dalla violazione dei presenti obblighi.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Proprieta&apos; intellettuale</h2>
        <p className="mb-3">
          La piattaforma Reel Script Writer, il suo codice e la metodologia di generazione sono di proprieta&apos;
          esclusiva di CR International LLC. L&apos;utente mantiene la piena proprieta&apos; dei propri documenti caricati.
        </p>
        <p className="mb-3">
          Gli script generati dal servizio sono concessi in licenza d&apos;uso non esclusiva all&apos;utente
          per scopi personali e professionali. E&apos; vietata la rivendita o sublicenza sistematica
          dei contenuti generati dal servizio.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Limitazione di responsabilita&apos;</h2>
        <p className="mb-3">
          Il servizio e&apos; fornito &quot;cosi&apos; com&apos;e&quot; (as is) e &quot;come disponibile&quot; (as available).
          Gli script generati dall&apos;intelligenza artificiale hanno natura esclusivamente
          di <strong>suggerimento</strong> e non costituiscono consulenza professionale di alcun tipo.
        </p>
        <p className="mb-3">CR International LLC:</p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>Non garantisce l&apos;accuratezza, la completezza o l&apos;affidabilita&apos; degli script generati.</li>
          <li>Non e&apos; responsabile per eventuali danni derivanti dall&apos;uso degli script.</li>
          <li>Non e&apos; responsabile per perdite di dati dovute a cause tecniche al di fuori del proprio ragionevole controllo.</li>
          <li>Non e&apos; responsabile per il contenuto dei documenti caricati dagli utenti.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Disponibilita&apos; del servizio</h2>
        <p className="mb-3">
          CR International LLC si impegna a garantire la massima disponibilita&apos; del servizio,
          ma non garantisce un funzionamento ininterrotto o privo di errori. Sono possibili
          interruzioni per manutenzione, aggiornamenti o cause tecniche.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Sospensione e risoluzione</h2>
        <p className="mb-3">
          CR International LLC si riserva il diritto di sospendere o terminare l&apos;account dell&apos;utente in caso di:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>Violazione dei presenti Termini di Servizio.</li>
          <li>Caricamento di contenuti illeciti o in violazione dei diritti di terzi.</li>
          <li>Utilizzo fraudolento o abusivo del servizio.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. Cancellazione dell&apos;account</h2>
        <p className="mb-3">
          L&apos;utente puo&apos; richiedere l&apos;eliminazione del proprio account contattandoci via email.
          La cancellazione comporta l&apos;eliminazione permanente di tutti i dati personali entro 30 giorni.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Modifiche ai Termini di Servizio</h2>
        <p className="mb-3">
          CR International LLC si riserva il diritto di modificare i presenti Termini di Servizio.
          Le modifiche saranno comunicate con almeno 15 giorni di preavviso. L&apos;uso continuativo
          del servizio costituisce accettazione dei nuovi termini.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Legge applicabile e foro competente</h2>
        <p className="mb-3">
          I presenti Termini di Servizio sono regolati dalla legge italiana.
          Per qualsiasi controversia sara&apos; competente in via esclusiva il foro del luogo di residenza
          o domicilio del consumatore, ai sensi dell&apos;Art. 66-bis del Codice del Consumo (D.Lgs. 206/2005).
        </p>
        <p className="mb-3">
          L&apos;utente consumatore residente nell&apos;Unione Europea puo&apos; inoltre ricorrere alla piattaforma
          ODR della Commissione Europea:{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
            https://ec.europa.eu/consumers/odr
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-3">11. Contatti</h2>
        <p className="mb-3">
          Per qualsiasi domanda relativa ai presenti termini:<br />
          <strong>CR International LLC</strong><br />
          Email: <strong>info@consultingrevolution.agency</strong>
        </p>
      </main>
      <Footer />
    </div>
  );
}
