"use client";

import {
    ChartColumnIncreasingIcon,
    CreditCardIcon,
    HomeIcon,
    Layers2Icon,
    ReceiptTextIcon,
    SoupIcon,
    TicketPercentIcon,
    Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { to: "/admin/category", label: "Category", icon: <Layers2Icon /> },
    { to: "/admin/food", label: "Food", icon: <SoupIcon /> },
    { to: "/admin/coupon", label: "Coupon", icon: <TicketPercentIcon /> },
    { to: "/admin/order", label: "Order", icon: <ReceiptTextIcon /> },
    {
        to: "/admin/transaction",
        label: "Transaction",
        icon: <CreditCardIcon />,
    },
    { to: "/admin/customer", label: "Customer", icon: <Users2Icon /> },
    {
        to: "/admin/revenue",
        label: "Revenue",
        icon: <ChartColumnIncreasingIcon />,
    },
];

const isActive = (pathname: string, to: string) => pathname.startsWith(to);

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className="bg-white border-r-[1px] w-[200px] fixed top-0 left-0 z-30 h-full">
            <div className="flex justify-center py-7">
                <Link href="/admin" className="text-3xl font-bold text-primary">
                    <Image
                        src="/canteen.png"
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                </Link>
            </div>
            <ul className="flex flex-col font-semibold text-white mt-3">
                {navigationLinks.map(({ to, label, icon }) => (
                    <li className="w-full text-lg" key={to}>
                        <Link
                            href={to}
                            className={`${
                                isActive(pathname, to)
                                    ? "text-primary border-r-[3px] bg-orange-100 border-r-primary"
                                    : "text-gray-600 hover:bg-orange-100 transition-all duration-300"
                            } flex items-center gap-2 w-full px-6 py-3`}
                        >
                            {icon} {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
