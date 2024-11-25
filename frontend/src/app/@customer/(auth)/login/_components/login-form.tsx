"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/validations/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleError, wait } from "@/lib/utils";
import { login } from "@/app/actions/auth";
import { getRole } from "@/app/actions/user";

export default function LoginForm() {
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    async function onSubmit(values: LoginSchemaType) {
        setIsPending(true);
        try {
            const data = await login(values);
            if (data?.error) {
                handleError(data.error);
            } else {
                toast.success("Login successfully!", { className: "success" });
                const role = await getRole();
                if (role === "Customer") {
                    await wait(2000);
                    router.push("/");
                } else if (role === "Admin") {
                    await wait(2000);
                    router.push("/admin");
                }
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full uppercase text-lg login"
                    disabled={isPending}
                >
                    Login {isPending && <Spinner />}
                </Button>
            </form>
        </Form>
    );
}
