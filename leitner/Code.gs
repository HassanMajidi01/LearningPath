/**
 * Google Apps Script - Code.gs
 * سیستم مدیریت یادگیری لایتنر (Leitner System) متصل به گوگل شیت
 */

var SPREADSHEET_ID = "169gVDQEiWe4mLNJ_wPwthHECXdXblBL8aFM1qJXK15E"; // آیدی گوگل شیت کاربر برای ذخیره‌سازی داده‌ها و سوالات

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function standardizeGrade(gradeStr) {
  if (!gradeStr) return "";
  gradeStr = gradeStr.toString().trim();
  if (gradeStr.indexOf("پایه") === 0) {
    return gradeStr;
  }
  return "پایه " + gradeStr;
}

function getGradeShortName(gradeName) {
  if (!gradeName) return "";
  return gradeName.toString().replace("پایه ", "").trim();
}

function setupDatabase() {
  var ss = getSpreadsheet();
  
  // ۱. تب کاربران (Users)
  var usersSheet = ss.getSheetByName("Users") || ss.insertSheet("Users");
  if (usersSheet.getLastRow() === 0) {
    usersSheet.appendRow(["UserID", "Username", "Password", "FullName", "Role", "Grade", "CreatedDate"]);
    usersSheet.appendRow(["S101", "ali", "123", "علی علوی", "Student", "پایه نهم", new Date().toISOString().split('T')[0]]);
    usersSheet.appendRow(["T101", "karimi", "123", "استاد مریم کریمی", "Teacher", "", new Date().toISOString().split('T')[0]]);
  }
  
  // ۲. تب پیشرفت (Progress)
  var progressSheet = ss.getSheetByName("Progress") || ss.insertSheet("Progress");
  if (progressSheet.getLastRow() === 0) {
    progressSheet.appendRow(["UserID", "StudentName", "QuestionID", "Subject", "CurrentBox", "NextReviewDate", "LastAnsweredDate", "Status"]);
    progressSheet.appendRow(["S101", "علی علوی", "Q010", "ریاضی", "1", new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0], "Learning"]);
  }
  
  // ۳. تب لاگ‌های فعالیت (ActivityLogs)
  var logsSheet = ss.getSheetByName("ActivityLogs") || ss.insertSheet("ActivityLogs");
  if (logsSheet.getLastRow() === 0) {
    logsSheet.appendRow(["UserID", "Date", "LoginsCount", "AnswersCount"]);
  }
  
  // ۴. تب بازخورد (Feedback)
  var feedbackSheet = ss.getSheetByName("Feedback") || ss.insertSheet("Feedback");
  if (feedbackSheet.getLastRow() === 0) {
    feedbackSheet.appendRow(["FeedbackID", "StudentID", "TeacherID", "TeacherName", "Message", "Date"]);
    feedbackSheet.appendRow(["F001", "S101", "T101", "استاد مریم کریمی", "آفرین علی جان! تلاش‌های مستمرت عالیه.", new Date().toISOString().split('T')[0]]);
  }

  // ۵. ایجاد تب‌های مجزا برای سوالات اولیه در صورت عدم وجود
  var seedQuestions = [
    { id: "Q001", text: "نتیجه جمع ریاضی مقابل چیست؟ ۵ + ۳", a: "۷", b: "۸", c: "۹", d: "۶", corr: "B", sub: "ریاضی", gr: "پایه اول" },
    { id: "Q002", text: "کدام کلمه با نشانه «بـ» آغاز می‌شود؟", a: "انار", b: "درخت", c: "باران", d: "سیب", corr: "C", sub: "فارسی", gr: "پایه اول" },
    { id: "Q003", text: "هر ساعت چند دقیقه است؟", a: "۳۰ دقیقه", b: "۴۵ دقیقه", c: "۶۰ دقیقه", d: "۱۰۰ دقیقه", corr: "C", sub: "ریاضی", gr: "پایه دوم" },
    { id: "Q004", text: "کدام یک از موارد زیر جزو حالت‌های اصلی ماده نیست؟", a: "جامد", b: "مایع", c: "گاز", d: "نور", corr: "D", sub: "علوم", gr: "پایه سوم" },
    { id: "Q005", text: "پایتخت کشور عزیز ما ایران کدام شهر است؟", a: "اصفهان", b: "شیراز", c: "مشهد", d: "تهران", corr: "D", sub: "مطالعات اجتماعی", gr: "پایه چهارم" },
    { id: "Q006", text: "کدام عضو بدن اکسیژن را از هوا می‌گیرد و به خون انتقال می‌دهد؟", a: "معده", b: "قلب", c: "شُش‌ها (ریه‌ها)", d: "کلیه‌ها", corr: "C", sub: "علوم تجربی", gr: "پایه پنجم" },
    { id: "Q007", text: "مترادف کلمه «رافت» کدام گزینه است؟", a: "عدالت", b: "خشم", c: "مهربانی", d: "بخشندگی", corr: "C", sub: "فارسی", gr: "پایه ششم" },
    { id: "Q008", text: "ساده‌ترین شکل کسر ۴۲/۷۰ کدام است؟", a: "۳/۵", b: "۶/۱۰", c: "۷/۱۰", d: "۲/۵", corr: "A", sub: "ریاضی", gr: "پایه هفتم" },
    { id: "Q009", text: "کدام ساختار درون سلولی مسئول تولید انرژی (نیروگاه سلول) است؟", a: "هسته", b: "میتوکندری", c: "ریبوزوم", d: "دیواره سلولی", corr: "B", sub: "علوم", gr: "پایه هشتم" },
    { id: "Q010", text: "ریشه‌های دوم عدد ۸۱ چه اعدادی هستند؟", a: "فقط ۹", b: "۹ و ۹-", c: "۲۷ و ۲۷-", d: "۳ و ۳-", corr: "B", sub: "ریاضی", gr: "پایه نهم" },
    { id: "Q011", text: "کدام گزینه معادل فارسی اصطلاح انگلیسی 'Information Technology' است؟", a: "فناوری اطلاعات", b: "مهندسی نرم‌افزار", c: "شبکه ارتباطات", d: "سخت‌افزار کامپیوتر", corr: "A", sub: "کار و فناوری", gr: "پایه نهم" },
    { id: "Q012", text: "کدام لایه از اتمسفر زمین نزدیک‌ترین لایه به سطح زمین است؟", a: "استراتوسفر", b: "تروپوسفر", c: "مزوسفر", d: "ترکوسفر", corr: "B", sub: "جغرافیا", gr: "پایه دهم" },
    { id: "Q013", text: "زمان گذشته فعل انگلیسی 'go' کدام است؟", a: "goes", b: "went", c: "gone", d: "going", corr: "B", sub: "انگلیسی", gr: "پایه دهم" },
    { id: "Q014", text: "گازهای نجیب در کدام گروه جدول تناوبی عناصر (مندلیف) قرار دارند؟", a: "گروه ۱ (قلیایی)", b: "گروه ۲ (قلیایی خاکی)", c: "گروه ۱۷ (هالوژن‌ها)", d: "گروه ۱۸", corr: "D", sub: "شیمی", gr: "پایه یازدهم" },
    { id: "Q015", text: "محل اصلی فرایند «رونویسی» (Transcription) در سلول‌های یوکاریوتی کجاست؟", a: "سیتوپلاسم", b: "هسته", c: "ریبوزوم", d: "شبکه آندوپلاسمی", corr: "B", sub: "زیست‌شناسی", gr: "پایه دوازدهم" },
    { id: "Q016", text: "کدام فیلسوف به عنوان موسس حکمت متعالیه شناخته می‌شود؟", a: "ابن سینا", b: "سهروردی", c: "ملاصدرا", d: "فارابی", corr: "C", sub: "فلسفه", gr: "پایه دوازدهم" }
  ];
  
  for (var k = 0; k < seedQuestions.length; k++) {
    var q = seedQuestions[k];
    var shortGr = getGradeShortName(q.gr);
    var shName = q.sub;
    if (shortGr) {
      shName += " " + shortGr;
    }
    shName = shName.trim();
    
    var sh = ss.getSheetByName(shName);
    if (!sh) {
      sh = ss.insertSheet(shName);
      sh.appendRow(["QuestionID", "QuestionText", "OptionA", "OptionB", "OptionC", "OptionD", "CorrectOption", "Subject", "Grade", "لینک آموزش ویدئویی سوال", "لینک تصویر سوال"]);
    }
    if (sh.getLastRow() === 1) {
      sh.appendRow([q.id, q.text, q.a, q.b, q.c, q.d, q.corr, q.sub, q.gr, "", ""]);
    }
  }
  
  return "پایگاه داده لایتنر با موفقیت راه‌اندازی شد.";
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequests(e.parameter.action, e.parameter);
  }
  try {
    var template = HtmlService.createTemplateFromFile("Index");
    return template.evaluate()
      .setTitle("سامانه یادگیری جعبه لایتنر")
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch(err) {
    return HtmlService.createHtmlOutput(
      "<h2>سامانه لایتنر آماده کار است!</h2>" +
      "<p><b>خطا در لود فرانت‌اند:</b> " + err.message + "</p>"
    );
  }
}

