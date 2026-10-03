'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  MagnifyingGlass,
  Rocket,
  Wrench,
  Lightbulb,
  Robot,
  Lightning,
  Dna,
  Atom,
  ArrowRight,
  ChatCircleDots,
  Brain,
  Bug,
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EvidenceChip } from '@/components/ui/evidence-chip';
import type { EvidenceStrength } from '@/types/evidence';

// ---- Greeting helper ----
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// ---- Experience type cards for the Explore Hub ----
const EXPERIENCE_TYPES = [
  {
    id: 'mystery',
    icon: MagnifyingGlass,
    label: 'Solve a Mystery',
    description: 'Investigate a real-world problem',
    color: '#E09F3E',
    bgGradient: 'from-[#E09F3E]/10 to-[#E09F3E]/5',
  },
  {
    id: 'what_if',
    icon: Rocket,
    label: 'What If...?',
    description: 'Explore hypothetical situations',
    color: '#3D8B8B',
    bgGradient: 'from-[#3D8B8B]/10 to-[#3D8B8B]/5',
  },
  {
    id: 'fix_system',
    icon: Wrench,
    label: 'Fix Something',
    description: 'Diagnose and repair a broken system',
    color: '#D4654B',
    bgGradient: 'from-[#D4654B]/10 to-[#D4654B]/5',
  },
  {
    id: 'invent',
    icon: Lightbulb,
    label: 'Invent Something',
    description: 'Design a creative solution',
    color: '#3B8A6E',
    bgGradient: 'from-[#3B8A6E]/10 to-[#3B8A6E]/5',
  },
  {
    id: 'catch_ai',
    icon: Robot,
    label: 'Catch the AI',
    description: 'Find errors in AI explanations',
    color: '#7B6BA5',
    bgGradient: 'from-[#7B6BA5]/10 to-[#7B6BA5]/5',
  },
];

// Mock data — will be replaced with real backend data
const MOCK_CONTINUE_EXPERIENCE = {
  id: 'session-1',
  title: 'The Failing Delivery Robot',
  hook: 'A delivery robot is failing to carry its packages uphill. You are the engineer. Find out why.',
  type: 'mystery' as const,
  concept: 'Newton\'s Second Law',
  subject: 'Physics',
  progress: 45,
  stage: 'explore',
};

const MOCK_CURIOSITY_EXPERIENCE = {
  id: 'exp-2',
  title: 'What if Earth stopped rotating?',
  hook: 'You have 8 minutes to investigate what happens when the planet goes still.',
  type: 'what_if' as const,
  concept: 'Centripetal Force & Gravity',
  subject: 'Physics',
};

const MOCK_DISCOVERIES: Array<{ concept: string; subject: string; icon: typeof Lightning; strength: EvidenceStrength }> = [
  { concept: 'Electricity', subject: 'Physics', icon: Lightning, strength: 'strong' },
  { concept: 'Gravity', subject: 'Physics', icon: Atom, strength: 'strong' },
  { concept: 'Cells', subject: 'Biology', icon: Dna, strength: 'developing' },
];

