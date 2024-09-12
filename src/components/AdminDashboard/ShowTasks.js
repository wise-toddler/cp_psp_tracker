import React, { useState, useEffect, useMemo } from 'react';
import { find } from '../../utils/mongoDbOperations';
import DataTable from '../DataTable/DataTable';

const ShowTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const fetchedTasks = await find('tasks', {});
                if (!fetchedTasks) {
                    throw new Error('Failed to fetch tasks');
                }
                setTasks(fetchedTasks);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError('Failed to fetch tasks. Please try again later.');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const filteredTasks = useMemo(() => {
        if (statusFilter === 'all') {
            return tasks;
        }
        return tasks.filter(task => task.status === statusFilter);
    }, [tasks, statusFilter]);

    const columns = useMemo(() => [
        {
            Header: 'Table',
            accessor: 'table',
        },
        {
            Header: 'Operation',
            accessor: 'operation',
        },
        {
            Header: 'Status',
            accessor: 'status',
        }
    ], []);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="show-tasks">
            <h2>Tasks</h2>
            <div className="filter-container">
                <label htmlFor="status-filter">Filter by Status:</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            <DataTable
                columns={columns}
                data={filteredTasks}
            />
        </div>
    );
};

export default ShowTasks;