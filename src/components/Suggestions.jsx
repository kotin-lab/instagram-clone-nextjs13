'use client';

import minifaker from 'minifaker';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = minifaker.array(5, index => (
      {
        username: minifaker.username({locale: 'en'}).toLocaleLowerCase(),
        jobtitle: minifaker.jobTitle(),
        id: index,
      }
    ));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">Sell all</button>
      </div>
      {suggestions.map(suggestion => (
        <div key={suggestion.id} className="flex items-center space-x-4 mt-3" >
          <Image
            src={`https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`}
            alt='user image'
            width={100}
            height={100}
            className='h-10 w-10 rounded-full border p-0.5'
          />
          <div className="flex-1">
            <h2 className='font-semibold text-sm'>{suggestion.username}</h2>
            <h3 className='text-sm text-gray-400 truncate'>{suggestion.jobTitle}</h3>
          </div>
          <button className='font-semibold text-blue-400 text-sm'>Follow</button>
        </div>
      ))}
    </div>
  )
}
