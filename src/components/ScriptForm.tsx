"use client";

import { useState, FormEvent } from "react";
import ScriptOutput from "./ScriptOutput";
import LoadingState from "./LoadingState";
import PdfUpload from "./PdfUpload";

interface SavedDocument {
  id: string;
  file_name: string;
  extracted_text: string;
  created_at: string;
}

interface FormData {
  problema: string;
  conseguenze: string;
  mezzaSoluzione: string;
  idea: string;
}

interface ScriptFormProps {
  userId: string;
  savedDocuments: SavedDocument[];
}

export default function ScriptForm({ userId, savedDocuments }: ScriptFormProps) {
  const [brandContext, setBrandContext] = useState<string | null>(
    savedDocuments.length > 0 ? savedDocuments[0].extracted_text : null
  );
  const [documents, setDocuments] = useState<SavedDocument[]>(savedDocuments);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(
    savedDocuments.length > 0 ? savedDocuments[0].id : null
  );
  const [showUpload, setShowUpload] = useState(false);
  const [hasFormat, setHasFormat] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<FormData>({
    problema: "",
    conseguenze: "",
    mezzaSoluzione: "",
    idea: "",
  });
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If no documents and not showing upload, show upload
  if (brandContext === null && !showUpload) {
    return (
      <PdfUpload
        userId={userId}
        onComplete={(text, doc) => {
          setBrandContext(text);
          if (doc) {
            setDocuments((prev) => [doc, ...prev]);
            setSelectedDocId(doc.id);
          }
        }}
      />
    );
  }

  if (showUpload) {
    return (
      <PdfUpload
        userId={userId}
        onComplete={(text, doc) => {
          setBrandContext(text);
          setShowUpload(false);
          if (doc) {
            setDocuments((prev) => [doc, ...prev]);
            setSelectedDocId(doc.id);
          }
        }}
        onCancel={() => setShowUpload(false)}
      />
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput("");
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problema: formData.problema,
          conseguenze: formData.conseguenze,
          mezzaSoluzione: formData.mezzaSoluzione,
          idea: hasFormat ? formData.idea : "",
          brandContext,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Errore nella generazione");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setOutput(result);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore imprevisto. Riprova."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    await supabase.from("documents").delete().eq("id", docId);
    const updated = documents.filter((d) => d.id !== docId);
    setDocuments(updated);
    if (selectedDocId === docId) {
      if (updated.length > 0) {
        setSelectedDocId(updated[0].id);
        setBrandContext(updated[0].extracted_text);
      } else {
        setSelectedDocId(null);
        setBrandContext(null);
      }
    }
  };

  const requiredFilled =
    formData.problema.trim().length > 0 &&
    formData.conseguenze.trim().length > 0 &&
    formData.mezzaSoluzione.trim().length > 0 &&
    (hasFormat === false || formData.idea.trim().length > 0);

  const isFormValid = hasFormat !== null && requiredFilled;

  return (
    <div className="space-y-8">
      {/* Document selector */}
      {documents.length > 0 && (
        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Documento brand attivo
            </label>
            <button
              onClick={() => setShowUpload(true)}
              className="text-xs text-purple hover:text-purple/80 transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Carica nuovo
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer transition-all ${
                  selectedDocId === doc.id
                    ? "bg-purple/20 border border-purple/50 text-white"
                    : "bg-white/[0.03] border border-white/[0.08] text-text-muted hover:border-white/20"
                }`}
                onClick={() => {
                  setSelectedDocId(doc.id);
                  setBrandContext(doc.extracted_text);
                }}
              >
                <span className="truncate max-w-[150px]">{doc.file_name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDocument(doc.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all ml-1"
                  title="Elimina documento"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        {[
          { icon: "\u2713", text: "3 script diversi" },
          { icon: "\u2661", text: "Leva emotiva" },
          { icon: "\u25B8", text: "Script pronti" },
          { icon: "\u2605", text: "Varianti format" },
        ].map((pill) => (
          <div
            key={pill.text}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-text-muted"
          >
            <span className="text-purple">{pill.icon}</span>
            {pill.text}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="glass-card p-6 sm:p-8 space-y-6">
          {/* Format toggle */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
              Hai un format in mente?
            </label>
            <div className="flex gap-3">
              {[
                { value: true, label: "Si, ho un'idea" },
                { value: false, label: "No, decidi tu" },
              ].map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => setHasFormat(option.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    hasFormat === option.value
                      ? "bg-purple/20 border border-purple/50 text-white"
                      : "bg-white/[0.03] border border-white/[0.08] text-text-muted hover:border-white/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Idea del contenuto - only if has format */}
          {hasFormat && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
                Idea del contenuto
              </label>
              <p className="text-xs text-text-muted/70">
                Descrivi il format e l&apos;argomento del reel che hai in mente
              </p>
              <textarea
                value={formData.idea}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, idea: e.target.value }))
                }
                placeholder="Es. Reel parlato sui 3 errori che fanno tutti quando lanciano un corso online..."
                rows={3}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none transition-all"
              />
            </div>
          )}

          {/* Main fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
                Problema e leva emotiva
              </label>
              <p className="text-xs text-text-muted/70">
                Il problema specifico del target e la leva emotiva da utilizzare, nel dettaglio
              </p>
              <textarea
                value={formData.problema}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, problema: e.target.value }))
                }
                placeholder="Es. I professionisti del fitness non riescono a convertire i follower in clienti paganti. Leva: frustrazione di lavorare tanto sui contenuti senza vedere risultati economici, senso di inadeguatezza rispetto ai competitor..."
                rows={4}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
                Conseguenze del non agire
              </label>
              <p className="text-xs text-text-muted/70">
                Cosa succede al target se non affronta questo problema
              </p>
              <textarea
                value={formData.conseguenze}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conseguenze: e.target.value,
                  }))
                }
                placeholder="Es. Continuano a sprecare budget in ads che non convertono, perdono credibilità..."
                rows={4}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/80">
                Mezza soluzione
              </label>
              <p className="text-xs text-text-muted/70">
                La direzione della soluzione, senza svelare tutto
              </p>
              <textarea
                value={formData.mezzaSoluzione}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mezzaSoluzione: e.target.value,
                  }))
                }
                placeholder="Es. Serve un sistema di validazione dell'offerta prima di investire in advertising..."
                rows={4}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none transition-all"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="gradient-btn px-8 py-3 rounded-full text-white font-semibold text-sm tracking-wide inline-flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generazione in corso...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Genera 3 Script
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="glass-card p-6 border-red-500/20 animate-fade-in-up">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && !output && <LoadingState />}

      {/* Output */}
      {output && <ScriptOutput text={output} isStreaming={isLoading} />}
    </div>
  );
}
