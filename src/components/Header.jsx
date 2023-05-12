import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Header() {
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
          <PlusCircleIcon  class="hidden md:inline-block h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          <HomeIcon  class="h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          <Image 
            src="https://i.pinimg.com/736x/e5/1c/30/e51c30d91a7ac242f487abd61ad7cd12.jpg" 
            alt="Profile img" 
            width={40}
            height={40}
            className='h-10 w-10 rounded-full object-cover cursor-pointer'
          />
        </div>
      </div>
    </header>
  )
}
