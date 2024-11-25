"use client";

import { CircleX, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SearchBar() {
    const [query, setQuery] = React.useState<string>("");
    const router = useRouter();

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function onSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/search?query=${query}`);
    }

    return (
        <form onSubmit={onSearch} action="/" className="flex items-center">
            <div className="flex items-center h-[42px] py-2 pl-5 pr-2 rounded-l-full border-solid border-[1px] border-gray-300 focus-within:shadow-primary-light">
                <label htmlFor="search" className="hidden" />
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    className="border-none outline-none w-[150px] sm:w-[250px] lg:w-[300px] bg-transparent"
                    value={query}
                    onChange={handleSearch}
                />
                {query ? (
                    <CircleX
                        className="hover:opacity-50 cursor-pointer transition-all"
                        onClick={() => setQuery("")}
                    />
                ) : (
                    <CircleX className="opacity-0" />
                )}
            </div>
            <button
                type="submit"
                className="h-[42px] rounded-r-full border-l-0 border-solid border-[1px] py-[7px] px-4 border-gray-300 bg-tertiary"
            >
                <SearchIcon />
            </button>
        </form>
    );
}
