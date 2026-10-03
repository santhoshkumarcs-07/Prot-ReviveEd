// Core user types for ReviveEd multi-stakeholder system

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
}

export interface StudentProfile {
  user_id: string;
  grade_level: number;
  preferred_language: string;
  interests: string[];
  thinking_style_notes: Record<string, unknown>;
}

export interface TeacherProfile {
  user_id: string;
  institution: string | null;
  specializations: string[];
}

export interface ParentProfile {
  user_id: string;
}

export interface TeacherStudentLink {
  teacher_id: string;
  student_id: string;
  class_name: string;
  created_at: string;
}

export interface ParentStudentLink {
  parent_id: string;
  student_id: string;
  relationship: string;
}

// Auth session with role
export interface AuthSession {
  user: User;
  accessToken: string;
}
