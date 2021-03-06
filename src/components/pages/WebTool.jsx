import React from 'react';
import ResponseVisualization from '../web-tool/ResponseVisualization';
import Header from '../home/Header';
import Footer from '../home/Footer';
import './WebTool.scss';
import SearchForm from '../search-tool/SearchForm';
import {PAGE_NAMES} from '../../utils/constants';
import {getBuyersGuidePlus} from '../../service/buyers-guide-service';
import {useHistory} from 'react-router-dom';
import {getInitialFormValues, canInitializeFromUrl, getLegendaryFromIdOrName} from '../../utils/item-utils';
import {mobileViewport} from '../../utils/generic-utils';
import {getRecentSearches} from '../../utils/recent-searches';


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
    const history = useHistory();
    const recentSearches = getRecentSearches();
    const initialValues = getInitialFormValues(preferences, history);
    const [regionSelection, setRegionSelection] = React.useState(initialValues.regionSelection);
    const [serverSelection, setServerSelection] = React.useState(initialValues.serverSelection);
    const [modeSelection, setModeSelection] = React.useState(initialValues.modeSelection);
    const [searchQuery, setSearchQuery] = React.useState(initialValues.searchQuery);
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [errored, setErrored] = React.useState(false);
    const [invalidSearchAttempted, setInvalidSearchAttempted] = React.useState(false);
    const [builtTree, setBuiltTree] = React.useState(null);
    const [needsInitializationFromUrl, setNeedsInitializationFromUrl] = React.useState(canInitializeFromUrl(history));
    const [userSelectingLegendary, setUserSelectingLegendary] = React.useState(false);

    const serviceMeta = {
        setLoading,
        setResponse,
        setErrored
    };

    React.useEffect(() => {
        /* If URL params were provided, immediately execute a search */
        if (needsInitializationFromUrl) {
            setNeedsInitializationFromUrl(false);
            handleSearch(null, null, initialValues);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    /* Execute a search against the API */
    const handleSearch = (event, itemDetails, searchDetails) => {
        let formValues;
        setBuiltTree(null);
        
        /* Determine where to gather the search criteria from -- i.e. URL or form fields*/

        /* If we are executing a search for something that is not currently in the form fields.
          e.g. search criteria from url params or from clicking on a Recent Search */
        if (searchDetails) {
            formValues = searchDetails;
        }
        /* Otherwise if all of the fields have been filled out */
        else if (regionSelection && serverSelection && modeSelection && searchQuery) {
            formValues = {
                regionSelection,
                serverSelection,
                modeSelection,
                searchQuery: itemDetails?.id ? itemDetails?.id : searchQuery
            };
        }

        /* If the search is for a Legendary, and they are not already picking between ranks of legendaries,
            dont execute a search. Instead a component for selecting ranks will be rendered.
        */
        if (formValues && ((getLegendaryFromIdOrName(formValues.searchQuery?.toString()) && !userSelectingLegendary && !searchDetails?.rank)
            || (userSelectingLegendary && !searchDetails?.rank))
        ) {
            !userSelectingLegendary && setUserSelectingLegendary(true);
            response && setResponse(null);
            !errored && setErrored(false);
            event?.preventDefault();
            return;
        }

        if (searchDetails || (regionSelection && serverSelection && modeSelection && searchQuery)) {
            /* Clear the currently stored API response */
            response && setResponse(null);
            setErrored(false);
            searchDetails?.rank && setUserSelectingLegendary(false);
            
            /* Call the API */
            getBuyersGuidePlus(formValues, serviceMeta);
            
            /* If on mobile, scroll down to where the user can see the results load */
            if (mobileViewport()) {
                let searchButtonElement = document.getElementById('search-button');
                searchButtonElement && searchButtonElement.scrollIntoView();
            }
            
            // Reset form validation
            setInvalidSearchAttempted(false);
        } else {
            /* Something's wrong with the user input, trigger field validation where necessary */
            setInvalidSearchAttempted(true);
        }

        event?.preventDefault();
    }

    /* User clicks on a result item option --> initialize all of the fields to execute that search.  */
    const handleResultItemSelect = searchDetails => {
        setRegionSelection(searchDetails.regionSelection);
        setServerSelection(searchDetails.serverSelection);
        setModeSelection(searchDetails.modeSelection);
        setSearchQuery(searchDetails.itemId);
        handleSearch(null, null, searchDetails);
    }
    
    if (needsInitializationFromUrl) {
        return <div />;
    }

    return (
        <>
            <Header pageName={PAGE_NAMES.WEB_TOOL} classNames="bg-header" />

            <section className="web-tool-container text-gray-400 body-font pt-0 sm:pt-8 lg:pt-0">
                <div className="container px-0 sm:px-5 lg:px-0 pt-0 sm:pt-5 lg:pt-0 mx-auto lg:mx-0 md:w-11/12 lg:w-full pb-16 lg:pb-0 lg:flex lg:max-w-none">
                    <SearchForm
                        regionSelection={regionSelection}
                        setRegionSelection={setRegionSelection}
                        serverSelection={serverSelection}
                        setServerSelection={setServerSelection}
                        setBuiltTree={setBuiltTree}
                        modeSelection={modeSelection}
                        setModeSelection={setModeSelection}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        loading={loading}
                        handleSearch={handleSearch}
                        invalidSearchAttempted={invalidSearchAttempted}
                        serviceMeta={serviceMeta}
                        recentSearches={recentSearches}
                        userSelectingLegendary={userSelectingLegendary}
                        setUserSelectingLegendary={setUserSelectingLegendary}
                    />
                    
                    <div
                        id="response-visualization"
                        className="response-visualization mt-8 lg:mt-0 lg:flex-auto lg:flex lg:flex-col lg:justify-items-stretch"
                    >
                        <ResponseVisualization
                            loading={loading}
                            errored={errored}
                            response={response}
                            handleResultItemSelect={handleResultItemSelect}
                            setBuiltTree={setBuiltTree}
                            builtTree={builtTree}
                            userSelectingLegendary={userSelectingLegendary}
                            formValues={{
                                regionSelection,
                                serverSelection,
                                modeSelection,
                                searchQuery
                            }}
                        />
                    </div>
                </div>
            </section>

            <Footer pageName={PAGE_NAMES.WEB_TOOL} shrinkOnDesktop />
        </>
    );
}

export default WebTool;