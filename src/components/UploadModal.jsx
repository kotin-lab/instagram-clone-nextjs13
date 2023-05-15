'use client';

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from 'react-modal';

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return open && (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      className={'max-w-lg w-[90%] h-[300px] absolute top-56 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-md shadow-md outline-none'}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Modal</h1>
      </div>
    </Modal>
  );
}