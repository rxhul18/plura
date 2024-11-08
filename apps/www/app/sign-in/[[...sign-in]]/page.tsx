import { Button } from "@/components/ui/button";
import { PiGithubLogoBold } from "react-icons/pi";
import { SiDiscord } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function SignInPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center  ">
      <div className="flex-col w-[26rem]  items-center justify-center font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-700 dark:from-neutal-900 to:neutral-700 drop-shadow-sm dark:to-white relative lg:text-4xl  pb-10 z-20 font-sans mx-auto flex gap-4  py-12 md:py-16  lg:py-12 text-center ">
        <h1 className="sm:text-5xl md:text-5xl lg:text-3xl ">
          Transform how you work.
        </h1>
        <article className="sm:text-5xl md:text-5xl lg:text-3xl">
          Log In Your Plura Account
        </article>
      </div>
      <div className="w-[26rem] h-[500px] flex flex-col justify-start  items-center ">
        <div className="w-full space-y-4  top-0 pt-14 ">
          <Button className="w-full border  border-border text-xl rounded-lg h-10 bg-transparent text-white hover:bg-neutral-900/90 font-thin ">
            <FcGoogle size={30} />
            <span>Continue with Google</span>
          </Button>
          <Button className="w-full border border-border text-xl rounded-lg h-10 bg-transparent text-white hover:bg-neutral-900/90  font-thin flex items-center justify-center  ">
            <PiGithubLogoBold size={24} />
            <span>Continue with Github</span>
          </Button>
          <Button className="w-full border border-border text-xl rounded-lg h-10 bg-transparent text-white hover:bg-neutral-900/90  font-thin flex items-center justify-center space-x-1">
            <SiDiscord />
            <span>Continue with Discord</span>
          </Button>
        </div>
        <div className="w-full h-10"></div>
        <div className="w-full h-10"></div>
        <div className="flex w-full flex-col space-y-2">
          <span className=" ml-2 text-muted-foreground text-sm font-normal flex flex-row items-center justify-start">
            Email
          </span>
          <Input
            className="h-12 "
            placeholder="type your email here"
            type="email"
            name="email"
          />
          <Button
            className="bg-neutral-900 text-white border border-border hover:bg-neutral-800"
            type="submit"
          >
            Continue
          </Button>
          <span className="text-muted-foreground text-sm flex flex-row items-center justify-center hover:underline ">
            <Link href={"/sign-up"}>already a member</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
