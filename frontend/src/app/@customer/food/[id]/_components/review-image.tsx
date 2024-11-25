import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ReviewImage({ image }: { image: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Image
                    src={image}
                    width={100}
                    height={100}
                    alt="Image"
                    className="object-cover"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <div className="relative max-w-full h-[400px]">
                    <Image
                        src={image}
                        fill
                        alt="Image"
                        className="object-contain"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
