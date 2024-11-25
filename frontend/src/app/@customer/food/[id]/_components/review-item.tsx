import Star from "@/components/star";
import React from "react";
import ReviewImage from "./review-image";
import { FoodReview } from "@/services/food";

export default function ReviewItem({ review }: { review: FoodReview }) {
    return (
        <li className="flex gap-4 p-4">
            <div
                className="w-[30px] xs:w-[40px] h-[30px] xs:h-[40px] bg-white bg-center bg-cover rounded-[50px]"
                style={{
                    backgroundImage: `url(${review.user.avatar})`,
                }}
            />
            <div>
                <p>{review.user.fullName}</p>
                <div>
                    <Star n={5} star={review.rating}/>
                </div>
                <p className="text-gray-500 mb-2">
                    {new Date(review.createAt).toLocaleString()}
                </p>
                <p>{review.description}</p>
                {review.images && (
                    <div className="p-2 flex flex-wrap items-center gap-8 mt-2">
                        {review.images.map((image, index) => (
                            <div
                                key={index}
                                className="max-w-full h-auto border-[1px] border-primary rounded-md flex items-center"
                            >
                                <ReviewImage image={image} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}
