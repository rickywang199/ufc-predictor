import { auth } from "@/auth";
import { SignInButtonGithub } from "./components/sign-in-button-github";
import { SignOutButtonGithub } from "./components/sign-out-button-github";
import { SignInButtonGoogle } from "./components/sign-in-button-google";
import { SignInWithCredentials } from "./components/sign-in-credentials";


export default async function Home() {
  const session = await auth()
  console.log(session);
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4 bg-[url('/login_background.png')] bg-cover bg-local">
      <div className="bg-white p-15  rounded-xl shadow-lg w-md border-2">
        <div className="text-3xl font-bold text-teal-600 rounded-xl text-center mb-39">LAKE</div>
        {session ? (<p> Welcome, {session.user?.name} <SignOutButtonGithub /> </p>) : (
          <div>
            <SignInButtonGithub />
            <SignInButtonGoogle />
            <SignInWithCredentials/>
          </div>
        ) 
        }
      </div>
    </div>);
}
