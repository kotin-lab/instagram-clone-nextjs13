'use client';

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from 'react-modal';
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { userState } from "@/atom/userAtom";
import { getAuth } from "firebase/auth";

export default function UploadModal() {
  const auth = getAuth();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser] = useRecoilState(userState);

  // Handlers
  // upload post handler
  async function handleUploadPost() {
    if (loading || !selectedFile) return;

    setLoading(true);

    try {
      /** save to firebase firestore */

      const docRef = await addDoc(
        collection(db, 'posts'),
        {
          caption,
          uid: auth.currentUser.uid,
          username: currentUser.username,
          profileImg: currentUser.userImg,
          timestamp: serverTimestamp(),
        }
      );
      
      /** upload file to firebase cloud storage */

      // file metadata
      const metadata = {
        contentType: selectedFile.type
      };
      
      // Upload image
      const imageSnap = await uploadBytes(
        ref(storage, `posts/${docRef.id}/image`),
        selectedFile, 
        metadata
      );

      // Get image url and update the post
      const downloadUrl = await getDownloadURL(imageSnap.ref);
      await updateDoc(
        doc(db, 'posts', docRef.id),
        {
          image: downloadUrl,      
        }
      );

      setLoading(false);
      setOpen(false);
      setSelectedFile(null);
      setSelectedFileDataUrl(null);
      setCaption('');
      filePickerRef.current.value = null;
    } catch (error) {
      setLoading(false);
      setOpen(false);
      setSelectedFile(null);
      setSelectedFileDataUrl(null);
      setCaption('');
      filePickerRef.current.value = null;
      console.log('Error: Post upload failed - ', error);
    }
  }

  // file onChange handler
  function handleFileChange(e) {
    const image = e.target.files[0];

    if (image) {
      setSelectedFile(image);

      // Get image data_url
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.addEventListener('load', onLoad);

      // FileReader onload handler
      function onLoad(e) {
        setSelectedFileDataUrl(e.target.result)
        fileReader.removeEventListener('load', onLoad);
      }
    } else {
      setSelectedFile(null);
      setSelectedFileDataUrl(null);
    }
  }

  return open && (
    <Modal
      isOpen={open}
      onRequestClose={() => {
        setOpen(false)
        setSelectedFile(null);
        setSelectedFileDataUrl(null);
        setCaption('');
      }}
      className={'max-w-lg w-[90%] mt-8 p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-md shadow-md outline-none'}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {selectedFileDataUrl ? (
          <img 
            src={selectedFileDataUrl} 
            alt="" 
            className="w-full max-h-[250px] object-contain cursor-pointer" 
            onClick={e => {
              filePickerRef.current.value = null;
              setSelectedFile(null);
              setSelectedFileDataUrl(null);
            }}
          />
        ): (
          <CameraIcon onClick={() => filePickerRef.current.click()} className="h-14 bg-red-200 p-2 rounded-full border-2 text-red-500 cursor-pointer" /> 
        )}
        <input 
          type="file" 
          hidden 
          ref={filePickerRef} 
          accept='.jpg,.png,.jpeg,.svg'
          onChange={handleFileChange}  
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