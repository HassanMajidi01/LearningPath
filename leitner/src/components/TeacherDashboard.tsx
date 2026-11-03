import React, { useState } from 'react';
import { User, Question, Progress, Feedback, ActivityLog } from '../types';
import { Search, UserPlus, BookOpenCheck, BookOpen, Send, MessageCircle, BarChart2, PlusCircle, Check, Info, Award, UserCheck, Calendar, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TeacherDashboardProps {
  teacher: User;
  students: User[];
  questions: Question[];
  progress: Progress[];
  feedbacks: Feedback[];
  activityLogs: ActivityLog[];
  onAddStudent: (userData: { username: string; fullName: string; grade: string }) => void;
  onSendFeedback: (studentId: string, message: string) => void;
  onAddQuestion: (qData: Omit<Question, 'QuestionID'>) => void;
}

const GRADES = [
  "پایه اول", "پایه دوم", "پایه سوم", "پایه چهارم", "پایه پنجم", "پایه ششم",
  "پایه هفتم", "پایه هشتم", "پایه نهم", "پایه دهم", "پایه یازدهم", "پایه دوازدهم"
];

const SUBJECTS = ["ریاضی", "علوم", "فارسی", "انگلیسی", "شیمی", "زیست‌شناسی", "فلسفه", "مطالعات اجتماعی"];

export default function TeacherDashboard({
  teacher,
  students,
  questions,
  progress,
  feedbacks,
  activityLogs,
  onAddStudent,
  onSendFeedback,
  onAddQuestion
}: TeacherDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Supervised Student IDs state with persistence in localStorage
  const [supervisedIds, setSupervisedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`supervised_students_${teacher.UserID}`);
    if (saved) return JSON.parse(saved);
    return students.map(s => s.UserID);
  });
  const [studentIdInput, setStudentIdInput] = useState('');
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  const saveSupervisedIds = (ids: string[]) => {
    setSupervisedIds(ids);
    localStorage.setItem(`supervised_students_${teacher.UserID}`, JSON.stringify(ids));
  };
  
  // Registration States
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regGrade, setRegGrade] = useState(GRADES[8]);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);

  // Question Creation States
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [qText, setQText] = useState('');
  const [qA, setQA] = useState('');
  const [qB, setQB] = useState('');
  const [qC, setQC] = useState('');
  const [qD, setQD] = useState('');
  const [qCorrect, setQCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [qSubject, setQSubject] = useState(SUBJECTS[0]);
  const [qGrade, setQGrade] = useState(GRADES[8]);
  const [qVideoUrl, setQVideoUrl] = useState('');
  const [qImageUrl, setQImageUrl] = useState('');
  const [qSuccess, setQSuccess] = useState(false);

  // Filter students list to only include those under supervision
  const supervisedStudents = students.filter((s) => supervisedIds.includes(s.UserID));
  const filteredStudents = supervisedStudents.filter(
    (s) =>
      s.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.UserID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.Grade && s.Grade.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedStudent = students.find((s) => s.UserID === selectedStudentId);

  // Calculate detailed progress for the selected student
  const getStudentStats = (studentId: string) => {
    const student = students.find((s) => s.UserID === studentId);
    if (!student) return null;

    const studentQuestions = questions.filter((q) => q.Grade === student.Grade);
    const studentProgress = progress.filter((p) => p.UserID === studentId);
    
    const boxesCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let masteredCount = 0;
    let learningCount = 0;

    studentQuestions.forEach((q) => {
      const p = studentProgress.find((p) => p.QuestionID === q.QuestionID);
      if (p) {
        if (p.Status === 'Mastered') {
          masteredCount++;
          boxesCount[6]++;
        } else if (p.CurrentBox >= 1 && p.CurrentBox <= 5) {
          const box = p.CurrentBox as 1 | 2 | 3 | 4 | 5;
          boxesCount[box]++;
          learningCount++;
        }
      }
    });

    // Calculate subject-specific statistics
    const uniqueSubjects = Array.from(new Set([
      ...studentQuestions.map(q => q.Subject),
      ...studentProgress.map(p => p.Subject)
    ])).filter(Boolean);

    const subjectStats = uniqueSubjects.map(subject => {
      const qInSubject = studentQuestions.filter(q => q.Subject === subject);
      const pInSubject = studentProgress.filter(p => p.Subject === subject);
      
      let mastered = 0;
      let learning = 0;
      const boxes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      
      qInSubject.forEach(q => {
        const p = pInSubject.find(pItem => pItem.QuestionID === q.QuestionID);
        if (p) {
          if (p.Status === 'Mastered') {
            mastered++;
            boxes[6]++;
          } else if (p.CurrentBox >= 1 && p.CurrentBox <= 5) {
            boxes[p.CurrentBox]++;
            learning++;
          }
        }
      });
      
      pInSubject.forEach(p => {
        const existsInQ = qInSubject.some(q => q.QuestionID === p.QuestionID);
        if (!existsInQ) {
          if (p.Status === 'Mastered') {
            mastered++;
            boxes[6]++;
          } else if (p.CurrentBox >= 1 && p.CurrentBox <= 5) {
            boxes[p.CurrentBox]++;
            learning++;
          }
        }
      });

      const totalCards = Math.max(qInSubject.length, pInSubject.length);
      const progressPercent = totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0;

      return {
        subject,
        totalCards,
        mastered,
        learning,
        boxes,
        progressPercent
      };
    });

    // Activity Log calculations
    const logs = activityLogs.filter((l) => l.UserID === studentId);
    const activeDays = logs.length;
    const totalAnswers = logs.reduce((sum, log) => sum + log.AnswersCount, 0);

    return {
      totalCards: studentQuestions.length,
      activeCards: studentProgress.length,
      masteredCount,
      learningCount,
      boxesCount,
      activeDays,
      totalAnswers,
      subjectStats
    };
  };

  const handleAddStudentById = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);

    const targetId = studentIdInput.trim().toUpperCase();
    if (!targetId) return;

    if (supervisedIds.map(id => id.toUpperCase()).includes(targetId)) {
      setAddError('این دانش‌آموز قبلاً به لیست شما اضافه شده است.');
      return;
    }

    const foundStudent = students.find((s) => s.UserID.toUpperCase() === targetId);
    if (!foundStudent) {
      setAddError('دانش‌آموزی با این شناسه یافت نشد. لطفاً از صحت شناسه مطمئن شوید.');
      return;
    }

    const updatedIds = [...supervisedIds, foundStudent.UserID];
    saveSupervisedIds(updatedIds);
    setAddSuccess(`دانش‌آموز «${foundStudent.FullName}» با موفقیت به پنل شما اضافه شد.`);
    setStudentIdInput('');
    setSelectedStudentId(foundStudent.UserID);

    setTimeout(() => {
      setAddSuccess(null);
    }, 3000);
  };

  const handleRemoveStudent = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedIds = supervisedIds.filter((id) => id !== studentId);
    saveSupervisedIds(updatedIds);
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null);
    }
  };

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(false);

    if (!regFullName.trim() || !regUsername.trim()) {
      setRegError('لطفا فیلدهای نام و نام کاربری را پر کنید.');
      return;
    }

    const existing = students.find((s) => s.Username.toLowerCase() === regUsername.trim().toLowerCase());
    if (existing) {
      setRegError('این نام کاربری از قبل وجود دارد.');
      return;
    }

    onAddStudent({
      fullName: regFullName.trim(),
      username: regUsername.trim().toLowerCase(),
      grade: regGrade
    });

    setRegSuccess(true);
    setRegFullName('');
    setRegUsername('');
    setTimeout(() => {
      setRegSuccess(false);
      setShowAddStudent(false);
    }, 1500);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setQSuccess(false);

    if (!qText.trim() || !qA.trim() || !qB.trim() || !qC.trim() || !qD.trim()) {
      alert('پر کردن تمام اطلاعات فیلد سوال اجباری است.');
      return;
    }

    onAddQuestion({
      QuestionText: qText.trim(),
      OptionA: qA.trim(),
      OptionB: qB.trim(),
      OptionC: qC.trim(),
      OptionD: qD.trim(),
      CorrectOption: qCorrect,
      Subject: qSubject,
      Grade: qGrade,
      VideoURL: qVideoUrl.trim() || undefined,
      ImageURL: qImageUrl.trim() || undefined
    });

    setQSuccess(true);
    setQText('');
    setQA('');
    setQB('');
    setQC('');
    setQD('');
    setQVideoUrl('');
    setQImageUrl('');
    setTimeout(() => setQSuccess(false), 2000);
  };

  const handleSendFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !feedbackMsg.trim()) return;

    onSendFeedback(selectedStudentId, feedbackMsg.trim());
    setFeedbackMsg('');
    alert('پیام تشویقی شما با موفقیت ثبت شد و به محض ورود دانش‌آموز به وی نمایش داده می‌شود.');
  };

  const stats = selectedStudentId ? getStudentStats(selectedStudentId) : null;
  const studentFeedbacks = selectedStudentId ? feedbacks.filter((f) => f.StudentID === selectedStudentId) : [];

  return (
    <div className="space-y-6">
      {/* 1. Panel Welcome and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">پنل تخصصی مدیریت دبیران</h2>
          <p className="text-sm text-slate-500 mt-1">مدیریت تحصیلی دانش‌آموزان، بارگذاری سوالات و ارسال بازخوردهای لایتنر</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setShowAddStudent(!showAddStudent);
              setShowAddQuestion(false);
            }}
            className="flex-1 sm:flex-none bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            ثبت دانش‌آموز جدید
          </button>
          <button
            onClick={() => {
              setShowAddQuestion(!showAddQuestion);
              setShowAddStudent(false);
            }}
            className="flex-1 sm:flex-none bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            افزودن سوال جدید
          </button>
        </div>
      </div>

      {/* 2. Registration or Question Addition Forms */}
      {showAddStudent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm max-w-xl"
        >
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5 text-indigo-700">
            <UserPlus className="w-4 h-4" />
            ثبت‌نام مستقیم دانش‌آموز جدید در کلاس
          </h3>
          {regError && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold mb-3">{regError}</div>}
          {regSuccess && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-xs font-semibold mb-3 flex items-center gap-1.5"><Check className="w-4 h-4" /> دانش‌آموز با موفقیت ثبت‌نام شد! (کلمه عبور پیش‌فرض: 123)</div>}
          
          <form onSubmit={handleRegisterStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600"
                placeholder="مثال: مریم کریمی"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نام کاربری (یکتا و انگلیسی):</label>
              <input
                type="text"
                required
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600 font-mono text-left"
                placeholder="maryam"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">پایه تحصیلی دانش‌آموز:</label>
              <select
                value={regGrade}
                onChange={(e) => setRegGrade(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white outline-none"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowAddStudent(false)}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-bold transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-lg text-xs transition"
              >
                ثبت نام در شیت
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {showAddQuestion && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5 text-emerald-700">
            <PlusCircle className="w-4 h-4" />
            بارگذاری سوال چندگزینه‌ای جدید در شیت بانک سوالات
          </h3>
          {qSuccess && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-xs font-semibold mb-3 flex items-center gap-1.5"><Check className="w-4 h-4" /> سوال شما با موفقیت در بانک سوالات شیت ذخیره شد!</div>}
          
          <form onSubmit={handleCreateQuestion} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">پایه تحصیلی هدف:</label>
                <select
                  value={qGrade}
                  onChange={(e) => setQGrade(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white outline-none"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نام درس مربوطه:</label>
                <select
                  value={qSubject}
                  onChange={(e) => setQSubject(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white outline-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">گزینه صحیح علمی:</label>
                <select
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value as 'A' | 'B' | 'C' | 'D')}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white outline-none font-bold text-indigo-700"
                >
                  <option value="A">گزینه الف (A)</option>
                  <option value="B">گزینه ب (B)</option>
                  <option value="C">گزینه ج (C)</option>
                  <option value="D">گزینه د (D)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">متن کامل صورت سوال:</label>
              <textarea
                required
                rows={2}
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-indigo-600"
                placeholder="مثال: حاصل‌ضرب کادمیوم در محیط‌های اسیدی چه واکنشی نشان می‌دهد؟"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن گزینه الف (A):</label>
                <input
                  type="text"
                  required
                  value={qA}
                  onChange={(e) => setQA(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600"
                  placeholder="پاسخ فرضی اول"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن گزینه ب (B):</label>
                <input
                  type="text"
                  required
                  value={qB}
                  onChange={(e) => setQB(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600"
                  placeholder="پاسخ فرضی دوم"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن گزینه ج (C):</label>
                <input
                  type="text"
                  required
                  value={qC}
                  onChange={(e) => setQC(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600"
                  placeholder="پاسخ فرضی سوم"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن گزینه د (D):</label>
                <input
                  type="text"
                  required
                  value={qD}
                  onChange={(e) => setQD(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600"
                  placeholder="پاسخ فرضی چهارم"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">لینک آموزش ویدئویی سوال (اختیاری - مانند آپارات یا یوتیوب):</label>
              <input
                type="url"
                value={qVideoUrl}
                onChange={(e) => setQVideoUrl(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600 font-mono text-left"
                placeholder="https://www.aparat.com/v/v80e663"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">لینک تصویر صورت سوال (اختیاری):</label>
              <input
                type="url"
                value={qImageUrl}
                onChange={(e) => setQImageUrl(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-indigo-600 font-mono text-left"
                placeholder="https://example.com/image.png"
              />
              {qImageUrl.trim() && (
                <div className="mt-2 p-2 border border-dashed border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 mb-1 font-bold">پیش‌نمایش تصویر صورت سوال:</span>
                  <img
                    src={qImageUrl}
                    alt="پیش‌نمایش سوال"
                    className="max-h-28 rounded object-contain border border-slate-200"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddQuestion(false)}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-bold transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg text-xs transition"
              >
                ثبت سوال در شیت سوالات
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* 3. Main Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Students Selection list */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col min-h-[580px]">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-1.5">
            <BookOpenCheck className="w-5 h-5 text-indigo-600" />
            انتخاب دانش‌آموز جهت بررسی
          </h3>

          {/* Quick add student by ID Form */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 mb-4">
            <h4 className="text-[11px] font-black text-slate-700 mb-2 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
              افزودن دانش‌آموز جدید با شناسه (ID)
            </h4>
            <form onSubmit={handleAddStudentById} className="flex gap-2">
              <input
                type="text"
                required
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                placeholder="مثال: S101"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-indigo-600 text-center font-mono placeholder:text-slate-400 placeholder:font-sans"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs transition shrink-0 shadow-sm"
              >
                افزودن
              </button>
            </form>
            {addError && <p className="text-[10px] text-red-600 font-bold mt-1.5 pr-1">{addError}</p>}
            {addSuccess && <p className="text-[10px] text-emerald-600 font-bold mt-1.5 pr-1">{addSuccess}</p>}
          </div>

          {/* Search bar */}
          <div className="relative mb-3.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-600 pr-9 text-right"
              placeholder="جستجو بر اساس نام یا پایه..."
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          <div className="flex-grow overflow-y-auto space-y-2 pr-1 max-h-[360px]">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-slate-400">دانش‌آموزی اضافه نشده است.</p>
                <p className="text-[10px] text-slate-400 mt-1">با استفاده از فرم بالا شناسه دانش‌آموز را ثبت کنید.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.UserID}
                  className={`w-full rounded-xl border transition flex justify-between items-center p-3 ${selectedStudentId === student.UserID ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold' : 'border-slate-150 hover:bg-slate-50/50 bg-white'}`}
                >
                  <button
                    onClick={() => setSelectedStudentId(student.UserID)}
                    className="flex-1 text-right flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xs font-black">{student.FullName}</div>
                      <div className="text-[10px] opacity-75 mt-1">{student.Grade || 'پایه نامشخص'}</div>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded border border-slate-200 shrink-0 ml-2">
                      {student.UserID}
                    </span>
                  </button>

                  <button
                    onClick={(e) => handleRemoveStudent(student.UserID, e)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                    title="حذف دانش‌آموز از پنل من"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Student Details & Box Progress Logs */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[480px]">
          {!selectedStudent || !stats ? (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                <UserCheck className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-700">هیچ دانش‌آموزی انتخاب نشده است</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                لطفا از لیست منوی سمت راست یکی از دانش‌آموزان را انتخاب کنید تا خلاصه وضعیت لایتنر و فعالیت‌های وی را بررسی کنید.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
                <div>
                  <h4 className="text-lg font-black text-slate-900">{selectedStudent.FullName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    کلاس: {selectedStudent.Grade || 'پایه نامشخص'} • شناسه دانش‌آموز: <span className="font-mono">{selectedStudent.UserID}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-100">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{stats.activeDays} روز حضور فعال</span>
                </div>
              </div>

              {/* Progress Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">کل سوالات پایه</div>
                  <div className="text-lg font-black text-slate-800 mt-1">{stats.totalCards}</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                  <div className="text-[10px] text-emerald-700 font-bold">تسلط ۱۰۰٪ (جعبه ۵)</div>
                  <div className="text-lg font-black text-emerald-800 mt-1">{stats.masteredCount}</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                  <div className="text-[10px] text-indigo-700 font-bold">در حال یادگیری</div>
                  <div className="text-lg font-black text-indigo-800 mt-1">{stats.learningCount}</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                  <div className="text-[10px] text-amber-700 font-bold">تعداد کل پاسخ‌ها</div>
                  <div className="text-lg font-black text-amber-800 mt-1">{stats.totalAnswers}</div>
                </div>
              </div>

               {/* Visual Box distribution chart */}
              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  آمار پراکندگی کارت‌ها در جعبه‌های لایتنر دانش‌آموز (به همراه جعبه طلایی):
                </h5>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  {[1, 2, 3, 4, 5, 6].map((boxNum) => {
                    const count = stats.boxesCount[boxNum as 1 | 2 | 3 | 4 | 5 | 6] || 0;
                    const maxVal = Math.max(...Object.values(stats.boxesCount), 1);
                    const heightPct = Math.max(12, Math.round((count / maxVal) * 100));

                    return (
                      <div key={boxNum} className="flex flex-col items-center gap-2">
                        <span className="text-xs font-black text-slate-800">{count}</span>
                        <div className="w-full bg-slate-200 h-24 rounded-lg flex items-end overflow-hidden">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPct}%` }}
                            transition={{ duration: 0.5 }}
                            className={`${boxNum === 6 ? 'bg-amber-500' : 'bg-indigo-600'} w-full rounded-t-md`}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 text-center">
                          {boxNum === 6 ? 'جعبه طلایی' : `جعبه ${boxNum}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress by Subject */}
              <div className="pt-6 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  وضعیت پیشرفت و تسلط به تفکیک دروس:
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.subjectStats.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center col-span-2 py-4">داده‌ای برای پیشرفت دروس یافت نشد.</p>
                  ) : (
                    stats.subjectStats.map((subStat) => {
                      const total = subStat.totalCards;
                      const mastered = subStat.mastered;
                      const learning = subStat.learning;
                      const unattempted = Math.max(0, total - (mastered + learning));

                      const masteredPct = total > 0 ? (mastered / total) * 100 : 0;
                      const learningPct = total > 0 ? (learning / total) * 100 : 0;
                      const unattemptedPct = total > 0 ? (unattempted / total) * 100 : 0;

                      return (
                        <div key={subStat.subject} className="bg-slate-50 hover:bg-slate-100/70 transition border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                {subStat.subject}
                              </span>
                              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-extrabold">
                                {subStat.progressPercent}٪ تسلط
                              </span>
                            </div>

                            {/* Multi-segment progress bar */}
                            <div className="w-full h-2 bg-slate-200 rounded-full flex overflow-hidden mb-2">
                              {mastered > 0 && (
                                <div
                                  style={{ width: `${masteredPct}%` }}
                                  className="bg-emerald-500 h-full animate-pulse"
                                  title={`تسلط: ${mastered} کارت`}
                                />
                              )}
                              {learning > 0 && (
                                <div
                                  style={{ width: `${learningPct}%` }}
                                  className="bg-indigo-500 h-full"
                                  title={`در حال یادگیری: ${learning} کارت`}
                                />
                              )}
                              {unattempted > 0 && (
                                <div
                                  style={{ width: `${unattemptedPct}%` }}
                                  className="bg-slate-300 h-full"
                                  title={`باقی‌مانده: ${unattempted} کارت`}
                                />
                              )}
                            </div>

                            {/* Detail stats labels */}
                            <div className="flex justify-between text-[9px] text-slate-500 font-bold px-0.5 mb-2">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                تسلط: {mastered}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                یادگیری: {learning}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                کل کارت‌ها: {total}
                              </span>
                            </div>
                          </div>

                          {/* Mini box-by-box breakdown bar */}
                          <div className="pt-2 border-t border-slate-200/50 flex justify-between items-center text-[9px] text-slate-400">
                            <span>پراکندگی در جعبه‌ها:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5, 6].map((b) => {
                                const bCount = subStat.boxes[b] || 0;
                                if (bCount === 0) return null;
                                return (
                                  <span key={b} className={`px-1 rounded ${b === 6 ? 'bg-amber-100 text-amber-700' : 'bg-slate-150 text-slate-600'} font-semibold`}>
                                    ج{b === 6 ? 'ط' : b}: {bCount}
                                  </span>
                                );
                              })}
                              {Object.values(subStat.boxes).reduce((a, b) => a + b, 0) === 0 && (
                                <span className="text-slate-400">بدون شروع</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Feedback Message Sender & Logs */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-indigo-600" />
                  ارسال پیام تشویقی و بازخورد اختصاصی:
                </h5>

                <form onSubmit={handleSendFeedbackSubmit} className="space-y-3">
                  <textarea
                    required
                    rows={2.5}
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="نمونه پیام: مریم جان، تمرکز و مداومتت بر روی درس زیست‌شناسی فوق‌العاده بوده است. به همین شیوه ادامه بده..."
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!feedbackMsg.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      ارسال پیام مستقیم به پنل دانش‌آموز
                    </button>
                  </div>
                </form>

                {/* List of Sent feedbacks */}
                {studentFeedbacks.length > 0 && (
                  <div className="space-y-2 mt-4 pt-4 border-t border-dashed border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400">تاریخچه پیام‌های ارسال شده قبلی شما:</span>
                    {studentFeedbacks.map((f) => (
                      <div key={f.FeedbackID} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex justify-between items-start gap-4">
                        <p className="text-slate-700 leading-relaxed">{f.Message}</p>
                        <span className="text-[9px] text-slate-400 shrink-0 font-medium">{f.Date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
