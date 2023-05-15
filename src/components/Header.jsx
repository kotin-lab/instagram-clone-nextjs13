'use client';

import Image from 'next/image';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { signIn, useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-3">
        {/* Left side */}
        <div className="h-24 w-24 relative hidden lg:inline-block cursor-pointer">
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
            fill
            alt='instagram'
            className='object-contain'
          />
        </div>
        <div className="h-24 w-10 relative lg:hidden cursor-pointer">
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png'
            fill
            alt='instagram'
            className='object-contain'
          />
        </div>

        {/* Middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder='Search'
            className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md'
          />
        </div>

        {/* Right side */}
        <div className='flex space-x-4 items-center'>
          <HomeIcon  class="h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {session ? 
            (
              <>
                <PlusCircleIcon  class="hidden md:inline-block h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
                <img 
                  src={session.user.image} 
                  alt="Profile img"
                  className='h-10 w-10 rounded-full object-cover cursor-pointer'
                  onClick={() => {
                    confirm('You want to Sign out?') && signOut();
                  }}
                />
              </>
            ) : 
            (
              <button onClick={signIn}>Sign in</button>
            )
          }
        </div>
      </div>
    </header>
  )
}
