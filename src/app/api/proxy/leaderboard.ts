// pages/api/proxy/leaderboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Score = {
  address: string;
  score: number;
};

type ApiResponse = {
  success: boolean;
  count: number;
  limit: number;
  scores: Score[];
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ErrorResponse>
) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Fetch data from your API
    const response = await fetch('https://highscore-api.vercel.app/api/top-users');
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API responded with status: ${response.status}, body: ${errorText}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Return the data as-is
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy API error:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ 
      error: 'Failed to fetch leaderboard data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}