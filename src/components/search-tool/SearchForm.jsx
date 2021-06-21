import React from 'react';
import Select from 'react-select';
import {
    regions,
    euServers,
    usServers,
    twServers,
    krServers
} from '../../utils/constants';
import {getBuyersGuidePlus} from '../../service/buyers-guide-service';

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
      // kill the white space on first and last option
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
        modeSelection,
        setModeSelection,
        searchQuery,
        setSearchQuery,
        setLoading,
        setResponse,
        setErrored,
        loading
    } = props;
    
    
    const [invalidSearchAttempted, setInvalidSearchAttempted] = React.useState(false);

    const serverOptions = () => {
        let regionMap = {
            "US": usServers,
            "EU": euServers,
            "KR": krServers,
            "TW": twServers
        }
        return regionMap[regionSelection.value];
    }

    const handleRegionChange = region => {
        setRegionSelection(region);
        setServerSelection(null)
    }

    const handleSearchClick = event => {
        if (regionSelection && serverSelection && modeSelection && searchQuery) {
            
            /* Clear the currently stored API response */
            setResponse(null);
            
            const formValues = {
                regionSelection,
                serverSelection,
                modeSelection,
                searchQuery
            };

            const serviceMeta = {
                setLoading,
                setResponse,
                setErrored
            };

            getBuyersGuidePlus(formValues, serviceMeta);

            // Reset form validation
            setInvalidSearchAttempted(false);
        } else {
            /* Something's wrong with the user input, trigger field validation where necessary */
            setInvalidSearchAttempted(true);
        }

        event.preventDefault();
    }

    /* Store Region/Server/Mode selection in Local Storage */
    React.useEffect(() => {
        window.localStorage.setItem('webToolPreferences', JSON.stringify({
            preferredRegion: regionSelection,
            preferredServer: serverSelection,
            preferredMode: modeSelection
        }))
     }, [regionSelection, serverSelection, modeSelection]);

    return (
        <div className="search-form w-full">
            <form autoComplete="off" className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSearchClick}>
        
                <input autoComplete="false" name="hidden" type="text" style={{display:'none'}} />
                <input type="submit" style={{display:'none'}} />

                {/* Mode Select (radio group) */}
                <div className="mb-8">
                    <label className="block text-white text-xl font-bold mb-2" htmlFor="select-mode">
                        Mode
                    </label>
                    <div className="radio-selection">
                        <section>
                            <div>
                                <input type="radio" id="control_01" name="select-mode" value="1" checked={modeSelection === "p"} onChange={() => setModeSelection("p")} />
                                <label htmlFor="control_01">
                                    <div className="font-semibold">Price Report</div>
                                    <div className="radio-subtext">
                                        Get key stats and information on any item on the Auction House.
                                    </div>
                                </label>
                            </div>
                            <div>
                                <input type="radio" id="control_02" name="select-mode" value="2" checked={modeSelection === "bg"} onChange={() => setModeSelection("bg")}/>
                                <label htmlFor="control_02">
                                    <div className="font-semibold">Buyer's Guide</div>
                                    <div className="radio-subtext">
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
                        Search Query
                    </label>
                    <div className="flex">
                        <div className="search-icon-container">
                            <i className="fas fa-search" />
                        </div>
                        <input
                            className="search-query w-full"
                            type="text"
                            name="search-query"
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="field-validation-container text-red">
                        {invalidSearchAttempted && !searchQuery && 
                            <div>Provide a Search Query.</div>
                        }
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="search-button inline-flex text-white bg-purple-700 border-0 px-6 focus:outline-none hover:bg-purple-600 rounded h-12 content-center flex justify-center mr-3"
                        onClick={handleSearchClick}
                        disabled={loading}
                    >
                        <p className="my-auto">Search</p>
                    </button>
                </div>
            </form>
        </div>

    );
}

export default SearchTool;