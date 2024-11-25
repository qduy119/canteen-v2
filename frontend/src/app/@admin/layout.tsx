import SideBar from "./admin/_components/side-bar";
import UserAction from "./admin/_components/user-action";
import { getUser } from "../actions/user";
import { ListIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    return (
        <main className="min-h-screen flex">
            <div className="block md:hidden"></div>
            <div className="hidden md:block">
                <SideBar />
            </div>
            <div className="flex-1 ml-0 md:ml-[200px] py-2 px-5 bg-slate-50">
                <section className="flex justify-between md:justify-end items-center mb-2">
                    <ListIcon className="text-primary md:hidden cursor-pointer" />
                    <UserAction user={user} />
                </section>
                <Separator />
                {children}
            </div>
        </main>
    );
}
