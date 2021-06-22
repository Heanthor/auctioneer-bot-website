import React from 'react';
import _ from 'lodash';

/* Rendered when a search has not yet been made or if the user has navigated to Recent Searches directly
    Shows the last 10 search queries. (mode, region, realm, item)
*/
const RecentSearches = props => {
    const {recentSearches, onRecentSearchSelect} = props;
    const truncatedSearches = recentSearches.slice(0,10).reverse();
    
    return (
        <div className="multiple-results-container relative p-8">
            <div className="text-3xl text-white font-medium">
                Recent Searches
            </div>
            <div className="text-2xl mb-3">
                The last 10 search queries you've made.
            </div>
            {truncatedSearches.map((search, index) => {
                if (search && search.serverSelection && search.regionSelection
                    && search.modeSelection && search.searchQuery
                ) {
                    return (
                        <button
                            key={index}
                            className={`results-item-button block`}
                            onClick={() => onRecentSearchSelect(search)}
                        >
                            <span className="mr-1">
                                <span className="mr-1">
                                    {search.modeSelection === "p"
                                        ? `Price Check: "${search.searchQuery}"`
                                        : `Buyer's Guide: "${search.searchQuery}"`
                                    }
                                    
                                </span>
                                
                            </span>
                            <span className="text-gray-500" >{search.serverSelection.label}-{search.regionSelection.label}</span>
                        </button>
                    );
                } else {
                    return <div />;
                }
                
            })}
        </div>
    );
}

export default RecentSearches;