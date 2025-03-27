"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  onGameSelect?: (game: string) => void;
}

function Header({ onGameSelect }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Function to handle the Play Now button click
  const handlePlayNow = () => {
    setIsMenuOpen(false)
    if (onGameSelect) {
      onGameSelect("unity2") // Same game selection as in home page
    } else {
      // Fallback to navigation if no game select function is provided
      window.location.href = "/gamepage";
    }
  }
  
  return (
    <>
      <div className="fixed top-0 flex justify-between items-center p-3 w-full bg-[#e7a1a2] z-[60]">
        <div className="relative w-16 h-16 sm:w-12 sm:h-12">
          <Image
            src="/images/tv.svg"
            alt="TV Logo"
            fill
            className="object-cover"
          />
        </div>
        <button 
          className="text-black z-[70] p-1"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Full-screen Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#e7a1a2] z-50 flex flex-col items-center justify-start pt-24">
          {/* Title with chef image */}
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-6xl font-bold text-yellow-400 mr-2">Menù</h1>
            <div className="relative w-16 h-16">
              <Image 
                src="/images/chef.png" 
                alt="Chef" 
                width={64} 
                height={64}
                className="object-contain" 
              />
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="w-full max-w-sm px-6 space-y-4">
            <button 
              onClick={handlePlayNow}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-colors"
            >
              PLAY NOW
            </button>
            
            <Link 
              href="/profile" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              PROFILE
            </Link>
            
            <Link 
              href="/leaderboard" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              LEADERBOARD
            </Link>
            
            <button
              onClick={() => {
                alert("Coming Soon");
                setIsMenuOpen(false);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-colors"
            >
              ACTIVATION (SOON)
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header