import Header from "./Header";
import Image from "next/image"
import { AudioPlayer } from "./AudioPlayer";

interface GameSelectionUIProps {
  isLoading: boolean;
  selectedGame: string;
  onGameSelect: (game: string) => void;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
  paddingBottom: number;
}

const GameSelectionUI: React.FC<GameSelectionUIProps> = ({ isLoading, selectedGame, onGameSelect, paddingTop, paddingLeft, paddingRight, paddingBottom }) => {
  return (
    <>
      <Header onGameSelect={onGameSelect} />
      <div className="relative h-screen font-biorhyme w-full" style={{
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/landing.mp4" type="video/mp4" />
        </video>
        
        {/* Main Content */}
        <div className="relative flex flex-col items-center px-6 pt-12 bg-[#e7a1a2] text-center z-10">
          <Image
            src="/images/logo.svg"
            alt="TV Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-auto h-auto"
          />
          <button 
            onClick={() => onGameSelect("unity2")}
            disabled={isLoading}
            className="bg-[#FF6B4A] hover:bg-[#FF8266] text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200"
          >
            PLAY
          </button>
        </div>
      </div>
      <AudioPlayer src="/music/chefton.mp3"/>
    </>
  )
}

export default GameSelectionUI;