import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-3 w-full bg-primary text-white">
            <div className="block sm:flex items-center justify-between py-4 px-2">
                <Link
                    href="/"
                    className="block text-3xl font-medium text-center"
                >
                    hcmus@canteen
                </Link>
                <div className="flex items-center justify-between px-10 sm:px-0 gap-x-5 mt-0 sm:mt-4 font-extralight">
                    <a
                        href="https://chat.openai.com"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="https://mui.com"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
