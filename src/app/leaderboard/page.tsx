'use client'

import React, { useEffect, useState } from 'react'

type LeaderboardEntry = {
  pfp: string
  name: string
  knife: string
  score: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('/api/leaderboard')
        const data = await response.json()
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
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
                <th className="p-2 text-left font-bold text-sm uppercase">PFP</th>
                <th className="p-2 text-left font-bold text-sm uppercase">Name</th>
                <th className="p-2 text-left font-bold text-sm uppercase">Knife</th>
                <th className="p-2 text-left font-bold text-sm uppercase">Score</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-2">{entry.pfp}</td>
                    <td className="p-2">{entry.name}</td>
                    <td className="p-2">{entry.knife}</td>
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

