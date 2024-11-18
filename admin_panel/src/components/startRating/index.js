import React from "react";

const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div>
            {[...Array(totalStars)].map((_, index) => (
                <i
                    key={index}
                    className={`fe-star fs-4 ${index < rating ? "text-warning" : "text-muted"}`}
                    style={{ marginRight: "2px" }}
                />
            ))}
        </div>
    );
};

export default StarRating;
