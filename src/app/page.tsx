import { auth } from "@/auth";
import { SignInButtonGithub } from "./components/sign-in-button-github";
import { SignOutButtonGithub } from "./components/sign-out-button-github";
import { SignInButtonGoogle } from "./components/sign-in-button-google";
import { SignInWithCredentials } from "./components/sign-in-credentials";


export default async function Home() {
  const session = await auth()
  console.log(session);
  return (
    <div className="justify-center h-screen flex-col gap-4 bg-[url('/login_background.png')] bg-cover bg-fixed">
      <div className="absolute inset-y-0 left-0  w-[40%] bg-white p-20 shadow-lg border-2 ">
        <div className="text-3xl font-bold text-teal-600 rounded-xl mb-7">Lake</div>
        <div className="text-3xl font-bold text-black">Welcome back.</div>
        <div className = "text-lg text-gray-700 dark:text-gray-600/75 mb-7"> Enter your credentials to access your account</div>
        {session ? (<p> Welcome, {session.user?.name} <SignOutButtonGithub /> </p>) : (
          <div>
            <div className="mb-5"><SignInButtonGoogle/></div>
            <div className="mb-7"><SignInButtonGithub/></div>
            <div className="flex items-center my-6 mb-7">
              <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-xs">OR CONTINUE WITH EMAIL</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div><SignInWithCredentials/></div>
          </div>
        ) 
        }
      </div>
    </div>);
}
