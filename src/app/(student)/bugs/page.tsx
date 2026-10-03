'use client';

import { motion } from 'motion/react';
import { Bug, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';

// Mock data
const MOCK_BUGS = {
  fixed: [
    {
      id: '1',
      name: 'Mass ≠ Weight',
      description: 'I thought mass and weight were the same thing. Mass is the amount of matter; weight is the gravitational force on that mass.',
      fixed_through: 'Gravity Investigation',
      severity: 'critical' as const,
    },
    {
      id: '2',
      name: 'Speed ≠ Velocity',
      description: 'Speed has no direction, velocity does. A car going 60 km/h north has a velocity; 60 km/h is just a speed.',
      fixed_through: 'Motion Mystery',
      severity: 'mild' as const,
    },
  ],
  active: [
    {
      id: '3',
      name: 'Force causes velocity',
      description: 'I keep thinking that force directly determines velocity, but force actually determines acceleration.',
      severity: 'critical' as const,
    },
  ],
};

export default function BugCollectionPage() {
  return (
    <div className="container-main py-6 lg:py-10 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">
          Bugs I&apos;ve Fixed
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          A mistake isn&apos;t failure — it&apos;s a bug you discovered in your mental model.
        </p>
      </motion.div>

      {/* Active bugs */}
      {MOCK_BUGS.active.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-heading text-sm mb-3 text-[var(--color-coral)]">
            Investigating ({MOCK_BUGS.active.length})
          </h2>
          <div className="space-y-3">
            {MOCK_BUGS.active.map((bug) => (
              <Card key={bug.id} variant="outlined" padding="md" className="border-[var(--color-coral)]/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-coral)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bug size={18} weight="duotone" className="text-[var(--color-coral)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-heading text-sm">{bug.name}</h3>
                      {bug.severity === 'critical' && (
                        <WarningCircle size={14} weight="fill" className="text-[var(--color-coral)]" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-gray-600)] leading-relaxed">
                      {bug.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>
      )}

      {/* Fixed bugs */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-sm mb-3 text-[var(--color-emerald)]">
          Fixed ({MOCK_BUGS.fixed.length})
        </h2>
        <div className="space-y-3">
          {MOCK_BUGS.fixed.map((bug) => (
            <Card key={bug.id} variant="evidence" padding="md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-emerald)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={18} weight="fill" className="text-[var(--color-emerald)]" />
                </div>
                <div>
                  <h3 className="text-heading text-sm mb-1">{bug.name}</h3>
                  <p className="text-xs text-[var(--color-gray-600)] leading-relaxed mb-2">
                    {bug.description}
                  </p>
                  <p className="text-[10px] text-[var(--color-gray-400)]">
                    Fixed through: <span className="font-medium text-[var(--color-gray-500)]">{bug.fixed_through}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Empty state */}
      {MOCK_BUGS.fixed.length === 0 && MOCK_BUGS.active.length === 0 && (
        <div className="text-center py-16">
          <Bug size={48} weight="duotone" className="text-[var(--color-gray-300)] mx-auto mb-4" />
          <h3 className="text-heading text-lg text-[var(--color-gray-600)] mb-2">No bugs yet</h3>
          <p className="text-sm text-[var(--color-gray-400)]">
            As you explore, misconceptions you discover and fix will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
