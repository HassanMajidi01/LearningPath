# راهنمای اتصال وب‌سایت به پایگاه داده گوگل شیت (Google Sheets)

این راهنما به شما کمک می‌کند تا یک فایل گوگل شیت (Google Sheet) را به عنوان پایگاه داده اختصاصی خود تنظیم کنید. با این کار، تمامی اطلاعات کاربران، تمرینات، کارنامه‌ها و پیام‌های معلمان به صورت مستقیم و ایمن در حساب کاربری گوگل خود شما ذخیره می‌شود و دیگر نیازی به فایربیس یا هاست‌های پیچیده نخواهید داشت.

---

## 🚀 گام اول: ساخت فایل گوگل شیت و ورود به بخش اپس اسکریپت
1. وارد حساب کاربری گوگل خود شده و یک فایل **Google Sheets** جدید بسازید.
2. از منوی بالای صفحه روی **Extensions** (یا افزونه‌ها) کلیک کرده و سپس گزینه **Apps Script** را انتخاب کنید.
3. نام پروژه را در بالا به چیزی مانند `Kiashehr School Database` تغییر دهید.

---

## 💻 گام دوم: کپی کردن کد پایگاه داده در اپس اسکریپت
1. تمام کدهای پیش‌فرض موجود در ویرایشگر گوگل اپس اسکریپت را به طور کامل پاک کنید.
2. کد زیر را به صورت کامل کپی کرده و در ویرایشگر پیست کنید:

