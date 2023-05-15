'use client';

import React, { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useSession } from 'next-auth/react';

// Components
import Story from './Story';

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  const {data: session} = useSession();
  const user = {
    ...session?.user,
    img: session?.user.image
  };

  // Effect
  useEffect(() => {
    const storyUsers = minifaker.array(20, index => (
      {
        id: index,
        username: minifaker.username({locale: 'en'}).toLowerCase(),
        img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`
      }
    ));

    setStoryUsers(storyUsers);
  }, []);

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 overflow-x-scroll rounded-sm scrollbar-none'>
      {session && (
        <Story user={user} isUser={true} />
      )}
      {storyUsers.map(user => (
        <Story key={user.id} user={user} />
      ))}
    </div>
  )
}
