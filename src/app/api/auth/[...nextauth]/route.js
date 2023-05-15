import NextAuth from "next-auth/next";
import Google from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],

  pages: {
    signIn: '/auth/signin'
  },

  callbacks: {
    async session({session, token, user}) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  }
});

export { handler as GET, handler as POST };