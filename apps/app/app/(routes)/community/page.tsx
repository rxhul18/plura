import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { IconLink } from "../changelogs/_components/changelog-layout";
// import { GitHubIcon, XIcon } from "../changelogs/_components/icons";

export default function CommunityPage() {
    return (
        <div className="container mx-auto px-16 py-16 space-y-12 flex justify-center flex-col h-full">
            <div>
                <div className="my-6">
                    <h1 className="text-3xl font-bold text-center">Join The Community</h1>
                    <p className="text-center text-gray-400">
                        join the community to get help, share ideas, and stay up-to-date
                        with
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2	 gap-8">
                    <Card className="rounded-none bg-secondary">
                        <CardContent className="flex flex-col items-center p-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" className="my-2">
                                <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"></path>
                            </svg>
                            <h2 className="text-2xl font-semibold mb-2">Discord</h2>
                            <p className="text-center mb-4">
                                Chat in real-time, collaborate, and connect with other members.
                            </p>
                            <Link
                                href="https://discord.com/invite/AEaBWNSgkf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" className="hover:bg-outline">Join our Discord</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none bg-secondary">
                        <CardContent className="flex flex-col items-center p-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 50 50" className="my-2">
                                <path fill="currentColor" d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
                            </svg>
                            <h2 className="text-2xl font-semibold mb-2">Twitter</h2>
                            <p className="text-center mb-4">
                                Join discussions, share ideas, and get help from the community.
                            </p>
                            <Link
                                href="https://x.com/getplura"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline">Follow @Plura</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-auto">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-lg mb-6">
                        Thanks for being a part of the community!
                    </p>
                </div>

                {/* <div className="flex justify-center space-x-6">
					<IconLink
						href="https://x.com/better_auth"
						icon={XIcon}
						className="flex-none text-gray-600 dark:text-gray-300"
					>
						X (formerly Twitter)
					</IconLink>
					<IconLink
						href="https://github.com/better-auth/better-auth"
						icon={GitHubIcon}
						className="flex-none text-gray-600 dark:text-gray-300"
					>
						GitHub
					</IconLink>
				</div> */}
            </div>
        </div>
    );
}