'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb } from '@phosphor-icons/react';
import { NUDGE_THINKING_TIME_MS } from '@/lib/utils/constants';

interface NudgeButtonProps {
  onRequestNudge: () => Promise<{ content: string; level: string }>;
  nudgeCount: number;
  lastAttemptTime: number | null;
  disabled?: boolean;
}

export default function NudgeButton({
  onRequestNudge,
  nudgeCount,
  lastAttemptTime,
  disabled = false,
}: NudgeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nudgeContent, setNudgeContent] = useState<string | null>(null);
  const [nudgeLevel, setNudgeLevel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [thinkingProtected, setThinkingProtected] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleNudge = useCallback(async () => {
    // Thinking-time protection: require minimum time since last attempt
    if (lastAttemptTime && nudgeCount > 0) {
      const elapsed = Date.now() - lastAttemptTime;
      if (elapsed < NUDGE_THINKING_TIME_MS) {
        const remaining = Math.ceil((NUDGE_THINKING_TIME_MS - elapsed) / 1000);
        setThinkingProtected(true);
        setCountdown(remaining);

        // Countdown timer
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setThinkingProtected(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return;
      }
    }

    setLoading(true);
    try {
      const result = await onRequestNudge();
      setNudgeContent(result.content);
      setNudgeLevel(result.level);
      setIsOpen(true);
    } catch {
      setNudgeContent('Something went wrong. Try again in a moment.');
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }, [onRequestNudge, lastAttemptTime, nudgeCount]);

  const levelLabels: Record<string, string> = {
    direction: 'A small direction',
    concept: 'Concept reminder',
    hint: 'Stronger hint',
    worked: 'Let\'s work through this together',
  };

  return (
    <div className="relative">
      {/* Nudge trigger button */}
      <motion.button
        onClick={handleNudge}
        disabled={disabled || loading || nudgeCount >= 4}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)]
          text-sm font-medium
          transition-all duration-[var(--duration-fast)]
          ${nudgeCount >= 4
            ? 'bg-[var(--color-gray-100)] text-[var(--color-gray-400)] cursor-not-allowed'
            : 'bg-[var(--color-amber)]/10 text-[var(--color-amber-deep)] hover:bg-[var(--color-amber)]/20 active:scale-[0.97]'
          }
          disabled:opacity-50
        `}
        whileTap={{ scale: 0.97 }}
      >
        <Lightbulb size={18} weight={isOpen ? 'fill' : 'duotone'} />
        {loading ? 'Thinking...' : thinkingProtected ? `Wait ${countdown}s` : 'Nudge'}
      </motion.button>

      {/* Thinking-time protection message */}
      <AnimatePresence>
        {thinkingProtected && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute bottom-full mb-2 left-0 right-0 min-w-[260px]"
          >
            <div className="bg-[var(--color-surface-raised)] border border-[var(--color-amber)]/30 rounded-[var(--radius-md)] p-3 shadow-[var(--shadow-md)]">
              <p className="text-xs text-[var(--color-gray-600)]">
                Take a moment to think about the problem before the next nudge.
                Available in <span className="font-semibold text-[var(--color-amber-deep)]">{countdown}s</span>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nudge content panel */}
      <AnimatePresence>
        {isOpen && nudgeContent && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-2 left-0 min-w-[300px] max-w-[400px] z-10"
          >
            <div className="bg-[var(--color-surface-raised)] border border-[var(--color-gray-200)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lg)]">
              {/* Level indicator */}
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} weight="fill" className="text-[var(--color-amber)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-amber-deep)]">
                  {levelLabels[nudgeLevel] || 'Nudge'}
                </span>
              </div>

              {/* Content */}
              <p className="text-sm text-[var(--color-gray-700)] leading-relaxed">
                {nudgeContent}
              </p>

              {/* Nudge progress dots */}
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[var(--color-gray-100)]">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < nudgeCount + 1
                        ? 'bg-[var(--color-amber)]'
                        : 'bg-[var(--color-gray-200)]'
                    }`}
                  />
                ))}
                <span className="text-[10px] text-[var(--color-gray-400)] ml-1">
                  {nudgeCount + 1}/4 nudges used
                </span>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-1 rounded-[var(--radius-sm)] hover:bg-[var(--color-gray-100)] text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)] transition-colors"
              >
                <span className="text-xs">✕</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
