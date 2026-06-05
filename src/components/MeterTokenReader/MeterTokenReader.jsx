import { useState, useCallback } from "react";
import TokenInput from "./TokenInput";
import TokenDisplay from "./TokenDisplay";
import VoicePlayer from "./VoicePlayer";
import { chunkIntoGroups, chunkIntoLines, parseDigits } from "./TokenUtils";
// import { parseDigits, chunkIntoGroups, chunkIntoLines } from 

const DIGITS_PER_GROUP = 4;
const GROUPS_PER_LINE = 5;
const DIGITS_PER_LINE = DIGITS_PER_GROUP * GROUPS_PER_LINE; // 20

export default function MeterTokenReader() {
  const [digits, setDigits] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentGroupInLine, setCurrentGroupInLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const lines = chunkIntoLines(digits, DIGITS_PER_LINE);
  const groups = chunkIntoGroups(digits, DIGITS_PER_GROUP);

  const totalGroupsInLine = (lineIdx) => {
    if (!lines[lineIdx]) return 0;
    return Math.ceil(lines[lineIdx].length / DIGITS_PER_GROUP);
  };

  const globalGroupIndex = useCallback(() => {
    return currentLine * GROUPS_PER_LINE + currentGroupInLine;
  }, [currentLine, currentGroupInLine]);

  const handleInput = (raw) => {
    const parsed = parseDigits(raw);
    setDigits(parsed);
    setCurrentLine(0);
    setCurrentGroupInLine(0);
    setIsPlaying(false);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleNext = () => {
    const maxGroupInLine = totalGroupsInLine(currentLine) - 1;
    if (currentGroupInLine < maxGroupInLine) {
      setCurrentGroupInLine((g) => g + 1);
    } else {
      if (currentLine < lines.length - 1) {
        setCurrentLine((l) => l + 1);
        setCurrentGroupInLine(0);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentGroupInLine > 0) {
      setCurrentGroupInLine((g) => g - 1);
    } else {
      if (currentLine > 0) {
        setCurrentLine((l) => l - 1);
        setCurrentGroupInLine(totalGroupsInLine(currentLine - 1) - 1);
      }
    }
  };

  const handleLineChange = (lineIdx) => {
    setCurrentLine(lineIdx);
    setCurrentGroupInLine(0);
    if (isPlaying) setIsPlaying(true);
  };

  const currentGroupDigits = () => {
    const gi = globalGroupIndex();
    return groups[gi] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex flex-col items-center px-4 py-10 font-sans">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200">
            <span className="text-xs font-semibold tracking-widest text-blue-700 uppercase">Meter Token Reader</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Digital Meter Reader
          </h1>
          <p className="mt-1 text-slate-500 text-sm">Paste any string — digits are extracted, formatted, and read aloud.</p>
        </div>

        {/* Input */}
        <TokenInput onInput={handleInput} hasDigits={digits.length > 0} />

        {/* Display + Player */}
        {digits.length > 0 && (
          <div className="mt-6 space-y-4">
            <TokenDisplay
              lines={lines}
              currentLine={currentLine}
              currentGroupInLine={currentGroupInLine}
              digitsPerGroup={DIGITS_PER_GROUP}
              onLineChange={handleLineChange}
            />
            <VoicePlayer
              isPlaying={isPlaying}
              currentGroupDigits={currentGroupDigits()}
              currentLine={currentLine}
              currentGroupInLine={currentGroupInLine}
              totalLines={lines.length}
              totalGroupsInLine={totalGroupsInLine(currentLine)}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrev={handlePrev}
              onGroupEnd={handleNext}
            />
          </div>
        )}
      </div>
    </div>
  );
}