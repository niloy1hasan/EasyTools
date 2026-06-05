import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { digitsToWords } from "./TokenUtils";

export default function VoicePlayer({
  isPlaying,
  currentGroupDigits,
  currentLine,
  currentGroupInLine,
  totalLines,
  totalGroupsInLine,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onGroupEnd,
}) {
  const synthRef = useRef(window.speechSynthesis);
const timerRef = useRef(null);
const utteranceRef = useRef(null);

const [speaking, setSpeaking] = useState(false);
const [waiting, setWaiting] = useState(false);
const [supported, setSupported] = useState(
  typeof window !== "undefined" && "speechSynthesis" in window
);

const isPlayingRef = useRef(isPlaying);

useEffect(() => {
  isPlayingRef.current = isPlaying;
}, [isPlaying]);

const stopEverything = useCallback(() => {
  clearTimeout(timerRef.current);

  setSpeaking(false);
  setWaiting(false);

  if (synthRef.current) {
    synthRef.current.cancel();
  }
}, []);

const speakCurrentGroup = useCallback(() => {
  if (!supported) return;

  if (!currentGroupDigits?.length) return;

  const text = digitsToWords(currentGroupDigits);

  if (!text?.trim()) return;

  clearTimeout(timerRef.current);

  synthRef.current.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.lang = "en-US";

  utteranceRef.current = utterance;

  utterance.onstart = () => {
    setWaiting(false);
    setSpeaking(true);
  };

  utterance.onend = () => {
    if (!isPlayingRef.current) return;

    setSpeaking(false);
    setWaiting(true);

    timerRef.current = setTimeout(() => {
      setWaiting(false);

      if (isPlayingRef.current) {
        onNext();
      }
    }, 2000);
  };

  utterance.onerror = (e) => {
    console.error("Speech error:", e);

    setSpeaking(false);
    setWaiting(false);
  };

  synthRef.current.speak(utterance);
}, [currentGroupDigits, supported, onNext]);

/**
 * Start / Pause
 */
useEffect(() => {
  if (!isPlaying) {
    stopEverything();
    return;
  }

  speakCurrentGroup();
}, [
  isPlaying,
  currentLine,
  currentGroupInLine,
  speakCurrentGroup,
  stopEverything,
]);

/**
 * Cleanup
 */
useEffect(() => {
  return () => {
    clearTimeout(timerRef.current);
    synthRef.current?.cancel();
  };
}, []);


  const handlePlay = () => {
  onPlay();
};

const handleNext = () => {
  stopEverything();
  onNext();
};

const handlePrev = () => {
  stopEverything();
  onPrev();
};

  const isAtEnd =
    currentLine === totalLines - 1 &&
    currentGroupInLine === totalGroupsInLine - 1;
  const isAtStart = currentLine === 0 && currentGroupInLine === 0;

  const groupLabel = `Group ${currentGroupInLine + 1} / ${totalGroupsInLine}`;
  const lineLabel = `Line ${currentLine + 1} / ${totalLines}`;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50/60">
        <Volume2 size={14} className="text-blue-500" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
          Voice Reader
        </span>
        {!supported && (
          <span className="ml-auto text-xs text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Speech not supported in this browser
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        {/* Current group display */}
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">
              {lineLabel}
            </p>
            <div className="flex gap-2 items-center">
              {currentGroupDigits.map((d, i) => (
                <span
                  key={i}
                  className={`text-2xl font-bold tabular-nums transition-all duration-200 ${
                    speaking ? "text-blue-600 scale-110" : "text-slate-700"
                  }`}
                  style={{
                    display: "inline-block",
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {d}
                </span>
              ))}
              {currentGroupDigits.length === 0 && (
                <span className="text-slate-300 text-xl font-mono">— — — —</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium mb-1">{groupLabel}</p>

            <div className={`flex items-center gap-1.5 justify-end ${speaking ? "visible" : "invisible"}`}>
              <span className="flex gap-0.5 items-end h-4">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-1 bg-blue-400 rounded-full animate-bounce"
                    style={{
                      height: `${8 + i * 4}px`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </span>
              <span className="text-xs text-blue-500 font-medium">Speaking</span>
            </div>

            {waiting && !speaking && (
              <div className="flex items-center gap-1.5 justify-end">
                <span className="flex gap-0.5 items-end h-4">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-1 bg-slate-300 rounded-full"
                      style={{ height: `${8 + i * 4}px` }}
                    />
                  ))}
                </span>
                <span className="text-xs text-slate-400 font-medium">Pausing…</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous group"
          >
            <SkipBack size={18} />
          </button>

          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all duration-150 active:scale-95"
              title="Pause"
            >
              <Pause size={22} />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              disabled={!supported || currentGroupDigits.length === 0}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Play"
            >
              <Play size={22} className="ml-0.5" />
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next group"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Progress bar */}
        {totalLines > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Progress</span>
              <span>
                {Math.round(
                  ((currentLine * 5 + currentGroupInLine + 1) /
                    (totalLines * 5)) *
                    100
                )}
                %
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((currentLine * 5 + currentGroupInLine + 1) /
                      (totalLines * 5)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}