function doPost(e) {
  var result = {};
  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter;
    }
    var action = params.action;
    var responseData = processApiAction(action, params);
    result = { success: true, data: responseData };
  } catch(err) {
    result = { success: false, error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function handleApiRequests(action, parameter) {
  var result = {};
  try {
    var responseData = processApiAction(action, parameter);
    result = { success: true, data: responseData };
  } catch(err) {
    result = { success: false, error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function processApiAction(action, params) {
  switch(action) {
    case "ping": return "پینگ موفق!";
    case "setup": return setupDatabase();
    case "login": return loginUser(params.username, params.password);
    case "signup": return signupUser(params);
    case "getQuestions": return getQuestions(params.grade);
    case "getProgress": return getProgress(params.userId);
    case "submitAnswer": return submitAnswer(params);
    case "getFeedback": return getFeedbacks(params.studentId);
    case "sendFeedback": return sendFeedback(params);
    case "getStudents": return getStudents();
    case "addQuestion": return addQuestion(params);
    case "getStudentProgressDetails": return getStudentProgressDetails(params.studentId);
    case "updateGrade": return updateGrade(params.userId, params.grade);
    default: throw new Error("متد نامعتبر است.");
  }
}

function updateGrade(userId, grade) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === userId.toString()) {
      sheet.getRange(i + 1, 6).setValue(grade);
      return { success: true, grade: grade };
    }
  }
  throw new Error("کاربر یافت نشد.");
}

function loginUser(username, password) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1].toString().toLowerCase() === username.toString().toLowerCase() && data[i][2].toString() === password.toString()) {
      logActivity(data[i][0], "login");
      return { UserID: data[i][0], Username: data[i][1], FullName: data[i][3], Role: data[i][4], Grade: data[i][5], CreatedDate: data[i][6] };
    }
  }
  throw new Error("نام کاربری یا کلمه عبور نادرست است.");
}

