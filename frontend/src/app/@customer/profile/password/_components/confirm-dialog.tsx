import { logout } from "@/app/actions/auth";
import { forgotPassword } from "@/app/actions/profile";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ConfirmDialog() {
    const router = useRouter();
    const ref = useRef<HTMLButtonElement>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleForgotPassword() {
        setIsPending(true);
        try {
            const data = await forgotPassword();
            if(data?.error) {
                handleError(data.error);
            } else {
                toast.success(
                    "A new password has been sent to your email. Plese check it",
                    {
                        duration: 3000,
                    }
                );
                toast("You will be logged out soon");
                await logout();
                router.push("/");
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsPending(false);
            ref.current?.click();
        }
    }

    return (
        <Dialog>
            <DialogTrigger ref={ref} asChild>
                <Button className="uppercase text-lg float-right">
                    Forgot password?
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-[425px]"
            >
                <DialogHeader>
                    <DialogTitle>Confirm</DialogTitle>
                </DialogHeader>
                <div className="p-4">Are you sure to reset your password?</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={isPending}
                        onClick={handleForgotPassword}
                    >
                        Agree {isPending && <Spinner />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
