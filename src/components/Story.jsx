import Image from "next/image";

export default function Story({user}) {
  return (
    <div>
      <Image 
        src={user.img}
        alt={user.username}
        width={56}
        height={56}
        className="h-14 w-14 rounded-full p-[1.5px] border-2 cursor-pointer border-red-500 hover:scale-110 transition-transform duration-200 ease-out"
      />
      <p className="text-xs w-14 truncate">{user.username}</p>
    </div>
  )
}
