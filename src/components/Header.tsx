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
          <nav className="text-center flex flex-col items-center space-y-4">
            <Link href="/gamepage" onClick={() => setIsMenuOpen(false)} className="block mb-4 hover:opacity-80 transition-opacity mx-auto">
              <Image src="/images/playnow.png" alt="Play Now" width={200} height={50} className="object-contain" />
            </Link>
            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block mb-4 hover:opacity-80 transition-opacity mx-auto">
              <Image src="/images/profile.png" alt="Profile" width={200} height={50} className="object-contain" />
            </Link>
            <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)} className="block mb-4 hover:opacity-80 transition-opacity mx-auto">
              <Image src="/images/leaderboard.png" alt="Leaderboard" width={200} height={50} className="object-contain" />
            </Link>
            {/* Activation Link - Shows "Coming Soon" alert */}
            <button
              onClick={() => {
                alert("Coming Soon");
                setIsMenuOpen(false);
              }}
              className="block mb-4 hover:opacity-80 transition-opacity mx-auto"
            >
              <Image src="/images/activations.png" alt="Activation" width={200} height={50} className="object-contain" />
            </button>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header

