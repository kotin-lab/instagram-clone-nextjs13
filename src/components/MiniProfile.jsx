import { userState } from "@/atom/userAtom";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRecoilState } from "recoil";

export default function MiniProfile() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  // Handlers
  function handleSignOutClicked() {
    signOut(auth);
    setCurrentUser(null);
  }

  return currentUser && (
    <div className="flex items-center space-x-2 mt-14 ml-10">
      <Image
        src={currentUser.userImg}
        alt="user image"
        width={100}
        height={100}
        className="h-16 w-16 rounded-full p-0.5 border"
      />
      <div className="flex-1">
        <h2 className="font-bold">{currentUser.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button onClick={handleSignOutClicked} className="text-blue-400 font-semibold text-sm">Sign out</button>
    </div>
  )
}
