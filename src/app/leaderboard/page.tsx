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
        // Use the specified API endpoint
        const response = await fetch('https://highscore-api.vercel.app/api/top-users')
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }
        
        const data: ApiResponse = await response.json()
        
        if (!data.scores || !Array.isArray(data.scores)) {
          throw new Error('Invalid data format received from API')
        }
        
        // Transform the data to match our LeaderboardEntry type
        const formattedData: LeaderboardEntry[] = data.scores.map((item) => ({
          name: shortenAddress(item.address),
          score: item.score
        }))
        
        setLeaderboard(formattedData)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        
        // Fallback data for testing
        const fallbackData: LeaderboardEntry[] = [
          { name: '0xd23b...1647', score: 155 },
          { name: '0xd23b...1532', score: 120 },
          { name: '0x8a7c...9e21', score: 118 },
          { name: '0x3f5d...42a9', score: 105 },
          { name: '0xb1e9...7c63', score: 95 }
        ]
        setLeaderboard(fallbackData)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLeaderboard()
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