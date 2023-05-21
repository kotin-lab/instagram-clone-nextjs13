'use client';

import { useRecoilState } from "recoil";
import Modal from 'react-modal';
import { BookmarkIcon, CameraIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "@/atom/userAtom";
import { postCommentsModalState } from "@/atom/postCommentsModalState";
import Image from "next/image";
import Moment from "react-moment";
import {HeartIcon as HeartIconFilled} from '@heroicons/react/24/solid';

Modal.setAppElement('body');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.5)';
Modal.defaultStyles.overlay.zIndex = '100';
Modal.defaultStyles.overlay.overflowY = 'scroll';

export default function PostCommentsModal() {
  const [modalState, setModalState] = useRecoilState(postCommentsModalState);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser] = useRecoilState(userState);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState('');

  const { open, postId } = modalState;

  // Effects
  useEffect(() => {   
    if (!postId) return;

    async function fetchPost() {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };
    fetchPost();
  }, [postId]);
  
  useEffect(() => {
    if (!postId) return;

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts', postId, 'comments'), 
        orderBy('timestamp', 'desc')
      ),
      snapshot => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [postId]);

  useEffect(() => {
    if (!postId) return;

    const unsubscribe = onSnapshot(
      collection(db, 'posts', postId, 'likes'),
      snapshot => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [postId]);
  
  useEffect(() => {
    if (currentUser) {
      const liked = likes.findIndex(like => like.id === currentUser.uid) !== -1;
      setHasLiked(liked);
    }
  }, [likes, currentUser]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    
    if (open) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'initial';
    }
  }, [open]);

  // Handlers
  function handleModalClosed() {
    setModalState({open: false, postId: null});
    setPost(null);
  }
  
  async function handleLikePost() {
    if (!postId) return;

    try {
      const docRef = doc(db, 'posts', postId, 'likes', currentUser.uid);
      if (hasLiked) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          username: currentUser.username
        });
      }
    } catch (error) {
      console.log('Error: likePost - ', error);
    }
  }
  
  async function handleCommentSubmit(e) {
    e.preventDefault();

    setComment('');
    await addDoc(
      collection(db, 'posts', postId, 'comments'),
      {
        comment,
        username: currentUser.username,
        userImage: currentUser.userImg,
        timestamp: serverTimestamp()
      }
    );
  }
  
  if (!modalState.open || !post) return null;

  // Profile row
  const profileRow = (
    <div className="flex items-center px-4 py-3 border-b bg-white">
      <Image
        src={post.profileImg}
        width={50}
        height={50}
        alt="user-img"
        className="h-7 w-7 rounded-full object-cover"
      />
      <div className="flex items-center ml-3 space-x-2 flex-1">
        <span className="font-bold">{post.username}</span>
        <button className='font-semibold text-blue-400 text-sm'>Follow</button>
      </div>
      <EllipsisHorizontalIcon className="w-8 h-8 rounded-full px-0.5 cursor-pointer hover:bg-gray-50 duration-200 ease-out hover:scale-110 transition-all" />
    </div>
  );

  return (
    <Modal
      isOpen={modalState.open}
      onRequestClose={handleModalClosed}
      className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 outline-none'}
    >
      <div className="flex flex-col sm:flex-row w-[90vw] lg:w-[1000px] sm:max-w-[90vw] sm:max-h-[95vh] bg-white border-0 rounded-md shadow-md outline-none overflow-hidden">
        {/* Profile row */}
        <div className="sm:hidden">{profileRow}</div>

        <Image 
          src={post.image}
          width={500}
          height={500}
          alt="image"
          className="w-full sm:flex-1 sm:max-w-[50%] object-contain lg:max-w-[600px] max-h-[30vh] sm:max-h-full bg-black"
        />
        <div className="w-full sm:max-w-[50%] md:min-w-[405px] md:max-w-[500px] sm:max-h-full">
          <div className="relative h-full w-full flex flex-col max-h-full">
            {/* Profile row */}
            <div className="hidden sm:block">{profileRow}</div>

            {/* Post comments */}
            {comments.length ? (
              <div className="hidden sm:block flex-1 px-4" style={{maxHeight: 'calc(95vh - 235px)'}}>
                <div className="w-full max-h-full scrollbar-none overflow-y-scroll py-3">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-2 py-2 group">
                      <Image 
                        src={comment.data().userImage}
                        alt="user-image"
                        width={100}
                        height={100}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <div className="">
                        <p>
                          <span className="font-semibold cursor-pointer">{comment.data().username}</span>
                          {' '}
                          {comment.data().comment}
                        </p>
                        <div className="flex space-x-2 h-6 text-sm items-center text-gray-500 ">
                          <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
                          <EllipsisHorizontalIcon className="hidden group-hover:block w-6 h-6 cursor-pointer duration-200 ease-out hover:scale-110 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="hidden sm:block flex-1 px-4 text-center py-10 text-sm text-gray-500 underline">No comments to show</p>
            )}
            
            {/* Bottom group */}
            <div className="bg-white">
              <div className="px-4 border-t border-b">
                {/* Post buttons */}
                {currentUser && (
                  <div className="flex items-center justify-between pt-4">
                    <div className="inline-flex space-x-4 items-center">
                      {hasLiked ? (
                        <HeartIconFilled onClick={handleLikePost} className="btn text-red-400" />
                      ) : (
                        <HeartIcon onClick={handleLikePost} className="btn" />
                      )}
                      <ChatBubbleOvalLeftEllipsisIcon 
                        className="btn"
                      />
                    </div>
                    <BookmarkIcon className="btn" />
                  </div>
                )}

                {/* Statistics */}            
                <div className="py-4">
                  {likes.length > 0 && (
                    <p className="font-bold text-gray-700 text-sm">{likes.length} likes</p>
                  )}              
                  <Moment fromNow className="text-xs text-gray-500 uppercase">{post.timestamp?.toDate()}</Moment>
                </div>
              </div>
            
              {/* Input box */}
              {currentUser && (
                <form onSubmit={handleCommentSubmit} className="flex items-center py-2 px-4">
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}