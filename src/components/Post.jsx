import Image from "next/image";
import { 
  EllipsisHorizontalIcon, 
  HeartIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  BookmarkIcon,
  FaceSmileIcon 
} from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react";


export default function Post({post}) {
  const { data: session} = useSession();

  return (
    <article className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <Image
          src={post.profileImg}
          alt="user img"
          width={100}
          height={100}
          className="h-12 w-12 rounded-full object-cover border p-1 mr-3"
        /> 
        <post className="inline-block font-bold truncate flex-1">{post.username}</post>
        <EllipsisHorizontalIcon className="w-8 h-8 rounded-full px-0.5 cursor-pointer hover:bg-gray-50 duration-200 ease-out hover:scale-110 transition-all" />
      </div>

      {/* Post image */}
      <Image 
        src={post.image}
        alt="post image"
        width={1000}
        height={750}
        className="object-cover w-full"
      />

      {/* Post buttons */}
      {session && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="inline-flex space-x-4 items-center">
            <HeartIcon className="btn" />
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post comments */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{post.username}</span>
        {post.caption}
      </p>

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7 w-7" />
          <input 
            type="text"
            placeholder="Put your comment..."  
            className="flex-1 border-none focus:ring-0"
          />
          <button className="text-blue-400 font-bold">Post</button>
        </form>
      )}
    </article>
  )
}
