'use client';

import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image';

export default async function SignIn() {
  const providers = await getProviders();

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
        {Object.values(providers).map(provider => (
          <div key={provider.name} className="flex flex-col items-center">
            <Image 
              src={'https://careeractivate.com/wp-content/uploads/2019/04/Instagram-1.png'}
              alt=''
              width={100}
              height={100}
              className='w-32 object-cover'
            />
            <p className='text-sm italic my-10 text-center'>This app is created for learning purposes</p>
            <button 
              onClick={() => {
                signIn(provider.id, {callbackUrl: '/'})
              }} 
              className='bg-red-400 text-white rounded-lg p-3 hover:bg-red-500 transition-colors duration-200 ease-out'
              disabled={!provider.id}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}