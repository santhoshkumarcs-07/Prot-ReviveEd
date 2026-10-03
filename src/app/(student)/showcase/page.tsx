'use client';

import { motion } from 'motion/react';
import { Trophy, Flask, Lightbulb, Brain } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { EvidenceChip } from '@/components/ui/evidence-chip';
import type { EvidenceStrength } from '@/types/evidence';

const MOCK_SHOWCASE = [
  {
    id: '1',
    title: 'Water Contamination Investigation',
    description: 'Investigated water quality in a village and identified the contamination source using chemical analysis.',
    icon: Flask,
    evidence: ['reasoning', 'transfer', 'independence'],
    strength: 'strong' as EvidenceStrength,
    date: '3 days ago',
  },
  {
    id: '2',
    title: 'Solar Tracker Design',
    description: 'Designed a system that follows the sun to maximize energy collection using angles and geometry.',
    icon: Lightbulb,
    evidence: ['application', 'reasoning'],
    strength: 'moderate' as EvidenceStrength,
    date: '1 week ago',
  },
  {
    id: '3',
    title: 'Delivery Robot Optimization',
    description: 'Analyzed why a robot failed uphill and proposed motor and mass adjustments using Newton\'s Second Law.',
    icon: Brain,
    evidence: ['explanation', 'transfer', 'independence'],
    strength: 'strong' as EvidenceStrength,
    date: '2 weeks ago',
  },
];

export default function ShowcasePage() {
  return (
    <div className="container-main py-6 lg:py-10 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">
          My Showcase
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          Your best work — what you can demonstrate, not just what marks you received.
        </p>
      </motion.div>

      <div className="space-y-4">
        {MOCK_SHOWCASE.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="experience" hoverable padding="md">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[var(--radius-lg)] bg-[var(--color-parchment)] flex items-center justify-center shrink-0">
                    <Icon size={22} weight="duotone" className="text-[var(--color-gray-600)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-heading text-base">{item.title}</h3>
                      <EvidenceChip strength={item.strength} size="sm" />
                    </div>
                    <p className="text-xs text-[var(--color-gray-500)] leading-relaxed mt-1 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.evidence.map((e) => (
                        <span
                          key={e}
                          className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-gray-100)] text-[10px] font-medium text-[var(--color-gray-500)] capitalize"
                        >
                          {e}
                        </span>
                      ))}
                      <span className="text-[10px] text-[var(--color-gray-400)] ml-auto">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {MOCK_SHOWCASE.length === 0 && (
        <div className="text-center py-16">
          <Trophy size={48} weight="duotone" className="text-[var(--color-gray-300)] mx-auto mb-4" />
          <h3 className="text-heading text-lg text-[var(--color-gray-600)] mb-2">No showcase items yet</h3>
          <p className="text-sm text-[var(--color-gray-400)]">
            Complete experiences and save your best work here.
          </p>
        </div>
      )}
    </div>
  );
}
