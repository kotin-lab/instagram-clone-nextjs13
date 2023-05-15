'use client';

import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// Recoil provider
export const RecoilProvider = ({children}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};