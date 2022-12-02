import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "../../../lib/prismadb"

export const authOptions=(
{
  providers:[
    // ?GoogleProvider
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET,
    }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ],
        callbacks: {
      //? user profile isNewUser is passed in once
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        if (user) {
          token.uid = user.id;
        }
        // if(user){
        //   token.userId = user.id
        // }
        return token
      },
      // adapter: PrismaAdapter(prisma),
      async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
        if (session?.user) {
          session.user.id = token.id;
          // session.id = user.id;
        }
        if (session?.user) {
          session.user.id = token.uid;
        }
        session.accessToken = token.accessToken
        return session
      }
    },
    debug:true,
})
export default NextAuth(authOptions)