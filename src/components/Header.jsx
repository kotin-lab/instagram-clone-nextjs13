'use client';

import Image from 'next/image';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atom/modalAtom';
import { useRouter } from 'next/navigation';
import { userState } from '@/atom/userAtom';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/../firebase';

export default function Header() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const auth = getAuth();
  
  // Effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.providerData[0].uid;
        
        async function fetchUser() {
          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
    
    return unsubscribe;
  }, [auth]);
  
  // Handlers
  function handleSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }

  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-40">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-3">
        {/* Left side */}
        <div className="h-24 w-24 relative hidden lg:inline-block cursor-pointer">
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
            fill
            alt='instagram'
            className='object-contain'
            onClick={() => router.push('/')}
          />
        </div>
        <div className="h-24 w-10 relative lg:hidden cursor-pointer">
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png'
            fill
            alt='instagram'
            className='object-contain'
            onClick={() => router.push('/')}
          />
        </div>

        {/* Middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder='Search'
            className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md'
          />
        </div>

        {/* Right side */}
        <div className='flex space-x-4 items-center'>
          <HomeIcon onClick={() => router.push('/')} className="h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
          {currentUser ? 
            (
              <>
                <PlusCircleIcon  
                  onClick={() => setOpen(true)}
                  className="hidden md:inline-block h-5 w-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" 
                />
                <Image 
                  src={currentUser.userImg} 
                  alt="Profile img"
                  width={100}
                  height={100}
                  className='h-10 w-10 rounded-full object-cover cursor-pointer'
                  onClick={() => {
                    confirm('You want to Sign out?') && handleSignOut();
                  }}
                />
              </>
            ) : 
            (
              <button onClick={() => router.push('/auth/signin')}>Sign in</button>
            )
          }
        </div>
      </div>
    </header>
  )
}
