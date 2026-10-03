// Application constants

export const APP_NAME = 'ReviveEd';
export const APP_TAGLINE = 'Learn because you want to know what happens next.';
export const APP_DESCRIPTION =
  'ReviveEd turns learning into curiosity-driven experiences — then checks whether understanding survives beyond the answer.';

// Experience type metadata
export const EXPERIENCE_TYPE_META = {
  mystery: {
    icon: 'MagnifyingGlass',
    label: 'Solve a Mystery',
    description: 'Investigate a real-world problem',
    color: 'var(--color-amber)',
  },
  what_if: {
    icon: 'Rocket',
    label: 'What If...?',
    description: 'Explore hypothetical situations',
    color: 'var(--color-teal)',
  },
  fix_system: {
    icon: 'Wrench',
    label: 'Fix Something',
    description: 'Diagnose and repair a broken system',
    color: 'var(--color-coral)',
  },
  invent: {
    icon: 'Lightbulb',
    label: 'Invent Something',
    description: 'Design a creative solution',
    color: 'var(--color-emerald)',
  },
  catch_ai: {
    icon: 'Robot',
    label: 'Catch the AI',
    description: 'Find errors in AI-generated explanations',
    color: 'var(--color-violet)',
  },
} as const;

// Evidence dimension labels
export const DIMENSION_LABELS: Record<string, string> = {
  recall: 'Recall',
  explanation: 'Explanation',
  application: 'Application',
  reasoning: 'Reasoning',
  transfer: 'Transfer',
  independence: 'Independence',
  retention: 'Retention',
};

// Evidence strength labels and descriptions
export const STRENGTH_LABELS = {
  strong: { label: 'Strong', description: 'Consistent, demonstrated understanding' },
  moderate: { label: 'Moderate', description: 'Evidence present, some gaps remain' },
  developing: { label: 'Developing', description: 'Early evidence, still building' },
  weak: { label: 'Weak', description: 'Limited evidence of understanding' },
  insufficient: { label: 'Insufficient', description: 'Not enough evidence yet' },
} as const;

// Confidence slider values
export const CONFIDENCE_VALUES = [20, 40, 60, 80, 100] as const;
export const CONFIDENCE_LABELS: Record<number, string> = {
  20: 'Not sure at all',
  40: 'Somewhat unsure',
  60: 'Fairly confident',
  80: 'Pretty confident',
  100: 'Completely confident',
};

// Nudge system
export const NUDGE_THINKING_TIME_MS = 20_000; // 20 seconds minimum between nudge tiers
export const MAX_NUDGE_COUNT = 4; // direction → concept → hint → worked

// Interest skins available
export const INTEREST_SKINS = [
  { id: 'space', label: 'Space', icon: 'Planet' },
  { id: 'cricket', label: 'Cricket', icon: 'SoccerBall' },
  { id: 'cooking', label: 'Cooking', icon: 'CookingPot' },
  { id: 'technology', label: 'Technology', icon: 'Cpu' },
  { id: 'cinema', label: 'Cinema', icon: 'FilmSlate' },
  { id: 'transport', label: 'Transport', icon: 'Train' },
  { id: 'nature', label: 'Nature', icon: 'Tree' },
  { id: 'business', label: 'Business', icon: 'ChartLine' },
] as const;
