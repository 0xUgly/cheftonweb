
"use client";
import GameSelectionUI from "@/components/AuthPage";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function BinanceLogin({
    searchParams,
  }: {
    searchParams: { signature: string; message: string };
  }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGame, setSelectedGame] = useState("");
  
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
  />
     </>
    );
  }
































// "use client";
// import GameSelectionUI from "@/components/AuthPage";
// import { useState, useCallback, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function GamePage() {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedGame, setSelectedGame] = useState("");
//     const [authData, setAuthData] = useState<{signature: string, message: string} | null>(null);
    
//     useEffect(() => {
//         const stored = localStorage.getItem('telegramAuth');
//         if (stored) {
//             setAuthData(JSON.parse(stored));
//         } else {
//             // Redirect back to login if no auth data
//             router.push('/login/telegram');
//         }
//     }, [router]);

//     const handleRedirect = useCallback((game: string) => {
//         if (!authData) return;
        
//         setIsLoading(true);
//         setSelectedGame(game);
//         const payload = JSON.stringify({
//             signature: authData.signature,
//             message: authData.message,
//         });
//         router.push(`/${game}?payload=${encodeURIComponent(payload)}`);
//     }, [authData, router]);

//     if (!authData) return null; // Or loading spinner

//     return (
//         <GameSelectionUI
//             isLoading={isLoading}
//             selectedGame={selectedGame}
//             onGameSelect={handleRedirect}
//         />
//     );
// }

















