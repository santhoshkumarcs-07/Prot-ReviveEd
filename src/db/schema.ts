import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  integer,
  jsonb,
  doublePrecision,
  uniqueIndex,
} from 'drizzle-orm/pg-core';


// --- Users and Profiles ---

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(), // In Supabase, this matches the auth.users id
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).notNull(), // 'student', 'teacher', 'parent', 'admin'
  fullName: varchar('full_name', { length: 255 }).notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const studentProfiles = pgTable('student_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  gradeLevel: integer('grade_level'),
  preferredLanguage: varchar('preferred_language', { length: 50 }).default('en'),
  interests: jsonb('interests').$type<string[]>().default([]),
  thinkingStyleNotes: jsonb('thinking_style_notes').default({}),
});

export const teacherProfiles = pgTable('teacher_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  institution: varchar('institution', { length: 255 }),
  specializations: jsonb('specializations').$type<string[]>().default([]),
});

export const parentProfiles = pgTable('parent_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
});

// --- Links ---

export const teacherStudentLinks = pgTable('teacher_student_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  teacherId: uuid('teacher_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  className: varchar('class_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const parentStudentLinks = pgTable('parent_student_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentId: uuid('parent_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  relationship: varchar('relationship', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Curriculum ---

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  icon: varchar('icon', { length: 255 }),
});

export const concepts = pgTable('concepts', {
  id: uuid('id').primaryKey().defaultRandom(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  code: varchar('code', { length: 100 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  prerequisites: jsonb('prerequisites').$type<string[]>().default([]),
  coreMisconceptions: jsonb('core_misconceptions').$type<string[]>().default([]),
  // Note: pgvector would be used here in a real app, e.g. embedding: vector('embedding', { dimensions: 1536 })
});

export const conceptPrerequisites = pgTable('concept_prerequisites', {
  id: uuid('id').primaryKey().defaultRandom(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  prerequisiteId: uuid('prerequisite_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  relationshipType: varchar('relationship_type', { length: 100 }),
});

// --- Experiences ---

export const experiences = pgTable('experiences', {
  id: uuid('id').primaryKey().defaultRandom(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  hook: text('hook').notNull(),
  dnaSchema: jsonb('dna_schema').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const experienceStages = pgTable('experience_stages', {
  id: uuid('id').primaryKey().defaultRandom(),
  experienceId: uuid('experience_id').references(() => experiences.id, { onDelete: 'cascade' }).notNull(),
  stageType: varchar('stage_type', { length: 100 }).notNull(),
  content: jsonb('content'),
  order: integer('order').notNull(),
});

// --- Sessions ---

export const experienceSessions = pgTable('experience_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  experienceId: uuid('experience_id').references(() => experiences.id, { onDelete: 'cascade' }).notNull(),
  currentStage: varchar('current_stage', { length: 100 }).notNull(),
  stateData: jsonb('state_data').notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const experienceActions = pgTable('experience_actions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => experienceSessions.id, { onDelete: 'cascade' }).notNull(),
  actionType: varchar('action_type', { length: 100 }).notNull(),
  data: jsonb('data'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// --- Evidence ---

export const evidenceEvents = pgTable('evidence_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => experienceSessions.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  dimension: varchar('dimension', { length: 50 }).notNull(),
  assistance: varchar('assistance', { length: 50 }).notNull(),
  score: doublePrecision('score').notNull(), // 0.00 to 1.00
  confidenceRating: integer('confidence_rating'), // 20, 40, 60, 80, 100
  studentInput: text('student_input'),
  systemRationale: text('system_rationale'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const studentLearningState = pgTable('student_learning_state', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  overallMastery: doublePrecision('overall_mastery').notNull().default(0),
  independenceIndex: doublePrecision('independence_index').notNull().default(0),
  retentionIndex: doublePrecision('retention_index').notNull().default(0),
  calibrationStatus: varchar('calibration_status', { length: 50 }).notNull().default('uncalibrated'),
  activeBugs: jsonb('active_bugs').$type<Record<string, unknown>[]>().default([]),
  fixedBugs: jsonb('fixed_bugs').$type<Record<string, unknown>[]>().default([]),
  evidenceConfidence: doublePrecision('evidence_confidence').notNull().default(0),
  nextEchoDue: timestamp('next_echo_due'),
  lastEvaluatedAt: timestamp('last_evaluated_at').defaultNow().notNull(),
}, (table) => ({
  studentConceptUnique: uniqueIndex('student_concept_idx').on(table.studentId, table.conceptId),
}));

// --- Chat ---

export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionId: uuid('session_id').references(() => experienceSessions.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  chatSessionId: uuid('chat_session_id').references(() => chatSessions.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Extras ---

export const studentShowcase = pgTable('student_showcase', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  evidenceRefs: jsonb('evidence_refs').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const thinkingTrails = pgTable('thinking_trails', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => experienceSessions.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  trailData: jsonb('trail_data').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bugCollection = pgTable('bug_collection', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  bugName: varchar('bug_name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull(), // 'active', 'fixed'
  fixedThrough: varchar('fixed_through', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teacherEvalOverrides = pgTable('teacher_eval_overrides', {
  id: uuid('id').primaryKey().defaultRandom(),
  teacherId: uuid('teacher_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  conceptId: uuid('concept_id').references(() => concepts.id, { onDelete: 'cascade' }).notNull(),
  previousScore: doublePrecision('previous_score').notNull(),
  overrideScore: doublePrecision('override_score').notNull(),
  justification: text('justification').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const parentSummaries = pgTable('parent_summaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentId: uuid('parent_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  summaryType: varchar('summary_type', { length: 100 }).notNull(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const experienceQuality = pgTable('experience_quality', {
  id: uuid('id').primaryKey().defaultRandom(),
  experienceId: uuid('experience_id').references(() => experiences.id, { onDelete: 'cascade' }).notNull(),
  completionRate: doublePrecision('completion_rate'),
  abandonmentRate: doublePrecision('abandonment_rate'),
  avgHintDependency: doublePrecision('avg_hint_dependency'),
  avgEvidenceQuality: doublePrecision('avg_evidence_quality'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