function signupUser(params) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  var newId = Math.floor(100000 + Math.random() * 900000).toString();
  var created = new Date().toISOString().split('T')[0];
  sheet.appendRow([newId, params.username, params.password, params.fullName, params.role, params.grade || "", created]);
  return { UserID: newId, Username: params.username, FullName: params.fullName, Role: params.role, Grade: params.grade, CreatedDate: created };
}

function getStudents() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  var students = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][4] === "Student") {
      students.push({ UserID: data[i][0], Username: data[i][1], Password: data[i][2] ? data[i][2].toString() : "", FullName: data[i][3], Role: data[i][4], Grade: data[i][5], CreatedDate: data[i][6] });
    }
  }
  return students;
}

function getHeaderIndices(headers) {
  var indices = {
    questionId: 0,
    questionText: 1,
    optionA: 2,
    optionB: 3,
    optionC: 4,
    optionD: 5,
    correctOption: 6,
    subject: 7,
    grade: 8,
    videoUrl: 9,
    imageUrl: 10
  };
  
  if (!headers || !headers.length) return indices;
  
  for (var j = 0; j < headers.length; j++) {
    var h = (headers[j] || "").toString().toLowerCase().trim();
    if (!h) continue;
    
    if (h === "questionid" || h === "id" || h === "کد سوال" || h === "کد") {
      indices.questionId = j;
    } else if (h === "questiontext" || h === "text" || h === "صورت سوال" || h === "سوال" || h === "متن سوال" || h === "متن") {
      indices.questionText = j;
    } else if (h === "optiona" || h === "a" || h === "گزینه الف" || h === "گزینه ۱" || h === "الف") {
      indices.optionA = j;
    } else if (h === "optionb" || h === "b" || h === "گزینه ب" || h === "گزینه ۲" || h === "ب") {
      indices.optionB = j;
    } else if (h === "optionc" || h === "c" || h === "گزینه ج" || h === "گزینه ۳" || h === "ج") {
      indices.optionC = j;
    } else if (h === "optiond" || h === "d" || h === "گزینه د" || h === "گزینه ۴" || h === "د") {
      indices.optionD = j;
    } else if (h === "correctoption" || h === "correct" || h === "correct option" || h === "گزینه صحیح" || h === "پاسخ صحیح" || h === "پاسخ") {
      indices.correctOption = j;
    } else if (h === "subject" || h === "درس" || h === "موضوع") {
      indices.subject = j;
    } else if (h === "grade" || h === "پایه" || h === "کلاس") {
      indices.grade = j;
    } else if (h === "videourl" || h === "video url" || h === "video link" || h === "video_link" || h === "لینک آموزش ویدئویی سوال" || h === "لینک ویدئو" || h === "لینک ویدیو" || h === "ویدئو" || h === "ویدیو" || h === "آموزش ویدئویی" || h === "لینک آموزش" || h === "آموزش ویدیوئی" || h === "آموزش ویدئویی سوال" || h === "آموزش ویدیوئی سوال" || h === "ویدیو لینک" || h === "ویدئو لینک") {
      indices.videoUrl = j;
    } else if (h === "imageurl" || h === "image url" || h === "image link" || h === "image_link" || h === "لینک تصویر سوال" || h === "لینک تصویر" || h === "لینک عکس" || h === "تصویر" || h === "عکس" || h === "تصویر سوال" || h === "عکس سوال") {
      indices.imageUrl = j;
    }
  }
  
  return indices;
}

