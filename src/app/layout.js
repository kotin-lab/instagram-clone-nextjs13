import { SessionProvider } from 'next-auth/react';
import './globals.css';

// Components
import Header from '@/components/Header';
import { NextAuthProvider } from './providers';

export const metadata = {
  title: 'Instagram App',
  description: 'Instagram clone using next js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {/* Header */}
          <Header />
          
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
