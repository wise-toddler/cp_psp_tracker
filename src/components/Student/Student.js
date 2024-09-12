import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/Student.css';

const Student = ({ getStudentDetails, loading, error }) => {
  const { id } = useParams();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const student = getStudentDetails(id);
  if (!student) return <div>Student not found</div>;

  return (
    <div className="student-detail-page">
      <h1>{student.name}</h1>
      <p>Email: {student.email}</p>
      <p>Codeforces Username: {student.codeforcesUsername}</p>
      <p>Total Solved: {student.solvedQuestions.length}</p>
      
      <h2>Solved Questions ({student.solvedQuestions.length})</h2>
      {student.solvedQuestions.length > 0 ? (
        <ul className="question-list">
          {student.solvedQuestions.map(question => (
            <li key={question._id}>
              <Link to={`/questions/${question._id}`}>{question.platform}: {question.link}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions solved yet.</p>
      )}

      <h2>Unsolved Questions ({student.unsolvedQuestions.length})</h2>
      {student.unsolvedQuestions.length > 0 ? (
        <ul className="question-list">
          {student.unsolvedQuestions.map(question => (
            <li key={question._id}>
              <Link to={`/questions/${question._id}`}>{question.platform}: {question.link}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No unsolved questions.</p>
      )}
    </div>
  );
};

export default Student;