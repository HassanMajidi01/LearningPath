const express = require('express');
const crypto = require('crypto');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, getDocs, setDoc, query, where } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const router = express.Router();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Error handling types
const OperationType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LIST: 'list',
    GET: 'get',
    WRITE: 'write',
};

function handleFirestoreError(error, operationType, path) {
    const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
            userId: null,
            email: null,
            emailVerified: null,
            isAnonymous: null,
            tenantId: null,
            providerInfo: []
        },
        operationType,
        path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Seed initial student & teacher users if DB is brand new/empty
async function seedDatabaseIfEmpty() {
    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        if (usersSnap.empty) {
            console.log('Firebase collections are empty. Seeding initial data for premium experience...');
            // Seed sample student
            const studentUser = {
                id: "STD-1385",
                username: "حسین رضایی",
                email: "student@kiashahr.ir",
                passwordHash: hashPassword("123456"),
                role: "student",
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            };
            await setDoc(doc(db, 'users', studentUser.id), studentUser);

            // Seed sample teacher
            const teacherUser = {
                id: "TCH-2026",
                username: "خانم علیزاده (معلم)",
                email: "teacher@kiashahr.ir",
                passwordHash: hashPassword("123456"),
                role: "teacher",
                createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', teacherUser.id), teacherUser);

            // Seed sample progress items
            const progressItems = [
                {
                    id: "PRG-101",
                    userId: "STD-1385",
                    studentName: "حسین رضایی",
                    studentEmail: "student@kiashahr.ir",
                    type: "exercise",
                    subject: "math",
                    title: "گردونه اعداد زوج و فرد 🎡",
                    score: 90,
                    stars: 5,
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: "PRG-102",
                    userId: "STD-1385",
                    studentName: "حسین رضایی",
                    studentEmail: "student@kiashahr.ir",
                    type: "exercise",
                    subject: "Persian",
                    title: "بازی فروت نینجای کلمات 🍉",
                    score: 80,
                    stars: 4,
                    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: "PRG-103",
                    userId: "STD-1385",
                    studentName: "حسین رضایی",
                    studentEmail: "student@kiashahr.ir",
                    type: "lesson",
                    subject: "science",
                    title: "درس علوم اول - دنیای جانوران",
                    score: 100,
                    stars: 5,
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: "PRG-104",
                    userId: "STD-1385",
                    studentName: "حسین رضایی",
                    studentEmail: "student@kiashahr.ir",
                    type: "lesson",
                    subject: "quran",
                    title: "آموزش قرآن اول - سوره کوثر",
                    score: 100,
                    stars: 5,
                    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                }
            ];

            for (const item of progressItems) {
                await setDoc(doc(db, 'progress', item.id), item);
            }

            // Seed sample feedback
            const feedbackItem = {
                id: "FBB-201",
                studentId: "STD-1385",
                teacherName: "خانم علیزاده (معلم)",
                comment: "آفرین حسین جان! پیشرفت بسیار عالی در ریاضی و فارسی داشتی. همینطور با انگیزه ادامه بده.",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            };
            await setDoc(doc(db, 'feedback', feedbackItem.id), feedbackItem);
            console.log('Firebase seeding completed successfully!');
        }
    } catch (e) {
        console.error('Failed to seed default database:', e);
    }
}
seedDatabaseIfEmpty();

