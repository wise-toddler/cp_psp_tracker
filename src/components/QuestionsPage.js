import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { addTask } from '../utils/mongoDbOperations';
import DataTable from './DataTable/DataTable';
import '../styles/QuestionsPage.css';

const QuestionsPage = React.memo(({ questions, isAdmin, loading, error }) => {
    console.log('QuestionsPage: isAdmin =', isAdmin); // Debug log

    const handleEdit = useCallback((question) => {
        console.log('Edit question:', question);
        // TODO: Implement edit functionality
    }, []);

    const handleDelete = useCallback(async (question) => {
        if (window.confirm(`Are you sure you want to delete this question?`)) {
            try {
                const task = {
                    table: 'questions',
                    operation: 'delete',
                    data: { _id: question._id },
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
            Header: 'Platform',
            accessor: 'platform',
            Cell: ({ row }) => (
                <Link to={`/questions/${row.original._id}`}>
                    {row.original.platform}
                </Link>
            )
        },
        {
            Header: 'Question Link',
            accessor: 'link',
            Cell: ({ row }) => (
                <a href={row.original.link} target="_blank" rel="noopener noreferrer">
                    {row.original.link}
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
        <div className="questions-page">
            <h1>Competitive Programming Questions</h1>
            {questions.length > 0 ? (
                <DataTable 
                    columns={columns} 
                    data={questions} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    isAdmin={isAdmin}
                />
            ) : (
                <p>No questions found.</p>
            )}
        </div>
    );
});

export default QuestionsPage;