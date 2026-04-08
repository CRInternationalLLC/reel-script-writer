"use client";

import { useState, useRef, DragEvent } from "react";
import { createClient } from "@/lib/supabase";

interface SavedDocument {
  id: string;
  file_name: string;
  extracted_text: string;
  created_at: string;
}

interface PdfUploadProps {
  userId: string;
  onComplete: (brandContext: string, doc?: SavedDocument) => void;
  onCancel?: () => void;
}

export default function PdfUpload({ userId, onComplete, onCancel }: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const handleFile = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Formato non supportato. Carica un PDF, DOCX o TXT.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Il file supera il limite di 20MB.");
      return;
    }

    setError(null);
    setFileName(file.name);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Errore nel parsing del PDF");
      }

      const { text } = await response.json();

      // Save document to Supabase
      const { data: doc, error: dbError } = await supabase
        .from("documents")
        .insert({
          user_id: userId,
          file_name: file.name,
          extracted_text: text,
        })
        .select("id, file_name, extracted_text, created_at")
        .single();

      if (dbError) {
        throw new Error("Errore nel salvataggio del documento.");
      }

      onComplete(text, doc);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore nel caricamento del PDF."
      );
      setFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="glass-card p-6 sm:p-8">
        <div className="text-center space-y-3 mb-6">
          <h2 className="text-2xl font-bold gradient-text">
            Carica gli Script del Brand
          </h2>
          <p className="text-sm text-text-muted max-w-lg mx-auto">
            Carica un file con gli script o i contenuti passati del personal brand.
            L&apos;AI li analizzer&agrave; per replicare tono, stile e approccio nei
            nuovi script.
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`rounded-xl border border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-purple/50 bg-purple/5 scale-[1.02]"
              : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
          }`}
        >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto border-2 border-purple/30 border-t-purple rounded-full animate-spin" />
            <p className="text-sm text-text-muted">
              Analisi di <span className="text-white">{fileName}</span> in
              corso...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="w-12 h-12 mx-auto text-text-muted/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-white/80">
                Trascina il PDF qui oppure{" "}
                <span className="text-purple underline">sfoglia</span>
              </p>
              <p className="text-xs text-text-muted mt-1">PDF, DOCX o TXT — max 20MB</p>
            </div>
          </div>
        )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="mt-6 text-center space-x-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs text-text-muted/50 hover:text-text-muted transition-colors underline"
            >
              Annulla
            </button>
          )}
          <button
            onClick={() => onComplete("")}
            className="text-xs text-text-muted/50 hover:text-text-muted transition-colors underline"
          >
            Salta &mdash; continua senza file
          </button>
        </div>
      </div>
    </div>
  );
}
