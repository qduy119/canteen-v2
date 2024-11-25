import React from "react";

export default function ClientError({ message }: { message: string }) {
    return (
        <div className="min-h-screen relative">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-xl">
                ⚠️ {message}
            </h1>
        </div>
    );
}
