interface LetterSlotsProps {
  chars: string[];
  hiddenIndexes: number[];
  values: (string | null)[];
  tone: 'default' | 'correct' | 'wrong';
  errorSlot: number | null;
}

export default function LetterSlots({ chars, hiddenIndexes, values, tone, errorSlot }: LetterSlotsProps) {
  return (
    <div className="flex max-w-full flex-wrap items-end justify-center gap-x-1 gap-y-3 whitespace-normal">
      {chars.map((char, index) => {
        const isHidden = hiddenIndexes.includes(index);
        const value = values[index];
        const isError = errorSlot === index;

        if (!isHidden) {
          return (
            <span key={index} className="flex h-8 w-2 items-end justify-center text-lg font-bold text-slate-700 sm:text-xl">
              {char.trim() ? char : ''}
            </span>
          );
        }

        let toneClass = 'border-slate-300 text-slate-900';
        if (tone === 'correct') toneClass = 'border-emerald-500 text-emerald-900';
        else if (tone === 'wrong' || isError) toneClass = 'border-rose-500 text-rose-900';
        return (
          <span
            key={index}
            className={`flex h-8 min-w-4 items-end justify-center border-b-2 px-0.5 pb-0.5 text-lg font-bold leading-none sm:min-w-5 sm:text-xl ${toneClass}`}
          >
            {value ?? ''}
          </span>
        );
      })}
    </div>
  );
}
