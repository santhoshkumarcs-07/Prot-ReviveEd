// Curriculum graph types

export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: string; // Phosphor icon name
}

export interface Concept {
  id: string;
  subject_id: string;
  code: string; // e.g. 'PHYS-N2L'
  title: string;
  description: string;
  prerequisites: string[]; // concept IDs
  core_misconceptions: string[];
  // Joined
  subject?: Subject;
}

export interface ConceptWithState extends Concept {
  learning_state?: import('./evidence').StudentLearningState | null;
}
