import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { addTask } from '../utils/mongoDbOperations';
import DataTable from './DataTable/DataTable';
import '../styles/StudentsPage.css';

const StudentsPage = ({ students, isAdmin, loading, error }) => {
  const handleEdit = useCallback((student) => {
    console.log('Edit student:', student);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = useCallback(async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        const task = {
          table: 'students',
          operation: 'delete',
          data: { _id: student._id },
          status: 'pending'
        };
        await addTask(task);
        alert('Delete task added successfully. The change will be reflected after processing.');
      } catch (error) {
        console.error('Error adding delete task:', error);
        alert('Failed to add delete task. Please try again.');
      }
    }
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (
        <Link to={`/students/${row.original._id}`}>{row.original.name}</Link>
      )
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Codeforces Username',
      accessor: 'codeforcesUsername',
      Cell: ({ value }) => (
        <a href={`https://codeforces.com/profile/${value}`} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ),
    },
    {
      Header: 'Solved Count',
      accessor: 'solvedCount',
    },
  ], []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="students-page">
      <h1>Students</h1>
      {students.length > 0 ? (
        <DataTable 
          columns={columns} 
          data={students} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default React.memo(StudentsPage);