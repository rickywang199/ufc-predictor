"use server";

import { signIn, signOut } from "@/auth";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";


export async function loginWithGithub() {
  await signIn("github", { redirectTo: "/home" });
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/home" });
}

export async function logoutWithGithub() {
  await signOut({ redirectTo: "/" });
}

export async function loginWithCredentials(username: string, password: string) {
  try{
    await signIn("credentials", { username, password, redirectTo: "/home"})
    return {success: true}
  }
  catch{
    return {error: "Invalid username or password"}
  }
}


export async function registerWithCredentials(username: string, password: string, email:string) {
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedEmail = email.trim().toLowerCase()
  if (await prisma.user.findUnique({where: {username: normalizedUsername}})){
    return {error: "Username already exists"}
  }
  if (await prisma.user.findUnique({where: {email:normalizedEmail}})){
    return {error: "Email already exists"}
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({data: { username: normalizedUsername, password: hashedPassword, email: normalizedEmail}});
  return {success: true};
}
