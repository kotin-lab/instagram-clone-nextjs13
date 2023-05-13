import Image from "next/image";

export default function MiniProfile() {
  return (
    <div className="flex items-center space-x-2 mt-14 ml-10">
      <Image 
        src={'https://i.pinimg.com/736x/e5/1c/30/e51c30d91a7ac242f487abd61ad7cd12.jpg'}
        alt="user image"
        width={100}
        height={100}
        className="h-16 w-16 rounded-full p-0.5 border"
      />
      <div className="flex-1">
        <h2 className="font-bold">codewithaung</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="text-blue-400 font-semibold text-sm">Sign out</button>
    </div>
  )
}
