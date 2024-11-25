import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
    return (
        <Link href="/">
            <Image
                src="/logo.png"
                width={60}
                height={60}
                priority={true}
                alt="Logo App"
            />
        </Link>
    );
}