```javascript
// Google Apps Script Database for "آموزش و پرورش بندر کیاشهر"
// این اسکریپت را کپی کرده و در بخش Extensions -> Apps Script فایل گوگل شیت خود قرار دهید.

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "وب‌اپ گوگل شیت فعال است! اتصال برقرار شد."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    initDatabase();
    
    if (action === 'register') {
      return handleRegister(data);
    } else if (action === 'login') {
      return handleLogin(data);
    } else if (action === 'saveProgress') {
      return handleSaveProgress(data);
    } else if (action === 'getSelfData') {
      return handleGetSelfData(data);
    } else if (action === 'getProgress') {
      return handleGetProgress(data);
    } else if (action === 'saveFeedback') {
      return handleSaveFeedback(data);
    } else {
      return jsonResponse({ success: false, message: 'عملیات تعریف نشده: ' + action });
    }
  } catch (error) {
    return jsonResponse({ success: false, message: 'خطای سرور گوگل اپس اسکریپت: ' + error.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. users sheet
  let usersSheet = ss.getSheetByName('users');
  if (!usersSheet) {
    usersSheet = ss.insertSheet('users');
    usersSheet.appendRow(['id', 'username', 'email', 'passwordHash', 'role', 'createdAt']);
    usersSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#eff6ff');
  }
  
  // 2. progress sheet
  let progressSheet = ss.getSheetByName('progress');
  if (!progressSheet) {
    progressSheet = ss.insertSheet('progress');
    progressSheet.appendRow(['id', 'userId', 'studentName', 'studentEmail', 'type', 'subject', 'title', 'score', 'stars', 'details', 'timestamp']);
    progressSheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#ecfdf5');
  }
  
  // 3. feedback sheet
  let feedbackSheet = ss.getSheetByName('feedback');
  if (!feedbackSheet) {
    feedbackSheet = ss.insertSheet('feedback');
    feedbackSheet.appendRow(['id', 'studentId', 'teacherName', 'comment', 'timestamp']);
    feedbackSheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#fef3c7');
  }
}

function handleRegister(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  
  const email = data.email.toLowerCase().trim();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2].toString().toLowerCase().trim() === email) {
      return jsonResponse({ success: false, message: 'کاربری با این ایمیل قبلاً ثبت‌نام کرده است.' });
    }
  }
  
  const prefix = data.role === 'teacher' ? 'TCH' : 'STD';
  let isUnique = false;
  let newId = '';
  while (!isUnique) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = prefix + '-' + randomNum;
    
    let exists = false;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0].toString() === newId) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      isUnique = true;
    }
  }
  
  const newUser = [
    newId,
    data.username,
    email,
    data.passwordHash,
    data.role,
    new Date().toISOString()
  ];
  
  sheet.appendRow(newUser);
  
  return jsonResponse({
    success: true,
    user: {
      id: newId,
      username: data.username,
      email: email,
      role: data.role,
      createdAt: newUser[5]
    },
    message: 'ثبت‌نام با موفقیت انجام شد.'
  });
}

function handleLogin(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  
  const email = data.email.toLowerCase().trim();
  const passwordHash = data.passwordHash;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2].toString().toLowerCase().trim() === email) {
      if (rows[i][3].toString() === passwordHash) {
        return jsonResponse({
          success: true,
          user: {
            id: rows[i][0].toString(),
            username: rows[i][1].toString(),
            email: rows[i][2].toString(),
            role: rows[i][4].toString(),
            createdAt: rows[i][5].toString()
          },
          message: 'ورود موفقیت‌آمیز بود.'
        });
      } else {
        return jsonResponse({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
      }
    }
  }
  
  return jsonResponse({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
}

function handleSaveProgress(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let user = null;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.userId) {
      user = {
        id: userRows[i][0].toString(),
        username: userRows[i][1].toString(),
        email: userRows[i][2].toString()
      };
      break;
    }
  }
  
  if (!user) {
    return jsonResponse({ success: false, message: 'کاربر یافت نشد.' });
  }
  
  const progressSheet = ss.getSheetByName('progress');
  const progressId = 'PRG-' + Math.floor(100000 + Math.random() * 900000);
  
  const newProgress = [
    progressId,
    data.userId,
    user.username,
    user.email,
    data.type,
    data.subject,
    data.title,
    Number(data.score) || 0,
    Number(data.stars) || 0,
    data.details || '',
    new Date().toISOString()
  ];
  
  progressSheet.appendRow(newProgress);
  
  return jsonResponse({
    success: true,
    progress: {
      id: progressId,
      userId: data.userId,
      studentName: user.username,
      studentEmail: user.email,
      type: data.type,
      subject: data.subject,
      title: data.title,
      score: Number(data.score) || 0,
      stars: Number(data.stars) || 0,
      details: data.details || '',
      timestamp: newProgress[10]
    },
    message: 'پیشرفت شما ثبت شد!'
  });
}

function handleGetSelfData(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const progressSheet = ss.getSheetByName('progress');
  const progressRows = progressSheet.getDataRange().getValues();
  const progress = [];
  
  for (let i = 1; i < progressRows.length; i++) {
    if (progressRows[i][1].toString() === data.studentId) {
      progress.push({
        id: progressRows[i][0].toString(),
        userId: progressRows[i][1].toString(),
        studentName: progressRows[i][2].toString(),
        studentEmail: progressRows[i][3].toString(),
        type: progressRows[i][4].toString(),
        subject: progressRows[i][5].toString(),
        title: progressRows[i][6].toString(),
        score: Number(progressRows[i][7]),
        stars: Number(progressRows[i][8]),
        details: progressRows[i][9].toString(),
        timestamp: progressRows[i][10].toString()
      });
    }
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackRows = feedbackSheet.getDataRange().getValues();
  const feedback = [];
  
  for (let i = 1; i < feedbackRows.length; i++) {
    if (feedbackRows[i][1].toString() === data.studentId) {
      feedback.push({
        id: feedbackRows[i][0].toString(),
        studentId: feedbackRows[i][1].toString(),
        teacherName: feedbackRows[i][2].toString(),
        comment: feedbackRows[i][3].toString(),
        timestamp: feedbackRows[i][4].toString()
      });
    }
  }
  
  return jsonResponse({
    success: true,
    progress: progress,
    feedback: feedback
  });
}

function handleGetProgress(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let student = null;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.studentId) {
      student = {
        id: userRows[i][0].toString(),
        username: userRows[i][1].toString(),
        email: userRows[i][2].toString(),
        role: userRows[i][4].toString(),
        createdAt: userRows[i][5].toString()
      };
      break;
    }
  }
  
  if (!student || student.role !== 'student') {
    return jsonResponse({ success: false, message: 'دانش‌آموزی با این شناسه یافت نشد.' });
  }
  
  const progressSheet = ss.getSheetByName('progress');
  const progressRows = progressSheet.getDataRange().getValues();
  const progress = [];
  
  for (let i = 1; i < progressRows.length; i++) {
    if (progressRows[i][1].toString() === data.studentId) {
      progress.push({
        id: progressRows[i][0].toString(),
        userId: progressRows[i][1].toString(),
        studentName: progressRows[i][2].toString(),
        studentEmail: progressRows[i][3].toString(),
        type: progressRows[i][4].toString(),
        subject: progressRows[i][5].toString(),
        title: progressRows[i][6].toString(),
        score: Number(progressRows[i][7]),
        stars: Number(progressRows[i][8]),
        details: progressRows[i][9].toString(),
        timestamp: progressRows[i][10].toString()
      });
    }
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackRows = feedbackSheet.getDataRange().getValues();
  const feedback = [];
  
  for (let i = 1; i < feedbackRows.length; i++) {
    if (feedbackRows[i][1].toString() === data.studentId) {
      feedback.push({
        id: feedbackRows[i][0].toString(),
        studentId: feedbackRows[i][1].toString(),
        teacherName: feedbackRows[i][2].toString(),
        comment: feedbackRows[i][3].toString(),
        timestamp: feedbackRows[i][4].toString()
      });
    }
  }
  
  return jsonResponse({
    success: true,
    student: student,
    progress: progress,
    feedback: feedback
  });
}

function handleSaveFeedback(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let studentExists = false;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.studentId) {
      studentExists = true;
      break;
    }
  }
  
  if (!studentExists) {
    return jsonResponse({ success: false, message: 'دانش‌آموز یافت نشد.' });
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackId = 'FBB-' + Math.floor(100000 + Math.random() * 900000);
  
  const newFeedback = [
    feedbackId,
    data.studentId,
    data.teacherName,
    data.comment,
    new Date().toISOString()
  ];
  
  feedbackSheet.appendRow(newFeedback);
  
  return jsonResponse({
    success: true,
    feedback: {
      id: feedbackId,
      studentId: data.studentId,
      teacherName: data.teacherName,
      comment: data.comment,
      timestamp: newFeedback[4]
    },
    message: 'بازخورد با موفقیت ثبت شد.'
  });
}
```

