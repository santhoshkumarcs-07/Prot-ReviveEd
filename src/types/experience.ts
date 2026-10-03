// Experience types — the core learning loop

export type ExperienceType = 'mystery' | 'what_if' | 'fix_system' | 'invent' | 'catch_ai';

export type ExperienceStageType =
  | 'hook'
  | 'explore'
  | 'attempt'
  | 'stuck'
  | 'confidence_calibration'
  | 'why_check'
  | 'catch_the_ai'
  | 'unassisted_checkpoint'
  | 'transfer_challenge'
  | 'counterfactual_challenge'
  | 'reflection'
  | 'complete';

export type AssistanceLevel = 'independent' | 'nudge_1' | 'nudge_2' | 'nudge_3' | 'worked_example';

export interface Experience {
  id: string;
  concept_id: string;
  type: ExperienceType;
  title: string;
  hook: string;
  dna_schema: ExperienceDNA;
  is_active: boolean;
  created_at: string;
  // Joined fields
  concept?: {
    id: string;
    code: string;
    title: string;
    subject: { id: string; name: string; slug: string } | null;
  };
}

export interface ExperienceDNA {
  concept_id: string;
  type: ExperienceType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  context: string;
  interest_skin: string;
  target_evidence: string[];
  stages: {
    hook: { narrative: string; visual_prompt: string };
    explore: { variables: Variable[]; constraints: Constraint[] };
    attempt: { expected_actions: string[]; validation_type: 'deterministic' | 'ai' };
    checkpoint: { unassisted: boolean; challenge_type: string };
    transfer: { new_context: string; same_concept: boolean };
    reflection: { prompts: string[] };
  };
  nudge_ladder: {
    direction: string;
    concept_reminder: string;
    stronger_hint: string;
    worked_guidance: string;
  };
}

export interface Variable {
  name: string;
  label: string;
  type: 'number' | 'select' | 'text';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  default_value: string | number;
}

export interface Constraint {
  description: string;
  type: 'range' | 'equality' | 'inequality';
  expression: string;
}

export interface ExperienceSession {
  id: string;
  student_id: string;
  experience_id: string;
  current_stage: ExperienceStageType;
  state_data: SessionStateData;
  started_at: string;
  completed_at: string | null;
  // Joined
  experience?: Experience;
}

export interface SessionStateData {
  variables: Record<string, string | number>;
  attempts: SessionAttempt[];
  hypotheses: string[];
  nudge_count: number;
  last_nudge_at: string | null;
  confidence_rating: number | null;
  why_explanation: string | null;
  unassisted_score: number | null;
  transfer_score: number | null;
  discoveries: string[];
  thinking_trail: ThinkingTrailEntry[];
}

export interface SessionAttempt {
  timestamp: string;
  input: string;
  result: 'correct' | 'incorrect' | 'partial';
  assistance: AssistanceLevel;
  feedback: string;
}

export interface ThinkingTrailEntry {
  timestamp: string;
  type: 'thought' | 'evidence' | 'wrong_turn' | 'discovery' | 'change' | 'conclusion';
  content: string;
}

// Experience card for browse/display
export interface ExperienceCard {
  id: string;
  type: ExperienceType;
  title: string;
  hook: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  concept_title: string;
  subject_name: string;
  interest_skin: string;
  estimated_minutes: number;
}

// Nudge system
export interface NudgeRequest {
  session_id: string;
  concept_id: string;
  stage: ExperienceStageType;
  previous_nudge_count: number;
  time_since_last_attempt_ms: number;
}

export interface NudgeResponse {
  nudge_level: 'direction' | 'concept' | 'hint' | 'worked';
  content: string;
  new_nudge_count: number;
  thinking_time_protected: boolean;
}
