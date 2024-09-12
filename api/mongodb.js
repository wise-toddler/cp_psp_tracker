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

  const url = `${API_URL}/action/${action}`;
  const body = JSON.stringify({
    dataSource,
    database,
    collection,
    ...payload,
  });

  try {
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

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error performing MongoDB operation:', error);
    res.status(500).json({ error: error.message });
  }
}