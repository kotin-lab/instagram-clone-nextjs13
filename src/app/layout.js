import './globals.css';

// Components
import Header from '@/components/Header';

export const metadata = {
  title: 'Instagram App',
  description: 'Instagram clone using next js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <Header />
        
        {children}
      </body>
    </html>
  )
}