function getQuestions(grade) {
  var ss = getSpreadsheet();
  var sheets = ss.getSheets();
  var list = [];
  var systemSheets = ["Users", "Progress", "ActivityLogs", "Feedback"];
  
  for (var s = 0; s < sheets.length; s++) {
    var sheetName = sheets[s].getName();
    if (systemSheets.indexOf(sheetName) > -1) {
      continue;
    }
    
    var sheet = sheets[s];
    if (sheet.getLastRow() < 2) continue;
    
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var idx = getHeaderIndices(headers);
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[idx.questionId] || row[idx.questionId] === "") continue;
      
      var qGrade = row[idx.grade] || "";
      var standardizedQGrade = standardizeGrade(qGrade);
      
      // Default Subject and Grade from sheetName if empty
      var defaultSubject = row[idx.subject];
      if (!defaultSubject) {
        defaultSubject = sheetName.split(" ")[0] || "عمومی";
      }
      
      var defaultGrade = row[idx.grade];
      if (!defaultGrade) {
        var parts = sheetName.split(" ");
        if (parts.length > 1) {
          defaultGrade = standardizeGrade(parts.slice(1).join(" "));
        } else {
          defaultGrade = "پایه دوازدهم"; // Default fallback
        }
      }
      
      if (!grade || standardizedQGrade === standardizeGrade(grade) || getGradeShortName(standardizedQGrade) === getGradeShortName(grade)) {
        list.push({
          QuestionID: row[idx.questionId].toString(),
          QuestionText: row[idx.questionText].toString(),
          OptionA: row[idx.optionA].toString(),
          OptionB: row[idx.optionB].toString(),
          OptionC: row[idx.optionC].toString(),
          OptionD: row[idx.optionD].toString(),
          CorrectOption: row[idx.correctOption].toString(),
          Subject: defaultSubject.toString(),
          Grade: defaultGrade.toString(),
          VideoURL: row[idx.videoUrl] ? row[idx.videoUrl].toString() : "",
          ImageURL: row[idx.imageUrl] ? row[idx.imageUrl].toString() : ""
        });
      }
    }
  }
  return list;
}

