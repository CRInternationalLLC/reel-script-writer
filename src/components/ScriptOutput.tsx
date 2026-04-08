"use client";

import React, { useState } from "react";

interface ScriptOutputProps {
  text: string;
  isStreaming: boolean;
}

export default function ScriptOutput({ text, isStreaming }: ScriptOutputProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showRegia, setShowRegia] = useState(true);

  if (isStreaming) {
    return (
      <div className="glass-card p-6 sm:p-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest gradient-text">
            Script in generazione...
          </h2>
        </div>
        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-200 font-mono">
          {text}
          <span className="inline-block w-2 h-5 bg-purple ml-0.5 animate-blink align-middle" />
        </div>
      </div>
    );
  }

  const scripts = splitScripts(text);

  const handleCopy = async (idx: number) => {
    await navigator.clipboard.writeText(scripts[idx]?.raw || text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (scripts.length === 0) {
    // Fallback: show raw text if parsing fails
    return (
      <div className="glass-card p-6 sm:p-8 animate-fade-in-up">
        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-200">
          {text}
        </div>
      </div>
    );
  }

  const current = scripts[activeTab];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Tabs */}
      <div className="flex gap-2">
        {scripts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === idx
                ? "bg-purple/20 border border-purple/50 text-white"
                : "bg-white/[0.03] border border-white/[0.08] text-text-muted hover:border-white/20"
            }`}
          >
            Script {idx + 1}
          </button>
        ))}
      </div>

      {/* Script content */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest gradient-text">
            Script {activeTab + 1} di {scripts.length}
          </h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs text-text-muted">Regia</span>
              <button
                role="switch"
                aria-checked={showRegia}
                onClick={() => setShowRegia(!showRegia)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  showRegia ? "bg-purple/60" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                    showRegia ? "translate-x-[18px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </label>
            <button
              onClick={() => handleCopy(activeTab)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-text-muted hover:text-white hover:border-white/20 transition-all"
            >
              {copiedIdx === activeTab ? "Copiato!" : "Copia script"}
            </button>
          </div>
        </div>

        {/* Meta badges */}
        {(current.tipo || current.leva || current.durata) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {current.tipo && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                {current.tipo}
              </span>
            )}
            {current.leva && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                {current.leva}
              </span>
            )}
            {current.durata && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                {current.durata}
              </span>
            )}
          </div>
        )}

        {/* Gancio */}
        {current.gancio && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
              Gancio (0-3 sec)
            </h3>
            <div className="gradient-left-border pl-4 py-2">
              <div className="text-lg sm:text-xl font-bold text-white leading-snug">
                {renderStyledContent(current.gancio, showRegia)}
              </div>
            </div>
          </div>
        )}

        {/* Copione */}
        {current.struttura && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-3">
              Corpo
            </h3>
            <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
              <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-300">
                {renderStyledContent(current.struttura, showRegia)}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {current.cta && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">
              Chiusura / CTA
            </h3>
            <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
              <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-300">
                {renderStyledContent(current.cta, showRegia)}
              </div>
            </div>
          </div>
        )}

        {/* Variante gancio */}
        {current.variante && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest gradient-text mb-3">
              Varianti gancio
            </h3>
            <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
              <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-300">
                {current.variante}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ParsedScript {
  raw: string;
  tipo: string;
  leva: string;
  durata: string;
  gancio: string;
  struttura: string;
  cta: string;
  variante: string;
}

function splitScripts(text: string): ParsedScript[] {
  // Split by script headers: "SCRIPT 1 di 3", "SCRIPT 2 di 3", etc.
  const scriptBlocks: string[] = [];
  const splitRegex = /[═]{3,}\s*\n\s*📌?\s*SCRIPT\s+\d+\s+di\s+\d+\s*\n\s*[═]{3,}/gi;

  const parts = text.split(splitRegex);

  if (parts.length > 1) {
    // First part is usually empty or intro text, skip it
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].trim()) scriptBlocks.push(parts[i].trim());
    }
  } else {
    // Try alternative split patterns
    const altRegex = /SCRIPT\s+\d+\s+di\s+\d+/gi;
    const altParts = text.split(altRegex);
    if (altParts.length > 1) {
      for (let i = 1; i < altParts.length; i++) {
        if (altParts[i].trim()) scriptBlocks.push(altParts[i].trim());
      }
    } else {
      // Single script fallback
      scriptBlocks.push(text);
    }
  }

  return scriptBlocks.map((block) => parseOneScript(block));
}

function parseOneScript(text: string): ParsedScript {
  const result: ParsedScript = {
    raw: text,
    tipo: "",
    leva: "",
    durata: "",
    gancio: "",
    struttura: "",
    cta: "",
    variante: "",
  };

  // Meta info
  const tipoMatch = text.match(/(?:🎯\s*)?TIPO:\s*(.+?)(?:\n|$)/m);
  if (tipoMatch) result.tipo = tipoMatch[1].trim();

  const levaMatch = text.match(/(?:📌\s*)?LEVA:\s*(.+?)(?:\n|$)/m);
  if (levaMatch) result.leva = levaMatch[1].trim();

  const durataMatch = text.match(/(?:⏱\s*)?DURATA\s*STIMATA:\s*(.+?)(?:\n|$)/m);
  if (durataMatch) result.durata = durataMatch[1].trim();

  // Section markers and their keys
  const sectionDefs: [RegExp, keyof ParsedScript][] = [
    [/(?:🔴\s*)?GANCIO\s*\(.*?\)/i, "gancio"],
    [/(?:🟡\s*)?(?:STRUTTURA|COPIONE)/i, "struttura"],
    [/(?:🟢\s*)?CHIUSURA\s*\/?\s*CTA/i, "cta"],
    [/(?:🔄\s*)?VARIANT[EI]\s*GANCIO/i, "variante"],
  ];

  // Find all section positions
  const positions: { key: keyof ParsedScript; start: number }[] = [];

  for (const [regex, key] of sectionDefs) {
    const match = text.match(regex);
    if (match && match.index !== undefined) {
      // Find end of the header line + any separator lines
      let contentStart = match.index + match[0].length;
      const afterHeader = text.substring(contentStart);
      const sepMatch = afterHeader.match(/^[^\n]*\n[━─\-═]*\n*/);
      if (sepMatch) {
        contentStart += sepMatch[0].length;
      } else {
        const nlMatch = afterHeader.match(/^\s*\n[━─\-═]*\n*/);
        if (nlMatch) contentStart += nlMatch[0].length;
      }
      positions.push({ key, start: contentStart });
    }
  }

  positions.sort((a, b) => a.start - b.start);

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i + 1 < positions.length ? findSectionBoundary(text, start, positions[i + 1].start) : text.length;

    let content = text.substring(start, end).trim();
    content = content.replace(/\n[━─\-═]{3,}\s*$/g, "").trim();
    result[positions[i].key] = content;
  }

  return result;
}

function findSectionBoundary(text: string, start: number, nextStart: number): number {
  // Find the first separator line between current content and next section header
  const between = text.substring(start, nextStart);
  const sepMatch = between.match(/\n[━─\-═]{3,}/);
  if (sepMatch && sepMatch.index !== undefined) {
    return start + sepMatch.index;
  }
  return nextStart;
}

function renderStyledContent(content: string, showRegia: boolean): React.ReactNode {
  // Split content by stage direction patterns: **[...]**
  const parts = content.split(/(\*\*\[.*?\]\*\*)/g);
  return parts.map((part, i) => {
    const dirMatch = part.match(/^\*\*\[(.*?)\]\*\*$/);
    if (dirMatch) {
      if (!showRegia) return null;
      return (
        <span
          key={i}
          className="block text-purple-400 italic text-xs sm:text-sm mt-3 mb-0 font-medium"
        >
          🎬 {dirMatch[1]}
        </span>
      );
    }
    if (!part) return null;
    return <span key={i}>{part}</span>;
  });
}
