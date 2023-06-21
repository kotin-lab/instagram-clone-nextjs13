/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'upload.wikimedia.org',
      'i.pinimg.com',
      'i.pravatar.cc',
      'images.unsplash.com',
      'plus.unsplash.com',
      'superviral.com.au',
      'careeractivate.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
    ]
  }
}

module.exports = nextConfig
