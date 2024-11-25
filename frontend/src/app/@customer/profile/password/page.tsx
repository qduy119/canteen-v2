"use client";

import Spinner from "@/components/spinner";
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
import { getMe } from "@/services/user";
import {
    changePasswordSchema,
    ChangePasswordSchemaType,
} from "@/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ConfirmDialog from "./_components/confirm-dialog";
import { handleError } from "@/lib/utils";
import { changePassword } from "@/app/actions/profile";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function Password() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const { data: user } = useQuery({
        queryKey: ["profile"],
        queryFn: getMe,
    });
    const form = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    async function onSubmit(values: ChangePasswordSchemaType) {
        setIsPending(true);
        try {
            const data = await changePassword(values);
            if(data?.error) {
                handleError(data.error);
            } else {
                toast.success(
                    "Change password successfully"
                );
                toast("You will be logged out soon");
                await logout();
                router.push("/");
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsPending(false);
        }
    }

    if (user && ["google", "github"].includes(user?.provider)) return null;

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter current password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full uppercase text-lg"
                    disabled={isPending}
                >
                    Save change {isPending && <Spinner />}
                </Button>
                <ConfirmDialog />
            </form>
        </Form>
    );
}