function addQuestion(params) {
  var ss = getSpreadsheet();
  
  var shortGrade = getGradeShortName(params.grade);
  var sheetName = params.subject;
  if (shortGrade) {
    sheetName += " " + shortGrade;
  }
  sheetName = sheetName.trim();
  
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["QuestionID", "QuestionText", "OptionA", "OptionB", "OptionC", "OptionD", "CorrectOption", "Subject", "Grade", "لینک آموزش ویدئویی سوال", "لینک تصویر سوال"]);
  }
  
  // Calculate unique QuestionID
  var nextId = "Q" + (1000 + sheet.getLastRow() + Math.floor(Math.random() * 9000));
  
  sheet.appendRow([
    nextId,
    params.questionText,
    params.optionA,
    params.optionB,
    params.optionC,
    params.optionD,
    params.correctOption,
    params.subject,
    params.grade,
    params.videoUrl || "",
    params.imageUrl || ""
  ]);
  
  return { success: true, questionId: nextId };
}

var LEITNER_INTERVALS = { 1: 1, 2: 2, 3: 5, 4: 9, 5: 15 };

function getProgress(userId) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Progress");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var headers = data[0];
  var uIdx = 0, nameIdx = -1, qIdx = 1, sIdx = 2, bIdx = 3, nrIdx = 4, laIdx = 5, stIdx = 6;

  for (var j = 0; j < headers.length; j++) {
    var h = (headers[j] || "").toString().toLowerCase().trim();
    if (h === "userid" || h === "شناسه") uIdx = j;
    else if (h === "studentname" || h === "fullname" || h === "نام" || h === "نام دانش‌آموز") nameIdx = j;
    else if (h === "questionid" || h === "کد سوال") qIdx = j;
    else if (h === "subject" || h === "درس") sIdx = j;
    else if (h === "currentbox" || h === "جعبه") bIdx = j;
    else if (h === "nextreviewdate") nrIdx = j;
    else if (h === "lastanswereddate") laIdx = j;
    else if (h === "status" || h === "وضعیت") stIdx = j;
  }

  if (nameIdx === -1 && headers.length >= 8) {
    nameIdx = 1; qIdx = 2; sIdx = 3; bIdx = 4; nrIdx = 5; laIdx = 6; stIdx = 7;
  }

  var list = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][uIdx].toString() === userId.toString()) {
      list.push({
        UserID: data[i][uIdx].toString(),
        StudentName: nameIdx > -1 && data[i][nameIdx] ? data[i][nameIdx].toString() : "",
        QuestionID: data[i][qIdx].toString(),
        Subject: data[i][sIdx].toString(),
        CurrentBox: parseInt(data[i][bIdx]),
        NextReviewDate: data[i][nrIdx],
        LastAnsweredDate: data[i][laIdx],
        Status: data[i][stIdx]
      });
    }
  }
  return list;
}

