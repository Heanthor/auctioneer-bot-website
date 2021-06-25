
import {recordRecentSearch} from '../utils/recent-searches';
import axios from 'axios';

const updateRecentSearches = (response, formValues) => {
    let recentSearch;
    if (response?.Data?.Root?.Item?.name && response?.Data?.Root?.Item?.id) {
        recentSearch = {
            regionSelection: formValues.regionSelection,
            serverSelection: formValues.serverSelection,
            modeSelection: formValues.modeSelection,
            searchQuery: response.Data.Root.Item.id,
            itemName: response.Data.Root.Item.name,
            itemId: response.Data.Root.Item.id
        }
        recordRecentSearch(recentSearch);
    }
}

export const getBuyersGuidePlus = (formValues, serviceMeta) => {
    /* eslint-disable no-unused-vars */
    const {
        regionSelection,
        serverSelection,
        modeSelection,
        searchQuery
    } = formValues;

    const {
        setLoading,
        setResponse,
        setErrored
    } = serviceMeta;
    /* eslint-enable no-unused-vars */
    
    
    setLoading(true);
    
    /* TODO: call the real API */
    

    /* These mock APIs can be deleted using the following links:
        https://designer.mocky.io/manage/delete/295ad3ed-ed1b-4978-9400-1a5c6eb37b11/HX2R9nShNYqiQCQ8EVqZd7Ksn5P81Q1gcWWa
        https://designer.mocky.io/manage/delete/f3fbdaaf-ab46-46e3-85df-dfabb1e77209/QqJnSYb4k6qjvdzrKY47mO8guaL4uU0lOpjt
        https://designer.mocky.io/manage/delete/596c1480-68b0-4747-bf41-34f5a897247d/0h5iCacyP7KIcYtUbYTlX4Z7UlBue2Lu9F2u
        https://designer.mocky.io/manage/delete/10884fb8-4c59-45fa-8dbb-ab579ef2a9ff/4CDnmWSnDqW4TvzQmSSNwJSR4u7A8nEOQmCO
        
    */

    const RECIPE_BOUNTIFUL = 'https://run.mocky.io/v3/295ad3ed-ed1b-4978-9400-1a5c6eb37b11';
    const PRICE_PALATABLE = 'https://run.mocky.io/v3/10884fb8-4c59-45fa-8dbb-ab579ef2a9ff';
    const SEARCH_CAPTAIN = 'https://run.mocky.io/v3/f3fbdaaf-ab46-46e3-85df-dfabb1e77209';
    const ERROR_NO_RESULTS = 'https://run.mocky.io/v3/596c1480-68b0-4747-bf41-34f5a897247d'


    const determineMockUrl = () => {
        switch (searchQuery?.toString()) {
            case "156526": return RECIPE_BOUNTIFUL;
            case "37811": return ERROR_NO_RESULTS;
            case "49771": return PRICE_PALATABLE;
            default: return SEARCH_CAPTAIN;
        }
    }

    axios.get(determineMockUrl())
        .then(response => {
            setResponse(response.data);
            updateRecentSearches(response.data, formValues);
        }).catch(error => {
            setErrored(error);
        }).finally(() => {
            setLoading(false);
        })

    /*
    mockApiCall(2500, searchQuery?.toString() === "156526" ? mockBountifulResponse : mockTruncatedResponse)
    */
}