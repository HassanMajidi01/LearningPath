import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { LogIn, UserPlus, KeyRound, UserCheck, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  onSignUp: (userData: { username: string; password?: string; fullName: string; role: UserRole; grade?: string }) => void;
  users: User[];
  sheetsConfig?: { webAppUrl: string; isConnected: boolean };
}

const GRADES = [
  "پایه اول", "پایه دوم", "پایه سوم", "پایه چهارم", "پایه پنجم", "پایه ششم",
  "پایه هفتم", "پایه هشتم", "پایه نهم", "پایه دهم", "پایه یازدهم", "پایه دوازدهم"
];

export default function AuthScreen({ onLogin, onSignUp, users, sheetsConfig }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const role: UserRole = 'Student';
  const [grade, setGrade] = useState(GRADES[8]); // Default Grade 9
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      const trimmedUser = username.trim();
      const trimmedUserLower = trimmedUser.toLowerCase();
      
      setLoading(true);
      
      // If connected to Google Sheets, prioritize authenticating through the web app directly.
      // This is extremely important if the local storage cache is desynced or doesn't have passwords.
      if (sheetsConfig?.isConnected) {
        try {
          console.log(`[Auth] Attempting server-side login for "${trimmedUser}"...`);
          const response = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', username: trimmedUserLower, password: password })
          });
          const resJson = await response.json();
          if (resJson && resJson.success && resJson.data) {
            console.log('[Auth] Server-side login successful:', resJson.data);
            const user: User = {
              UserID: resJson.data.UserID,
              Username: resJson.data.Username,
              Password: password, // Keep the correct password
              FullName: resJson.data.FullName,
              Role: resJson.data.Role as 'Student' | 'Teacher',
              Grade: resJson.data.Grade,
              CreatedDate: resJson.data.CreatedDate
            };
            onLogin(user);
            setLoading(false);
            return;
          } else {
            console.warn('[Auth] Server-side login failed or returned invalid data:', resJson?.error);
          }
        } catch (err) {
          console.error('[Auth] Server-side login fetch error:', err);
        }
      }

      // Local fallback
      console.log('[Auth] Falling back to local client-side credentials check...');
      const user = users.find(
        (u) => u.Username.toLowerCase() === trimmedUserLower && String(u.Password).trim() === String(password).trim()
      );

      setLoading(false);
      if (user) {
        onLogin(user);
      } else {
        setError('نام کاربری یا کلمه عبور نادرست است. لطفا از کادرهای راهنمای زیر جهت ورود سریع استفاده کنید.');
      }
    } else {
      if (!username.trim() || !password.trim() || !fullName.trim()) {
        setError('لطفا تمامی فیلدهای الزامی را پر کنید.');
        return;
      }

      const existing = users.find((u) => u.Username.toLowerCase() === username.trim().toLowerCase());
      if (existing) {
        setError('این نام کاربری قبلا ثبت شده است. نام دیگری انتخاب کنید.');
        return;
      }

      setLoading(true);
      await onSignUp({
        username: username.trim().toLowerCase(),
        password: password,
        fullName: fullName.trim(),
        role,
        grade: role === 'Student' ? grade : undefined
      });
      setLoading(false);
      
      // Toggle to login and pre-fill username
      setIsLogin(true);
      setPassword('');
      setError(null);
    }
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
    
    // Auto submit next tick
    setTimeout(() => {
      const user = users.find(
        (x) => x.Username.toLowerCase() === u.toLowerCase() && String(x.Password) === String(p)
      );
      if (user) {
        onLogin(user);
      }
    }, 100);
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl relative overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <KeyRound className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          {isLogin ? 'ورود به سامانه لایتنر هوشمند' : 'ثبت نام دانش‌آموز جدید'}
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          {isLogin
            ? 'پایه تحصیلی و کارت‌های لایتنر خود را مدیریت کنید'
            : 'یک حساب کاربری جدید ایجاد کنید تا یادگیری را آغاز کنید'}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">نام و نام خانوادگی</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition text-right"
              placeholder="مثال: علی علوی"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">نام کاربری</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition font-mono ltr text-left"
            placeholder="مثلا: ali"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">کلمه عبور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition font-mono ltr text-left"
            placeholder="••••••••"
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">پایه تحصیلی</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition bg-white"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        )}

         <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-xl transition shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              لطفا صبر کنید...
            </>
          ) : isLogin ? (
            <>
              <LogIn className="w-4 h-4" />
              ورود به سیستم
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              ثبت نام حساب کاربری
            </>
          )}
        </button>
      </form>

      {/* Switch Form */}
      <div className="text-center mt-6 text-sm">
        <span className="text-slate-500">
          {isLogin ? 'هنوز ثبت نام نکرده‌اید؟ ' : 'قبلا حساب کاربری ساخته‌اید؟ '}
        </span>
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-indigo-600 font-bold hover:underline"
        >
          {isLogin ? 'ثبت نام دانش‌آموز' : 'ورود به حساب کاربری'}
        </button>
      </div>
    </div>
  );
}
