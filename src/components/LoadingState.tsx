export default function LoadingState() {
  return (
    <div className="glass-card animate-pulse-glow p-8 text-center animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-purple border-r-blue animate-spin-slow" />
      </div>
      <p className="text-text-muted text-sm">
        Sto generando il tuo script
        <span className="animate-blink">...</span>
      </p>
    </div>
  );
}
