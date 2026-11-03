import React, { useState, useEffect } from 'react';
import { User, Question, Progress, Feedback, ActivityLog } from '../types';
import { BookOpen, Award, CheckCircle2, XCircle, ChevronLeft, BarChart3, MessageSquare, Sparkles, Flame, Calendar, Check, Video, GraduationCap, Edit3, X, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentDashboardProps {
  student: User;
  questions: Question[];
  progress: Progress[];
  feedbacks: Feedback[];
  onSubmitAnswer: (questionId: string, isCorrect: boolean, subject: string) => void;
  onUpdateGrade?: (newGrade: string) => void;
  activityLogs?: ActivityLog[];
}

const ALL_GRADES = [
  "پایه اول", "پایه دوم", "پایه سوم", "پایه چهارم", "پایه پنجم", "پایه ششم",
  "پایه هفتم", "پایه هشتم", "پایه نهم", "پایه دهم", "پایه یازدهم", "پایه دوازدهم"
];

export default function StudentDashboard({
  student,
  questions,
  progress,
  feedbacks,
  onSubmitAnswer,
  onUpdateGrade,
  activityLogs = []
}: StudentDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('همه');
  const [dueCards, setDueCards] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);

  // Grade selection modal state
  const [showGradeModal, setShowGradeModal] = useState<boolean>(false);
  const [tempGrade, setTempGrade] = useState<string>(student.Grade || ALL_GRADES[8]);

  // Copy Student ID state
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const handleCopyStudentId = () => {
    if (student.UserID) {
      navigator.clipboard.writeText(student.UserID);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // State for showing mastered cards modal
  const [showMasteredModal, setShowMasteredModal] = useState<boolean>(false);

  // Shuffled options for current question
  const [shuffledOptions, setShuffledOptions] = useState<{ key: 'A' | 'B' | 'C' | 'D'; text: string }[]>([]);

  // Helper for grade string matching
  const isGradeMatch = (qGrade?: string, sGrade?: string) => {
    if (!qGrade || !sGrade) return false;
    const qNorm = qGrade.trim();
    const sNorm = sGrade.trim();
    if (qNorm === sNorm) return true;
    return qNorm.replace("پایه ", "").trim() === sNorm.replace("پایه ", "").trim();
  };

  // Reset subject filter when student's grade changes
  useEffect(() => {
    setSelectedSubject('همه');
  }, [student.Grade]);

  // Filter and load cards that are due for review today or never answered
  useEffect(() => {
    // 1. Filter questions belonging to this student's grade
    const gradeQuestions = questions.filter(
      (q) => isGradeMatch(q.Grade, student.Grade)
    );

    // 2. Filter questions based on Leitner status and selected subject
    const filtered = gradeQuestions.filter((q) => {
      if (selectedSubject !== 'همه' && q.Subject !== selectedSubject) {
        return false;
      }

      const qProg = progress.find((p) => p.QuestionID === q.QuestionID && p.UserID === student.UserID);
      
      if (!qProg) {
        return true; // Not studied yet -> Needs review in Box 1
      }
      
      if (qProg.Status === 'Mastered') {
        return false; // Already completed Box 5 -> Graduate
      }

      // If NextReviewDate <= today, it's due
      return qProg.NextReviewDate <= todayStr;
    });

    setDueCards(filtered);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowAnswerFeedback(false);
  }, [selectedSubject, questions, student.Grade, student.UserID, todayStr]);

  const currentCard = dueCards[currentIndex];

  // Shuffle options whenever currentCard or currentIndex changes
  useEffect(() => {
    if (currentCard) {
      const opts: { key: 'A' | 'B' | 'C' | 'D'; text: string }[] = [
        { key: 'A', text: currentCard.OptionA },
        { key: 'B', text: currentCard.OptionB },
        { key: 'C', text: currentCard.OptionC },
        { key: 'D', text: currentCard.OptionD },
      ];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      setShuffledOptions(opts);
    } else {
      setShuffledOptions([]);
    }
  }, [currentCard?.QuestionID, currentIndex]);

  // Calculations for boxes strictly for the current grade
  const gradeQuestions = questions.filter((q) => isGradeMatch(q.Grade, student.Grade));
  const totalGradeQuestions = gradeQuestions.length;

  const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let masteredCount = 0;
  let activeInLeitner = 0;

  gradeQuestions.forEach((q) => {
    const p = progress.find((prog) => prog.QuestionID === q.QuestionID && prog.UserID === student.UserID);
    if (p) {
      activeInLeitner++;
      if (p.Status === 'Mastered') {
        masteredCount++;
        boxCounts[6]++;
      } else if (p.CurrentBox >= 1 && p.CurrentBox <= 5) {
        const box = p.CurrentBox as 1 | 2 | 3 | 4 | 5;
        boxCounts[box]++;
      }
    }
  });

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (hasAnswered) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || hasAnswered || dueCards.length === 0) return;
    
    const currentCard = dueCards[currentIndex];
    const isCorrect = selectedOption === currentCard.CorrectOption;
    
    setHasAnswered(true);
    setShowAnswerFeedback(true);
    onSubmitAnswer(currentCard.QuestionID, isCorrect, currentCard.Subject);
  };

  const handleNextCard = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setShowAnswerFeedback(false);
    
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setDueCards([]);
    }
  };

  const intervals: { [key: number]: string } = {
    1: 'امروز',
    2: 'فردا',
    3: '۵ روز بعد',
    4: '۹ روز بعد',
    5: '۱۵ روز بعد',
    6: 'آموخته‌شده'
  };

  const boxColors = {
    1: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', progressBg: 'bg-indigo-500', barTrack: 'bg-indigo-100' },
    2: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', progressBg: 'bg-emerald-500', barTrack: 'bg-emerald-100' },
    3: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', progressBg: 'bg-blue-500', barTrack: 'bg-blue-100' },
    4: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', progressBg: 'bg-amber-500', barTrack: 'bg-amber-100' },
    5: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', progressBg: 'bg-purple-500', barTrack: 'bg-purple-100' },
    6: { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-600', border: 'border-amber-150', progressBg: 'bg-amber-500', barTrack: 'bg-amber-100' },
  };

  // Get distinct subjects for filter
  const subjects = ['همه', ...Array.from(new Set(gradeQuestions.map((q) => q.Subject)))];

  // Weekly activity calculation
  const getWeeklyActivity = () => {
    const shortDays = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayIndex = d.getDay();
      const dayLabel = shortDays[dayIndex];
      
      const log = activityLogs.find(
        (l) => l.UserID === student.UserID && l.Date === dateStr
      );
      const count = log ? log.AnswersCount : 0;
      result.push({
        date: dateStr,
        dayLabel,
        count,
        isToday: i === 0,
      });
    }
    return result;
  };

  const weeklyActivity = getWeeklyActivity();
  const maxAnswersInWeek = Math.max(...weeklyActivity.map((w) => w.count), 1);

  // Get last feedback
  const studentFeedbacks = feedbacks.filter((f) => f.StudentID === student.UserID);
  const lastFeedback = studentFeedbacks.length > 0 ? studentFeedbacks[0] : null;

  const optionLabels = { A: 'الف', B: 'ب', C: 'ج', D: 'د' };

  return (
    <div className="space-y-4">
      {/* 1. Dashboard Subheader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
            {student.FullName.substring(0, 1)}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">خلاصه وضعیت تحصیلی</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">{student.FullName} | {student.Grade || 'پایه تحصیلی نامشخص'}</span>

              {/* Student ID Tag with Copy Functionality */}
              <button
                type="button"
                onClick={handleCopyStudentId}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-2.5 py-1 rounded-lg transition cursor-pointer active:scale-95"
                title="برای کپی شناسه دانش‌آموز کلیک کنید"
              >
                <span>شناسه: <span className="font-mono text-indigo-700">{student.UserID}</span></span>
                {copiedId ? (
                  <span className="flex items-center gap-0.5 text-emerald-600 font-bold text-[10px]">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    کپی شد
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                )}
              </button>

              <button
                onClick={() => {
                  setTempGrade(student.Grade || ALL_GRADES[8]);
                  setShowGradeModal(true);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1 rounded-lg transition cursor-pointer"
                title="تغییر پایه تحصیلی"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>تغییر پایه تحصیلی</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none px-3.5 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-xs font-bold flex items-center gap-1.5 justify-center">
            <Calendar className="w-4 h-4 shrink-0" />
            امروز: {new Date().toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })}
          </div>
          <div className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-xs font-bold flex items-center gap-1.5 justify-center">
            <Flame className="w-4 h-4 shrink-0 animate-pulse text-amber-500" />
            توالی فعال: {activityLogs.filter(l => l.UserID === student.UserID && l.AnswersCount > 0).length} روز
          </div>
        </div>
      </div>

      {/* 2. Main Bento Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Bento Segment (8 columns wide) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Study / Question Card (Main Box) */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col min-h-[440px] justify-between relative overflow-hidden">
            {/* Subject Tabs Filter bar inside study card */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">فیلتر درس:</span>
                <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-md scrollbar-none py-1">
                  {subjects.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${selectedSubject === sub ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full shrink-0">
                <span>امروز نیاز به مرور:</span>
                <span className="bg-white text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{dueCards.length}</span>
              </div>
            </div>

            {/* Inner Cards Area */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {dueCards.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-12 flex-grow flex flex-col justify-center"
                    key="empty"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">🏆</div>
                    <h4 className="font-bold text-slate-900 text-lg">تبریک! مرور به پایان رسید.</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      تمامی سوالات مربوط به درس <span className="font-bold text-indigo-600">"{selectedSubject}"</span> برای امروز با موفقیت مرور شدند. فردا منتظر شما هستیم!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentCard.QuestionID}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col flex-1 justify-between"
                  >
                    <div>
                      {/* Top labels */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                          مرور روزانه - درس {currentCard.Subject}
                        </span>
                        <span className="text-slate-400 text-xs">
                          کارت {currentIndex + 1} از {dueCards.length}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-xl font-bold leading-relaxed text-slate-900 mb-6">
                        {currentCard.QuestionText}
                      </h3>

                      {/* Question Image if present */}
                      {currentCard.ImageURL && (
                        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex justify-center shadow-sm">
                          <img
                            src={currentCard.ImageURL}
                            alt="تصویر صورت سوال"
                            className="max-h-64 sm:max-h-80 w-auto object-contain rounded-xl"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Options grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {shuffledOptions.map((optItem, slotIdx) => {
                          const slotLabels = ['الف', 'ب', 'ج', 'د'];
                          const label = slotLabels[slotIdx];
                          const optKey = optItem.key;
                          const text = optItem.text;

                          let cardStyle = "border-2 border-slate-100 bg-white hover:border-indigo-600 hover:bg-indigo-50/40 text-slate-700";
                          let spanStyle = "bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white";

                          if (selectedOption === optKey) {
                            cardStyle = "border-2 border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold";
                            spanStyle = "bg-indigo-600 text-white";
                          }

                          if (hasAnswered) {
                            if (optKey === currentCard.CorrectOption) {
                              cardStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold cursor-not-allowed";
                              spanStyle = "bg-emerald-600 text-white";
                            } else if (optKey === selectedOption) {
                              cardStyle = "border-2 border-red-500 bg-red-50 text-red-950 font-semibold cursor-not-allowed";
                              spanStyle = "bg-red-600 text-white";
                            } else {
                              cardStyle = "border border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed";
                              spanStyle = "bg-slate-150 text-slate-400";
                            }
                          }

                          return (
                            <button
                              key={optKey}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(optKey)}
                              className={`p-5 rounded-2xl text-right transition-all group flex items-center gap-4 ${cardStyle}`}
                            >
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${spanStyle}`}>
                                {label}
                              </span>
                              <span className="text-sm">{text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-6 border-t border-slate-150 gap-4 mt-8">
                      <div className="min-h-[24px]">
                        {showAnswerFeedback && (
                          <div className="flex items-center gap-2">
                            {selectedOption === currentCard.CorrectOption ? (
                              <span className="text-emerald-600 font-bold text-xs flex items-center gap-1.5 animate-bounce">
                                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                                پاسخ شما کاملاً صحیح است! کارت به خانه بعدی لایتنر منتقل شد.
                              </span>
                            ) : (
                              <span className="text-red-600 font-bold text-xs flex items-center gap-1.5">
                                <XCircle className="w-5 h-5 shrink-0 text-red-500" />
                                پاسخ اشتباه بود. کارت به خانه اول لایتنر برگشت.
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 shrink-0 items-center">
                        {currentCard?.VideoURL ? (
                          <a
                            href={currentCard.VideoURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 bg-rose-50 hover:bg-rose-100 border border-rose-150 text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-rose-100/30"
                            title="مشاهده آموزش ویدئویی این سوال"
                          >
                            <Video className="w-4 h-4 shrink-0 text-rose-600 animate-pulse" />
                            <span>آموزش ویدئویی سوال</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-5 py-3 bg-slate-100 border border-slate-200 text-slate-400 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-not-allowed opacity-50"
                            title="این سوال فاقد آموزش ویدئویی است"
                          >
                            <Video className="w-4 h-4 shrink-0 text-slate-350" />
                            <span>آموزش ویدئویی سوال (ندارد)</span>
                          </button>
                        )}

                        {!hasAnswered ? (
                          <button
                            onClick={handleSubmit}
                            disabled={!selectedOption}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition"
                          >
                            ثبت و مشاهده نتیجه
                          </button>
                        ) : (
                          <button
                            onClick={handleNextCard}
                            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <span>
                              {currentIndex < dueCards.length - 1 ? 'کارت بعدی' : 'اتمام مرور کارت‌ها'}
                            </span>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Weekly Activity Chart (Bento box 5) */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                خلاصه فعالیت هفته اخیر
              </h3>
              <span className="text-[10px] text-slate-400 font-bold">نمودار روزانه پاسخ‌ها</span>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 mt-4">
              {weeklyActivity.map((day, idx) => {
                const heightPct = day.count > 0 ? Math.round((day.count / maxAnswersInWeek) * 100) : 0;
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    {/* Visual columns */}
                    <div className="w-full bg-slate-100/80 rounded-t-lg relative h-16 sm:h-20">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(8, heightPct)}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className={`absolute bottom-0 w-full rounded-t-lg transition-all ${day.count > 0 ? (day.isToday ? 'bg-indigo-600' : 'bg-indigo-300') : 'bg-slate-200'}`}
                        style={{ height: day.count > 0 ? undefined : '8px' }}
                      />
                    </div>
                    
                    {/* Tooltip or count overlay label */}
                    <span className={`text-[10px] font-bold ${day.count > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {day.count > 0 ? day.count : '-'}
                    </span>

                    {/* Week day initial */}
                    <span className={`text-xs ${day.isToday ? 'font-bold text-indigo-600' : 'text-slate-400'}`}>
                      {day.dayLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Bento Segment (4 columns wide) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Status of Leitner Boxes (Bento box 2) */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between min-h-[310px]">
            <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              وضعیت جعبه‌های لایتنر شما
            </h3>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {[1, 2, 3, 4, 5, 6].map((boxNum) => {
                const count = boxCounts[boxNum as 1 | 2 | 3 | 4 | 5 | 6];
                const percentage = activeInLeitner > 0 ? Math.round((count / activeInLeitner) * 100) : 0;
                const c = boxColors[boxNum as 1 | 2 | 3 | 4 | 5 | 6];

                return (
                  <div key={boxNum} className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full ${c.text} ${c.bg}`}>
                        {boxNum === 6 ? 'جعبه طلایی (آموخته‌شده)' : `جعبه ${boxNum} (${intervals[boxNum]})`}
                      </span>
                      <span className={`text-xs font-bold ${c.text}`}>{count} کارت</span>
                    </div>
                    <div className={`overflow-hidden h-2 mb-2 text-xs flex rounded ${c.barTrack}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${c.progressBg}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold">
              <span>پیشرفت کلی: {totalGradeQuestions > 0 ? Math.round((masteredCount / totalGradeQuestions) * 100) : 0}%</span>
              <span>کارت‌های کل پایه: {totalGradeQuestions}</span>
            </div>
          </section>

          {/* Correct Answer Badge (Bento box 3) */}
          <section className="bg-indigo-900 rounded-3xl p-5 text-white flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs opacity-70">آموخته‌شده و تکمیل‌شده</span>
                <span className="text-2xl font-black mt-1">{masteredCount} کارت</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            {masteredCount > 0 && (
              <button
                onClick={() => setShowMasteredModal(true)}
                className="mt-1 w-full py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition text-center border border-white/10 cursor-pointer"
              >
                مشاهده لیست کارت‌های طلایی
              </button>
            )}
          </section>

        </div>

      </div>

      {/* Mastered Cards Modal */}
      <AnimatePresence>
        {showMasteredModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">جعبه طلایی (کارت‌های آموخته‌شده)</h3>
                    <p className="text-[10px] text-slate-500 font-medium">کارت‌هایی که هر ۵ مرحله لایتنر را با موفقیت پشت سر گذاشته‌اند</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMasteredModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-right" dir="rtl">
                {gradeQuestions.filter((q) => {
                  const p = progress.find((prog) => prog.QuestionID === q.QuestionID && prog.UserID === student.UserID);
                  return p && p.Status === 'Mastered';
                }).length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    هنوز کارتی به جعبه طلایی اضافه نشده است. با پاسخ‌های درست مستمر، کارت‌ها را به اینجا هدایت کنید!
                  </div>
                ) : (
                  gradeQuestions.filter((q) => {
                    const p = progress.find((prog) => prog.QuestionID === q.QuestionID && prog.UserID === student.UserID);
                    return p && p.Status === 'Mastered';
                  }).map((q, index) => (
                    <div key={q.QuestionID} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                          {q.Subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          کارت #{index + 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm leading-relaxed">
                        {q.QuestionText}
                      </h4>
                      <div className="mt-1 flex flex-col gap-1.5 border-t border-slate-100/70 pt-2.5">
                        <span className="text-xs text-slate-500 font-medium">پاسخ صحیح:</span>
                        <div className="px-3.5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>{q[`Option${q.CorrectOption}` as 'OptionA' | 'OptionB' | 'OptionC' | 'OptionD']}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowMasteredModal(false)}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  بستن صفحه
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal for Changing Grade */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">تغییر پایه تحصیلی</h3>
                    <p className="text-xs text-slate-500">پایه تحصیلی جدید خود را انتخاب کنید تا سوالات مربوطه نمایش داده شوند</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGradeModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Grade Grid */}
              <div className="p-5 overflow-y-auto space-y-3">
                <label className="block text-xs font-bold text-slate-600 mb-2">انتخاب پایه از لیست:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {ALL_GRADES.map((g) => {
                    const isSelected = tempGrade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setTempGrade(g)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{g}</span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onUpdateGrade) {
                      onUpdateGrade(tempGrade);
                    }
                    setShowGradeModal(false);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/10"
                >
                  <Check className="w-4 h-4" />
                  <span>تایید و ذخیره پایه</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
