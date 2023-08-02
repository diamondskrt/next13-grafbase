import { createUser, getUser } from '@/graphql/api';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { AdapterUser, SessionInterface, UserProfile } from '@/types/common';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    })
  ],
  jwt: {
    async encode({ secret, token }) {
      const encodedToken = await jsonwebtoken.sign(
        {
          ...token,
          issuer: 'grafbase',
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      );

      return encodedToken;
    },
    async decode({ secret, token }) {
      if (!token) return null;

      const decodedToken = await jsonwebtoken.verify(token, secret);

      return decodedToken as JWT;
    }
  },
  theme: {
    colorScheme: 'dark',
    logo: '/images/logo.svg'
  },
  callbacks: {
    async session({ session }) {
      try {
        const data = (await getUser(session?.user?.email)) as {
          user: UserProfile;
        };

        if (data.user) {
          session.user = {
            ...session.user,
            ...data.user
          };
        }

        return session;
      } catch (error: any) {
        console.error('Error retrieving user data: ', error.message);

        return session;
      }
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      try {
        const data = (await getUser(user.email)) as { user: UserProfile };

        if (!data.user) {
          await createUser(user.name, user.email, user.image);
        }

        return true;
      } catch (error: any) {
        console.error('Error checking if user exists: ', error.message);

        return false;
      }
    }
  }
};

export const getSession = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
};
