
import {recordRecentSearch} from '../utils/recent-searches';
import axios from 'axios';

const updateRecentSearches = (response, formValues) => {
    let recentSearch;
    
    /* Responses from !bg and !p are different and we have to pull values from them in separate ways */

    /* If this is a !bg respopnse and a single item was returned from the service (report generated) */
    if (response?.Data?.Root?.Item?.name && response?.Data?.Root?.Item?.id) {
        recentSearch = {
            regionSelection: formValues.regionSelection,
            serverSelection: formValues.serverSelection,
            modeSelection: formValues.modeSelection,
            searchQuery: response.Data.Root.Item.id,
            itemName: response.Data.Root.Item.name,
            itemId: response.Data.Root.Item.id
        }
    }
    /* Else if this is a !p resposne and a single item was returned from the service (report generated) */
    else if (response?.Data?.PriceResult?.ID && response?.Data?.PriceResult?.Name) {
        recentSearch = {
            regionSelection: formValues.regionSelection,
            serverSelection: formValues.serverSelection,
            modeSelection: formValues.modeSelection,
            searchQuery: response?.Data?.PriceResult?.ID,
            itemName: response?.Data?.PriceResult?.Name,
            itemId: response?.Data?.PriceResult?.ID
        }
    }

    recentSearch && recordRecentSearch(recentSearch);
}

// eslint-disable-next-line no-unused-vars
const buildServiceRequest = formValues => ({
    params: {
        rank: formValues.rank ? formValues.rank : undefined,
        item: formValues.searchQuery
    },
    config: {
        /* auth config */
    },
    url: `https://xzxtsoxvo7.execute-api.us-east-1.amazonaws.com/prod/api/v1/${
            formValues.serverSelection?.value
        }/${
            formValues.modeSelection === "p" ? 'price' : 'buyers-guide'
        }`
})

export const getBuyersGuidePlus = (formValues, serviceMeta) => {
    const {
        setLoading,
        setResponse,
        setErrored
    } = serviceMeta;
    
    setLoading(true);
    
    /* Mock API stuff for testing */
    /* These mock APIs can be deleted using the following links:
        https://designer.mocky.io/manage/delete/295ad3ed-ed1b-4978-9400-1a5c6eb37b11/HX2R9nShNYqiQCQ8EVqZd7Ksn5P81Q1gcWWa
        https://designer.mocky.io/manage/delete/596c1480-68b0-4747-bf41-34f5a897247d/0h5iCacyP7KIcYtUbYTlX4Z7UlBue2Lu9F2u
        https://designer.mocky.io/manage/delete/10884fb8-4c59-45fa-8dbb-ab579ef2a9ff/4CDnmWSnDqW4TvzQmSSNwJSR4u7A8nEOQmCO
        https://designer.mocky.io/manage/delete/20836e30-3b16-42c4-93ab-8603fe7057ee/9WHuOezFo6nRPviGdITaEI9b0RNkrItcNbUI
        https://designer.mocky.io/manage/delete/2cb0f95a-c47a-449b-bb3f-706783f6f88f/gtkZgJtOxzzfXsXfbvAW560xEuGtczcX4pdA
        https://designer.mocky.io/manage/delete/4fbe0869-dc1d-410c-9a8a-54ed8eead964/yNJ46BREhE6Ni2hX1EJyxlaIkQ0L4Lt4GNhm
        
    */

    const RECIPE_BOUNTIFUL = 'https://run.mocky.io/v3/295ad3ed-ed1b-4978-9400-1a5c6eb37b11';
    const PRICE_PALATABLE = 'https://run.mocky.io/v3/10884fb8-4c59-45fa-8dbb-ab579ef2a9ff';
    const SEARCH_CAPTAIN = 'https://run.mocky.io/v3/4fbe0869-dc1d-410c-9a8a-54ed8eead964';
    const ERROR_NO_RESULTS = 'https://run.mocky.io/v3/596c1480-68b0-4747-bf41-34f5a897247d';
    const RECIPE_LEGENDARY = 'https://run.mocky.io/v3/20836e30-3b16-42c4-93ab-8603fe7057ee';
    const PRICE_NO_AUCTIONS = 'https://run.mocky.io/v3/2cb0f95a-c47a-449b-bb3f-706783f6f88f';

    const determineMockUrl = () => {
        switch (formValues?.searchQuery?.toString()) {
            case "156526": return RECIPE_BOUNTIFUL;
            case "37811": return ERROR_NO_RESULTS;
            case "172042": return PRICE_PALATABLE;
            case "173244": return RECIPE_LEGENDARY;
            case "21990": return PRICE_NO_AUCTIONS;
            default: return SEARCH_CAPTAIN;
        }
    }
    
    /* build prod request */
    //const serviceRequest = buildServiceRequest(formValues);
    //axios.get(serviceRequest.url, serviceRequest.params, serviceRequest.config)

    /* build mock request  */
    axios.get(determineMockUrl())
        .then(response => {
            /* Some 'error' responses are not a 500, need to check if data is present */
            if (!response?.data) {
                setErrored({response});
            } else {
                setResponse(response.data);
                updateRecentSearches(response.data, formValues);
            }
        }).catch(error => {
            setErrored(error);
        }).finally(() => {
            setLoading(false);
        })
}