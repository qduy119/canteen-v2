"use client";

import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
    const router = useRouter();

    return (
        <div className="relative bg-white min-w-screen min-h-screen">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-slate-200 p-8 rounded-md">
                <h1 className="uppercase text-3xl font-bold text-red-500 text-center">
                    You are not allowed to access this resource
                </h1>
                <p className="text-center text-[64px] text-yellow-400">⚠</p>
                <p className="text-center">
                    <button
                        className="bg-primary-light uppercase hover:bg-primary-dark transition-all duration-300 text-white font-medium p-2 rounded-md text-lg"
                        type="button"
                        onClick={() => router.back()}
                    >
                        &larr; Go back
                    </button>
                </p>
            </div>
        </div>
    );
}
