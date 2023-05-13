import Image from "next/image";
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon } from '@heroicons/react/24/outline';

export default function Post({post}) {
  return (
    <article className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <Image
          src={post.userImg}
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
        src={post.img}
        alt="post image"
        width={1000}
        height={750}
        className="object-cover w-full"
      />

      {/* Post buttons */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="inline-flex space-x-4 items-center">
          <HeartIcon className="btn" />
          <ChatBubbleOvalLeftEllipsisIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
    </article>
  )
}
