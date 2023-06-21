import { modalState } from '@/atom/modalAtom';
import { PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

export default function Story({user, isUser}) {
  const [openModal, setOpenModal] = useRecoilState(modalState);

  return (
    <div className='relative cursor-pointer group'>
      <Image
        src={user.userImg}
        alt={user.username}
        width={100}
        height={100}
        className="h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 group-hover:scale-110 transition-transform duration-200 ease-out"
      />
      {isUser && <PlusIcon onClick={() => setOpenModal(true)} className='w-6 h-6 absolute top-4 left-4 text-white' />}
      <p className="text-xs w-14 truncate">{user.username}</p>
    </div>
  )
}
