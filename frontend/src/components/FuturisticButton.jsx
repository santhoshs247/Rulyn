import React from 'react';
import './FuturisticButton.css';

const FuturisticButton = ({
    children = "P L A Y",
    onClick,
    className = "",
    color = "#f97316",
    hoverColor = "#fbbf24"
}) => {
    return (
        <button
            className={`futuristic-btn ${className}`}
            onClick={onClick}
            style={{ '--btn-color': color, '--btn-hover-color': hoverColor }}
        >
            {children}
            <div className="futuristic-clip">
                <div className="futuristic-corner futuristic-leftTop"></div>
                <div className="futuristic-corner futuristic-rightBottom"></div>
                <div className="futuristic-corner futuristic-rightTop"></div>
                <div className="futuristic-corner futuristic-leftBottom"></div>
            </div>
            <span className="futuristic-arrow futuristic-rightArrow"></span>
            <span className="futuristic-arrow futuristic-leftArrow"></span>
        </button>
    );
};

export default FuturisticButton;
