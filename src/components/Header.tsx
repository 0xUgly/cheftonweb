"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  onGameSelect?: (game: string) => void;
}

import { useEffect } from 'react';

function Header({ onGameSelect }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const tg = window.Telegram && window.Telegram.WebApp;

    if (tg) {
      const safeArea = tg.safeArea;
      setSafeAreaInsets(safeArea);
      setIsFullscreen(tg.isFullscreen);

      tg.onEvent('safeAreaChanged', () => {
        const safeArea = tg.safeArea;
        setSafeAreaInsets(safeArea);
      });

      tg.onEvent('fullscreenChanged', () => {
        setIsFullscreen(tg.isFullscreen);
      });
    }
  }, []);
  
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

  const toggleFullscreen = () => {
    const tg = window.Telegram && window.Telegram.WebApp;
    if (tg) {
      if (tg.isFullscreen) {
        tg.exitFullscreen();
      } else {
        tg.requestFullscreen();
      }
    }
  };
  
  return (
    <>
      <div className="fixed top-0 flex justify-between items-center p-3 w-full bg-[#e7a1a2] z-[60]" style={{
        paddingTop: safeAreaInsets.top,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}>
        <div className="relative w-16 h-16 sm:w-12 sm:h-12">
          <Image
            src="/images/tv.svg"
            alt="TV Logo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center">
          <button
            className="text-black z-[70] p-1"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
          </button>
          {/* Fullscreen Toggle Button */}
          <button onClick={toggleFullscreen} className="ml-2 text-black z-[70] p-1">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
      
      {/* Full-screen Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#e7a1a2] z-50 flex flex-col items-center" style={{
          paddingBottom: safeAreaInsets.bottom,
        }}>
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