function submitAnswer(params) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Progress");
  if (!sheet) {
    sheet = ss.insertSheet("Progress");
    sheet.appendRow(["UserID", "StudentName", "QuestionID", "Subject", "CurrentBox", "NextReviewDate", "LastAnsweredDate", "Status"]);
  }
  var data = sheet.getDataRange().getValues();
  if (data.length === 0) {
    sheet.appendRow(["UserID", "StudentName", "QuestionID", "Subject", "CurrentBox", "NextReviewDate", "LastAnsweredDate", "Status"]);
    data = sheet.getDataRange().getValues();
  }

  var headers = data[0];
  var hasStudentNameCol = false;
  for (var h = 0; h < headers.length; h++) {
    var hName = (headers[h] || "").toString().toLowerCase().trim();
    if (hName === "studentname" || hName === "نام دانش‌آموز" || hName === "fullname" || hName === "نام") {
      hasStudentNameCol = true;
      break;
    }
  }

  if (!hasStudentNameCol && headers.length >= 2 && (headers[1].toString().toLowerCase().indexOf("question") > -1 || headers[1].toString() === "QuestionID")) {
    sheet.insertColumnAfter(1);
    sheet.getRange(1, 2).setValue("StudentName");
    data = sheet.getDataRange().getValues();
    headers = data[0];
  }

  var studentName = params.studentName || params.fullName || "";
  if (!studentName) {
    var usersSheet = ss.getSheetByName("Users");
    if (usersSheet) {
      var usersData = usersSheet.getDataRange().getValues();
      for (var u = 1; u < usersData.length; u++) {
        if (usersData[u][0].toString() === params.userId.toString()) {
          studentName = usersData[u][3] || "";
          break;
        }
      }
    }
  }

  var uIdx = 0, nameIdx = 1, qIdx = 2, sIdx = 3, bIdx = 4, nrIdx = 5, laIdx = 6, stIdx = 7;
  for (var j = 0; j < headers.length; j++) {
    var hdr = (headers[j] || "").toString().toLowerCase().trim();
    if (hdr === "userid" || hdr === "شناسه") uIdx = j;
    else if (hdr === "studentname" || hdr === "fullname" || hdr === "نام" || hdr === "نام دانش‌آموز") nameIdx = j;
    else if (hdr === "questionid" || hdr === "کد سوال") qIdx = j;
    else if (hdr === "subject" || hdr === "درس") sIdx = j;
    else if (hdr === "currentbox" || hdr === "جعبه") bIdx = j;
    else if (hdr === "nextreviewdate") nrIdx = j;
    else if (hdr === "lastanswereddate") laIdx = j;
    else if (hdr === "status" || hdr === "وضعیت") stIdx = j;
  }

  var foundRowIndex = -1;
  var currentBox = 1;
  var status = "Learning";

  for (var i = 1; i < data.length; i++) {
    if (data[i][uIdx].toString() === params.userId.toString() && data[i][qIdx].toString() === params.questionId.toString()) {
      foundRowIndex = i + 1;
      var rawBox = parseInt(data[i][bIdx]);
      currentBox = (!isNaN(rawBox) && rawBox >= 1 && rawBox <= 5) ? rawBox : 1;
      status = data[i][stIdx] || "Learning";
      break;
    }
  }

  var nextBox = 1;
  if (params.isCorrect) {
    if (currentBox < 5) {
      nextBox = currentBox + 1;
      status = "Learning";
    } else {
      nextBox = 5;
      status = "Mastered";
    }
  } else {
    nextBox = 1;
    status = "Learning";
  }

  var today = new Date();
  var interval = LEITNER_INTERVALS[nextBox] || 1;
  var nextReview = new Date(today.getTime());
  nextReview.setDate(today.getDate() + interval);

  var nextReviewStr = nextReview.toISOString().split('T')[0];
  var todayStr = today.toISOString().split('T')[0];

  if (foundRowIndex > -1) {
    if (nameIdx > -1) sheet.getRange(foundRowIndex, nameIdx + 1).setValue(studentName);
    sheet.getRange(foundRowIndex, bIdx + 1).setValue(nextBox);
    sheet.getRange(foundRowIndex, nrIdx + 1).setValue(nextReviewStr);
    sheet.getRange(foundRowIndex, laIdx + 1).setValue(todayStr);
    sheet.getRange(foundRowIndex, stIdx + 1).setValue(status);
  } else {
    var newRow = [];
    newRow[uIdx] = params.userId;
    if (nameIdx > -1) newRow[nameIdx] = studentName;
    newRow[qIdx] = params.questionId;
    newRow[sIdx] = params.subject;
    newRow[bIdx] = nextBox;
    newRow[nrIdx] = nextReviewStr;
    newRow[laIdx] = todayStr;
    newRow[stIdx] = status;
    sheet.appendRow(newRow);
  }

  logActivity(params.userId, "answer");
  return { success: true, nextBox: nextBox, status: status };
}

function logActivity(userId, type) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("ActivityLogs");
  var data = sheet.getDataRange().getValues();
  var todayStr = new Date().toISOString().split('T')[0];
  var foundIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === userId.toString() && data[i][1].toString().split('T')[0] === todayStr) {
      foundIndex = i + 1;
      break;
    }
  }
  if (foundIndex > -1) {
    if (type === "login") {
      var cur = parseInt(sheet.getRange(foundIndex, 3).getValue() || 0);
      sheet.getRange(foundIndex, 3).setValue(cur + 1);
    } else {
      var cur = parseInt(sheet.getRange(foundIndex, 4).getValue() || 0);
      sheet.getRange(foundIndex, 4).setValue(cur + 1);
    }
  } else {
    sheet.appendRow([userId, todayStr, type === "login" ? 1 : 0, type === "answer" ? 1 : 0]);
  }
}

function getFeedbacks(studentId) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Feedback");
  var data = sheet.getDataRange().getValues();
  var list = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][1].toString() === studentId.toString()) {
      list.push({ FeedbackID: data[i][0], StudentID: data[i][1], TeacherID: data[i][2], TeacherName: data[i][3], Message: data[i][4], Date: data[i][5] });
    }
  }
  return list;
}

