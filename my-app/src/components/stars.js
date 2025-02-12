import React, { useMemo } from 'react';
import './stars.css';

const Stars = ({ count = 10 }) => {
    // Generate star positions once and memoize them
    const starPositions = useMemo(() => 
        Array.from({ length: count }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: Math.random() * 3+3
        })), [count]
    );

    return (
        <div className="stars-container">
            {starPositions.map((style, i) => (
                <svg 
                    key={i} 
                    className="parallax-star"
                    viewBox="0 0 24 24" 
                    style={style}
                >
                    <path d="M12 1L9 9L1 12L9 15L12 23L15 15L23 12L15 9L12 1Z" />
                </svg>
            ))}
        </div>
    );
};

export default Stars;