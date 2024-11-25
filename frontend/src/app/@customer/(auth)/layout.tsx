import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main
            className="min-h-screen w-full bg-contain p-4"
            style={{ backgroundImage: "url(bg.png)" }}
        >
            {children}
        </main>
    );
}
