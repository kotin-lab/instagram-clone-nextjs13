import './globals.css';

// Components
import Header from '@/components/Header';
import { RecoilProvider } from './providers';

export const metadata = {
  title: 'Instagram App',
  description: 'Instagram clone using next js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilProvider>            
          {/* Header */}
          <Header />
          
          {children}
        </RecoilProvider>
      </body>
    </html>
  )
}
