'use client';

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from 'react-modal';
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Handlers
  async function handleUploadPost() {
    if (loading) return;

    setLoading(true);

    try {
      const docRef = await addDoc(
        collection(db, 'posts'),
        {
          caption,
          username: session.user.username,
          profileImg: session.user.image,
          timestamp: serverTimestamp(),
        }
      );
      
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, 'data_url')
        .then(async snapshot => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(
            doc(db, 'posts', docRef.id),
            {
              image: downloadUrl
            }
          );
        });

      setLoading(false);
      setOpen(false);
      setSelectedFile(null);
      setCaption('');
      filePickerRef.current.value = null;
    } catch (error) {
      console.log('Error: Post upload failed - ', error);
    }
  }

  function addImageToPost(e) {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = e => {
      setSelectedFile(e.target.result);
    };
  }

  return open && (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        setOpen(false)
        setSelectedFile(null);
      }}
      className={'max-w-lg w-[90%] mt-8 p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-md shadow-md outline-none'}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {selectedFile? (
          <img 
            src={selectedFile} 
            alt="" 
            className="w-full max-h-[250px] object-contain cursor-pointer" 
            onClick={e => {
              filePickerRef.current.value = null;
              setSelectedFile(null);
              setCaption('');
            }}
          />
        ): (
          <CameraIcon onClick={() => filePickerRef.current.click()} className="h-14 bg-red-200 p-2 rounded-full border-2 text-red-500 cursor-pointer" /> 
        )}
        <input 
          type="file" 
          hidden 
          ref={filePickerRef} 
          onChange={addImageToPost}  
        />
        <input 
          type="text" 
          maxLength={150} 
          placeholder="Please enter your caption..." 
          className="m-4 border-none text-center w-full focus:ring-0" 
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
        <button 
          className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100 rounded-md" 
          disabled={loading || !selectedFile}
          onClick={handleUploadPost}
        >
          Upload Post
        </button>
      </div>
    </Modal>
  );
}