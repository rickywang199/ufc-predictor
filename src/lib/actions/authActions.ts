"use server";

import { signIn, signOut } from "@/auth";


export async function loginWithGithub() {
  await signIn("github", { redirectTo: "/" });
}

export async function logoutWithGithub() {
  await signOut({ redirectTo: "/" });
}


export async function loginWithEmail(email: string) {
  await signIn("resend", { email ,redirectTo: "/" });
}
