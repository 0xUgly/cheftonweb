"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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
            <nav className="flex flex-col items-center space-y-4">
              <Link 
                href="/gamepage" 
                onClick={() => setIsMenuOpen(false)} 
                className="w-full bg-gray-200 rounded-lg py-3 font-semibold text-center text-black hover:bg-gray-300 transition-colors"
              >
                PLAY NOW
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setIsMenuOpen(false)} 
                className="w-full bg-gray-200 rounded-lg py-3 font-semibold text-center text-black hover:bg-gray-300 transition-colors"
              >
                PROFILE
              </Link>
              <Link 
                href="/leaderboard" 
                onClick={() => setIsMenuOpen(false)} 
                className="w-full bg-gray-200 rounded-lg py-3 font-semibold text-center text-black hover:bg-gray-300 transition-colors"
              >
                LEADERBOARD
              </Link>
              <button
                onClick={() => {
                  alert("Coming Soon");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gray-200 rounded-lg py-3 font-semibold text-center text-black hover:bg-gray-300 transition-colors"
              >
                ACTIVATION (SOON)
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header