import React from 'react';

// Components
import Stories from './Stories';
import Posts from './Posts';

export default function Feed() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto'>
      <section className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      <section className='hidden md:block'>
        {/* Mini Profile */}

        {/* Suggestions */}
      </section>
    </div>
  )
}
