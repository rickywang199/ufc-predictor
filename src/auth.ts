import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";



export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [GitHub({allowDangerousEmailAccountLinking:true}), Resend({from: "onboarding@resend.dev"}), Google({allowDangerousEmailAccountLinking: true})],
});
