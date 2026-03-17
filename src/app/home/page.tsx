import { SignOutButtonGithub } from "../components/sign-out-button-github"

export default async function homePage() {
    return (
        <div>
            <div> Welcome</div>
            <div><SignOutButtonGithub/></div>
        </div>
    )
}