import { Question, User, Progress, ActivityLog, Feedback, SheetsConfig } from './types';

// Rich set of standard questions for grades 1-12 across multiple subjects
export const INITIAL_QUESTIONS: Question[] = [
  // Grade 1
  {
    QuestionID: "Q001",
    QuestionText: "نتیجه جمع ریاضی مقابل چیست؟ ۵ + ۳",
    OptionA: "۷",
    OptionB: "۸",
    OptionC: "۹",
    OptionD: "۶",
    CorrectOption: "B",
    Subject: "ریاضی",
    Grade: "پایه اول",
    VideoURL: "https://www.aparat.com/v/v80e663",
    ImageURL: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600"
  },
  {
    QuestionID: "Q002",
    QuestionText: "کدام کلمه با نشانه «بـ» آغاز می‌شود؟",
    OptionA: "انار",
    OptionB: "درخت",
    OptionC: "باران",
    OptionD: "سیب",
    CorrectOption: "C",
    Subject: "فارسی",
    Grade: "پایه اول",
    VideoURL: "https://www.aparat.com/v/a89b703"
  },
  // Grade 2
  {
    QuestionID: "Q003",
    QuestionText: "هر ساعت چند دقیقه است؟",
    OptionA: "۳۰ دقیقه",
    OptionB: "۴۵ دقیقه",
    OptionC: "۶۰ دقیقه",
    OptionD: "۱۰۰ دقیقه",
    CorrectOption: "C",
    Subject: "ریاضی",
    Grade: "پایه دوم"
  },
  // Grade 3
  {
    QuestionID: "Q004",
    QuestionText: "کدام یک از موارد زیر جزو حالت‌های اصلی ماده نیست؟",
    OptionA: "جامد",
    OptionB: "مایع",
    OptionC: "گاز",
    OptionD: "نور",
    CorrectOption: "D",
    Subject: "علوم",
    Grade: "پایه سوم"
  },
  // Grade 4
  {
    QuestionID: "Q005",
    QuestionText: "پایتخت کشور عزیز ما ایران کدام شهر است؟",
    OptionA: "اصفهان",
    OptionB: "شیراز",
    OptionC: "مشهد",
    OptionD: "تهران",
    CorrectOption: "D",
    Subject: "مطالعات اجتماعی",
    Grade: "پایه چهارم"
  },
  // Grade 5
  {
    QuestionID: "Q006",
    QuestionText: "کدام عضو بدن اکسیژن را از هوا می‌گیرد و به خون انتقال می‌دهد؟",
    OptionA: "معده",
    OptionB: "قلب",
    OptionC: "شُش‌ها (ریه‌ها)",
    OptionD: "کلیه‌ها",
    CorrectOption: "C",
    Subject: "علوم تجربی",
    Grade: "پایه پنجم"
  },
  // Grade 6
  {
    QuestionID: "Q007",
    QuestionText: "مترادف کلمه «رافت» کدام گزینه است؟",
    OptionA: "عدالت",
    OptionB: "خشم",
    OptionC: "مهربانی",
    OptionD: "بخشندگی",
    CorrectOption: "C",
    Subject: "فارسی",
    Grade: "پایه ششم"
  },
  // Grade 7
  {
    QuestionID: "Q008",
    QuestionText: "ساده‌ترین شکل کسر ۴۲/۷۰ کدام است؟",
    OptionA: "۳/۵",
    OptionB: "۶/۱۰",
    OptionC: "۷/۱۰",
    OptionD: "۲/۵",
    CorrectOption: "A",
    Subject: "ریاضی",
    Grade: "پایه هفتم"
  },
  // Grade 8
  {
    QuestionID: "Q009",
    QuestionText: "کدام ساختار درون سلولی مسئول تولید انرژی (نیروگاه سلول) است؟",
    OptionA: "هسته",
    OptionB: "میتوکندری",
    OptionC: "ریبوزوم",
    OptionD: "دیواره سلولی",
    CorrectOption: "B",
    Subject: "علوم",
    Grade: "پایه هشتم"
  },
  // Grade 9
  {
    QuestionID: "Q010",
    QuestionText: "ریشه‌های دوم عدد ۸۱ چه اعدادی هستند؟",
    OptionA: "فقط ۹",
    OptionB: "۹ و ۹-",
    OptionC: "۲۷ و ۲۷-",
    OptionD: "۳ و ۳-",
    CorrectOption: "B",
    Subject: "ریاضی",
    Grade: "پایه نهم"
  },
  {
    QuestionID: "Q011",
    QuestionText: "کدام گزینه معادل فارسی اصطلاح انگلیسی 'Information Technology' است؟",
    OptionA: "فناوری اطلاعات",
    OptionB: "مهندسی نرم‌افزار",
    OptionC: "شبکه ارتباطات",
    OptionD: "سخت‌افزار کامپیوتر",
    CorrectOption: "A",
    Subject: "کار و فناوری",
    Grade: "پایه نهم"
  },
  // Grade 10
  {
    QuestionID: "Q012",
    QuestionText: "کدام لایه از اتمسفر زمین نزدیک‌ترین لایه به سطح زمین است؟",
    OptionA: "استراتوسفر",
    OptionB: "تروپوسفر",
    OptionC: "مزوسفر",
    OptionD: "ترکوسفر",
    CorrectOption: "B",
    Subject: "جغرافیا",
    Grade: "پایه دهم"
  },
  {
    QuestionID: "Q013",
    QuestionText: "زمان گذشته فعل انگلیسی 'go' کدام است؟",
    OptionA: "goes",
    OptionB: "went",
    OptionC: "gone",
    OptionD: "going",
    CorrectOption: "B",
    Subject: "انگلیسی",
    Grade: "پایه دهم"
  },
  // Grade 11
  {
    QuestionID: "Q014",
    QuestionText: "گازهای نجیب در کدام گروه جدول تناوبی عناصر (مندلیف) قرار دارند؟",
    OptionA: "گروه ۱ (قلیایی)",
    OptionB: "گروه ۲ (قلیایی خاکی)",
    OptionC: "گروه ۱۷ (هالوژن‌ها)",
    OptionD: "گروه ۱۸",
    CorrectOption: "D",
    Subject: "شیمی",
    Grade: "پایه یازدهم"
  },
  // Grade 12
  {
    QuestionID: "Q015",
    QuestionText: "محل اصلی فرایند «رونویسی» (Transcription) در سلول‌های یوکاریوتی کجاست؟",
    OptionA: "سیتوپلاسم",
    OptionB: "هسته",
    OptionC: "ریبوزوم",
    OptionD: "شبکه آندوپلاسمی",
    CorrectOption: "B",
    Subject: "زیست‌شناسی",
    Grade: "پایه دوازدهم"
  },
  {
    QuestionID: "Q016",
    QuestionText: "کدام فیلسوف به عنوان موسس حکمت متعالیه شناخته می‌شود؟",
    OptionA: "ابن سینا",
    OptionB: "سهروردی",
    OptionC: "ملاصدرا",
    OptionD: "فارابی",
    CorrectOption: "C",
    Subject: "فلسفه",
    Grade: "پایه دوازدهم"
  }
];

