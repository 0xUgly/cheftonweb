"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import './global.css'
const inter = Inter({ subsets: ["latin"] });
import React,{ Suspense, useEffect } from "react";
import Image from "next/image";
import Providers from "./Providers";

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const tg = window.Telegram && window.Telegram.WebApp;

    if (tg) {
      // Check if safeArea is defined before accessing its properties
      if (tg.safeArea) {
        const safeArea = tg.safeArea;
        const contentSafeArea = tg.contentSafeArea;
        const isFullscreen = tg.isFullscreen;

        document.body.style.paddingTop = safeArea.top + 'px';
        document.body.style.paddingLeft = safeArea.left + 'px';
        document.body.style.paddingRight = safeArea.right + 'px';
        document.body.style.paddingBottom = safeArea.bottom + 'px';

        if (isFullscreen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }

      tg.onEvent('safeAreaChanged', () => {
        // Check if safeArea is defined before accessing its properties
        if (tg.safeArea) {
          const safeArea = tg.safeArea;
          document.body.style.paddingTop = safeArea.top + 'px';
          document.body.style.paddingLeft = safeArea.left + 'px';
          document.body.style.paddingRight = safeArea.right + 'px';
          document.body.style.paddingBottom = safeArea.bottom + 'px';
        }
      });

      tg.onEvent('fullscreenChanged', () => {
        const isFullscreen = tg.isFullscreen;
        if (isFullscreen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      });

      // Lock orientation to landscape
      if (tg.lockOrientation) {
        try {
          tg.lockOrientation('landscape');
        } catch (error:any) {
          console.warn("Telegram WebApp: lockOrientation failed.", error.message);
        }
      }
    }
  }, []);

  return (
    <html lang="en" style={{ overflow: "auto", height: "100%" }}>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={inter.className}
        style={{ overflow: "auto", height: "100%", margin: 0 }}
      >
         <Suspense fallback={
          <div className="h-screen bg-black w-full flex items-center justify-center">
         <div className="font-bold font-zk text-white">Please wait...</div>
          </div>
         }>
      
        <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
