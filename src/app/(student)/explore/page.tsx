'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  MagnifyingGlass,
  Rocket,
  Wrench,
  Lightbulb,
  Robot,
  Funnel,
  ArrowRight,
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TYPE_FILTERS = [
  { id: 'all', label: 'All', icon: null },
  { id: 'mystery', label: 'Mystery', icon: MagnifyingGlass },
  { id: 'what_if', label: 'What If', icon: Rocket },
  { id: 'fix_system', label: 'Fix', icon: Wrench },
  { id: 'invent', label: 'Invent', icon: Lightbulb },
  { id: 'catch_ai', label: 'Catch AI', icon: Robot },
];

const SUBJECT_FILTERS = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];

// Seed experiences — in production these come from the database
const SEED_EXPERIENCES = [
  {
    id: 'exp-delivery-robot',
    type: 'mystery' as const,
    title: 'The Failing Delivery Robot',
    hook: 'A delivery robot is failing to carry its packages uphill. You are the engineer. Find out why.',
    concept: "Newton's Second Law",
    subject: 'Physics',
    difficulty: 2,
    minutes: 15,
    color: '#E09F3E',
  },
  {
    id: 'exp-earth-rotation',
    type: 'what_if' as const,
    title: 'What if Earth stopped rotating?',
    hook: 'Investigate what happens when the planet goes still. Every hour counts.',
    concept: 'Centripetal Force',
    subject: 'Physics',
    difficulty: 3,
    minutes: 12,
    color: '#3D8B8B',
  },
  {
    id: 'exp-broken-circuit',
    type: 'fix_system' as const,
    title: 'The Broken Circuit',
    hook: 'A school lab circuit isn\'t working. Three components, one fault. Find it.',
    concept: 'Electric Circuits',
    subject: 'Physics',
    difficulty: 1,
    minutes: 10,
    color: '#D4654B',
  },
  {
    id: 'exp-solar-tracker',
    type: 'invent' as const,
    title: 'Design a Solar Tracker',
    hook: 'Build a system that follows the sun to maximize energy collection.',
    concept: 'Energy Transformation',
    subject: 'Physics',
    difficulty: 3,
    minutes: 20,
    color: '#3B8A6E',
  },
  {
    id: 'exp-ai-gravity',
    type: 'catch_ai' as const,
    title: 'The AI got gravity wrong',
    hook: 'An AI wrote an explanation of free fall. Something is subtly incorrect. Can you find it?',
    concept: 'Gravity & Free Fall',
    subject: 'Physics',
    difficulty: 2,
    minutes: 8,
    color: '#7B6BA5',
  },
  {
    id: 'exp-water-mystery',
    type: 'mystery' as const,
    title: 'The Water Contamination Mystery',
    hook: 'Water samples from a village show something unexpected. Investigate the source.',
    concept: 'Chemical Reactions',
    subject: 'Chemistry',
    difficulty: 2,
    minutes: 18,
    color: '#E09F3E',
  },
  {
    id: 'exp-cell-division',
    type: 'what_if' as const,
    title: 'What if cells stopped dividing?',
    hook: 'Explore what happens to living organisms when mitosis halts.',
    concept: 'Cell Division',
    subject: 'Biology',
    difficulty: 2,
    minutes: 14,
    color: '#3D8B8B',
  },
  {
    id: 'exp-bridge-collapse',
    type: 'fix_system' as const,
    title: 'Save the Collapsing Bridge',
    hook: 'A bridge support has failed. You have 3 possible fixes and limited materials.',
    concept: 'Forces & Structures',
    subject: 'Physics',
    difficulty: 3,
    minutes: 16,
    color: '#D4654B',
  },
];

const TYPE_ICONS: Record<string, typeof MagnifyingGlass> = {
  mystery: MagnifyingGlass,
  what_if: Rocket,
  fix_system: Wrench,
  invent: Lightbulb,
  catch_ai: Robot,
};

export default function ExplorePage() {
  const [activeType, setActiveType] = useState('all');
  const [activeSubject, setActiveSubject] = useState('All');

  const filtered = SEED_EXPERIENCES.filter((exp) => {
    if (activeType !== 'all' && exp.type !== activeType) return false;
    if (activeSubject !== 'All' && exp.subject !== activeSubject) return false;
    return true;
  });

  return (
    <div className="container-main py-6 lg:py-10 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">
          Discover experiences
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          Every experience is designed to help you explore, think, and demonstrate understanding.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        {/* Type filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Funnel size={16} className="text-[var(--color-gray-400)] shrink-0" />
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveType(filter.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-full)]
                text-sm font-medium whitespace-nowrap
                transition-all duration-[var(--duration-fast)]
                ${activeType === filter.id
                  ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
                  : 'bg-[var(--color-surface-raised)] text-[var(--color-gray-600)] border border-[var(--color-gray-200)] hover:border-[var(--color-gray-300)]'
                }
              `}
            >
              {filter.icon && <filter.icon size={14} />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Subject filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUBJECT_FILTERS.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`
                px-3 py-1 rounded-[var(--radius-sm)]
                text-xs font-medium whitespace-nowrap
                transition-all duration-[var(--duration-fast)]
                ${activeSubject === subject
                  ? 'bg-[var(--color-parchment)] text-[var(--color-ink)] font-semibold'
                  : 'text-[var(--color-gray-500)] hover:text-[var(--color-ink)]'
                }
              `}
            >
              {subject}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exp, i) => {
          const TypeIcon = TYPE_ICONS[exp.type] || MagnifyingGlass;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/student/experience/${exp.id}`}>
                <Card variant="experience" hoverable padding="none" className="h-full group overflow-hidden">
                  {/* Color bar */}
                  <div className="h-1.5" style={{ backgroundColor: exp.color }} />

                  <div className="p-5 flex flex-col h-full">
                    {/* Type + Subject */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-6 h-6 rounded-[var(--radius-sm)] flex items-center justify-center"
                        style={{ backgroundColor: exp.color + '18' }}
                      >
                        <TypeIcon size={14} weight="duotone" color={exp.color} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
                        {exp.subject}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-heading text-base mb-2 group-hover:text-[var(--color-ink)] transition-colors">
                      {exp.title}
                    </h3>

                    {/* Hook */}
                    <p className="text-xs text-[var(--color-gray-500)] leading-relaxed mb-4 flex-1">
                      {exp.hook}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--color-gray-100)]">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[var(--color-gray-400)] font-medium">
                          ~{exp.minutes} min
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((d) => (
                            <div
                              key={d}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: d <= exp.difficulty
                                  ? exp.color
                                  : 'var(--color-gray-200)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[var(--color-gray-400)] group-hover:text-[var(--color-ink)] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <MagnifyingGlass size={48} weight="duotone" className="text-[var(--color-gray-300)] mb-4" />
          <h3 className="text-heading text-lg text-[var(--color-gray-600)] mb-2">
            No experiences found
          </h3>
          <p className="text-sm text-[var(--color-gray-400)] max-w-[40ch]">
            Try adjusting your filters or explore a different subject.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => { setActiveType('all'); setActiveSubject('All'); }}
          >
            Clear filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
