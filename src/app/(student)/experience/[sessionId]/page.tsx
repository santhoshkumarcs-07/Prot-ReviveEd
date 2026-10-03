'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MagnifyingGlass,
  ChatCircleDots,
  PaperPlaneRight,
  Check,
  X,
  Lightning,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NudgeButton from '@/components/student/nudge-button';
import ConfidenceSlider from '@/components/student/confidence-slider';
import WhyCheck from '@/components/student/why-check';
import type { ExperienceStageType } from '@/types/experience';

// ---- Mock experience data (will be fetched from API) ----
const MOCK_EXPERIENCE = {
  id: 'exp-delivery-robot',
  title: 'The Failing Delivery Robot',
  subject: 'Physics',
  concept: "Newton's Second Law",
  hook: 'A delivery robot is failing to carry its packages uphill. You are the engineer. Find out why.',
  stages: [
    { id: 'hook', label: 'Mystery', order: 1 },
    { id: 'explore', label: 'Investigate', order: 2 },
    { id: 'attempt', label: 'Attempt', order: 3 },
    { id: 'confidence_calibration', label: 'Confidence', order: 4 },
    { id: 'why_check', label: 'Why', order: 5 },
    { id: 'unassisted_checkpoint', label: 'Checkpoint', order: 6 },
    { id: 'transfer_challenge', label: 'Transfer', order: 7 },
    { id: 'reflection', label: 'Reflect', order: 8 },
  ],
  nudge_ladder: {
    direction: 'Look at what changed between the two situations — what variable is different?',
    concept_reminder: 'Which quantity controls acceleration when the force changes?',
    stronger_hint: 'Try comparing force and mass separately. What happens when mass increases but force stays the same?',
    worked_guidance: "Let's solve the first step together. The robot needs force F to move mass m uphill. When we add packages, the mass becomes m + Δm...",
  },
};

type ChatMessage = {
  id: string;
  role: 'student' | 'tutor';
  content: string;
  timestamp: Date;
};

