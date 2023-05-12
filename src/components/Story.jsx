import Image from "next/image";

export default function Story({user}) {
  return (
    <div>
      <Image 
        src={user.img}
        alt={user.username}
        width={100}
        height={100}
      />
      <p>{user.username}</p>
    </div>
  )
}
