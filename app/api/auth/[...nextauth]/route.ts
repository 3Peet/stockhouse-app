import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import { pages } from "next/dist/build/templates/app-page";

const prisma = new PrismaClient();

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "john@doe.com" },
				password: { label: "Password", type: "password" },
			},
			// @ts-ignore
			async authorize(credentials) {
				if (!credentials) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (
					user &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					return {
						id: user.id,
						name: user.name,
						email: user.email,
					};
				}
				return null;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: async ({ token, user }: { token: JWT; user: User }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: async ({ session, token }: { session: Session; token: JWT }) => {
			if (session.user) {
				session.user.id = token.id;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
