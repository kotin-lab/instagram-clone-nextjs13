'use client';

// Components
import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';

export default function Feed() {
  const {data: session} = useSession();

  return (
    <div className={`grid grid-cols-1 mx-auto ${session? 'md:grid-cols-3 max-w-6xl': 'md:grid-cols-2 max-w-3xl'} `}>
      <section className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      {session && (
        <section className='hidden md:block'>
          <div className="fixed w-[380px]">
            {/* Mini Profile */}
            <MiniProfile />

            {/* Suggestions */}
            <Suggestions />
          </div>
        </section>
      )}
    </div>
  )
}
