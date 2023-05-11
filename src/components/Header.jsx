import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
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

        <h1>Right sides</h1>
      </div>
    </div>
  )
}
