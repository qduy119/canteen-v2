import Spinner from "@/components/spinner";
import Star from "@/components/star";
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
import { MessageSquareTextIcon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const quality = ["Terrible", "Poor", "Fair", "Good", "Amazing"];

export default function OrderReviewDialog({
    onAddReview,
}: {
    onAddReview: (payload: FormData) => Promise<void>;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isPending, setIsPending] = useState(false);
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState("");
    const [imagesFile, setImagesFile] = useState<FileList | null>(null);
    const [imagesPreview, setImagesPreview] = useState<string[] | null>(null);

    function handleRating(star: number) {
        setRating(star);
    }
    async function handleSubmitReview() {
        try {
            setIsPending(true);
            const formData = new FormData();
            formData.append("rating", rating.toString());
            if (description) {
                formData.append("description", description);
            }
            if (imagesFile) {
                Array.from(imagesFile).forEach((file) => {
                    formData.append("images_feedback", file);
                });
            }

            await onAddReview(formData);
        } catch (error) {
            handleError(error);
        } finally {
            setIsPending(false);
            ref.current?.click();
        }
    }

    useEffect(() => {
        let preview: string[] | null;
        if (imagesFile) {
            preview = Array.from(imagesFile).map((file) => {
                const url = URL.createObjectURL(file);
                return url;
            });
            setImagesPreview(preview);
        }
        return () => {
            if (preview) {
                preview.forEach((file) => {
                    URL.revokeObjectURL(file);
                });
            }
        };
    }, [imagesFile]);

    return (
        <Dialog>
            <DialogTrigger ref={ref}>
                <MessageSquareTextIcon className="hover:text-primary transition-all" />
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-fit"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>Please leave your feedback</DialogTitle>
                </DialogHeader>
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="w-fit mr-4">Quality</p>
                        <span>
                            <Star
                                n={5}
                                star={rating}
                                onSetStar={handleRating}
                            />
                        </span>
                        <p className="text-yellow-400">{quality[rating - 1]}</p>
                    </div>
                    <div className="p-2 rounded-sm">
                        <textarea
                            id=""
                            cols={30}
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Share more thoughts on the product to help other buyers"
                            className="border-2 rounded-sm border-gray-300 outline-none w-full p-2 mb-2"
                        />
                        <label
                            htmlFor="feedback_photo"
                            className="text-primary p-2 border-[1px] border-primary"
                        >
                            <i className="fa-solid fa-camera mr-2" />
                            Add Photo
                        </label>
                        <input
                            type="file"
                            id="feedback_photo"
                            className="hidden"
                            accept="image/jpeg, image/jpg, image/png"
                            name="images_feedback"
                            formEncType="multipart/form-data"
                            multiple
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setImagesFile(e.target.files);
                            }}
                        />
                        {imagesPreview && (
                            <div className="border-2 border-dashed rounded-lg p-4 flex flex-wrap items-center gap-4 mt-4">
                                {imagesPreview.map((imageFile, index) => (
                                    <Image
                                        key={index}
                                        src={imageFile}
                                        width={100}
                                        height={100}
                                        className="object-cover border-[1px] border-primary rounded-md"
                                        alt="Preview"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter className="!justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    {(description || imagesFile) && (
                        <Button
                            type="submit"
                            onClick={handleSubmitReview}
                            disabled={isPending}
                        >
                            Save {isPending && <Spinner />}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
