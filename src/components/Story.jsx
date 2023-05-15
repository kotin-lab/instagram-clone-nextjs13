import { PlusIcon } from '@heroicons/react/24/solid';

export default function Story({user, isUser}) {
  return (
    <div className='relative cursor-pointer group'>
      <img 
        src={user.img}
        alt={user.username}
        className="h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 group-hover:scale-110 transition-transform duration-200 ease-out"
      />
      {isUser && <PlusIcon className='w-6 h-6 absolute top-4 left-4 text-white' />}
      <p className="text-xs w-14 truncate">{user.username}</p>
    </div>
  )
}
