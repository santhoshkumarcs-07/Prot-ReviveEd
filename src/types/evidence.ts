// Evidence types — the LENS measurement system

export type EvidenceDimension =
  | 'recall'
  | 'explanation'
  | 'application'
  | 'reasoning'
  | 'transfer'
  | 'independence'
  | 'retention';

export type CalibrationStatus = 'uncalibrated' | 'calibrated' | 'overconfident' | 'underconfident';

export interface EvidenceEvent {
  id: string;
  session_id: string;
  student_id: string;
  concept_id: string;
  dimension: EvidenceDimension;
  assistance: import('./experience').AssistanceLevel;
  score: number; // 0.00 to 1.00
  confidence_rating: number | null; // 20, 40, 60, 80, 100
  student_input: string | null;
  system_rationale: string | null;
  created_at: string;
}

export interface StudentLearningState {
  student_id: string;
  concept_id: string;
  overall_mastery: number; // 0.00 to 1.00
  independence_index: number;
  retention_index: number;
  calibration_status: CalibrationStatus;
  active_bugs: MisconceptionBug[];
  fixed_bugs: MisconceptionBug[];
  evidence_confidence: number; // 0.00 to 1.00
  next_echo_due: string | null;
  last_evaluated_at: string;
  // Joined
  concept?: {
    id: string;
    code: string;
    title: string;
    subject_name: string;
  };
}

export interface MisconceptionBug {
  id: string;
  bug_name: string;
  description: string;
  severity: 'mild' | 'critical';
  evidence_quote: string;
  discovered_at: string;
  fixed_through?: string;
  fixed_at?: string;
}

// LENS scoring constants
export const ASSISTANCE_MULTIPLIER: Record<import('./experience').AssistanceLevel, number> = {
  independent: 1.0,
  nudge_1: 0.85,
  nudge_2: 0.65,
  nudge_3: 0.40,
  worked_example: 0.15,
};

export const DIMENSION_WEIGHTS: Record<EvidenceDimension, number> = {
  recall: 0.10,
  explanation: 0.20,
  reasoning: 0.20,
  application: 0.15,
  transfer: 0.15,
  independence: 0.10,
  retention: 0.10,
};

// Evidence strength labels
export type EvidenceStrength = 'strong' | 'moderate' | 'developing' | 'weak' | 'insufficient';

export function getEvidenceStrength(score: number, confidence: number): EvidenceStrength {
  if (confidence < 0.3) return 'insufficient';
  if (score >= 0.80) return 'strong';
  if (score >= 0.60) return 'moderate';
  if (score >= 0.40) return 'developing';
  return 'weak';
}

export function getEvidenceStrengthColor(strength: EvidenceStrength): string {
  switch (strength) {
    case 'strong': return 'var(--color-demonstrated)';
    case 'moderate': return 'var(--color-evidence)';
    case 'developing': return 'var(--color-developing)';
    case 'weak': return 'var(--color-uncertainty)';
    case 'insufficient': return 'var(--color-muted)';
  }
}

// Teacher override
export interface TeacherOverride {
  id: string;
  teacher_id: string;
  student_id: string;
  concept_id: string;
  previous_score: number;
  override_score: number;
  justification: string;
  created_at: string;
}
