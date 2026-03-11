import {RegisterWithCredentials} from "@/app/components/register-form";
import { SignInButtonGithub } from "@/app/components/sign-in-button-github";
import { SignInButtonGoogle } from "@/app/components/sign-in-button-google";

export default async function registerPage() {
    return (
        <div className="flex items-center justify-center h-screen flex-col bg-[#800000] bg-cover bg-fixed">
            <div className="bg-neutral-300 flex items-center flex-col justify-center p-10 shadow-lg border-2 border-gray-600 w-1/3 rounded-3xl">
                <div className="text-3xl font-bold text-[#800000] rounded-xl mb-2">Lake</div>
                <div className="text-xl font-bold text-black mb-3">Create an account</div>
                <div className = "text-lg text-[#800000] mb-7">Start tracking your job applications today</div>
                <div className="w-full">
                    <div className="mb-5"><SignInButtonGoogle/></div>
                    <div><SignInButtonGithub/></div>
                </div>
                    <div className="flex items-center my-6 mb-2 w-full">
                        <div className="flex-grow border-t border-[#800000]"></div>
                            <span className="mx-4 text-[#800000] text-xs">OR CONTINUE WITH EMAIL</span>
                        <div className="flex-grow border-t border-[#800000]"></div>
                </div>
                <div className="w-full"><RegisterWithCredentials></RegisterWithCredentials></div>
            </div>
        </div>
    )
}