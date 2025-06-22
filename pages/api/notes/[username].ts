import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (req.method === 'GET') {
    // Simulate fetching notes for the user
    res.status(200).json({ username, notes: ['Note 1', 'Note 2'] });
  } else if (req.method === 'POST') {
    // Simulate creating a new note for the user
    res.status(201).json({ username, message: 'Note created successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}