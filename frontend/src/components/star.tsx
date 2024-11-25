import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

export default function Star({
    n,
    star,
    onSetStar,
}: {
    n: number;
    star: number;
    onSetStar?: (start: number) => void;
}) {
    return (
        <>
            {Array.from({ length: n }, (_, index) => index).map((index) => (
                <FontAwesomeIcon
                    key={index}
                    icon={index < star ? fasStar : farStar}
                    className="text-yellow-400 hover:cursor-pointer"
                    onClick={() => {
                        if (onSetStar) {
                            onSetStar(index + 1);
                        }
                    }}
                />
            ))}
        </>
    );
}