function sendFeedback(params) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName("Feedback");
  var nextId = "F" + (100 + sheet.getLastRow());
  var todayStr = new Date().toISOString().split('T')[0];
  sheet.appendRow([nextId, params.studentId, params.teacherId, params.teacherName, params.message, todayStr]);
  return { success: true };
}

function getStudentProgressDetails(studentId) {
  var ss = getSpreadsheet();
  
  // 1. Get student's grade
  var usersSheet = ss.getSheetByName("Users");
  var usersData = usersSheet.getDataRange().getValues();
  var studentGrade = "";
  for (var u = 1; u < usersData.length; u++) {
    if (usersData[u][0].toString() === studentId.toString()) {
      studentGrade = usersData[u][5] || "";
      break;
    }
  }

  // 2. Get all questions for student's grade
  var gradeQuestions = getQuestions(studentGrade);
  
  // 3. Get student progress from Progress sheet
  var progress = getProgress(studentId);
  var progressMap = {};
  for (var p = 0; p < progress.length; p++) {
    progressMap[progress[p].QuestionID] = progress[p];
  }

  // 4. Get activity logs
  var logsSheet = ss.getSheetByName("ActivityLogs");
  var logsData = logsSheet.getDataRange().getValues();
  var activeDays = 0;
  var totalAnswers = 0;
  for (var i = 1; i < logsData.length; i++) {
    if (logsData[i][0].toString() === studentId.toString()) {
      activeDays++;
      totalAnswers += parseInt(logsData[i][3] || 0);
    }
  }

  var dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  var mastered = 0;
  var subjectMap = {};

  // Process grade questions
  for (var q = 0; q < gradeQuestions.length; q++) {
    var gq = gradeQuestions[q];
    var subj = gq.Subject || "عمومی";
    if (!subjectMap[subj]) {
      subjectMap[subj] = { totalCards: 0, mastered: 0 };
    }
    subjectMap[subj].totalCards++;

    var prog = progressMap[gq.QuestionID];
    if (prog) {
      var bNum = parseInt(prog.CurrentBox) || 1;
      if (bNum >= 1 && bNum <= 5) {
        dist[bNum]++;
      }
      if (prog.Status === "Mastered" || bNum === 5) {
        mastered++;
        subjectMap[subj].mastered++;
      }
    } else {
      dist[1]++;
    }
  }

  // Also include any progress items not in gradeQuestions
  for (var pr = 0; pr < progress.length; pr++) {
    var prItem = progress[pr];
    var foundInGrade = false;
    for (var g = 0; g < gradeQuestions.length; g++) {
      if (gradeQuestions[g].QuestionID === prItem.QuestionID) {
        foundInGrade = true;
        break;
      }
    }
    if (!foundInGrade) {
      var pSubj = prItem.Subject || "عمومی";
      if (!subjectMap[pSubj]) {
        subjectMap[pSubj] = { totalCards: 0, mastered: 0 };
      }
      subjectMap[pSubj].totalCards++;
      var pBNum = parseInt(prItem.CurrentBox) || 1;
      if (pBNum >= 1 && pBNum <= 5) {
        dist[pBNum]++;
      }
      if (prItem.Status === "Mastered" || pBNum === 5) {
        mastered++;
        subjectMap[pSubj].mastered++;
      }
    }
  }

  var subjectStats = [];
  for (var sKey in subjectMap) {
    var tot = subjectMap[sKey].totalCards;
    var mast = subjectMap[sKey].mastered;
    var pct = tot > 0 ? Math.round((mast / tot) * 100) : 0;
    subjectStats.push({
      subject: sKey,
      totalCards: tot,
      mastered: mast,
      learning: tot - mast,
      progressPercent: pct
    });
  }

  var totalCardsCount = gradeQuestions.length > 0 ? gradeQuestions.length : progress.length;

  return {
    studentId: studentId,
    totalCards: totalCardsCount,
    masteredCount: mastered,
    learningCount: Math.max(0, totalCardsCount - mastered),
    boxesDistribution: dist,
    activeDaysCount: Math.max(1, activeDays),
    totalAnswers: totalAnswers,
    subjectStats: subjectStats
  };
}
