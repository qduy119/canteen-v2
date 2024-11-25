import Link from "next/link";
import React from "react";
import LoginForm from "./_components/login-form";
import LoginOAuth from "./_components/login-oauth";

export default function LoginPage() {
    return (
        <div className="bg-tertiary mx-auto w-[300px] sm:w-1/2 rounded-lg p-6 mt-[100px]">
            <p className="text-center text-3xl sm:text-4xl font-bold text-primary">
                <Link href="/">hcmus@canteen</Link>
            </p>
            <h2 className="text-center text-xl sm:text-2xl font-bold mt-4">
                Log in to your account
            </h2>
            <p className="text-center font-light text-sm mt-2">
                Welcome back! Please enter your details.
            </p>
            <LoginForm />
            <LoginOAuth/>
            <p className="text-center mt-4">
                Don{"'"}t have an account yet?
                <Link
                    href="/register"
                    className="text-primary font-semibold ml-1 hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
