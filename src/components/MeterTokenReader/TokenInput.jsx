import { useState } from "react";
import { Hash } from "lucide-react";

export default function TokenInput({ onInput, hasDigits }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    onInput(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onInput("");
  };

  return (
    <div className={`rounded-2xl border-2 transition-all duration-200 bg-white shadow-sm ${focused ? "border-blue-400 shadow-blue-100 shadow-md" : "border-slate-200"}`}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <Hash size={16} className="text-blue-500 shrink-0" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Token Input</span>
        {value && (
          <button
            onClick={handleClear}
            className="ml-auto text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-0.5 rounded-md hover:bg-red-50"
          >
            Clear
          </button>
        )}
      </div>
      <textarea
        className="w-full px-4 py-3 text-slate-700 text-lg bg-transparent outline-none resize-none placeholder:text-slate-300 leading-relaxed"
        placeholder="Paste meter token, serial number, or any string with numbers…"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
      />
      {value && (
        <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-400">
            {value.replace(/\D/g, "").length} digits extracted
          </span>
        </div>
      )}
    </div>
  );
}