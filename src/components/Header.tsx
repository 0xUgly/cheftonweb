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

      {/* Full-screen Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <nav className="text-center w-full px-6">
            <Link 
              href="/gamepage" 
              className="block text-white text-3xl sm:text-4xl mb-6 hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/profile" 
              className="block text-white text-3xl sm:text-4xl mb-6 hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link 
              href="/about" 
              className="block text-white text-3xl sm:text-4xl mb-6 hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Activation
            </Link>
            <Link 
              href="/leaderboard" 
              className="block text-white text-3xl sm:text-4xl mb-6 hover:text-[#FFD700] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header

