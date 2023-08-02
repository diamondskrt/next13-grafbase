import { authOptions } from '@/pages/api/auth/authOptions';
import NextAuth from 'next-auth';

export default NextAuth(authOptions);
