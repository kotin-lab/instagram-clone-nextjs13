'use client';

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from 'react-modal';
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
      className={'max-w-lg w-[90%] p-6 absolute top-56 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-md shadow-md outline-none'}
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
        />
        <button className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100 rounded-md" disabled>Upload Post</button>
      </div>
    </Modal>
  );
}