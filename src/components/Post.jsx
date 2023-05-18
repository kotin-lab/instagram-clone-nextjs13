import Image from "next/image";
import { 
  EllipsisHorizontalIcon, 
  HeartIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  BookmarkIcon,
  FaceSmileIcon 
} from '@heroicons/react/24/outline';
import {HeartIcon as HeartIconFilled} from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";

export default function Post({id, post}) {
  const [currentUser] = useRecoilState(userState);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // Effects
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'), 
        orderBy('timestamp', 'desc')
      ),
      snapshot => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      snapshot => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      const liked = likes.findIndex(like => like.id === currentUser.uid) !== -1;
      setHasLiked(liked);
    }
  }, [likes, currentUser]);

  // Handlers
  async function handleLikePost() {
    try {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', currentUser.uid));
      } else {
        await setDoc(
          doc(db, 'posts', id, 'likes', currentUser.uid),
          {
            username: currentUser.username
          }
        );
      }
    } catch (error) {
      console.log('Error: likePost - ', error);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();

    setComment('');
    await addDoc(
      collection(db, 'posts', id, 'comments'),
      {
        comment,
        username: currentUser.username,
        userImage: currentUser.userImg,
        timestamp: serverTimestamp()
      }
    );
  }

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
        <p className="inline-block font-bold truncate flex-1">{post.username}</p>
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
      {currentUser && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="inline-flex space-x-4 items-center">
            {hasLiked ? (
              <HeartIconFilled onClick={handleLikePost} className="btn text-red-400" />
            ) : (
              <HeartIcon onClick={handleLikePost} className="btn" />
            )}
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post comments */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-2">{post.username}</span>
        {post.caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 scrollbar-none overflow-y-scroll">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-center space-between space-x-2 mb-2">
              <Image 
                src={comment.data().userImage}
                alt="user-image"
                width={100}
                height={100}
                className="h-7 w-7 rounded-full object-cover"
              />
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {currentUser && (
        <form onSubmit={handleCommentSubmit} className="flex items-center p-4">
          <FaceSmileIcon className="h-7 w-7" />
          <input 
            type="text"
            value={comment}
            placeholder="Put your comment..."  
            className="flex-1 border-none focus:ring-0"
            onChange={e => setComment(e.target.value)}
          />
          <button 
            type="submit"
            className="text-blue-400 font-bold disabled:text-blue-200"
            disabled={!comment.trim()}
          >Post</button>
        </form>
      )}
    </article>
  )
}
