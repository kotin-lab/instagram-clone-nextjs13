import { useSession, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();

  return session && (
    <div className="flex items-center space-x-2 mt-14 ml-10">
      <img 
        src={session.user.image}
        alt="user image"
        className="h-16 w-16 rounded-full p-0.5 border"
      />
      <div className="flex-1">
        <h2 className="font-bold">{session.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 font-semibold text-sm">Sign out</button>
    </div>
  )
}
