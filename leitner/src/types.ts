export type UserRole = 'Student' | 'Teacher';
export type CardStatus = 'Mastered' | 'Learning';

export interface User {
  UserID: string;
  Username: string;
  Password?: string;
  FullName: string;
  Role: UserRole;
  Grade?: string; // e.g. "پایه دهم", "پایه پنجم", etc.
  CreatedDate: string;
}

export interface Question {
  QuestionID: string;
  QuestionText: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  CorrectOption: 'A' | 'B' | 'C' | 'D';
  Subject: string; // e.g. "ریاضی", "علوم", "فارسی", "انگلیسی"
  Grade: string; // e.g. "پایه اول" to "پایه دوازدهم"
  VideoURL?: string; // e.g. "https://..."
  ImageURL?: string; // Optional URL for a diagram/image related to the question
}

export interface Progress {
  UserID: string;
  StudentName?: string;
  QuestionID: string;
  Subject: string;
  CurrentBox: number; // 1 to 5
  NextReviewDate: string; // ISO string or YYYY-MM-DD
  LastAnsweredDate: string; // ISO string or YYYY-MM-DD
  Status: CardStatus;
}

export interface ActivityLog {
  UserID: string;
  Date: string; // YYYY-MM-DD
  LoginsCount: number;
  AnswersCount: number;
}

export interface Feedback {
  FeedbackID: string;
  StudentID: string;
  TeacherID: string;
  TeacherName: string;
  Message: string;
  Date: string; // YYYY-MM-DD
}

// For live Sheets connection configuration
export interface SheetsConfig {
  webAppUrl: string; // Google Apps Script Executable URL
  sheetId?: string;
  isConnected: boolean;
}
