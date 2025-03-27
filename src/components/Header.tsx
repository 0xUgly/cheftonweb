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
      
      {/* Full-screen Navigation Overlay with blur */}
      {isMenuOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#e7a1a2] rounded-lg p-8 max-w-sm w-full">
            <nav className="flex flex-col items-center space-y-6">
              {/* Play Now button - directly calls onGameSelect instead of navigating */}
              <button 
                onClick={handlePlayNow} 
                className="block hover:opacity-80 transition-opacity mx-auto"
              >
                <Image src="/images/playnow.png" alt="Play Now" width={200} height={50} className="object-contain" />
              </button>
              
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block hover:opacity-80 transition-opacity mx-auto">
                <Image src="/images/profile.png" alt="Profile" width={200} height={50} className="object-contain" />
              </Link>
              
              <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)} className="block hover:opacity-80 transition-opacity mx-auto">
                <Image src="/images/leaderboard.png" alt="Leaderboard" width={200} height={50} className="object-contain" />
              </Link>
              
              {/* Activation Link - Shows "Coming Soon" alert */}
              <button
                onClick={() => {
                  alert("Coming Soon");
                  setIsMenuOpen(false);
                }}
                className="block hover:opacity-80 transition-opacity mx-auto"
              >
                <Image src="/images/activations.png" alt="Activation" width={200} height={50} className="object-contain" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header