import React from 'react';
import RecipeBuilder from '../item-tree/RecipeBuilder';
import Header from '../home/Header';
import Footer from '../home/Footer';
import './WebTool.scss';
import SearchForm from '../search-tool/SearchForm';
import { PAGE_NAMES } from '../../utils/constants';


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
                        setLoading={setLoading}
                        setResponse={setResponse}
                        setErrored={setErrored}
                        loading={loading}
                    />
                    
                    <div className="item-tree mt-8 xl:mt-0 xl:flex-auto xl:flex xl:flex-col xl:justify-items-stretch">
                        <RecipeBuilder
                            loading={loading}
                            errored={errored}
                            response={response}
                        />
                    </div>

                    
                </div>
            </section>

            <Footer />
        </>
    );
}

export default WebTool;