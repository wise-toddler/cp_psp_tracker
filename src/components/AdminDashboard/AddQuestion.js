import React, { useState } from 'react';
import { addTask } from '../../utils/mongoDbOperations';

const AddQuestion = () => {
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');

  const determinePlatform = (link) => {
    if (link.includes('atcoder.jp')) return 'AtCoder';
    if (link.includes('codeforces.com')) return 'Codeforces';
    if (link.includes('codechef.com')) return 'CodeChef';
    if (link.includes('cses.fi')) return 'CSES';
    if (link.includes('spoj.com')) return 'SPOJ';
    return '';
  };

  const handleLinkChange = (e) => {
    const newLink = e.target.value;
    setLink(newLink);
    setPlatform(determinePlatform(newLink));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const task = {
        table: 'questions',
        operation: 'insert',
        data: {
          link,
          platform
        },
        status: 'pending'
      };
      const result = await addTask(task);
      console.log('Task added:', result);
      setLink('');
      setPlatform('');
      alert('Question task added successfully!');
    } catch (error) {
      console.error('Error adding question task:', error);
      alert('Failed to add question task. Please try again.');
    }
  };

  return (
    <div className="add-question">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={link}
          onChange={handleLinkChange}
          placeholder="Question Link"
          required
        />
        <input
          type="text"
          value={platform}
          readOnly
          placeholder="Platform (auto-detected)"
        />
        <button type="submit" disabled={!platform}>Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;