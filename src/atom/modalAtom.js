import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState', // unique ID
  default: false,   // default value
});