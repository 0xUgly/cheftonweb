'use client'

import React, { useEffect, useState } from 'react'

type ApiResponse = {
  success: boolean
  count: number
  limit: number
  scores: {
    address: string
    score: number
  }[]
}

type LeaderboardEntry = {
  name: string
  score: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Function to shorten address
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }
  


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        let errorMessages = [];
        
        // Try multiple approaches in sequence
        const endpoints = [
          'https://highscore-api.vercel.app/api/top-users', // Direct API (might fail due to CORS)
          '/api/proxy/leaderboard'                          // App Router API route
        ];
        
        for (const endpoint of endpoints) {
          try {
            console.log(`Attempting to fetch from: ${endpoint}`);
            const response = await fetch(endpoint);
            
            if (!response.ok) {
              const errorText = await response.text();
              const errorMessage = `${endpoint} responded with status: ${response.status}, body: ${errorText}`;
              console.warn(errorMessage);
              errorMessages.push(errorMessage);
              continue;
            }
            
            const data: ApiResponse = await response.json();
            
            if (data?.success && Array.isArray(data.scores)) {
              console.log(`Successfully loaded data from ${endpoint}:`, data);
              const formattedData: LeaderboardEntry[] = data.scores.map((item) => ({
                name: shortenAddress(item.address),
                score: item.score
              }));
              
              setLeaderboard(formattedData);
              setLoading(false);
              return;
            } else {
              const errorMessage = `Invalid data format from ${endpoint}: ${JSON.stringify(data)}`;
              console.warn(errorMessage);
              errorMessages.push(errorMessage);
            }
          } catch (endpointError) {
            const errorMessage = `Error fetching from ${endpoint}: ${endpointError instanceof Error ? endpointError.message : 'Unknown error'}`;
            console.error(errorMessage);
            errorMessages.push(errorMessage);
          }
        }
        
        // If we reach here, all endpoints failed
        throw new Error(`All fetch attempts failed:\n${errorMessages.join('\n')}`);
      } catch (error) {
        console.error('Leaderboard data fetch failed:', error);
        
        // Temporarily show error on screen instead of fallback data
        const errorDisplay: LeaderboardEntry[] = [
          { name: 'ERROR LOADING DATA', score: 0 },
          { name: error instanceof Error ? error.message : 'Unknown error', score: 0 }
        ];
        setLeaderboard(errorDisplay);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [])

  return (
    <div className="min-h-screen bg-pink-200 p-4 flex items-center justify-center font-['Courier_New']">
      <div className="w-full max-w-md flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-[#ff6b6b] rounded-t-lg p-4 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            Leaderboard
          </h1>
          <h2 className="text-xl font-bold uppercase tracking-widest">
            Top 100
          </h2>
        </div>
        
        {/* Table */}
        <div className="bg-white flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2 text-left font-bold text-sm uppercase">Name</th>
                <th className="p-2 text-left font-bold text-sm uppercase">Score</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-2">{entry.name}</td>
                    <td className="p-2">{entry.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button 
            className="px-8 py-2 bg-[#b08968] hover:bg-[#9a775c] uppercase font-bold rounded"
            onClick={() => window.location.href = '/gamepage'}
          >
            Home
          </button>
          <button 
            className="px-8 py-2 bg-[#b08968] hover:bg-[#9a775c] uppercase font-bold rounded"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}