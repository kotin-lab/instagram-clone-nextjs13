'use client';

import { RecoilRoot } from 'recoil';

// Recoil provider
export const RecoilProvider = ({children}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};