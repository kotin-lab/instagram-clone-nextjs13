import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto">
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
      <h1>Right sides</h1>
    </div>
  )
}
