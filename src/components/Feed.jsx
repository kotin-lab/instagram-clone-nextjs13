'use client';

import { useRecoilState } from 'recoil';
import { userState } from '@/atom/userAtom';

// Components
import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

export default function Feed() {
  const [currentUser] = useRecoilState(userState);

  return (
    <div className={`grid grid-cols-1 mx-auto ${currentUser? 'md:grid-cols-3 max-w-6xl': 'md:grid-cols-2 max-w-3xl'} `}>
      <section className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      {currentUser && (
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
