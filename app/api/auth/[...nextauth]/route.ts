import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET ?? "secret",
	providers: [
		Google({
			clientId:
				process.env.GOOGLE_CLIENT_ID ||
				console.log("GOOGLE_CLIENT_ID Empty") ||
				"x",
			clientSecret:
				process.env.GOOGLE_CLIENT_SECRET ||
				console.log("GOOGLE_CLIENT_SECRET Empty") ||
				"x",
		}),
		Github({
			clientId:
				process.env.GITHUB_CLIENT_ID ||
				console.log("GITHUB_CLIENT_ID Empty") ||
				"x",
			clientSecret:
				process.env.GITHUB_CLIENT_SECRET ||
				console.log("GITHUB_CLIENT_SECRET Empty") ||
				"x",
		}),
	],
	callbacks: {
		async redirect() {
			return "/";
		},
	},
	adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
