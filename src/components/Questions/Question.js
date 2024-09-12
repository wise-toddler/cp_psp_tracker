import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/Question.css';

const Question = ({ getQuestionDetails, loading, error }) => {
  const { id } = useParams();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const question = getQuestionDetails(id);
  if (!question) return <div>Question not found</div>;

  return (
    <div className="question-detail-page">
      <h1>{question.platform} Question</h1>
      <p className="question-link">
        Link: <a href={question.link} target="_blank" rel="noopener noreferrer">{question.link}</a>
      </p>
      
      <h2>Solved By ({question.solvedBy.length} students)</h2>
      {question.solvedBy.length > 0 ? (
        <ul className="student-list">
          {question.solvedBy.map(student => (
            <li key={student._id}>
              <Link to={`/students/${student._id}`}>
                {student.name} ({student.codeforcesUsername})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students have solved this question yet.</p>
      )}
      <h2>
        Unsolved By ({question.unsolvedBy.length} students)
      </h2>
        {question.unsolvedBy.length > 0 ? (
            <ul className="student-list">
            {question.unsolvedBy.map(student => (
                <li key={student._id}>
                <Link to={`/students/${student._id}`}>
                    {student.name} ({student.codeforcesUsername})
                </Link>
                </li>
            ))}
            </ul>
        ) : (
            <p>No students have unsolved this question yet.</p>
        )}
    </div>
  );
};

export default Question;