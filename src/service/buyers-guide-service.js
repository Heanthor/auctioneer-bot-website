
import {mockBountifulResponse, mockTruncatedResponse} from '../mockData'
import {recordRecentSearch} from '../utils/recent-searches';

const mockApiCall = (t, v) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
}

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

    console.log(formValues);

    const {
        setLoading,
        setResponse,
        setErrored
    } = serviceMeta;
    /* eslint-enable no-unused-vars */

    setLoading(true);
    
    /* TODO: call the API */

    mockApiCall(2500, searchQuery === 156526 ? mockBountifulResponse : mockTruncatedResponse)
        .then(response => {
            setResponse(response);
            updateRecentSearches(response, formValues);
        }).catch(error => {
            setErrored(error);
        }).finally(() => {
            setLoading(false);
        })
}