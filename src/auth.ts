import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [GitHub({allowDangerousEmailAccountLinking:true}), 
    Google({allowDangerousEmailAccountLinking: true}),
    Credentials({credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
                },
                  async authorize(credentials) {
                    const username = (credentials?.username as string).trim().toLowerCase()
                    const user = await prisma.user.findUnique({
                      where: {username : username},
                    });
                    if(user && user.password) {
                        const isValid = await bcrypt.compare(credentials.password as string, user.password);
                        if(isValid) {
                            return user;
                        } else {
                            return null;
                        }
                      }
                    return null;
                  }
                })
              ],
});