export const INITIAL_USERS: User[] = [
  {
    UserID: "740291",
    Username: "ali",
    Password: "123",
    FullName: "علی علوی",
    Role: "Student",
    Grade: "پایه نهم",
    CreatedDate: "2026-07-01"
  },
  {
    UserID: "582914",
    Username: "sara",
    Password: "123",
    FullName: "سارا حسینی",
    Role: "Student",
    Grade: "پایه دوازدهم",
    CreatedDate: "2026-07-05"
  },
  {
    UserID: "319502",
    Username: "reza",
    Password: "123",
    FullName: "رضا محمدی",
    Role: "Student",
    Grade: "پایه اول",
    CreatedDate: "2026-07-10"
  },
  {
    UserID: "918273",
    Username: "karimi",
    Password: "123",
    FullName: "استاد مریم کریمی",
    Role: "Teacher",
    CreatedDate: "2026-06-15"
  },
  {
    UserID: "629401",
    Username: "ahmadi",
    Password: "123",
    FullName: "دکتر رضا احمدی",
    Role: "Teacher",
    CreatedDate: "2026-06-20"
  }
];

// Pre-populate some progress for 740291 & 582914 to make dashboards look populated
export const INITIAL_PROGRESS: Progress[] = [
  // 740291 Progress (Grade 9 student)
  {
    UserID: "740291",
    QuestionID: "Q010", // Math root 81
    Subject: "ریاضی",
    CurrentBox: 3,
    NextReviewDate: "2026-07-25", // Needs review later
    LastAnsweredDate: "2026-07-20",
    Status: "Learning"
  },
  {
    UserID: "740291",
    QuestionID: "Q011", // IT terms
    Subject: "کار و فناوری",
    CurrentBox: 5,
    NextReviewDate: "2026-08-03", // Needs review much later
    LastAnsweredDate: "2026-07-20",
    Status: "Mastered"
  },
  {
    UserID: "740291",
    QuestionID: "Q008", // Grade 7 math simplest fraction (extra review)
    Subject: "ریاضی",
    CurrentBox: 1,
    NextReviewDate: "2026-07-21", // Ready to review tomorrow/today
    LastAnsweredDate: "2026-07-20",
    Status: "Learning"
  },
  
  // 582914 Progress (Grade 12 student)
  {
    UserID: "582914",
    QuestionID: "Q015", // Bio transcription
    Subject: "زیست‌شناسی",
    CurrentBox: 2,
    NextReviewDate: "2026-07-21", // Ready for review today
    LastAnsweredDate: "2026-07-19",
    Status: "Learning"
  },
  {
    UserID: "582914",
    QuestionID: "Q016", // Philosophy Sadra
    Subject: "فلسفه",
    CurrentBox: 4,
    NextReviewDate: "2026-07-18", // Ready for review! (Past due)
    LastAnsweredDate: "2026-07-19",
    Status: "Learning"
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    UserID: "740291",
    Date: "2026-07-18",
    LoginsCount: 1,
    AnswersCount: 5
  },
  {
    UserID: "740291",
    Date: "2026-07-19",
    LoginsCount: 2,
    AnswersCount: 8
  },
  {
    UserID: "740291",
    Date: "2026-07-20",
    LoginsCount: 1,
    AnswersCount: 3
  },
  {
    UserID: "582914",
    Date: "2026-07-19",
    LoginsCount: 1,
    AnswersCount: 4
  },
  {
    UserID: "582914",
    Date: "2026-07-20",
    LoginsCount: 1,
    AnswersCount: 2
  }
];

