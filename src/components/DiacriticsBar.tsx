import React from 'react';

interface DiacriticsBarProps {
  onInsertChar: (char: string) => void;
  targetLang: string;
}

export const DiacriticsBar: React.FC<DiacriticsBarProps> = ({ onInsertChar, targetLang }) => {
  // Frequently used Chin, Mizo, Mara, and phonetic orthography characters
  const characters = ['ṭ', 'th', 'ch', 'kh', 'ph', 'tl', 'hl', 'hm', 'hn', 'ng', 'aw', 'â', 'ê', 'î', 'ô', 'û', '’', 'ʔ'];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1">
        Chin letters:
      </span>
      <div className="flex items-center gap-1 shrink-0">
        {characters.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsertChar(char)}
            className="px-2 py-0.5 min-w-[28px] rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-900 dark:hover:text-blue-300 active:bg-blue-100 font-medium transition-colors text-center text-sm shadow-2xs"
            title={`Insert ${char}`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