// Helper to generate a unique 4-digit student or teacher ID that doesn't conflict
async function generateUniqueId(role) {
    const prefix = role === 'teacher' ? 'TCH' : 'STD';
    let isUnique = false;
    let newId = '';
    while (!isUnique) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        newId = `${prefix}-${randomNum}`;
        try {
            const userSnap = await getDoc(doc(db, 'users', newId));
            if (!userSnap.exists()) {
                isUnique = true;
            }
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${newId}`);
        }
    }
    return newId;
}

// --- API Router Endpoints ---

// Register User
router.post('/auth/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'لطفاً تمام فیلدها را پر کنید.' });
        }

        let existingUserSnap;
        try {
            const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
            existingUserSnap = await getDocs(q);
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'users');
        }

        if (!existingUserSnap.empty) {
            return res.status(400).json({ success: false, message: 'کاربری با این ایمیل قبلاً ثبت‌نام کرده است.' });
        }

        const userId = await generateUniqueId(role);
        const newUser = {
            id: userId,
            username,
            email: email.toLowerCase(),
            passwordHash: hashPassword(password),
            role,
            createdAt: new Date().toISOString()
        };

        try {
            await setDoc(doc(db, 'users', userId), newUser);
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `users/${userId}`);
        }

        const { passwordHash, ...userResponse } = newUser;
        res.json({ success: true, user: userResponse, message: 'ثبت‌نام با موفقیت انجام شد.' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

// Login User
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'لطفاً ایمیل و رمز عبور را وارد کنید.' });
        }

        let userSnap;
        try {
            const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
            userSnap = await getDocs(q);
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'users');
        }

        if (userSnap.empty) {
            return res.status(400).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
        }

        const user = userSnap.docs[0].data();
        if (user.passwordHash !== hashPassword(password)) {
            return res.status(400).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
        }

        const { passwordHash, ...userResponse } = user;
        res.json({ success: true, user: userResponse, message: 'ورود با موفقیت انجام شد.' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

// Save Student Progress
router.post('/student/progress', async (req, res) => {
    try {
        const { userId, type, subject, title, score, stars, details } = req.body;
        if (!userId || !type || !subject || !title) {
            return res.status(400).json({ success: false, message: 'اطلاعات ارسالی ناقص است.' });
        }

        let userSnap;
        try {
            userSnap = await getDoc(doc(db, 'users', userId));
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${userId}`);
        }

        if (!userSnap.exists()) {
            return res.status(404).json({ success: false, message: 'کاربر یافت نشد.' });
        }

        const user = userSnap.data();
        const progressId = 'PRG-' + Math.floor(100000 + Math.random() * 900000);
        const newProgress = {
            id: progressId,
            userId,
            studentName: user.username,
            studentEmail: user.email,
            type,
            subject,
            title,
            score: Number(score) || 0,
            stars: Number(stars) || 0,
            details: details || '',
            timestamp: new Date().toISOString()
        };

        try {
            await setDoc(doc(db, 'progress', progressId), newProgress);
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `progress/${progressId}`);
        }

        res.json({ success: true, progress: newProgress, message: 'پیشرفت شما با موفقیت ذخیره شد!' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

// Fetch Student Progress (For Teacher Search)
router.get('/student/progress/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        let studentSnap;
        try {
            studentSnap = await getDoc(doc(db, 'users', studentId));
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${studentId}`);
        }

        if (!studentSnap.exists()) {
            return res.status(404).json({ success: false, message: 'دانش‌آموزی با این شناسه یافت نشد.' });
        }

        const student = studentSnap.data();
        if (student.role !== 'student') {
            return res.status(404).json({ success: false, message: 'دانش‌آموزی با این شناسه یافت نشد.' });
        }

        let studentProgress = [];
        try {
            const qProgress = query(collection(db, 'progress'), where('userId', '==', studentId));
            const progressSnap = await getDocs(qProgress);
            studentProgress = progressSnap.docs.map(docSnap => docSnap.data());
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'progress');
        }

        let studentFeedback = [];
        try {
            const qFeedback = query(collection(db, 'feedback'), where('studentId', '==', studentId));
            const feedbackSnap = await getDocs(qFeedback);
            studentFeedback = feedbackSnap.docs.map(docSnap => docSnap.data());
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'feedback');
        }

        res.json({
            success: true,
            student: {
                id: student.id,
                username: student.username,
                email: student.email,
                createdAt: student.createdAt
            },
            progress: studentProgress,
            feedback: studentFeedback
        });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

// Submit Feedback from Teacher
router.post('/teacher/feedback', async (req, res) => {
    try {
        const { studentId, teacherName, comment } = req.body;
        if (!studentId || !teacherName || !comment) {
            return res.status(400).json({ success: false, message: 'اطلاعات ناقص است.' });
        }

        let studentSnap;
        try {
            studentSnap = await getDoc(doc(db, 'users', studentId));
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${studentId}`);
        }

        if (!studentSnap.exists()) {
            return res.status(404).json({ success: false, message: 'دانش‌آموز یافت نشد.' });
        }

        const student = studentSnap.data();
        if (student.role !== 'student') {
            return res.status(404).json({ success: false, message: 'دانش‌آموز یافت نشد.' });
        }

        const feedbackId = 'FBB-' + Math.floor(100000 + Math.random() * 900000);
        const newFeedback = {
            id: feedbackId,
            studentId,
            teacherName,
            comment,
            timestamp: new Date().toISOString()
        };

        try {
            await setDoc(doc(db, 'feedback', feedbackId), newFeedback);
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `feedback/${feedbackId}`);
        }

        res.json({ success: true, feedback: newFeedback, message: 'بازخورد شما با موفقیت ثبت شد و برای دانش‌آموز قابل مشاهده است.' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

// Get self student profile data (for students)
router.get('/student/self/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        let studentSnap;
        try {
            studentSnap = await getDoc(doc(db, 'users', studentId));
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${studentId}`);
        }

        if (!studentSnap.exists()) {
            return res.status(404).json({ success: false, message: 'دانش‌آموز یافت نشد.' });
        }

        const student = studentSnap.data();
        if (student.role !== 'student') {
            return res.status(404).json({ success: false, message: 'دانش‌آموز یافت نشد.' });
        }

        let progress = [];
        try {
            const qProgress = query(collection(db, 'progress'), where('userId', '==', studentId));
            const progressSnap = await getDocs(qProgress);
            progress = progressSnap.docs.map(docSnap => docSnap.data());
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'progress');
        }

        let feedback = [];
        try {
            const qFeedback = query(collection(db, 'feedback'), where('studentId', '==', studentId));
            const feedbackSnap = await getDocs(qFeedback);
            feedback = feedbackSnap.docs.map(docSnap => docSnap.data());
        } catch (error) {
            handleFirestoreError(error, OperationType.LIST, 'feedback');
        }

        res.json({
            success: true,
            progress,
            feedback
        });
    } catch (e) {
        res.status(500).json({ success: false, message: 'خطای سرور: ' + e.message });
    }
});

module.exports = router;
