'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/atom/userAtom';

// Components
import Story from './Story';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState);

  // Effect
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users'),
        where('uid', '!=', currentUser.uid)
      ),      
      snapshot => setStoryUsers(snapshot.docs)
    );

    return unsubscribe;
  }, []);

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 overflow-x-scroll rounded-sm scrollbar-none'>
      {currentUser && (
        <Story user={currentUser} isUser={true} />
      )}
      {storyUsers.map(user => (
        <Story key={user.id} user={user.data()} />
      ))}
    </div>
  )
}
