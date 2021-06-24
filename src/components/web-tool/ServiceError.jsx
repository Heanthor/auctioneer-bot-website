import React from 'react';

/* Rendered when an error is returned by the service */
const ServiceError = props => {
    const {error} = props;
    let message = error?.response?.data?.Message;
    let content = <div />;
    
    if (message === "No items found") {
        content = (
            <div className="px-8 pb-8 pt-5">
                <div className="text-6xl font-medium mb-6 text-gray-700">
                    No items found.
                </div>
                <div className="text-2xl mb-3">
                    We couldn't find anything matching that criteria.
                </div>
            </div>
        );
    } else {
        content = (
            <div className="px-8 pb-8 pt-5">
                <div className="text-8xl font-medium mb-6 text-gray-700">
                    oops.
                </div>
                <div className="text-2xl mb-3">
                    Something went wrong on our end.
                </div>
            </div>
        )
    }
    return content;
}

export default ServiceError;