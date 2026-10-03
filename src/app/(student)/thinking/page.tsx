'use client';

import { motion } from 'motion/react';
import { Brain, LightbulbFilament, ArrowBendDownRight, Sparkle, Warning } from '@phosphor-icons/react';

const MOCK_TRAIL = [
  { type: 'thought' as const, content: 'I think the robot fails because the hill is too steep.', timestamp: '2 min ago' },
  { type: 'evidence' as const, content: 'I tried changing the hill angle — the robot still struggles even at 15°.', timestamp: '4 min ago' },
  { type: 'wrong_turn' as const, content: 'Maybe the motor is broken? But the problem says it works fine on flat ground.', timestamp: '5 min ago' },
  { type: 'discovery' as const, content: 'The total mass (robot + packages) matters! More mass means the same force produces less acceleration.', timestamp: '7 min ago' },
  { type: 'change' as const, content: 'I changed my mind: it\'s not about the motor being weak — it\'s about the force-to-mass ratio changing.', timestamp: '8 min ago' },
  { type: 'thought' as const, content: 'F = ma → if mass increases and force stays constant, acceleration decreases.', timestamp: '10 min ago' },
];

const TRAIL_ICONS = {
  thought: { icon: Brain, color: 'var(--color-gray-500)', bg: 'bg-[var(--color-gray-100)]', label: 'I thought' },
  evidence: { icon: LightbulbFilament, color: 'var(--color-amber)', bg: 'bg-[var(--color-amber)]/10', label: 'I noticed' },
  wrong_turn: { icon: Warning, color: 'var(--color-coral)', bg: 'bg-[var(--color-coral)]/10', label: 'Wrong turn' },
  discovery: { icon: Sparkle, color: 'var(--color-emerald)', bg: 'bg-[var(--color-emerald)]/10', label: 'Discovery' },
  change: { icon: ArrowBendDownRight, color: 'var(--color-teal)', bg: 'bg-[var(--color-teal)]/10', label: 'Changed my mind' },
  conclusion: { icon: Sparkle, color: 'var(--color-demonstrated)', bg: 'bg-[var(--color-emerald)]/10', label: 'Conclusion' },
};

export default function ThinkingTrailPage() {
  return (
    <div className="container-main py-6 lg:py-10 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">
          Thinking Trail
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          Your reasoning journey — how your ideas evolved during investigations.
        </p>
      </motion.div>

      {/* Session selector */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
            Investigation
          </span>
          <h3 className="text-heading text-base">The Failing Delivery Robot</h3>
          <span className="text-xs text-[var(--color-gray-500)]">Physics · Newton&apos;s Second Law</span>
        </div>
      </motion.div>

      {/* Trail */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-gray-200)]" />

        <div className="space-y-0">
          {MOCK_TRAIL.map((entry, i) => {
            const config = TRAIL_ICONS[entry.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-4 pb-6"
              >
                {/* Dot on timeline */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full ${config.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon size={16} weight="duotone" style={{ color: config.color }} />
                </div>

                {/* Content */}
                <div className="pt-1 min-w-0">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider block mb-0.5"
                    style={{ color: config.color }}
                  >
                    {config.label}
                  </span>
                  <p className="text-sm text-[var(--color-gray-700)] leading-relaxed">
                    {entry.content}
                  </p>
                  <span className="text-[10px] text-[var(--color-gray-400)] mt-1 block">
                    {entry.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {MOCK_TRAIL.length === 0 && (
        <div className="text-center py-16">
          <Brain size={48} weight="duotone" className="text-[var(--color-gray-300)] mx-auto mb-4" />
          <h3 className="text-heading text-lg text-[var(--color-gray-600)] mb-2">No thinking trails yet</h3>
          <p className="text-sm text-[var(--color-gray-400)]">
            Start an investigation to see your reasoning journey unfold.
          </p>
        </div>
      )}
    </div>
  );
}
