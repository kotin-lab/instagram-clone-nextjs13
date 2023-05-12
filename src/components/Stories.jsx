'use client';

import React, { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

// Components
import Story from './Story';

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);

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
    <div>
      {storyUsers.map(user => (
        <Story key={user.id} user={user} />
      ))}
    </div>
  )
}