export default function StudentHomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const greeting = mounted ? getGreeting() : 'Welcome back';

  return (
    <div className="container-main py-6 lg:py-10 space-y-10">
      {/* ---- Hero: Greeting + Question ---- */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[var(--color-gray-500)] text-sm font-medium mb-1">
          {greeting}
        </p>
        <h1 className="text-display text-3xl md:text-4xl lg:text-[2.75rem] mb-2">
          What do you want to discover today?
        </h1>
        <p className="text-body text-[var(--color-gray-500)] text-base">
          Choose an experience, or continue where you left off.
        </p>
      </motion.section>

      {/* ---- Zone 1: Continue ---- */}
      {MOCK_CONTINUE_EXPERIENCE && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-heading text-lg mb-4 text-[var(--color-gray-700)]">
            Continue your investigation
          </h2>
          <Link href={`/experience/${MOCK_CONTINUE_EXPERIENCE.id}`}>
            <Card variant="experience" hoverable padding="none" className="overflow-hidden group">
              <div className="relative">
                {/* Experience visual band */}
                <div
                  className="h-2 w-full"
                  style={{
                    background: `linear-gradient(90deg, #E09F3E ${MOCK_CONTINUE_EXPERIENCE.progress}%, var(--color-gray-200) ${MOCK_CONTINUE_EXPERIENCE.progress}%)`,
                  }}
                />
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-label text-[var(--color-amber)]">
                      {MOCK_CONTINUE_EXPERIENCE.subject}
                    </span>
                    <span className="text-[var(--color-gray-300)]">·</span>
                    <span className="text-label text-[var(--color-gray-400)]">
                      {MOCK_CONTINUE_EXPERIENCE.concept}
                    </span>
                  </div>
                  <h3 className="text-display text-xl lg:text-2xl mb-2">
                    {MOCK_CONTINUE_EXPERIENCE.title}
                  </h3>
                  <p className="text-body text-[var(--color-gray-500)] mb-5 text-sm lg:text-base">
                    {MOCK_CONTINUE_EXPERIENCE.hook}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--color-gray-400)] font-medium">
                        {MOCK_CONTINUE_EXPERIENCE.progress}% explored
                      </span>
                      <span className="text-xs text-[var(--color-gray-400)]">
                        Stage: {MOCK_CONTINUE_EXPERIENCE.stage}
                      </span>
                    </div>
                    <Button
                      variant="curiosity"
                      size="md"
                      icon={<ArrowRight size={18} weight="bold" />}
                      iconPosition="right"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.section>
      )}

      {/* ---- Zone 2: Experience Types (Curiosity) ---- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-lg mb-4 text-[var(--color-gray-700)]">
          What are you curious about?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXPERIENCE_TYPES.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/explore?type=${exp.id}`}>
                  <Card
                    variant="outlined"
                    hoverable
                    padding="none"
                    className="group overflow-hidden"
                  >
                    <div className={`bg-gradient-to-br ${exp.bgGradient} p-5`}>
                      <div
                        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-3"
                        style={{ backgroundColor: exp.color + '20' }}
                      >
                        <Icon size={22} weight="duotone" color={exp.color} />
                      </div>
                      <h3 className="text-heading text-base mb-1 group-hover:text-[var(--color-ink)] transition-colors">
                        {exp.label}
                      </h3>
                      <p className="text-xs text-[var(--color-gray-500)]">
                        {exp.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ---- Curiosity Suggestion Card ---- */}
      {MOCK_CURIOSITY_EXPERIENCE && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-heading text-lg mb-4 text-[var(--color-gray-700)]">
            Something you might enjoy
          </h2>
          <Link href={`/experience/new?exp=${MOCK_CURIOSITY_EXPERIENCE.id}`}>
            <Card variant="experience" hoverable padding="lg" className="group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-label text-[var(--color-teal)]">
                  {MOCK_CURIOSITY_EXPERIENCE.subject}
                </span>
                <span className="text-[var(--color-gray-300)]">·</span>
                <span className="text-label text-[var(--color-gray-400)]">
                  What If
                </span>
              </div>
              <h3 className="text-display text-xl lg:text-2xl mb-2">
                {MOCK_CURIOSITY_EXPERIENCE.title}
              </h3>
              <p className="text-body text-[var(--color-gray-500)] text-sm lg:text-base">
                {MOCK_CURIOSITY_EXPERIENCE.hook}
              </p>
              <div className="mt-5">
                <Button
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Explore
                </Button>
              </div>
            </Card>
          </Link>
        </motion.section>
      )}

      {/* ---- Zone 3: Your Discoveries ---- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading text-lg text-[var(--color-gray-700)]">
            Your discoveries
          </h2>
          <Link
            href="/progress"
            className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-ink)] transition-colors font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOCK_DISCOVERIES.map((disc) => {
            const Icon = disc.icon;
            return (
              <Card
                key={disc.concept}
                variant="outlined"
                padding="sm"
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-parchment)] flex items-center justify-center shrink-0">
                  <Icon size={18} weight="duotone" className="text-[var(--color-gray-600)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{disc.concept}</p>
                  <EvidenceChip strength={disc.strength} size="sm" />
                </div>
              </Card>
            );
          })}
        </div>
      </motion.section>

      {/* ---- Zone 4: Thinking + Bugs Quick Access ---- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6"
      >
        <Link href="/thinking">
          <Card variant="evidence" hoverable padding="md" className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-teal)]/10 flex items-center justify-center shrink-0">
              <Brain size={22} weight="duotone" className="text-[var(--color-teal)]" />
            </div>
            <div>
              <h3 className="text-heading text-sm">Thinking Trail</h3>
              <p className="text-xs text-[var(--color-gray-500)]">
                See how your ideas evolved
              </p>
            </div>
          </Card>
        </Link>
        <Link href="/bugs">
          <Card variant="evidence" hoverable padding="md" className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-coral)]/10 flex items-center justify-center shrink-0">
              <Bug size={22} weight="duotone" className="text-[var(--color-coral)]" />
            </div>
            <div>
              <h3 className="text-heading text-sm">Bugs I&apos;ve Fixed</h3>
              <p className="text-xs text-[var(--color-gray-500)]">
                Misconceptions you&apos;ve corrected
              </p>
            </div>
          </Card>
        </Link>
      </motion.section>

      {/* ---- Revive AI Floating Button ---- */}
      <motion.div
        className="fixed bottom-20 lg:bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-full)] bg-[var(--color-ink)] text-[var(--color-surface)] shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Open Revive AI chat"
        >
          <ChatCircleDots size={20} weight="fill" />
          <span className="text-sm font-medium">Ask Revive</span>
        </button>
      </motion.div>
    </div>
  );
}
