'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';


export default function SettingsPage() {
  const [language, setLanguage] = useState('en');
  const [showcasePublic, setShowcasePublic] = useState(true);
  const [parentCanSeeShowcase, setParentCanSeeShowcase] = useState(true);
  const [parentCanSeeBugs, setParentCanSeeBugs] = useState(false);
  const [parentCanSeeThinking, setParentCanSeeThinking] = useState(false);
  const [calmMode, setCalmMode] = useState(false);

  return (
    <div className="container-main py-6 lg:py-10 space-y-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-display text-2xl md:text-3xl mb-2">Settings</h1>
        <p className="text-body text-[var(--color-gray-500)] text-sm">
          Control your experience and privacy.
        </p>
      </motion.div>

      {/* Privacy Controls */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-lg mb-4">Privacy</h2>
        <p className="text-xs text-[var(--color-gray-500)] mb-4">
          You control what others can see. Your chat conversations are always private.
        </p>
        <Card variant="outlined" padding="none" className="divide-y divide-[var(--color-gray-100)]">
          <ToggleRow
            label="Showcase visible to teacher"
            description="Teachers linked to you can see your showcase items"
            enabled={showcasePublic}
            onChange={setShowcasePublic}
          />
          <ToggleRow
            label="Showcase visible to parent"
            description="Your parent/guardian can see showcase items"
            enabled={parentCanSeeShowcase}
            onChange={setParentCanSeeShowcase}
          />
          <ToggleRow
            label="Bug Collection visible to parent"
            description="Your parent/guardian can see your misconception bugs"
            enabled={parentCanSeeBugs}
            onChange={setParentCanSeeBugs}
          />
          <ToggleRow
            label="Thinking Trail visible to parent"
            description="Your parent/guardian can see your thinking journey"
            enabled={parentCanSeeThinking}
            onChange={setParentCanSeeThinking}
          />
        </Card>
      </motion.section>

      {/* Language */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-lg mb-4">Language</h2>
        <Card variant="outlined" padding="md">
          <label className="text-sm font-medium mb-2 block">Preferred language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-gray-200)] bg-[var(--color-surface)] text-sm focus:outline-none focus:border-[var(--color-amber)] transition-colors"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
          </select>
          <p className="text-xs text-[var(--color-gray-400)] mt-2">
            Revive AI can explain concepts in your preferred language.
          </p>
        </Card>
      </motion.section>

      {/* Calm Mode */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-lg mb-4">Wellbeing</h2>
        <Card variant="outlined" padding="none">
          <ToggleRow
            label="Calm Mode"
            description="Gentle reminders to take breaks and short reflection prompts"
            enabled={calmMode}
            onChange={setCalmMode}
          />
        </Card>
      </motion.section>

      {/* Data info */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-heading text-lg mb-4">Your Data</h2>
        <Card variant="evidence" padding="md">
          <div className="flex items-start gap-3">
            <Lock size={20} className="text-[var(--color-gray-500)] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[var(--color-gray-700)] mb-2">
                <strong>What we collect:</strong> Your answers, explanations, confidence ratings, and how independently you perform. This helps us understand what you actually understand.
              </p>
              <p className="text-sm text-[var(--color-gray-700)]">
                <strong>What we never do:</strong> Track screen time for surveillance, share private conversations, or use manipulative streak/leaderboard systems.
              </p>
            </div>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}

// Toggle row component
function ToggleRow({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="pr-4">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[var(--color-gray-500)]">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 shrink-0
          ${enabled ? 'bg-[var(--color-ink)]' : 'bg-[var(--color-gray-300)]'}
        `}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`
            inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}
