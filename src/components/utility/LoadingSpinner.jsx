import React from 'react';

const LoadingSpinner = props => {
    const {loadingText, containerClasses} = props;
    return (
        <div className={containerClasses}>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                </div>
                {loadingText && 
                    <div className="flex justify-center mt-8 text-xl">
                        {loadingText}
                    </div>
                }
            </div>
        </div>
    );
}

export default LoadingSpinner;