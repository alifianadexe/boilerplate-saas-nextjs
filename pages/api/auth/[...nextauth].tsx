import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (email !== 'john@gmail.com' || password !== '1234') {
          throw new Error('invalid credentials');
        }

        // if everything is fine
        return {
          id: '1234',
          name: 'John Doe',
          email: 'john@gmail.com',
          role: 'admin'
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/login'
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.name
      }
    })
  }
};

export default NextAuth(authOptions);
