import React from 'react';
import './PerspectiveLoader.css';

const PerspectiveLoader = ({ text = "EXPERIENCE", size = "4em", className = "" }) => {
    return (
        <div
            className={`perspective-loader ${className}`}
            style={{ '--main-size': size }}
        >
            {[...Array(9)].map((_, i) => (
                <div key={i} className="perspective-text">
                    <span>{text}</span>
                </div>
            ))}
            <div className="perspective-line"></div>
        </div>
    );
};

export default PerspectiveLoader;
