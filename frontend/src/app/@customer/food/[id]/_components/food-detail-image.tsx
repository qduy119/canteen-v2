"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function FoodDetailImage({
    images,
    thumbnail,
}: {
    images: string[];
    thumbnail: string;
}) {
    const [thumbImage, setThumbImage] = useState(() => ({
        curr: -1,
        thumb: thumbnail,
    }));

    function handleShowThumbnail({ tab, src }: { tab: number; src: string }) {
        setThumbImage({
            curr: tab,
            thumb: src,
        });
    }

    return (
        <div className="w-[100%] sm:w-[55%]">
            <div className="relative max-w-full h-[400px]">
                <Image
                    className="top-0 left-0 object-cover rounded-md"
                    fill={true}
                    src={thumbImage.thumb}
                    alt="Thumbnail"
                />
            </div>
            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 w-full">
                <Image
                    className={`${
                        thumbImage.curr === -1 ? "border-2 border-primary" : ""
                    } sm:w-[120px] sm:h-[80px] object-cover opacity-1 cursor-pointer hover:opacity-80 rounded-sm`}
                    src={thumbnail}
                    alt="Image"
                    width={80}
                    height={50}
                    onClick={() =>
                        handleShowThumbnail({ tab: -1, src: thumbnail })
                    }
                />
                {images?.map((image, index) => (
                    <Image
                        key={index}
                        className={`${
                            thumbImage.curr === index
                                ? "border-2 border-primary"
                                : ""
                        } sm:w-[120px] sm:h-[80px] object-cover opacity-1 cursor-pointer hover:opacity-80 rounded-sm`}
                        src={image}
                        alt="Image"
                        width={80}
                        height={50}
                        onClick={() =>
                            handleShowThumbnail({ tab: index, src: image })
                        }
                    />
                ))}
            </div>
        </div>
    );
}