export default function ExperienceSessionPage() {
  const router = useRouter();

  const [currentStage, setCurrentStage] = useState<ExperienceStageType>('hook');
  const [studentInput, setStudentInput] = useState('');
  const [nudgeCount, setNudgeCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'tutor',
      content: 'I\'m here if you need help thinking through this problem. What do you notice about the robot?',
      timestamp: new Date(),
    },
  ]);
  const [isCheckpoint, setIsCheckpoint] = useState(false);

  const currentStageIndex = MOCK_EXPERIENCE.stages.findIndex((s) => s.id === currentStage);
  const totalStages = MOCK_EXPERIENCE.stages.length;

  // ---- Stage transition ----
  const advanceStage = useCallback(() => {
    const nextIndex = currentStageIndex + 1;
    if (nextIndex < totalStages) {
      const nextStage = MOCK_EXPERIENCE.stages[nextIndex].id as ExperienceStageType;
      setCurrentStage(nextStage);

      if (nextStage === 'unassisted_checkpoint') setIsCheckpoint(true);
    }
  }, [currentStageIndex, totalStages]);

  // ---- Nudge handler ----
  const handleNudge = useCallback(async (): Promise<{ content: string; level: string }> => {
    const levels = ['direction', 'concept_reminder', 'stronger_hint', 'worked_guidance'] as const;
    const level = levels[Math.min(nudgeCount, levels.length - 1)];
    const content = MOCK_EXPERIENCE.nudge_ladder[level];
    setNudgeCount((prev) => prev + 1);
    return {
      content,
      level: level.replace('_reminder', '').replace('_guidance', '').replace('stronger_', ''),
    };
  }, [nudgeCount]);

  // ---- Student submission ----
  const handleSubmit = useCallback(() => {
    if (!studentInput.trim()) return;
    setLastAttemptTime(Date.now());
    setStudentInput('');
    // Advance after submission
    setTimeout(() => advanceStage(), 800);
  }, [studentInput, advanceStage]);

  // ---- Chat send ----
  const handleChatSend = useCallback(() => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'student',
      content: chatInput.trim(),
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Mock tutor response
    setTimeout(() => {
      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'tutor',
        content: 'That\'s an interesting thought. Before I give you an answer — what do you think the first step should be?',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, tutorMsg]);
    }, 1200);
  }, [chatInput]);

  // ---- Confidence submission ----
  const handleConfidence = useCallback(() => {
    // Record confidence, then advance
    setTimeout(() => advanceStage(), 1500);
  }, [advanceStage]);

  // ---- Why check submission ----
  const handleWhyExplanation = useCallback(() => {
    // Record explanation as evidence, then advance
    setTimeout(() => advanceStage(), 1500);
  }, [advanceStage]);

  return (
    <div className="flex flex-col h-full min-h-[100dvh] lg:min-h-0">
      {/* ---- Header ---- */}
      <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-[var(--color-gray-200)] bg-[var(--color-surface-raised)] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/student/home')}
            className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-gray-100)] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="hidden sm:block">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
              {MOCK_EXPERIENCE.subject}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-1.5">
          {MOCK_EXPERIENCE.stages.map((stage, i) => (
            <div
              key={stage.id}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${i < currentStageIndex
                  ? 'w-6 bg-[var(--color-amber)]'
                  : i === currentStageIndex
                    ? 'w-8 bg-[var(--color-amber)]'
                    : 'w-4 bg-[var(--color-gray-200)]'
                }
              `}
              title={stage.label}
            />
          ))}
          <span className="text-xs text-[var(--color-gray-400)] ml-2 tabular-nums">
            {currentStageIndex + 1}/{totalStages}
          </span>
        </div>

        {/* Checkpoint indicator */}
        {isCheckpoint && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--color-coral)]/10 text-[var(--color-coral)]">
            <Lightning size={14} weight="fill" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Independent</span>
          </div>
        )}
      </header>

      {/* ---- Main Experience Area ---- */}
      <div className="flex-1 overflow-auto">
        <div className="container-main py-6 lg:py-10 max-w-3xl space-y-6">
          {/* Stage: Hook */}
          <AnimatePresence mode="wait">
            {currentStage === 'hook' && (
              <motion.div
                key="hook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="text-center space-y-4 py-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-full)] bg-[var(--color-amber)]/10 text-[var(--color-amber-deep)]">
                    <MagnifyingGlass size={14} weight="fill" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Mystery</span>
                  </div>
                  <h1 className="text-display text-2xl md:text-3xl lg:text-4xl">
                    {MOCK_EXPERIENCE.title}
                  </h1>
                  <p className="text-body text-[var(--color-gray-500)] text-base lg:text-lg mx-auto">
                    {MOCK_EXPERIENCE.hook}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="curiosity"
                    size="lg"
                    onClick={advanceStage}
                  >
                    Start investigating
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Stage: Explore / Attempt */}
            {(currentStage === 'explore' || currentStage === 'attempt') && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Scenario context */}
                <Card variant="experience" padding="lg">
                  <h2 className="text-heading text-lg mb-3">The Situation</h2>
                  <p className="text-sm text-[var(--color-gray-600)] leading-relaxed mb-4">
                    The delivery robot was working perfectly on flat ground. It could carry packages weighing up to 20kg at a speed of 2 m/s.
                    Yesterday, a new route was added that includes a steep hill. Now the robot struggles halfway up and sometimes stops completely.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] p-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">Robot mass</span>
                      <p className="text-lg font-bold text-[var(--color-ink)] mt-1">15 kg</p>
                    </div>
                    <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] p-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">Package mass</span>
                      <p className="text-lg font-bold text-[var(--color-ink)] mt-1">20 kg</p>
                    </div>
                    <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] p-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">Motor force</span>
                      <p className="text-lg font-bold text-[var(--color-ink)] mt-1">50 N</p>
                    </div>
                    <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] p-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">Hill angle</span>
                      <p className="text-lg font-bold text-[var(--color-ink)] mt-1">30°</p>
                    </div>
                  </div>
                </Card>

                {/* Student input */}
                <div>
                  <label className="text-heading text-sm mb-2 block">
                    What do you think is happening?
                  </label>
                  <div className="relative">
                    <textarea
                      value={studentInput}
                      onChange={(e) => setStudentInput(e.target.value)}
                      placeholder="I think the robot is failing because..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-amber)] focus:ring-1 focus:ring-[var(--color-amber)]/30 resize-none transition-colors"
                    />
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex items-center justify-between">
                  <NudgeButton
                    onRequestNudge={handleNudge}
                    nudgeCount={nudgeCount}
                    lastAttemptTime={lastAttemptTime}
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!studentInput.trim()}
                    icon={<PaperPlaneRight size={16} />}
                    iconPosition="right"
                  >
                    Submit
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Stage: Confidence Calibration */}
            {currentStage === 'confidence_calibration' && (
              <motion.div
                key="confidence"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="text-center py-4">
                  <h2 className="text-heading text-xl mb-2">Before we check your answer...</h2>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    How confident are you in your explanation?
                  </p>
                </div>
                <ConfidenceSlider onSubmit={handleConfidence} />
              </motion.div>
            )}

            {/* Stage: Why Check */}
            {currentStage === 'why_check' && (
              <motion.div
                key="why"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <WhyCheck
                  question="Your answer looks correct. But can you explain WHY increasing the total mass makes the robot struggle on the hill, even though the motor force hasn't changed?"
                  onSubmit={handleWhyExplanation}
                />
              </motion.div>
            )}

            {/* Stage: Unassisted Checkpoint */}
            {currentStage === 'unassisted_checkpoint' && (
              <motion.div
                key="checkpoint"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <Card variant="experience" padding="lg" className="border-[var(--color-coral)]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightning size={18} weight="fill" className="text-[var(--color-coral)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-coral)]">
                      Independent Checkpoint
                    </span>
                  </div>
                  <h2 className="text-heading text-lg mb-2">Time to fly solo</h2>
                  <p className="text-sm text-[var(--color-gray-600)] leading-relaxed mb-4">
                    For this challenge, the Nudge button and AI assistant are temporarily disabled.
                    Show what you can do independently.
                  </p>
                  <div className="bg-[var(--color-parchment)] rounded-[var(--radius-md)] p-4">
                    <p className="text-sm text-[var(--color-gray-700)] font-medium">
                      A different robot with a 40 N motor needs to carry 25 kg up a 20° hill.
                      Will it make it? Calculate and explain.
                    </p>
                  </div>
                </Card>

                <div>
                  <textarea
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="My answer and reasoning..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-coral)] focus:ring-1 focus:ring-[var(--color-coral)]/30 resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setLastAttemptTime(Date.now());
                      setIsCheckpoint(false);
                      advanceStage();
                    }}
                    disabled={!studentInput.trim()}
                    icon={<PaperPlaneRight size={16} />}
                    iconPosition="right"
                  >
                    Submit independently
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Stage: Transfer Challenge */}
            {currentStage === 'transfer_challenge' && (
              <motion.div
                key="transfer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <Card variant="experience" padding="lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-teal)]">
                      Transfer Challenge
                    </span>
                  </div>
                  <h2 className="text-heading text-lg mb-2">Completely different situation, same principle</h2>
                  <p className="text-sm text-[var(--color-gray-600)] leading-relaxed mb-4">
                    A satellite is losing altitude. Ground control notices that the satellite&apos;s thruster force
                    hasn&apos;t changed, but they recently added new scientific instruments to it.
                    Using what you learned from the robot problem, explain what&apos;s happening and suggest a solution.
                  </p>
                </Card>

                <div>
                  <textarea
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="Using the same principle, I think..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-teal)] focus:ring-1 focus:ring-[var(--color-teal)]/30 resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" size="md" onClick={advanceStage} disabled={!studentInput.trim()}>
                    Submit
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Stage: Reflection / Complete */}
            {(currentStage === 'reflection' || currentStage === 'complete') && (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 py-4"
              >
                <div className="text-center space-y-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center mx-auto"
                  >
                    <Check size={32} weight="bold" className="text-[var(--color-emerald)]" />
                  </motion.div>
                  <h2 className="text-display text-2xl">Investigation Complete</h2>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Here&apos;s what you discovered and demonstrated.
                  </p>
                </div>

                <Card variant="evidence" padding="lg" className="space-y-4">
                  <h3 className="text-heading text-base">You discovered</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Applied Newton\'s Second Law', done: true },
                      { label: 'Explained the relationship between force, mass, and acceleration', done: true },
                      { label: 'Solved an unfamiliar problem independently', done: true },
                      { label: 'Transferred the concept to a new context', done: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center shrink-0">
                          <Check size={12} weight="bold" className="text-[var(--color-emerald)]" />
                        </div>
                        <span className="text-sm text-[var(--color-gray-700)]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card variant="outlined" padding="md" className="space-y-3">
                  <h3 className="text-heading text-sm">Your evidence</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
                        Strongest
                      </span>
                      <p className="text-sm font-medium text-[var(--color-emerald)]">Independent reasoning</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gray-400)]">
                        Still developing
                      </span>
                      <p className="text-sm font-medium text-[var(--color-developing)]">Transfer</p>
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/student/home" className="flex-1">
                    <Button variant="curiosity" size="lg" className="w-full">
                      Back to Explore
                    </Button>
                  </Link>
                  <Link href="/student/showcase" className="flex-1">
                    <Button variant="secondary" size="lg" className="w-full">
                      Save to Showcase
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---- Floating Chat Panel ---- */}
      <AnimatePresence>
        {chatOpen && !isCheckpoint && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 w-[340px] max-h-[480px] bg-[var(--color-surface-raised)] border border-[var(--color-gray-200)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] flex flex-col z-50 overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-gray-100)]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-ink)] flex items-center justify-center">
                  <span className="text-[var(--color-surface)] text-[10px] font-bold">R</span>
                </div>
                <span className="text-sm font-semibold">Revive AI</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--color-gray-100)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] px-3 py-2 rounded-[var(--radius-md)] text-sm
                      ${msg.role === 'student'
                        ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
                        : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)]'
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="px-3 py-3 border-t border-[var(--color-gray-100)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask Revive..."
                  className="flex-1 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
                />
                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] text-[var(--color-surface)] disabled:opacity-30 hover:bg-[var(--color-ink-soft)] transition-colors"
                >
                  <PaperPlaneRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Floating Chat Button ---- */}
      {!isCheckpoint && (
        <motion.div
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-[var(--radius-full)]
              shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)]
              transition-all duration-200 hover:scale-105 active:scale-95
              ${chatOpen
                ? 'bg-[var(--color-gray-200)] text-[var(--color-ink)]'
                : 'bg-[var(--color-ink)] text-[var(--color-surface)]'
              }
            `}
            aria-label={chatOpen ? 'Close chat' : 'Open Revive AI chat'}
          >
            <ChatCircleDots size={20} weight="fill" />
            <span className="text-sm font-medium">{chatOpen ? 'Close' : 'Ask Revive'}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
