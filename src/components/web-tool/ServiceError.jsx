import React from 'react';

/* Rendered when an error is returned by the service */
const ServiceError = props => {
    const {error} = props;
    const message = error?.response?.data?.Message;

    /* Default error messages */
    let headerText = "oops.";
    let subHeaderText = "Something went wrong on our end."
    
    if (message === "No items found") {
        headerText = "No items found."
        subHeaderText = "We couldn't find anything matching that criteria."
    } else if (message?.toLowerCase().includes("unable to find tradable item with the name")) {
        headerText = "No tradable items found."
        subHeaderText = "We couldn't find anything tradable matching that criteria."
    } else if (message?.toLowerCase().includes("unable to find components for this item")) {
        headerText = "No recipes found."
        subHeaderText = "We couldn't find any components for this item. Are you sure it is crafted?"
    }
    
    else {
        headerText = "oops."
        subHeaderText = "Something went wrong on our end."
    }
    return (
        <div className="px-8 pb-8 pt-5">
            <div className="text-6xl font-medium mb-6 text-gray-700">
                {headerText}
            </div>
            <div className="text-2xl mb-3">
                {subHeaderText}
            </div>
        </div>
    );
}

export default ServiceError;