export const INITIAL_FEEDBACKS: Feedback[] = [
  {
    FeedbackID: "F001",
    StudentID: "740291",
    TeacherID: "918273",
    TeacherName: "استاد مریم کریمی",
    Message: "آفرین علی جان! پیشرفت شما در مباحث ریاضی پایه نهم عالی بوده است. به همین صورت به پاسخ دادن روزانه کارت‌ها ادامه بده تا مطالب در حافظه بلندمدتت تثبیت شوند.",
    Date: "2026-07-19"
  },
  {
    FeedbackID: "F002",
    StudentID: "582914",
    TeacherID: "918273",
    TeacherName: "استاد مریم کریمی",
    Message: "سارای عزیز، لطفا به کارت‌های زیست‌شناسی و مبحث رونویسی توجه بیشتری داشته باش. مرور روزانه کلید موفقیت در لایتنر است.",
    Date: "2026-07-20"
  }
];

// Helper to initialize and retrieve database from localStorage
export const getStoredData = () => {
  if (typeof window === 'undefined') return null;

  const questions = localStorage.getItem('leitner_questions');
  const users = localStorage.getItem('leitner_users');
  const progress = localStorage.getItem('leitner_progress');
  const logs = localStorage.getItem('leitner_logs');
  const feedbacks = localStorage.getItem('leitner_feedbacks');
  const sheetsConfig = localStorage.getItem('leitner_sheets_config');

  if (!questions) localStorage.setItem('leitner_questions', JSON.stringify(INITIAL_QUESTIONS));
  if (!users) localStorage.setItem('leitner_users', JSON.stringify(INITIAL_USERS));
  if (!progress) localStorage.setItem('leitner_progress', JSON.stringify(INITIAL_PROGRESS));
  if (!logs) localStorage.setItem('leitner_logs', JSON.stringify(INITIAL_LOGS));
  if (!feedbacks) localStorage.setItem('leitner_feedbacks', JSON.stringify(INITIAL_FEEDBACKS));
  if (!sheetsConfig) {
    const defaultConfig: SheetsConfig = { webAppUrl: '', isConnected: false };
    localStorage.setItem('leitner_sheets_config', JSON.stringify(defaultConfig));
  }

  return {
    questions: JSON.parse(localStorage.getItem('leitner_questions') || '[]') as Question[],
    users: JSON.parse(localStorage.getItem('leitner_users') || '[]') as User[],
    progress: JSON.parse(localStorage.getItem('leitner_progress') || '[]') as Progress[],
    logs: JSON.parse(localStorage.getItem('leitner_logs') || '[]') as ActivityLog[],
    feedbacks: JSON.parse(localStorage.getItem('leitner_feedbacks') || '[]') as Feedback[],
    sheetsConfig: JSON.parse(localStorage.getItem('leitner_sheets_config') || '{}') as SheetsConfig,
  };
};

export const saveStoredData = (data: {
  questions?: Question[];
  users?: User[];
  progress?: Progress[];
  logs?: ActivityLog[];
  feedbacks?: Feedback[];
  sheetsConfig?: SheetsConfig;
}) => {
  if (typeof window === 'undefined') return;

  if (data.questions) localStorage.setItem('leitner_questions', JSON.stringify(data.questions));
  if (data.users) localStorage.setItem('leitner_users', JSON.stringify(data.users));
  if (data.progress) localStorage.setItem('leitner_progress', JSON.stringify(data.progress));
  if (data.logs) localStorage.setItem('leitner_logs', JSON.stringify(data.logs));
  if (data.feedbacks) localStorage.setItem('leitner_feedbacks', JSON.stringify(data.feedbacks));
  if (data.sheetsConfig) localStorage.setItem('leitner_sheets_config', JSON.stringify(data.sheetsConfig));
};

// Leitner intervals for each box
// Box 1 -> 1 day, Box 2 -> 2 days, Box 3 -> 5 days, Box 4 -> 9 days, Box 5 -> 15 days
export const LEITNER_INTERVALS: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 5,
  4: 9,
  5: 15
};

export const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};
