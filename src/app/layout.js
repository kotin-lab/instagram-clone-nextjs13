import './globals.css';

export const metadata = {
  title: 'Instagram App',
  description: 'Instagram clone using next js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}

        
        {children}
      </body>
    </html>
  )
}
