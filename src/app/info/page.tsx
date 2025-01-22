import React from 'react'
import Image from 'next/image'
function page() {
  return (
   <>
   <main className='h-screen w-full bg-black'>
    <div className='relative flex w-full items-center flex-col'>
        <Image
        src='/bgimg/image 1.png'
        alt=''
        height={500}
        width={500}
        />
        <div className='absolute bottom-5 text-white w-5/6 text-center text-[24px] font-semibold border-2 p-3  rounded-[28px]'>PLAY</div>
    </div>

    <div className='flex-col p-5 text-white'>
        <div className='font-bold  font-baloo text-[22px]'>ZOOK&apos;S QUEST</div>
        <div className='font-semibold text-[15px]'>Game Description</div>
        <div className='text-[12px] font-light'>Zook&apos;s Quest is a fast-paced, endless vertical jumper where you must leap from platform to platform, escaping the rising lava beneath you. Test your reflexes as you scale higher, dodging obstacles and navigating tricky jumps. Challenge your friends to beat your high score. How long can you survive before the pit swallows you whole? Jump fast or get burned!<br/>
           <ul className='list-disc pl-4'>
            <li> Pipe gives damage and takes away a point</li>
            <li>Final score depends on total distance travelled</li>
            <li>Claim tokens and Nft&apos;s after scoring 15, 25 and 50 points</li>
            </ul>
</div>
    </div>
   </main>
   </>
  )
}

export default page