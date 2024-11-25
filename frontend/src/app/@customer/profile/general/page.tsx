"use client";

import { updateProfile } from "@/app/actions/profile";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, handleError } from "@/lib/utils";
import { getMe } from "@/services/user";
import { profileSchema, ProfileSchemaType } from "@/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function General() {
    const [isPending, setIsPending] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getMe,
    });
    const form = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            gender: "Male",
            dateOfBirth: undefined,
            avatar: null,
        },
    });

    async function onSubmit(values: ProfileSchemaType) {
        values.avatar = previewAvatar ? previewAvatar : user?.avatar;

        const payload = new FormData();
        for (const [key, value] of Object.entries(values)) {
            if (value) {
                payload.append(
                    key,
                    value instanceof File ? value : value.toString()
                );
            }
        }
        if (user?.id) {
            setIsPending(true);
            try {
                const data = await updateProfile({ payload, id: user.id });
                if (data?.error) {
                    handleError(data.error);
                } else {
                    queryClient.invalidateQueries({ queryKey: ["profile"] });
                    toast.success("Update successfully");
                }
            } catch (error) {
                handleError(error);
            } finally {
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        if (user && !isLoading) {
            form.reset({
                fullName: user.fullName || "",
                phoneNumber: user.phoneNumber || "",
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
                    ? new Date(user.dateOfBirth)
                    : undefined,
                avatar: user.avatar,
            });
        }
    }, [user, isLoading, form]);

    if (isLoading) return <Spinner />;

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="avatar"
                    render={() => (
                        <FormItem>
                            <FormLabel htmlFor="avatar">
                                <div className="flex justify-center items-center cursor-pointer">
                                    {previewAvatar ? (
                                        <Image
                                            src={URL.createObjectURL(
                                                previewAvatar
                                            )}
                                            width={100}
                                            height={100}
                                            className="object-cover border-[1px] border-primary rounded-md"
                                            alt="Preview"
                                        />
                                    ) : (
                                        user?.avatar && (
                                            <Image
                                                src={user.avatar}
                                                width={100}
                                                height={100}
                                                className="object-cover border-[1px] border-primary rounded-md"
                                                alt="Preview"
                                            />
                                        )
                                    )}
                                </div>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    placeholder="Full name"
                                    id="avatar"
                                    className="hidden"
                                    accept="image/jpeg, image/jpg, image/png"
                                    formEncType="multipart/form-data"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] || null;
                                        if (file) {
                                            setPreviewAvatar(file);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Female
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Other" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Other
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
            </form>
        </Form>
    );
}
