import { useEffect, useRef, useState } from "react";
import { chunkIntoGroups } from "./TokenUtils";
import { Button } from "../ui/button";
import { AArrowDown, AArrowUp } from "lucide-react";

const DIGITS_PER_GROUP = 4;
const GROUPS_PER_LINE = 5;

export default function TokenDisplay({
  lines,
  currentLine,
  currentGroupInLine,
  digitsPerGroup,
  onLineChange,
}) {
  const lineRefs = useRef([]);
  const [fontSize, setFontSize] = useState(28);

  // ✅ NEW: font size limits
  const MIN_FONT = 12;
  const MAX_FONT = 60;

  // ✅ NEW: increase font size
  const increaseFont = () => {
    setFontSize((prev) => Math.min(prev + 2, MAX_FONT));
  };

  // ✅ NEW: decrease font size
  const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, MIN_FONT));
  };

  useEffect(() => {
    const el = lineRefs.current[currentLine];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [currentLine]);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50/60">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
          Token Lines
        </span>
        <span className="ml-auto text-xs text-slate-400 tabular-nums">
          {lines.length} line{lines.length !== 1 ? "s" : ""}
        </span>

        <Button onClick={increaseFont}>
          <AArrowUp />
        </Button>

        <Button onClick={decreaseFont}>
          <AArrowDown />
        </Button>
      </div>

      <div className="max-h-100 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
        {lines.length === 0 && (
          <p className="text-center text-slate-300 text-sm py-6">
            No digits yet
          </p>
        )}

        {lines.map((lineDigits, lineIdx) => {
          const isCurrentLine = lineIdx === currentLine;
          const groups = chunkIntoGroups(lineDigits, DIGITS_PER_GROUP);

          return (
            <div
              key={lineIdx}
              ref={(el) => (lineRefs.current[lineIdx] = el)}
              onClick={() => onLineChange(lineIdx)}
              className={`flex items-center w-full gap-1 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                isCurrentLine
                  ? "bg-blue-50 border border-blue-200 shadow-sm"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <span
                className={`shrink-0 w-6 text-center text-xs font-bold tabular-nums mr-2 ${
                  isCurrentLine ? "text-blue-500" : "text-slate-300"
                }`}
              >
                {String(lineIdx + 1).padStart(2, "0")}
              </span>

               <div className="flex items-center gap-5 flex-1 min-w-0 font-mono flex-wrap">
                {groups.map((group, groupIdx) => {
                  const isActiveGroup =
                    isCurrentLine && groupIdx === currentGroupInLine;

                  return (
                    <span key={groupIdx} className="flex gap-0.5">
                      {group.map((digit, dIdx) => (
                        <span
                          key={dIdx}
                          style={{ fontSize }}
                          className={`w-5 text-center tabular-nums transition-all duration-150 ${
                            isCurrentLine
                              ? isActiveGroup
                                ? "text-blue-700 font-bold"
                                : "text-slate-600 font-medium"
                              : "text-slate-300 font-normal"
                          }`}
                        >
                          {digit}
                        </span>
                      ))}

                      {group.length < DIGITS_PER_GROUP &&
                        Array.from({
                          length: DIGITS_PER_GROUP - group.length,
                        }).map((_, i) => (
                          <span
                            key={`pad-${i}`}
                            className="w-5 text-center text-sm text-slate-200"
                          >
                            ·
                          </span>
                        ))}
                    </span>
                  );
                })}
              </div>

              {/* {isCurrentLine && (
                <span className="shrink-0 ml-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                    Active
                  </span>
                </span>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}