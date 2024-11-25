import React from "react";
import RegisterForm from "./_components/register-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="bg-tertiary mx-auto w-[300px] sm:w-1/2 rounded-lg p-6">
            <p className="text-center text-3xl sm:text-4xl font-bold text-primary">
                <Link href="/">hcmus@canteen</Link>
            </p>
            <h2 className="text-center text-xl sm:text-2xl font-bold mt-4">
                Create a new account
            </h2>
            <RegisterForm />
            <p className="text-center mt-4">
                Already have an account?
                <Link
                    href="/login"
                    className="text-primary ml-1 font-semibold hover:underline"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}
