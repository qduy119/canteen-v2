"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import User from "@/types/user";
import { logout } from "@/app/actions/auth";

export default function UserAction({ user }: { user: User | undefined }) {
    const router = useRouter();

    async function handleLogout() {
        try {
            await logout();
            router.push("/");
        } catch (err) {
            const error = err as Error;
            toast.error(error.message);
        }
    }

    return !user ? (
        <div className="text-primary flex flex-col items-end">
            <Link href="/login" className="hover:underline">
                Login
            </Link>
            <Link href="/register" className="hover:underline">
                Register
            </Link>
        </div>
    ) : (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} alt="Avatar User" />
                    <AvatarFallback>{user.fullName}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
