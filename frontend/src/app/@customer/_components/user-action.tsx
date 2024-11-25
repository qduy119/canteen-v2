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
import User from "@/types/user";
import { logout } from "@/app/actions/auth";
import { handleError } from "@/lib/utils";

export default function UserAction({ user }: { user: User | undefined }) {
    const router = useRouter();

    async function handleLogout() {
        try {
            const data = await logout();

            if (data?.error) {
                handleError(data?.error);
            }
            router.push("/");
        } catch (error) {
            handleError(error);
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
                <DropdownMenuItem
                    onClick={() => {
                        router.push("/order");
                    }}
                >
                    My Order
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.push("/profile");
                    }}
                >
                    My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
