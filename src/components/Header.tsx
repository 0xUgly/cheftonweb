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
        <div className="fixed inset-0 bg-[#e7a1a2] z-50 flex flex-col items-center">
          {/* Menu Title Area with chef.png (contains both Menù text and chef character) */}
          <div className="w-full flex justify-center items-center mt-16 mb-8">
            <Image 
              src="/images/chef.png" 
              alt="Menu with Chef" 
              width={300}
              height={100}
              className="object-contain" 
            />
          </div>
          
          {/* Navigation Buttons */}
          <div className="w-full px-8 space-y-6">
            <button 
              onClick={handlePlayNow}
              className="w-full flex justify-center hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/images/playnow.png" 
                alt="Play Now" 
                width={300} 
                height={60}
                className="object-contain" 
              />
            </button>
            
            <Link 
              href="/profile" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex justify-center hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/images/profile.png" 
                alt="Profile" 
                width={300} 
                height={60}
                className="object-contain" 
              />
            </Link>
            
            <Link 
              href="/leaderboard" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex justify-center hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/images/leaderboard.png" 
                alt="Leaderboard" 
                width={300} 
                height={60}
                className="object-contain" 
              />
            </Link>
            
            <button
              onClick={() => {
                alert("Coming Soon");
                setIsMenuOpen(false);
              }}
              className="w-full flex justify-center hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/images/activations.png" 
                alt="Activation" 
                width={300} 
                height={60}
                className="object-contain" 
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header