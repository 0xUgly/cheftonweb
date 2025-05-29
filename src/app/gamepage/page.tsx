"use client";
import GameSelectionUI from "@/components/AuthPage";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BinanceLogin({
    searchParams,
  }: {
    searchParams: { signature: string; message: string };
  }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGame, setSelectedGame] = useState("");
    const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  
    useEffect(() => {
      const tg = window.Telegram && window.Telegram.WebApp;

      if (tg) {
        const safeArea = tg.safeArea;
        setSafeAreaInsets(safeArea);

        tg.onEvent('safeAreaChanged', () => {
          const safeArea = tg.safeArea;
          setSafeAreaInsets(safeArea);
        });
      }
    }, []);
  
    const handleRedirect = useCallback((game: string) => {
      setIsLoading(true);
      setSelectedGame(game);
      const payload = JSON.stringify({
        signature: searchParams.signature,
        message: searchParams.message,
      });
      router.push(`/${game}?payload=${encodeURIComponent(payload)}`);
    }, [searchParams.signature, searchParams.message, router]);
  
    return (
     <>
     
  <GameSelectionUI
   isLoading={isLoading}
   selectedGame={selectedGame}
   onGameSelect={handleRedirect}
   paddingTop={safeAreaInsets.top}
   paddingLeft={safeAreaInsets.left}
   paddingRight={safeAreaInsets.right}
   paddingBottom={safeAreaInsets.bottom}
   />
     </>
    );
  }
