'use client';

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { db } from '@/../firebase';
import Image from 'next/image';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default async function SignIn() {
  const router = useRouter();

  // Handlers
  async function handleSignInClicked() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          username: user.displayName.split(' ').join('').toLocaleLowerCase(),
          timestamp: serverTimestamp()
        });
      }
      
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center space-x-7 mt-20">
      <Image 
        src={'https://superviral.com.au/wp-content/uploads/2021/10/Buy-Instagram-Followers-Australia.png'}
        alt='graphic image'
        width={300}
        height={300}
        className='hidden object-cover rotate-6 md:block md:w-48'
      />
      <div className="">
        <div className="flex flex-col items-center">
          <Image 
            src={'https://careeractivate.com/wp-content/uploads/2019/04/Instagram-1.png'}
            alt=''
            width={100}
            height={100}
            className='w-32 object-cover'
          />
          <p className='text-sm italic my-10 text-center'>This app is created for learning purposes</p>
          <button 
            onClick={handleSignInClicked} 
            className='bg-red-400 text-white rounded-lg p-3 hover:bg-red-500 transition-colors duration-200 ease-out'
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}