import { auth } from "@/auth";
import { SignInButtonGithub } from "./components/sign-in-button-github";
import { SignInButtonGoogle } from "./components/sign-in-button-google";
import { SignInWithCredentials } from "./components/sign-in-credentials";
import { redirect, RedirectType } from 'next/navigation'
import Link from 'next/link'



export default async function Home() {
  const session = await auth()
  if(session){
    redirect("/home")
  }
  console.log(session);
  return (
    <div className="justify-center h-screen flex-col gap-4 bg-[#800000] bg-cover bg-fixed">
      <div className="absolute inset-y-0 left-0  w-[40%] bg-neutral-300 p-20 shadow-lg border-2 border-gray-600">
        <div className="text-3xl font-bold text-[#8B0000] rounded-xl mb-7">Lake</div>
        <div className="text-3xl font-bold text-black">Welcome back.</div>
        <div className = "text-lg text-[#800000] mb-7"> Enter your credentials to access your account</div>
        <div>
          <div className="mb-5"><SignInButtonGoogle/></div>
          <div className="mb-7"><SignInButtonGithub/></div>
          <div className="flex items-center my-6 mb-7">
            <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-[#800000] text-xs">OR CONTINUE WITH EMAIL</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <div><SignInWithCredentials/></div>
          <div className="flex items-center justify-center mt-5 gap-1 text-sm text-[#800000]">
            <span>Don't have an account? </span>
            <Link href="/register" className="placeholder-black font-bold hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>);
}
