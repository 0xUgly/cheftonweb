// src/app/api/proxy/leaderboard/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from your API
    const response = await fetch('https://highscore-api.vercel.app/api/top-users', {
      headers: {
        'Accept': 'application/json'
      },
      // The App Router automatically handles request caching
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API responded with status: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch leaderboard data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}