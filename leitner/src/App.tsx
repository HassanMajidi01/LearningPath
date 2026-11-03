import React, { useState, useEffect } from 'react';
import { User, Question, Progress, ActivityLog, Feedback, SheetsConfig } from './types';
import { getStoredData, saveStoredData, addDays, getTodayDateString, LEITNER_INTERVALS } from './data';

// Component Imports
import AuthScreen from './components/AuthScreen';
import StudentDashboard from './components/StudentDashboard';

// Icons
import { BrainCircuit, LogOut, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [sheetsConfig, setSheetsConfig] = useState<SheetsConfig>({ webAppUrl: '', isConnected: false });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Load database on mount
  useEffect(() => {
    const data = getStoredData();
    if (data) {
      setQuestions(data.questions);
      setUsers(data.users);
      setProgress(data.progress);
      setActivityLogs(data.logs);
      setFeedbacks(data.feedbacks);
    }

    // Fetch Sheets Connection Config from server backend
    fetch('/api/sheets-config')
      .then((res) => res.json())
      .then(async (config) => {
        if (config.isConnected) {
          setSheetsConfig({ webAppUrl: '/api/sync', isConnected: true });
          await syncInitialDataFromSheets();
        } else {
          setSheetsConfig({ webAppUrl: '', isConnected: false });
        }
      })
      .catch((err) => {
        console.warn('Backend sheets-config not available:', err);
        setSheetsConfig({ webAppUrl: '', isConnected: false });
      });
  }, []);

  // Synchronize initial data from Google Sheets (questions, students)
  const syncInitialDataFromSheets = async () => {
    setIsSyncing(true);
    try {
      console.log("[Sheets Sync] Syncing initial data from Google Sheets...");
      
      // 1. Fetch Questions
      const questionsRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getQuestions' })
      });
      const qJson = await questionsRes.json();
      let syncedQuestions = questions;
      if (qJson.success && Array.isArray(qJson.data)) {
        console.log(`[Sheets Sync] Loaded ${qJson.data.length} questions from Sheets.`);
        const mappedQuestions: Question[] = qJson.data.map((item: any) => ({
          QuestionID: item.QuestionID || item.id || '',
          QuestionText: item.QuestionText || item.questionText || '',
          OptionA: item.OptionA || item.optionA || '',
          OptionB: item.OptionB || item.optionB || '',
          OptionC: item.OptionC || item.optionC || '',
          OptionD: item.OptionD || item.optionD || '',
          CorrectOption: (item.CorrectOption || item.correctOption || 'A') as 'A' | 'B' | 'C' | 'D',
          Subject: item.Subject || item.subject || '',
          Grade: item.Grade || item.grade || '',
          VideoURL: item.VideoURL || item.videoUrl || item["Video link"] || item["Video Link"] || item["video link"] || item["لینک آموزش ویدئویی سوال"] || item["لینک ویدئو"] || item["لینک ویدیو"] || item["VideoLink"] || undefined,
          ImageURL: item.ImageURL || item.imageUrl || item["Image link"] || item["Image Link"] || item["image link"] || item["لینک تصویر سوال"] || item["لینک تصویر"] || item["لینک عکس"] || item["ImageLink"] || undefined
        }));
        syncedQuestions = mappedQuestions;
        setQuestions(mappedQuestions);
      }

      // 2. Fetch Students / Users
      const studentsRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getStudents' })
      });
      const sJson = await studentsRes.json();
      if (sJson.success && Array.isArray(sJson.data)) {
        console.log(`[Sheets Sync] Loaded ${sJson.data.length} students from Sheets.`);
        
        const sheetUsers: User[] = sJson.data.map((item: any) => ({
          UserID: item.UserID || item.id,
          Username: item.Username || item.username,
          Password: item.Password || '123',
          FullName: item.FullName || item.fullName,
          Role: (item.Role || 'Student') as 'Student' | 'Teacher',
          Grade: item.Grade || item.grade,
          CreatedDate: item.CreatedDate || item.createdDate || getTodayDateString()
        }));

        const stored = getStoredData();
        const localUsers = stored?.users || [];
        const mergedUsers = [...sheetUsers];
        
        localUsers.forEach(localUser => {
          if (!mergedUsers.some(u => u.Username.toLowerCase() === localUser.Username.toLowerCase())) {
            mergedUsers.push(localUser);
          }
        });

        setUsers(mergedUsers);
        saveStoredData({ questions: syncedQuestions, users: mergedUsers });
      }
    } catch (error) {
      console.error("[Sheets Sync] Failed to sync initial data:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Fetch progress and feedback for Student
  const fetchStudentDataFromSheets = async (userId: string) => {
    try {
      console.log(`[Sheets Sync] Fetching progress & feedback for student ${userId}...`);
      
      const progressRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getProgress', userId })
      });
      const pJson = await progressRes.json();
      let syncedProgress = progress;
      if (pJson.success && Array.isArray(pJson.data)) {
        syncedProgress = pJson.data.map((item: any) => ({
          UserID: item.UserID,
          StudentName: item.StudentName || currentUser?.FullName || '',
          QuestionID: item.QuestionID,
          Subject: item.Subject,
          CurrentBox: Number(item.CurrentBox),
          NextReviewDate: item.NextReviewDate,
          LastAnsweredDate: item.LastAnsweredDate,
          Status: item.Status as 'Learning' | 'Mastered'
        }));
        setProgress(syncedProgress);
      }

      const feedbackRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getFeedback', studentId: userId })
      });
      const fJson = await feedbackRes.json();
      let syncedFeedbacks = feedbacks;
      if (fJson.success && Array.isArray(fJson.data)) {
        syncedFeedbacks = fJson.data.map((item: any) => ({
          FeedbackID: item.FeedbackID,
          StudentID: item.StudentID,
          TeacherID: item.TeacherID,
          TeacherName: item.TeacherName,
          Message: item.Message,
          Date: item.Date
        }));
        setFeedbacks(syncedFeedbacks);
      }

      saveStoredData({ progress: syncedProgress, feedbacks: syncedFeedbacks });
    } catch (error) {
      console.error("[Sheets Sync] Error fetching student specific data:", error);
    }
  };

  // Fetch all students' progress and feedbacks for Teacher
  const fetchTeacherDataFromSheets = async () => {
    try {
      console.log(`[Sheets Sync] Teacher logged in, fetching student list & all progress...`);
      
      const studentsRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getStudents' })
      });
      const sJson = await studentsRes.json();
      if (sJson.success && Array.isArray(sJson.data)) {
        const sheetUsers: User[] = sJson.data.map((item: any) => ({
          UserID: item.UserID || item.id,
          Username: item.Username || item.username,
          Password: item.Password || '123',
          FullName: item.FullName || item.fullName,
          Role: (item.Role || 'Student') as 'Student' | 'Teacher',
          Grade: item.Grade || item.grade,
          CreatedDate: item.CreatedDate || item.createdDate || getTodayDateString()
        }));

        const stored = getStoredData();
        const localUsers = stored?.users || [];
        const mergedUsers = [...sheetUsers];
        localUsers.forEach(localUser => {
          if (!mergedUsers.some(u => u.Username.toLowerCase() === localUser.Username.toLowerCase())) {
            mergedUsers.push(localUser);
          }
        });
        setUsers(mergedUsers);

        const allProgress: Progress[] = [];
        const allFeedbacks: Feedback[] = [];
        
        for (const student of sheetUsers) {
          const pRes = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getProgress', userId: student.UserID })
          });
          const pData = await pRes.json();
          if (pData.success && Array.isArray(pData.data)) {
            pData.data.forEach((p: any) => allProgress.push({
              UserID: p.UserID,
              QuestionID: p.QuestionID,
              Subject: p.Subject,
              CurrentBox: Number(p.CurrentBox),
              NextReviewDate: p.NextReviewDate,
              LastAnsweredDate: p.LastAnsweredDate,
              Status: p.Status
            }));
          }

          const fRes = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getFeedback', studentId: student.UserID })
          });
          const fData = await fRes.json();
          if (fData.success && Array.isArray(fData.data)) {
            fData.data.forEach((f: any) => allFeedbacks.push({
              FeedbackID: f.FeedbackID,
              StudentID: f.StudentID,
              TeacherID: f.TeacherID,
              TeacherName: f.TeacherName,
              Message: f.Message,
              Date: f.Date
            }));
          }
        }

        if (allProgress.length > 0) setProgress(allProgress);
        if (allFeedbacks.length > 0) setFeedbacks(allFeedbacks);
        
        saveStoredData({
          users: mergedUsers,
          progress: allProgress.length > 0 ? allProgress : undefined,
          feedbacks: allFeedbacks.length > 0 ? allFeedbacks : undefined
        });
      }
    } catch (error) {
      console.error("[Sheets Sync] Error fetching teacher dashboard data:", error);
    }
  };

  // Update localStorage when local state changes
  const updateDB = (updatedFields: {
    questions?: Question[];
    users?: User[];
    progress?: Progress[];
    logs?: ActivityLog[];
    feedbacks?: Feedback[];
    sheetsConfig?: SheetsConfig;
  }) => {
    if (updatedFields.questions) setQuestions(updatedFields.questions);
    if (updatedFields.users) setUsers(updatedFields.users);
    if (updatedFields.progress) setProgress(updatedFields.progress);
    if (updatedFields.logs) setActivityLogs(updatedFields.logs);
    if (updatedFields.feedbacks) setFeedbacks(updatedFields.feedbacks);
    if (updatedFields.sheetsConfig) setSheetsConfig(updatedFields.sheetsConfig);

    saveStoredData(updatedFields);
  };

  // 1. Authentication Handlers
  const handleUpdateGrade = (newGrade: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, Grade: newGrade };
    setCurrentUser(updatedUser);
    const updatedUsers = users.map((u) => u.UserID === currentUser.UserID ? updatedUser : u);
    updateDB({ users: updatedUsers });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    
    // Log login activity
    const today = getTodayDateString();
    const existingLogIndex = activityLogs.findIndex(
      (l) => l.UserID === user.UserID && l.Date === today
    );

    let updatedLogs = [...activityLogs];
    if (existingLogIndex > -1) {
      updatedLogs[existingLogIndex].LoginsCount += 1;
    } else {
      updatedLogs.push({
        UserID: user.UserID,
        Date: today,
        LoginsCount: 1,
        AnswersCount: 0,
      });
    }

    updateDB({ logs: updatedLogs });

    // Sync specific student data on login
    if (sheetsConfig.isConnected) {
      syncInitialDataFromSheets().then(() => {
        fetchStudentDataFromSheets(user.UserID);
      });
    }
  };

  const handleSignUp = async (userData: { username: string; password?: string; fullName: string; role: 'Student' | 'Teacher'; grade?: string }) => {
    // Generate a random 6-digit numeric ID for students and teachers
    const randomNumericId = Math.floor(100000 + Math.random() * 900000).toString();
    const tempId = randomNumericId;
    const chosenPassword = userData.password || '123';
    let finalUser: User = {
      UserID: tempId,
      Username: userData.username,
      Password: chosenPassword,
      FullName: userData.fullName,
      Role: userData.role,
      Grade: userData.grade,
      CreatedDate: getTodayDateString()
    };

    if (sheetsConfig.isConnected && sheetsConfig.webAppUrl) {
      try {
        console.log(`[Sheets Sync] Sending signup request to Sheets for user: ${userData.username}`);
        const response = await fetch(sheetsConfig.webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'signup',
            username: userData.username,
            password: chosenPassword,
            fullName: userData.fullName,
            role: userData.role,
            grade: userData.grade || ''
          })
        });
        const resData = await response.json();
        if (resData && resData.success && resData.data) {
          console.log("[Sheets Sync] Registered user on Google Sheets successfully:", resData.data);
          const sheetUser = resData.data;
          finalUser = {
            UserID: sheetUser.UserID || tempId,
            Username: sheetUser.Username || userData.username,
            Password: sheetUser.Password || chosenPassword,
            FullName: sheetUser.FullName || userData.fullName,
            Role: (sheetUser.Role || userData.role) as 'Student' | 'Teacher',
            Grade: sheetUser.Grade || userData.grade,
            CreatedDate: sheetUser.CreatedDate || getTodayDateString()
          };
        } else {
          console.warn("[Sheets Sync] Google Sheets signup failed, falling back to local:", resData?.error);
        }
      } catch (err) {
        console.error("[Sheets Sync] Google Sheets signup error, falling back to local:", err);
      }
    }

    const updatedUsers = [...users.filter(u => u.Username.toLowerCase() !== finalUser.Username.toLowerCase()), finalUser];
    updateDB({ users: updatedUsers });
    
    // Auto-login the registered user
    handleLogin(finalUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 2. Student Answer Handler (Core Leitner System Algorithm)
  const handleSubmitAnswer = (questionId: string, isCorrect: boolean, subject: string) => {
    if (!currentUser) return;

    const today = getTodayDateString();

    // 1. Calculate next box & status
    const existingProgressIndex = progress.findIndex(
      (p) => p.UserID === currentUser.UserID && p.QuestionID === questionId
    );

    let currentBox = 1;
    if (existingProgressIndex > -1) {
      currentBox = progress[existingProgressIndex].CurrentBox;
    }

    let nextBox = 1;
    let status: 'Learning' | 'Mastered' = 'Learning';

    if (isCorrect) {
      if (currentBox < 5) {
        nextBox = currentBox + 1;
      } else {
        nextBox = 5;
        status = 'Mastered'; // Answered correct at Box 5 -> Graduate
      }
    } else {
      nextBox = 1; // Incorrect answer -> drop instantly back to Box 1
    }

    // 2. Set review intervals based on Box Number
    const intervalDays = LEITNER_INTERVALS[nextBox] || 1;
    const nextReviewDate = addDays(today, intervalDays);

    const newProgressEntry: Progress = {
      UserID: currentUser.UserID,
      StudentName: currentUser.FullName,
      QuestionID: questionId,
      Subject: subject,
      CurrentBox: nextBox,
      NextReviewDate: nextReviewDate,
      LastAnsweredDate: today,
      Status: status
    };

    let updatedProgress = [...progress];
    if (existingProgressIndex > -1) {
      updatedProgress[existingProgressIndex] = newProgressEntry;
    } else {
      updatedProgress.push(newProgressEntry);
    }

    // 3. Increment activity counts
    let updatedLogs = [...activityLogs];
    const logIndex = updatedLogs.findIndex(
      (l) => l.UserID === currentUser.UserID && l.Date === today
    );

    if (logIndex > -1) {
      updatedLogs[logIndex].AnswersCount += 1;
    } else {
      updatedLogs.push({
        UserID: currentUser.UserID,
        Date: today,
        LoginsCount: 1,
        AnswersCount: 1
      });
    }

    updateDB({
      progress: updatedProgress,
      logs: updatedLogs
    });

    // If live synchronization is configured, send the record to Sheets too!
    if (sheetsConfig.isConnected && sheetsConfig.webAppUrl) {
      sendDataToGoogleSheets('submitAnswer', {
        userId: currentUser.UserID,
        studentName: currentUser.FullName,
        questionId,
        isCorrect,
        subject
      });
    }
  };

  // 3. Teacher Actions
  const handleTeacherAddStudent = (studentData: { fullName: string; username: string; grade: string }) => {
    const nextId = 'S' + (100 + users.length + 1);
    
    const newStudent: User = {
      UserID: nextId,
      Username: studentData.username,
      Password: '123', // default
      FullName: studentData.fullName,
      Role: 'Student',
      Grade: studentData.grade,
      CreatedDate: getTodayDateString()
    };

    const updatedUsers = [...users, newStudent];
    updateDB({ users: updatedUsers });

    if (sheetsConfig.isConnected && sheetsConfig.webAppUrl) {
      sendDataToGoogleSheets('signup', {
        username: studentData.username,
        password: '123',
        fullName: studentData.fullName,
        role: 'Student',
        grade: studentData.grade
      });
    }
  };

  const handleTeacherSendFeedback = (studentId: string, message: string) => {
    if (!currentUser) return;

    const nextId = 'F' + (100 + feedbacks.length + 1);
    const newFeedback: Feedback = {
      FeedbackID: nextId,
      StudentID: studentId,
      TeacherID: currentUser.UserID,
      TeacherName: currentUser.FullName,
      Message: message,
      Date: getTodayDateString()
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    updateDB({ feedbacks: updatedFeedbacks });

    if (sheetsConfig.isConnected && sheetsConfig.webAppUrl) {
      sendDataToGoogleSheets('sendFeedback', {
        studentId,
        teacherId: currentUser.UserID,
        teacherName: currentUser.FullName,
        message
      });
    }
  };

  const handleTeacherAddQuestion = (qData: Omit<Question, 'QuestionID'>) => {
    const nextId = 'Q' + String(questions.length + 1).padStart(3, '0');
    
    const newQuestion: Question = {
      QuestionID: nextId,
      ...qData
    };

    const updatedQuestions = [...questions, newQuestion];
    updateDB({ questions: updatedQuestions });

    if (sheetsConfig.isConnected && sheetsConfig.webAppUrl) {
      sendDataToGoogleSheets('addQuestion', {
        questionText: qData.QuestionText,
        optionA: qData.OptionA,
        optionB: qData.OptionB,
        optionC: qData.OptionC,
        optionD: qData.OptionD,
        correctOption: qData.CorrectOption,
        subject: qData.Subject,
        grade: qData.Grade,
        videoUrl: qData.VideoURL || '',
        imageUrl: qData.ImageURL || ''
      });
    }
  };

  // Google Sheets Backend Proxy helper
  const sendDataToGoogleSheets = async (action: string, payload: any) => {
    try {
      const response = await fetch(sheetsConfig.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action,
          ...payload
        })
      });
      const data = await response.json();
      if (data && data.success) {
        console.log(`Synced action: ${action} to Google Sheet via backend proxy successfully.`);
      } else {
        console.warn(`Backend synced but returned error for ${action}:`, data?.error);
      }
    } catch (err) {
      console.error('Failed to sync to Google Sheets via backend proxy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 flex flex-col font-sans">
      
      {/* Header Chrome */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/10 shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">سامانه یادگیری لایتنر هوشمند</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${sheetsConfig.isConnected ? 'bg-emerald-400' : 'bg-indigo-400'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${sheetsConfig.isConnected ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  {sheetsConfig.isConnected ? 'متصل به گوگل شیت (بک‌اند)' : 'پایگاه داده ابری (بک‌اند)'}
                </span>
              </div>
            </div>
          </div>

          {/* Nav / Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {currentUser && (
              <>
                {sheetsConfig.isConnected && (
                  <button
                    onClick={async () => {
                      await syncInitialDataFromSheets();
                      if (currentUser) {
                        await fetchStudentDataFromSheets(currentUser.UserID);
                      }
                    }}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 transition cursor-pointer"
                    title="به‌روزرسانی و همگام‌سازی داده‌ها با گوگل شیت"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-slate-400' : 'text-emerald-600'}`} />
                    <span>{isSyncing ? 'در حال همگام‌سازی...' : 'همگام‌سازی با شیت'}</span>
                  </button>
                )}

                {/* User Card badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
                    {currentUser.FullName} (دانش‌آموز)
                  </span>
                  
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition border border-transparent hover:border-red-100"
                    title="خروج از حساب"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Body Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
        
        {/* View Switch */}
        {!currentUser ? (
          <AuthScreen onLogin={handleLogin} onSignUp={handleSignUp} users={users} sheetsConfig={sheetsConfig} />
        ) : (
          <div className="transition-all duration-300">
            <StudentDashboard
              student={currentUser}
              questions={questions}
              progress={progress}
              feedbacks={feedbacks}
              onSubmitAnswer={handleSubmitAnswer}
              onUpdateGrade={handleUpdateGrade}
              activityLogs={activityLogs}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© ۲۰۲۶ - سامانه جامع یادگیری لایتنر هوشمند تحصیلی | طراحی منطبق بر استانداردهای EdTech و گوگل اپس اسکریپت</p>
          <div className="flex items-center gap-1.5 text-[10px] bg-slate-50 border border-slate-200 text-slate-500 px-3 py-1 rounded-full">
            <span>دیتابیس ابری:</span>
            <span className="font-bold text-indigo-600">{sheetsConfig.isConnected ? 'Google Sheets' : 'LocalStorage (محلی)'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
