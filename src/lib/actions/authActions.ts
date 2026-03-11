"use server";

import { signIn, signOut } from "@/auth";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";


export async function loginWithGithub() {
  await signIn("github", { redirectTo: "/" });
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function logoutWithGithub() {
  await signOut({ redirectTo: "/" });
}

export async function loginWithCredentials(username: string, password: string) {
  await signIn("credentials", { username, password, redirectTo: "/" });
}


export async function registerWithCredentials(username: string, password: string, email:string) {
  if (await prisma.user.findUnique({where: {username}})){
    return {error: "Username already exists"}
  }
  if (await prisma.user.findUnique({where: {email}})){
    return {error: "Email already exists"}
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({data: { username: username, password: hashedPassword, email: email}});
  return {success: true};
}
