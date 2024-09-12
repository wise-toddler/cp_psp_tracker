import React, { useState } from 'react';
import { addTask } from '../../utils/mongoDbOperations';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const task = {
        table: 'students',
        operation: 'insert',
        data: {
          name,
          email,
          codeforcesUsername
        },
        status: 'pending'
      };
      const result = await addTask(task);
      console.log('Task added:', result);
      setName('');
      setEmail('');
      setCodeforcesUsername('');
      alert('Student task added successfully!');
    } catch (error) {
      console.error('Error adding student task:', error);
      alert('Failed to add student task. Please try again.');
    }
  };

  return (
    <div className="add-student">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Student Email"
          required
        />
        <input
          type="text"
          value={codeforcesUsername}
          onChange={(e) => setCodeforcesUsername(e.target.value)}
          placeholder="Codeforces Username"
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;