'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, PaperPlaneRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface WhyCheckProps {
  question: string;
  onSubmit: (explanation: string) => void;
  disabled?: boolean;
}

export default function WhyCheck({ question, onSubmit, disabled = false }: WhyCheckProps) {
  const [explanation, setExplanation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = () => {
    if (!explanation.trim()) return;
    setSubmitted(true);
    onSubmit(explanation.trim());
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--color-teal)]/5 border border-[var(--color-teal)]/20 rounded-[var(--radius-lg)] p-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Question size={16} weight="fill" className="text-[var(--color-teal)]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-teal)]">
            Explanation recorded
          </span>
        </div>
        <p className="text-sm text-[var(--color-gray-600)] italic">
          &ldquo;{explanation}&rdquo;
        </p>
        <p className="text-xs text-[var(--color-gray-400)] mt-2">
          Your reasoning has been recorded as evidence.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[var(--color-surface-raised)] border border-[var(--color-teal)]/30 rounded-[var(--radius-lg)] p-5 space-y-3"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--color-teal)]/10 flex items-center justify-center shrink-0">
          <Question size={16} weight="fill" className="text-[var(--color-teal)]" />
        </div>
        <div>
          <h3 className="text-heading text-sm">Why?</h3>
          <p className="text-xs text-[var(--color-gray-500)]">
            Explain your reasoning
          </p>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <p className="text-sm text-[var(--color-gray-700)] leading-relaxed">
              {question}
            </p>

            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              disabled={disabled}
              placeholder="I think this because..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-teal)] focus:ring-1 focus:ring-[var(--color-teal)]/30 resize-none transition-colors"
            />

            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={!explanation.trim() || disabled}
                icon={<PaperPlaneRight size={14} />}
                iconPosition="right"
              >
                Submit explanation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
