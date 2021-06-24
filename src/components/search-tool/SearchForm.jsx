import React from 'react';
import Select from 'react-select';
import {
    regions,
    euServers,
    usServers,
    twServers,
    krServers
} from '../../utils/constants';
import LoadingSpinner from '../utility/LoadingSpinner';
import ReactTooltip from "react-tooltip";

/* Customization (theming) for react-select */
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#0b0f19",
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        borderColor: state.isFocused ? "#5878b6" : "#1f2c47",
        color: "#fff",
        "&:hover": {
            borderColor: "#5878b6"
        }
    }),
    input: base => ({
        ...base,
        color: "#fff"
    }),
    menu: base => ({
      ...base,
      color: '#000',
      zIndex: 3
    }),
    menuList: base => ({
      ...base,
      padding: 0
    }),
    singleValue: base => ({
        ...base,
        color: "#fff"
    }),
    placeholder: base => ({
        ...base,
        color: "#fff"
    }),
    indicatorSeparator: base => ({
        ...base,
        backgroundColor: "#1f2c47"
    })
};

const SearchTool = props => {
    
    const {
        regionSelection,
        setRegionSelection,
        serverSelection,
        setServerSelection,
        setBuiltTree,
        modeSelection,
        setModeSelection,
        searchQuery,
        setSearchQuery,
        loading,
        handleSearch,
        invalidSearchAttempted,
        serviceMeta
    } = props;
    
    const serverOptions = () => {
        let regionMap = {
            "US": usServers,
            "EU": euServers,
            "KR": krServers,
            "TW": twServers
        }
        return regionMap[regionSelection?.value];
    }

    const handleRegionChange = region => {
        setRegionSelection(region);
        setServerSelection(null)
    }

    const handleRecentSearchesClick = () => {
        serviceMeta.setResponse(null);
        setBuiltTree(null);
        serviceMeta.setErrored(false);
    }

    /* Store Region/Server/Mode selection in Local Storage */
    React.useEffect(() => {
        window.localStorage.setItem('webToolPreferences', JSON.stringify({
            preferredRegion: regionSelection,
            preferredServer: serverSelection,
            preferredMode: modeSelection
        }))
    }, [regionSelection, serverSelection, modeSelection]);

    React.useEffect(() => {
        if (document?.activeElement?.id !== "search-query-input") {
            let searchQueryInputElement = document.getElementById("search-query-input");
            searchQueryInputElement.value = searchQuery;
        }
    }, [searchQuery]);

    return (
        <div className="search-form w-full">
            <form autoComplete="off" className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSearch}>
        
                <input autoComplete="false" name="hidden" type="text" style={{display:'none'}} />
                <input type="submit" style={{display:'none'}} />

                {/* Mode Select (radio group) */}
                <div className="mb-8">
                    <div className="flex items-center mb-2">
                        <label className="block text-white text-xl font-bold" htmlFor="select-mode">
                            Mode
                        </label>
                        
                        <div className="hidden lg:block xl:hidden">
                            {/* An info-circle icon that can be hovered over */}
                            <span data-tip>
                                <i className="gold-info-icon fas fa-info-circle text-white ml-2"/>
                            </span>

                            {/* The contents of the tooltip itself */}
                            <ReactTooltip
                                place="right"
                                className='info-tooltip-content'
                                effect="solid"
                            >
                                <div>
                                    <div className="font-bold"><u>Price Report:</u></div>
                                    <div>Get key stats and information on any item on the Auction House.</div>
                                    <div className="font-bold mt-2"><u>Buyer's Guide:</u></div>
                                    <div>Every item in a craftable item's recipe and item in the those item's recipes and so on.</div>
                                </div>
                            </ReactTooltip>

                        </div>

                    </div>
                    <div className="radio-selection">
                        <section>
                            <div>
                                <input
                                    type="radio"
                                    id="control_01"
                                    name="select-mode"
                                    value="1"
                                    checked={modeSelection === "p"}
                                    onChange={() => setModeSelection("p")}
                                />
                                <label htmlFor="control_01">
                                    <div className="font-semibold">Price Report</div>
                                    <div className="radio-subtext block lg:hidden xl:block">
                                        Get key stats and information on any item on the Auction House.
                                    </div>
                                </label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="control_02"
                                    name="select-mode"
                                    value="2"
                                    checked={modeSelection === "bg"}
                                    onChange={() => setModeSelection("bg")}
                                />
                                <label htmlFor="control_02">
                                    <div className="font-semibold">Buyer's Guide</div>
                                    <div className="radio-subtext block lg:hidden xl:block">
                                        Every item in a craftable item's recipe and item in the those item's recipes and so on.
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>
                </div>
                
                {/* Region/Realm Select */}
                <div className=" flex">
                    <div className="w-24 mr-8">
                        <label className="block text-white text-xl font-bold mb-2" htmlFor="region">
                            Region
                        </label>
                        <Select
                            styles={customStyles}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="region"
                            options={regions}
                            value={regionSelection}
                            onChange={handleRegionChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-white text-xl font-bold mb-2" htmlFor="realm">
                            Realm
                        </label>
                        <Select
                            styles={customStyles}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="realm"
                            isDisabled={!regionSelection}
                            options={serverOptions()}
                            value={serverSelection}
                            onChange={s => setServerSelection(s)}

                        />
                        
                        <div className="field-validation-container text-red">
                            {invalidSearchAttempted && !serverSelection && 
                                <div>Select a Realm.</div>
                            }
                        </div>
                    </div>
                </div>
                
                {/* Search Input */}
                <div className="mb-4">
                    <label className="block text-white text-xl font-bold mb-2" htmlFor="search-query">
                        Item Name/ID
                    </label>
                    <div className="flex">
                        <div className="search-icon-container">
                            <i className="fas fa-search" />
                        </div>
                        <input
                            className="search-query w-full"
                            id="search-query-input"
                            type="text"
                            name="search-query"
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="field-validation-container text-red">
                        {invalidSearchAttempted && !searchQuery && 
                            <div>Provide an Item Name/ID.</div>
                        }
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-center justify-between flex-wrap">
                    <button
                        type="button"
                        id="search-button"
                        className="search-button inline-flex text-white bg-purple-700 border-0 px-6 focus:outline-none hover:bg-purple-600 rounded h-12 content-center flex justify-center flex-1 sm:flex-none lg:flex-1 xl:flex-none"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {/* < desktop */}
                        <span className="my-auto lg:hidden">Search</span>

                        {/* >= desktop */}
                        <span className="my-auto hidden lg:inline">
                            {loading ? 'Searching ...' : 'Search'}
                        </span>

                        {loading && /* On < desktop screen size, show a spinner in the button when loading */
                            <div className="my-auto ml-2 mx-0 lg:hidden">
                                <LoadingSpinner
                                    containerClasses="button-spinner w-full flex justify-center color-white"
                                />
                            </div>
                        }
                    </button>
                    <button
                        type="button"
                        className="recent-searches-button text-white py-2 px-3 flex-1 sm:flex-none lg:flex-1 xl:flex-none ml-0 sm:ml-4 lg:ml-0 xl:ml-4 mt-4 sm:mt-0 lg:mt-4 xl:mt-0"
                        onClick={handleRecentSearchesClick}
                    >
                        <i className="fa fa-history mr-2" />
                        <span className="underline">Recent Searches</span>
                    </button>
                </div>
            </form>
        </div>

    );
}

export default SearchTool;