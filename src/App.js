import React, { useState, useEffect, useCallback,useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import QuestionsPage from './components/QuestionsPage';
import StudentsPage from './components/StudentsPage';
import Student from './components/Student/Student';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { find } from './utils/mongoDbOperations';
import './styles/App.css';
import { AuthProvider } from './components/context/AuthContext';
import Question from './components/Questions/Question';

function App() {
    const [students, setStudents] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    // New optimized data structures
    const [questionToStudentStatus, setQuestionToStudentStatus] = useState({});
    const [studentToQuestionStatus, setStudentToQuestionStatus] = useState({});

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [fetchedStudents, fetchedQuestions, fetchedQuestionStatus] = await Promise.all([
                find('students', {}),
                find('questions', {}),
                find('questionStatus', {}, {}, 50000)
            ]);
            setStudents(fetchedStudents);
            setQuestions(fetchedQuestions);

            // Process question status into optimized structures
            const qToS = {};
            const sToQ = {};
            fetchedQuestionStatus.forEach(qs => {
                if (!qToS[qs.questionId]) qToS[qs.questionId] = {};
                if (!sToQ[qs.studentId]) sToQ[qs.studentId] = {};
                qToS[qs.questionId][qs.studentId] = qs.status;
                sToQ[qs.studentId][qs.questionId] = qs.status;
            });
            setQuestionToStudentStatus(qToS);
            setStudentToQuestionStatus(sToQ);

            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const processedStudents = useMemo(() => {
        return students.map(student => {
            const solvedCount = Object.values(studentToQuestionStatus[student._id] || {}).filter(status => status).length;
            return { ...student, solvedCount };
        });
    }, [students, studentToQuestionStatus]);

    const processedQuestions = useMemo(() => {
        return questions.map(question => {
            const solvedBy = students.filter(student => questionToStudentStatus[question._id]?.[student._id]);
            return { ...question, solvedBy, solvedCount: solvedBy.length };
        });
    }, [questions, students, questionToStudentStatus]);

    const getStudentDetails = useCallback((studentId) => {
        const student = students.find(s => s._id === studentId);
        if (!student) return null;

        const studentStatuses = studentToQuestionStatus[studentId] || {};
        const solvedQuestions = questions.filter(q => studentStatuses[q._id]);
        const unsolvedQuestions = questions.filter(q => !studentStatuses[q._id]);

        return { ...student, solvedQuestions, unsolvedQuestions };
    }, [students, questions, studentToQuestionStatus]);

    const getQuestionDetails = useCallback((questionId) => {
        const question = questions.find(q => q._id === questionId);
        if (!question) return null;

        const questionStatuses = questionToStudentStatus[questionId] || {};
        const solvedBy = students.filter(s => questionStatuses[s._id]);
        const unsolvedBy = students.filter(s => !questionStatuses[s._id]);

        return { ...question, solvedBy, unsolvedBy, solvedCount: solvedBy.length };
    }, [questions, students, questionToStudentStatus]);

    return (
        <AuthProvider>
            <Router>
                <Navbar isAdmin={isAdmin} />
                <Routes>
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/students" element={
                        <StudentsPage
                            students={processedStudents}
                            isAdmin={isAdmin}
                            loading={loading}
                            error={error}
                        />
                    } />
                    <Route path="/students/:id" element={
                        <Student
                            getStudentDetails={getStudentDetails}
                            loading={loading}
                            error={error}
                        />
                    } />
                    <Route path="/questions" element={
                        <QuestionsPage
                            questions={processedQuestions}
                            isAdmin={isAdmin}
                            loading={loading}
                            error={error}
                        />
                    } />
                    <Route path="/questions/:id" element={
                        <Question 
                            getQuestionDetails={getQuestionDetails} 
                            loading={loading} 
                            error={error} 
                        />
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;