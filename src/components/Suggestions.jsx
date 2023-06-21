'use client';

import { userState } from '@/atom/userAtom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { db } from '../../firebase';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [currentUser] = useRecoilState(userState);

  useEffect(() => {
    let docRef = collection(db, 'users');

    if (currentUser) {
      docRef = query(
        collection(db, 'users'),
        where('uid', '!=', currentUser.uid)
      );
    }

    const unsubscribe = onSnapshot(
      docRef,      
      snapshot => setSuggestions(snapshot.docs)
    );

    return unsubscribe;
  }, [currentUser]);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">Sell all</button>
      </div>
      {suggestions.map(suggestion => (
        <div key={suggestion.id} className="flex items-center space-x-4 mt-3 cursor-pointer" >
          <Image
            src={suggestion.data().userImg}
            alt='user image'
            width={100}
            height={100}
            className='h-10 w-10 rounded-full border p-0.5'
          />
          <div className="flex-1">
            <h2 className='font-semibold text-sm'>{suggestion.data().username}</h2>
            <h3 className='text-sm text-gray-400 truncate'>{suggestion.data().name}</h3>
          </div>
          <button className='font-semibold text-blue-400 text-sm'>Follow</button>
        </div>
      ))}
    </div>
  )
}
