'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { EvidenceChip } from '@/components/ui/evidence-chip';
import type { EvidenceStrength, CalibrationStatus } from '@/types/evidence';
import { DIMENSION_LABELS } from '@/lib/utils/constants';

const MOCK_PROGRESS = {
  overview: {
    concepts_explored: 12,
    concepts_strong: 5,
    concepts_moderate: 4,
    concepts_developing: 3,
    experiences_completed: 8,
    bugs_fixed: 4,
  },
  concepts: [
    {
      id: '1',
      title: "Newton's Second Law",
      subject: 'Physics',
      strength: 'strong' as EvidenceStrength,
      dimensions: {
        recall: 0.92,
        explanation: 0.88,
        reasoning: 0.85,
        application: 0.78,
        transfer: 0.72,
        independence: 0.80,
        retention: 0.65,
      },
      evidence_confidence: 0.82,
      calibration: 'calibrated' as CalibrationStatus,
    },
    {
      id: '2',
      title: 'Electric Circuits',
      subject: 'Physics',
      strength: 'moderate' as EvidenceStrength,
      dimensions: {
        recall: 0.85,
        explanation: 0.70,
        reasoning: 0.65,
        application: 0.60,
        transfer: 0.45,
        independence: 0.55,
        retention: 0.40,
      },
      evidence_confidence: 0.68,
      calibration: 'overconfident' as CalibrationStatus,
    },
    {
      id: '3',
      title: 'Cell Division',
      subject: 'Biology',
      strength: 'developing' as EvidenceStrength,
      dimensions: {
        recall: 0.60,
        explanation: 0.45,
        reasoning: 0.40,
        application: 0.30,
        transfer: 0.0,
        independence: 0.35,
        retention: 0.0,
      },
      evidence_confidence: 0.42,
      calibration: 'uncalibrated' as CalibrationStatus,
    },
  ],
};

function DimensionBar({ label, value }: { label: string; value: number }) {
  const width = Math.max(2, value * 100);
  let color = 'var(--color-gray-300)';
  if (value >= 0.80) color = 'var(--color-demonstrated)';
  else if (value >= 0.60) color = 'var(--color-evidence)';
  else if (value >= 0.40) color = 'var(--color-developing)';
  else if (value > 0) color = 'var(--color-uncertainty)';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--color-gray-500)] w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[var(--color-gray-100)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-[var(--color-gray-400)] w-8 text-right tabular-nums">
        {value > 0 ? `${Math.round(value * 100)}%` : '—'}
      </span>
    </div>
  );
}

export default function ProgressPage() {
  const { overview, concepts } = MOCK_PROGRESS;

  return (
    <div className="container-main py-6 lg:py-10 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">
          Your Learning Progress
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          What you actually understand — not just what you&apos;ve completed.
        </p>
      </motion.div>

      {/* Overview stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'Explored', value: overview.concepts_explored, color: 'var(--color-ink)' },
          { label: 'Strong', value: overview.concepts_strong, color: 'var(--color-demonstrated)' },
          { label: 'Developing', value: overview.concepts_developing, color: 'var(--color-developing)' },
          { label: 'Bugs Fixed', value: overview.bugs_fixed, color: 'var(--color-amber)' },
        ].map((stat) => (
          <Card key={stat.label} variant="outlined" padding="sm" className="text-center">
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)] mt-0.5">
              {stat.label}
            </p>
          </Card>
        ))}
      </motion.div>

      {/* Concept detail cards */}
      <div className="space-y-4">
        {concepts.map((concept, i) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="experience" padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
                    {concept.subject}
                  </span>
                  <h3 className="text-heading text-base">{concept.title}</h3>
                </div>
                <EvidenceChip strength={concept.strength} />
              </div>

              {/* Dimension bars */}
              <div className="space-y-2.5">
                {Object.entries(concept.dimensions).map(([key, value]) => (
                  <DimensionBar
                    key={key}
                    label={DIMENSION_LABELS[key] || key}
                    value={value}
                  />
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--color-gray-100)]">
                <div>
                  <span className="text-[10px] text-[var(--color-gray-400)]">Evidence confidence</span>
                  <p className="text-sm font-semibold tabular-nums">{Math.round(concept.evidence_confidence * 100)}%</p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-gray-400)]">Calibration</span>
                  <p className={`text-sm font-medium capitalize ${
                    concept.calibration === 'calibrated' ? 'text-[var(--color-emerald)]' :
                    concept.calibration === 'overconfident' ? 'text-[var(--color-coral)]' :
                    concept.calibration === 'underconfident' ? 'text-[var(--color-teal)]' :
                    'text-[var(--color-gray-400)]'
                  }`}>
                    {concept.calibration}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
