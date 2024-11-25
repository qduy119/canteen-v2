"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginOAuth() {
    function handleLoginGithub() {
        window.open(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github`,
            "_self"
        );
    }
    function handleLoginGoogle() {
        window.open(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`,
            "_self"
        );
    }

    return (
        <div className="mt-4 flex justify-center items-center gap-5">
            <span
                onClick={handleLoginGithub}
                className="bg-[#333333] text-white text-2xl flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer"
            >
                <FontAwesomeIcon icon={faGithub} />
            </span>
            <span
                onClick={handleLoginGoogle}
                className="bg-[#cd3b2e] text-white text-2xl flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer"
            >
                <FontAwesomeIcon icon={faGoogle} />
            </span>
        </div>
    );
}
