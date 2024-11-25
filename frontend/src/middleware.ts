import { NextRequest, NextResponse } from "next/server";
import { getRole } from "./app/actions/user";
import { checkIsLoggedIn } from "./app/actions/utils";
import { cookies } from "next/headers";

const authenticatedCustomerRoute = [
    "/cart",
    "/checkout",
    "/order",
    "/payment",
    "/profile",
];

const normalRoute = ["/", "/product", "/category", "/search"];

const adminRoute = ["/admin"];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isLoggedIn = await checkIsLoggedIn();
    if (isLoggedIn) {
        if (
            pathname.startsWith("/checkout") &&
            !cookies().get("checkout")?.value
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        const role = await getRole();
        if (role === "Admin") {
            if (pathname === "/admin" || pathname === "/") {
                return NextResponse.redirect(
                    new URL("/admin/dashboard", request.url)
                );
            }
            if (
                authenticatedCustomerRoute.some((route) =>
                    pathname.startsWith(route)
                )
            ) {
                return NextResponse.redirect(
                    new URL("/auth-error", request.url)
                );
            }
            return NextResponse.next();
        } else if (role === "Customer") {
            if (adminRoute.some((route) => pathname.startsWith(route))) {
                return NextResponse.redirect(
                    new URL("/auth-error", request.url)
                );
            }
            return NextResponse.next();
        }
    } else {
        if (
            [...authenticatedCustomerRoute, ...adminRoute].some((route) =>
                pathname.startsWith(route)
            )
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    if (normalRoute.includes(pathname)) {
        return NextResponse.next();
    }
    NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: [
        "/cart",
        "/checkout",
        "/order",
        "/payment",
        "/profile/:path*",
        "/login",
        "/register",
        "/",
        "/product/:id*",
        "/category/:id*",
        "/search",
        "/admin/:path*",
    ],
};
