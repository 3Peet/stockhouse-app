import NextAuth from "next-auth";
import type { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user: {
			id: number;
		} & DefaultSession["user"];
	}

	interface User extends PrismaUser {}
}
