import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '../../../utils/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const [results] = await pool.execute(
          `SELECT * FROM new_schema.users where email = ?`,
          [credentials.email]
        );

        if (
          results.length &&
          bcryptjs.compareSync(credentials.password, results[0].password)
        ) {
          return {
            _id: results[0]._id,
            name: results[0].name,
            email: results[0].email,
            image: 'fa',
            isAdmin: results[0].isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
