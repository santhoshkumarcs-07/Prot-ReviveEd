// LENS engine types

import type { EvidenceDimension, EvidenceStrength, CalibrationStatus, MisconceptionBug } from './evidence';

export interface LearningStateSnapshot {
  concept_id: string;
  concept_title: string;
  subject_name: string;

  dimensions: Record<EvidenceDimension, DimensionScore>;
  overall_mastery: number;
  independence_index: number;
  retention_index: number;

  calibration_status: CalibrationStatus;
  confidence_accuracy: number;

  active_bugs: MisconceptionBug[];
  fixed_bugs: MisconceptionBug[];

  evidence_confidence: number;
  evidence_count: number;

  next_echo_due: string | null;
  last_evaluated_at: string;
}

export interface DimensionScore {
  dimension: EvidenceDimension;
  score: number;
  strength: EvidenceStrength;
  event_count: number;
  last_measured: string | null;
}

// Student progress overview
export interface StudentProgress {
  total_concepts_explored: number;
  concepts_strong: number;
  concepts_moderate: number;
  concepts_developing: number;
  concepts_weak: number;
  total_experiences_completed: number;
  total_bugs_fixed: number;
  active_sessions: number;
}

// Discovery path — visual progress representation
export interface DiscoveryPathNode {
  concept_id: string;
  concept_title: string;
  subject_slug: string;
  strength: EvidenceStrength;
  explored: boolean;
}
