import Header from "./Header";
import Image from "next/image"
import { AudioPlayer } from "./AudioPlayer";
interface GameSelectionUIProps {
  isLoading: boolean;
  selectedGame: string;
  onGameSelect: (game: string) => void;
}
const GameSelectionUI : React.FC<GameSelectionUIProps> = ({ isLoading, selectedGame, onGameSelect }) => {


  return (
    <>
    <Header/>
<div className="relative h-screen font-biorhyme w-full">
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

      {/* Chef Image */}
     
    </div>
    <AudioPlayer src="/music/chefton.mp3"/>
    </>
  )
}


export default GameSelectionUI;











 {/* <div className="mt-8">
  <div className="flex items-center justify-between rounded-lg bg-trnasparent p-4">
    <div className="flex items-center gap-4">
      <div className="h-[60px] w-[60px] rounded-lg bg-[url('/gameimg/EclipseInvader_icon.png')] bg-cover border-2 border-[#E6FF00] flex items-center justify-center">
       
      </div>
      <span className="font-semibold text-white text-md">Eclipse Invader</span>
    </div>
    <button
      onClick={() => onGameSelect("unity3")}
      disabled={isLoading}
      className="px-4 py-1 rounded-[11px] border-2 border-[#E6FF00] bg-black text-[#E6FF00] text-md font-bold hover:bg-[#E6FF00] hover:text-black transition-colors"
    >
      PLAY
    </button>
  </div>
</div> */}