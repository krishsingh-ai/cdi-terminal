export type UserRole = 'user' | 'admin';

export interface UserStats {
  signalsViewed: number;
  backtestsRun: number;
  contractsExplored: number;
  sessionStartTime: number;
}

export interface UserSession {
  name: string;
  role: UserRole;
  loginTime: number;
  snapshot: UserStats;
}

export interface SessionActivity {
  signalsViewed: number;
  backtestsRun: number;
  contractsExplored: number;
}

export interface ConsentRecord {
  accepted: boolean;
  version: string;
  timestamp: string;
}

export interface SessionHistoryEntry {
  sessionId?: string;
  name: string;
  role?: string;
  loginTime: number;
  logoutTime: number;
  duration: number; // in milliseconds
  durationMinutes?: number;
  tasksCompleted?: number;
  tasksCreated?: number;
  hoursLogged?: number;
  sessionActivity: SessionActivity;
  consentAccepted?: boolean;
}
