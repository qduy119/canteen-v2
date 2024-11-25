import ModeToggle from "@/components/mode-toggle";
import Logo from "./logo";
import SearchBar from "./search-bar";
import Cart from "./cart";
import UserAction from "./user-action";
import { getUser } from "@/app/actions/user";

export default async function Header() {
    const user = await getUser();

    return (
        <header className="border-b-[1px] p-4 w-full z-50 fixed top-0 left-0 h-[140px] md:h-[90px] bg-white dark:bg-black">
            <nav className="hidden md:flex items-center justify-between gap-2">
                <Logo />
                <div className="flex items-center gap-4">
                    <SearchBar />
                    <Cart />
                </div>
                <div className="flex items-center gap-4">
                    <UserAction user={user} />
                    <ModeToggle />
                </div>
            </nav>
            <nav className="block md:hidden">
                <div className="flex items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <UserAction user={user} />
                        <ModeToggle />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <SearchBar />
                    <Cart />
                </div>
            </nav>
        </header>
    );
}
