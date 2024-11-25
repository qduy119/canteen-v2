"use client";

import React, { useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = useCallback(
        (currentPathname: string) => {
            return pathname === currentPathname;
        },
        [pathname]
    );

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="rounded-lg mt-4">
                <div className="flex items-center px-3 py-2 gap-1">
                    <User2Icon />
                    PROFILE
                </div>
                <Separator />
                <div className="p-5 flex gap-5">
                    <div className="p-2">
                        <Link
                            href="general"
                            className={`text-center block p-2 rounded-sm ${
                                isActive("/profile/general")
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            General
                        </Link>
                        <Link
                            href="password"
                            className={`text-center block p-2 rounded-sm ${
                                isActive("/profile/password")
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            Password
                        </Link>
                    </div>
                    <div className="w-[80%] sm:w-[50%] mx-auto shadow-md p-5 ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
