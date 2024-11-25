"use client"

import React, { useState } from "react";
import ReviewItem from "./review-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke as fasStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke as farStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { FoodReview as Review } from "@/services/food";

export default function FoodReview({
    reviews,
    rating,
}: {
    reviews: Review[];
    rating: number;
}) {
    const [filterRating, setFilterRating] = useState(0);

    function handleFilter(index: number) {
        if (index === 0) {
            setFilterRating(index);
        } else {
            setFilterRating(6 - index);
        }
    }

    return (
        <div className="p-4 rounded-md">
            {reviews.length === 0 ? (
                <p className="text-center">
                    <i className="fa-solid fa-circle-exclamation mr-2" />
                    No rating
                </p>
            ) : (
                <div>
                    <div className="bg-[#f4fffb] border-[1px] border-[effff8] rounded-sm flex gap-4 md:gap-10 p-4 xs:p-8 mb-4">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-primary text-base xs:text-xl w-max">
                                <span className="text-2xl xs:text-4xl">{`${rating}`}</span>{" "}
                                out of 5
                            </p>
                            <div className="w-max">
                                {Array.from(
                                    { length: 5 },
                                    (_, index) => index
                                ).map((index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={
                                            index < rating
                                                ? rating - index > 0 &&
                                                  rating - index < 1
                                                    ? fasStarHalfStroke
                                                    : fasStar
                                                : rating - index > 0 &&
                                                  rating - index < 1
                                                ? farStarHalfStroke
                                                : farStar
                                        }
                                        className="text-primary mr-[2px]"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 items-center flex-wrap">
                            {Array.from({ length: 6 }, (e, i) => i).map(
                                (index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`bg-white w-[90px] h-[30px] border-[1px] rounded-sm ${
                                            (filterRating === 0 &&
                                                index === 0) ||
                                            filterRating === 6 - index
                                                ? "border-primary"
                                                : ""
                                        }`}
                                        onClick={() => handleFilter(index)}
                                    >
                                        {index === 0
                                            ? "All"
                                            : `${6 - index} Star (${
                                                  filterReview(
                                                      reviews,
                                                      6 - index
                                                  ).length
                                              })`}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                    <ul>
                        {filterReview(reviews, filterRating).length === 0 ? (
                            <li className="min-h-[140px] flex justify-center items-center">
                                <p className="text-center">
                                    <i className="fa-solid fa-circle-exclamation mr-2" />
                                    No rating
                                </p>
                            </li>
                        ) : (
                            filterReview(reviews, filterRating).map(
                                (review, index) => (
                                    <ReviewItem key={index} review={review} />
                                )
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

function filterReview(reviews: Review[], tier: number) {
    if (tier === 0) return reviews;
    return reviews.filter((review) => review.rating === tier);
}
