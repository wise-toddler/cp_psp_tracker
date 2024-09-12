// api/mongodb.js

import fetch from 'node-fetch';

const API_KEY = process.env.MONGODB_API_KEY;
const API_URL = process.env.MONGODB_API_URL;

const dataSource = 'cpcp';
const database = 'coding_platform_db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, collection, payload } = req.body;

  console.log('Received request:', { action, collection, payload });

  const url = `${API_URL}/action/${action}`;
  const body = JSON.stringify({
    dataSource,
    database,
    collection,
    ...payload,
  });

  console.log('Sending request to MongoDB API:', { url, body });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: body,
    });

    console.log('Received response from MongoDB API:', { status: response.status, statusText: response.statusText });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MongoDB API Error Response:', errorText);
      return res.status(response.status).json({ error: `MongoDB operation failed: ${response.statusText}`, details: errorText });
    }

    const data = await response.json();
    console.log('MongoDB API Success Response:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error performing MongoDB operation:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}