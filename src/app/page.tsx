import { auth } from "@/auth";
import { SignInButtonGithub } from "./components/sign-in-button-github";
import { SignOutButtonGithub } from "./components/sign-out-button-github";
import { SignInButtonEmail } from "./components/sign-in-button-email";

export default async function Home() {
  const session = await auth()
  console.log(session);
  return (
    <div>
      {session ? (<p> Welcome, {session.user?.name} <SignOutButtonGithub /> </p>) : (
        <div>
          <SignInButtonGithub />
          <SignInButtonEmail />
        </div>
      ) 
      }
    </div>);
}
