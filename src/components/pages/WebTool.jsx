import React from 'react';
import ResponseVisualization from '../web-tool/ResponseVisualization';
import Header from '../home/Header';
import Footer from '../home/Footer';
import './WebTool.scss';
import SearchForm from '../search-tool/SearchForm';
import { PAGE_NAMES } from '../../utils/constants';
import {getBuyersGuidePlus} from '../../service/buyers-guide-service';
import {recordRecentSearch} from '../../utils/recent-searches';

/* Retrieve preferences from Local Storage */
const getPreferences = () => {
    try {
        let stringifiedPreferences = window.localStorage.getItem('webToolPreferences') || {};
        return JSON.parse(stringifiedPreferences);
    } catch { return {} }
}

/* The 'web tool' page. Allows users to interact with the API through a web interface rather than the discord bot. */
const WebTool = () => {
    const preferences = getPreferences();
    const [regionSelection, setRegionSelection] = React.useState(preferences.preferredRegion || {label: "US", value: "US"});
    const [serverSelection, setServerSelection] = React.useState(preferences.preferredServer || undefined);
    const [modeSelection, setModeSelection] = React.useState(preferences.preferredMode || "p");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [errored, setErrored] = React.useState(false);
    const [invalidSearchAttempted, setInvalidSearchAttempted] = React.useState(false);

    const handleSearch = (event, itemDetails, searchDetails) => {

        let formValues;
        
        if (searchDetails) {
            formValues = searchDetails;
        } else if (regionSelection && serverSelection && modeSelection && searchQuery) {
            formValues = {
                regionSelection,
                serverSelection,
                modeSelection,
                searchQuery: itemDetails?.id ? itemDetails?.id : searchQuery
            };
        }

        if (searchDetails || (regionSelection && serverSelection && modeSelection && searchQuery)) {
            
            /* Clear the currently stored API response */
            response && setResponse(null);

            const serviceMeta = {
                setLoading,
                setResponse,
                setErrored
            };
            
            recordRecentSearch(formValues);
            getBuyersGuidePlus(formValues, serviceMeta);

            // Reset form validation
            setInvalidSearchAttempted(false);
        } else {
            /* Something's wrong with the user input, trigger field validation where necessary */
            setInvalidSearchAttempted(true);
        }

        event?.preventDefault();
    }

    const handleRecentSearchSelect = searchDetails => {
        setRegionSelection(searchDetails.regionSelection);
        setServerSelection(searchDetails.serverSelection);
        setModeSelection(searchDetails.modeSelection);
        setSearchQuery(searchDetails.searchQuery);
        handleSearch(null, null, searchDetails);
    }

    const handleSearchResultItemSelect = itemDetails => {
        handleSearch(null, itemDetails);
        /* Have search query input's value updated to the selected item's name */
        setSearchQuery(itemDetails?.id || "");
    }
    
    return (
        <>
            <Header pageName={PAGE_NAMES.WEB_TOOL} classNames="bg-header" />

            <section className="web-tool-container text-gray-400 bg-gray-900 body-font pt-8 xl:pt-0">
                <div className="container xl:w-full px-5 xl:px-0 pt-5 xl:pt-0 mx-auto xl:mx-0 lg:w-3/4 mb-16 xl:mb-0 xl:flex xl:max-w-none">
                    
                    <SearchForm
                        regionSelection={regionSelection}
                        setRegionSelection={setRegionSelection}
                        serverSelection={serverSelection}
                        setServerSelection={setServerSelection}
                        modeSelection={modeSelection}
                        setModeSelection={setModeSelection}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        loading={loading}
                        handleSearch={handleSearch}
                        invalidSearchAttempted={invalidSearchAttempted}
                    />
                    
                    <div className="item-tree mt-8 xl:mt-0 xl:flex-auto xl:flex xl:flex-col xl:justify-items-stretch">
                        <ResponseVisualization
                            loading={loading}
                            errored={errored}
                            response={response}
                            handleSearchResultItemSelect={handleSearchResultItemSelect}
                            handleRecentSearchSelect={handleRecentSearchSelect}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default WebTool;