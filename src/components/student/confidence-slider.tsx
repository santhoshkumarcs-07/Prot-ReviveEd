'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CONFIDENCE_VALUES, CONFIDENCE_LABELS } from '@/lib/utils/constants';

interface ConfidenceSliderProps {
  onSubmit: (value: number) => void;
  disabled?: boolean;
}

export default function ConfidenceSlider({ onSubmit, disabled = false }: ConfidenceSliderProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onSubmit(selected);
  };

  if (submitted && selected !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--color-parchment)] rounded-[var(--radius-lg)] p-5"
      >
        <p className="text-sm text-[var(--color-gray-600)]">
          You said you&apos;re <span className="font-semibold text-[var(--color-ink)]">{selected}% confident</span>.
          Let&apos;s see how that compares with your actual understanding.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[var(--color-surface-raised)] border border-[var(--color-gray-200)] rounded-[var(--radius-lg)] p-5 space-y-4"
    >
      <div>
        <h3 className="text-heading text-base mb-1">How confident are you?</h3>
        <p className="text-xs text-[var(--color-gray-500)]">
          Before seeing the result, rate your confidence honestly.
        </p>
      </div>

      {/* Confidence buttons */}
      <div className="flex items-center gap-2">
        {CONFIDENCE_VALUES.map((val) => (
          <button
            key={val}
            onClick={() => setSelected(val)}
            disabled={disabled}
            className={`
              flex-1 py-3 rounded-[var(--radius-md)]
              text-sm font-semibold
              transition-all duration-[var(--duration-fast)]
              ${selected === val
                ? 'bg-[var(--color-ink)] text-[var(--color-surface)] shadow-[var(--shadow-md)] scale-105'
                : 'bg-[var(--color-gray-50)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] border border-[var(--color-gray-200)]'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {val}%
          </button>
        ))}
      </div>

      {/* Selected label */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          <p className="text-sm text-[var(--color-gray-600)] text-center">
            {CONFIDENCE_LABELS[selected]}
          </p>
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-[var(--radius-md)] bg-[var(--color-amber)] text-[var(--color-ink)] font-semibold text-sm hover:bg-[var(--color-amber-soft)] active:scale-[0.98] transition-all"
          >
            Lock it in
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
