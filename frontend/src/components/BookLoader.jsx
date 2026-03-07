import React from 'react';
import './BookLoader.css';

const BookLoader = ({ scale = 1, className = "" }) => {
    return (
        <div
            className={`book-loader-container ${className}`}
            style={{ transform: `scale(${scale})` }}
        >
            <div className="book-loader"></div>
            <div className="book-loader"></div>
            <div className="book-loader"></div>
        </div>
    );
};

export default BookLoader;
