import React from 'react';
import {categorizeRecentSearches} from '../../utils/recent-searches';

/* Rendered when a search has not yet been made or if the user has navigated to Recent Searches directly
    Shows the last 20 search queries. (mode, region, realm, item)
*/
const RecentSearches = props => {
    const {recentSearches, onRecentSearchSelect} = props;
    const truncatedSearches = recentSearches.slice(0,10);
    const categorizedSearches = categorizeRecentSearches(truncatedSearches);
    
    const renderRecentSearchButton = (searchDetails, key) => (
        <button
            key={key}
            className="results-item-button block mt-3 md:mt-1"
            onClick={() => onRecentSearchSelect(searchDetails)}
        >
            <div className="block md:flex">
                <div className="mr-1 underline text-left">
                    {`${searchDetails.itemName} (${searchDetails.itemId})`}
                </div>
                <div className="text-gray-500 text-left md:text-right flex-1 ml-0 md:ml-4" >
                    {searchDetails.serverSelection.label}-{searchDetails.regionSelection.label}
                </div>
            </div>
        </button>
    )

    const renderSearches = searches => searches.map((search, index) => {
        if (search && search.serverSelection && search.regionSelection
            && search.modeSelection && search.searchQuery
        ) {
            return renderRecentSearchButton(search, index);
        } else {
            return <div />;
        }
    })

    return (
        <div className="recent-searches-container multiple-results-container relative px-8 pb-8 pt-5" key="recent-searches">
            <div className="text-3xl text-white font-medium">
                <i className="fa fa-history mr-3" />
                Recent Searches
            </div>
            <div className="text-lg mb-3">
                The last 10 unique search queries you've made.
            </div>

            {/* Render Price Report searches */}
            {categorizedSearches.pSearches?.length &&
                <>
                    <div className="text-2xl text-white mt-10">
                        Price Reports
                    </div>
                    <div className="inline-flex flex-col">
                        {renderSearches(categorizedSearches.pSearches)}
                    </div>
                </>
            }

            {/* Render Buyer's Guide searches */}
            {!!categorizedSearches.bgSearches?.length &&
                <>
                    <div className="text-2xl text-white mt-10">
                        Buyer's Guides
                    </div>
                    <div className="inline-flex flex-col">
                        {renderSearches(categorizedSearches.bgSearches)}
                    </div>
                    
                </>
            }
        </div>
    );
}

export default RecentSearches;