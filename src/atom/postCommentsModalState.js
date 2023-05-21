import { atom } from 'recoil';

export const postCommentsModalState = atom({
  key: 'postCommentsModalState', // unique ID
  default: {
    open: false,
    postId: null,
  },   // default value
});