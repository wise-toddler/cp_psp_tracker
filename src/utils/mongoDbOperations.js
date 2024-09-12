const API_URL = '/api/mongodb';

const performMongoDbOperation = async (action, collection, payload) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, collection, payload }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', response.status, response.statusText);
      console.error('Response body:', errorText);
      throw new Error(`Operation failed: ${response.statusText}\nResponse: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error performing operation:', error);
    throw error;
  }
};

const findOne = async (collection, filter) => {
  const result = await performMongoDbOperation('findOne', collection, { filter });
  return result.document;
};

const find = async (collection, filter, sort = {}, limit = 100) => {
  const result = await performMongoDbOperation('find', collection, { filter, sort, limit });
  return result.documents;
};

const insertOne = async (collection, document) => {
  const result = await performMongoDbOperation('insertOne', collection, { document });
  return result.insertedId;
};

const updateOne = async (collection, filter, update) => {
  const result = await performMongoDbOperation('updateOne', collection, { filter, update });
  return result.modifiedCount;
};

const deleteOne = async (collection, filter) => {
  const result = await performMongoDbOperation('deleteOne', collection, { filter });
  return result.deletedCount;
};

const incrementSolvedCount = async (studentId) => {
  const result = await performMongoDbOperation('updateOne', 'students', {
    filter: { _id: { $oid: studentId } },
    update: { $inc: { solvedCount: 1 } }
  });
  return result.modifiedCount;
};

const addTask = async (task) => {
  const result = await insertOne('tasks', task);
  return result;
};

export { findOne, find, insertOne, updateOne, deleteOne, incrementSolvedCount, addTask };