---

## 🌐 گام سوم: انتشار کد به عنوان وب‌اپلیکیشن (Deployment)
1. در بالای صفحه روی دکمه آبی‌رنگ **Deploy** و سپس روی **New deployment** کلیک کنید.
2. روی نماد چرخ‌دنده کنار **Select type** کلیک کرده و گزینه **Web app** را انتخاب نمایید.
3. در فرم ظاهر شده، تنظیمات را دقیقاً مانند موارد زیر قرار دهید:
   * **Description:** پروژه پایگاه داده آموزش بندر کیاشهر
   * **Execute as:** روی گزینه **Me (ایمیل شما)** قرار داده شود.
   * **Who has access:** روی گزینه **Anyone (همه افراد)** قرار داده شود. (این مورد برای اینکه سایت بدون نیاز به ورود مجدد به جیمیل بتواند داده ذخیره کند بسیار ضروری است).
4. روی دکمه آبی‌رنگ **Deploy** کلیک کنید.
5. در اینجا گوگل از شما اجازه دسترسی می‌خواهد؛ روی **Authorize access** کلیک کرده، جیمیل خود را انتخاب کنید. سپس روی **Advanced** و در نهایت روی **Go to Untitled project (unsafe)** کلیک کنید و دسترسی‌ها را تایید (Allow) کنید.
6. پس از اتمام فرآیند، گوگل به شما یک **Web app URL** می‌دهد (که با `/exec` خاتمه می‌یابد). این آدرس را کپی کنید.

---

## 🛠️ گام چهارم: قرار دادن آدرس وب‌اپ در پنل سایت
1. وارد وب‌سایت خود شوید و دکمه **ورود / عضویت** را در بالای صفحه کلیک کنید.
2. در پایین بخش ورود، روی کشوی **⚙️ تنظیمات پایگاه داده اختصاصی (گوگل شیت)** کلیک کنید.
3. آدرس کپی شده در گام قبلی را در کادر پیست کرده و دکمه **ذخیره تنظیمات** را بزنید.
4. تمام! از این پس وب‌سایت شما تمامی اطلاعات را مستقیماً داخل گوگل شیت شما می‌نویسد و از آنجا می‌خواند. تب‌های مورد نیاز (`users` برای اعضا، `progress` برای کارنامه‌ها، `feedback` برای پیام‌های معلم) به صورت کاملاً خودکار در شیت شما ایجاد خواهند شد!
