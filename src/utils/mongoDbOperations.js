// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');

const API_KEY = process.env.MONGODB_API_KEY || process.env.REACT_APP_MONGODB_API_KEY;
const API_URL = process.env.MONGODB_API_URL || process.env.REACT_APP_MONGODB_API_URL;

console.log('In mongoDbOperations.js:');
console.log('API_URL:', API_URL ? API_URL : 'undefined');
console.log('API_KEY:', API_KEY ? 'Set' : 'Not set');

const dataSource = 'cpcp';
const database = 'coding_platform_db';

const performMongoDbOperation = async (action, collection, payload) => {
    if (!API_URL) {
        throw new Error('MongoDB API URL is not set. Check your environment variables.');
    }
    if (!API_KEY) {
        throw new Error('MongoDB API Key is not set. Check your environment variables.');
    }

    const url = `${API_URL}/action/${action}`;
    const body = JSON.stringify({
        dataSource,
        database,
        collection,
        ...payload,
    });

    console.log('Performing MongoDB operation:');
    console.log('URL:', url);
    console.log('Action:', action);
    console.log('Collection:', collection);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // const response = await fetch(corsProxyUrl + url, {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
            },
            body: body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('MongoDB API Response:', response.status, response.statusText);
            console.error('Response body:', errorText);
            throw new Error(`MongoDB operation failed: ${response.statusText}\nResponse: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error performing MongoDB operation:', error);
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
// module.exports = { findOne, find, insertOne, updateOne, deleteOne, incrementSolvedCount };