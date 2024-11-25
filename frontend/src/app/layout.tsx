import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryClientProvider } from "@/components/providers/query-provider";
import { Toaster } from "react-hot-toast";
import { checkUserRole } from "./actions/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Canteen",
    description: "Ordering foods whenever you want !",
};

export default async function RootLayout({
    customer,
    admin,
}: Readonly<{
    customer: React.ReactNode;
    admin: React.ReactNode;
    children: React.ReactNode;
}>) {
    const role = await checkUserRole();

    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryClientProvider>
                        {role === "Admin" ? admin : customer}
                        <Toaster
                            position="bottom-right"
                            reverseOrder={false}
                            toastOptions={{ duration: 3000 }}
                        />
                    </ReactQueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
