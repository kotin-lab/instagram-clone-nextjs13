import React from 'react';

// Components
import Stories from './Stories';
import Posts from './Posts';

export default function Feed() {
  return (
    <div>
      <section>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      <section>
        {/* Mini Profile */}

        {/* Suggestions */}
      </section>
    </div>
  )
}
