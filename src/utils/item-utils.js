import {usServers, euServers, twServers, krServers} from './constants'

export const formatGold = copperAmount => ({
    gold: Math.floor(copperAmount / 10000),
    silver: Math.floor((copperAmount - 10000 * Math.floor(copperAmount / 10000)) / 100),
    copper: copperAmount % 100
})

export const buildMultipleResultsList = results => {
    return results.map(result => result.Item);
}

/* Builds the JSON object which represents the recipe tree. Eventually passed to react-hyper-tree */
export const buildTree = data => {
    let currentId = 1;
    let builtTree;

    // Recursively render the rest of the children
    const buildChildren = (recipe) => {
        return recipe.Components.map(recipeComponent => {
            currentId += 1;
            return recipeComponent.CheapestRecipe
                ? {
                    id: currentId,
                    name: {
                        itemInfo: recipeComponent,
                        isRoot: false,
                        hasComponents: true,
                    },
                    children: buildChildren(recipeComponent.CheapestRecipe),
                }
                : {
                    id: currentId,
                    name: {
                        itemInfo: recipeComponent,
                        isRoot: false,
                        hasComponents: false,
                    },
                }
        })
    };
    
    builtTree = {
        id: currentId,
        name: {
            itemInfo: data,
            isRoot: true,
            hasComponents: true,
        },
        children: data.CheapestRecipe.Components.map(recipeComponent => {
            currentId += 1;
            return recipeComponent.CheapestRecipe
                ? {
                    id: currentId,
                    name: {
                        itemInfo: recipeComponent,
                        isRoot: false,
                        hasComponents: true,
                    },
                    children: buildChildren(recipeComponent.CheapestRecipe),
                    otherName: recipeComponent.CheapestRecipe.recipeName
                }
                : {
                    id: currentId,
                    name: {
                        itemInfo: recipeComponent,
                        isRoot: false,
                        hasComponents: false,
                    },
                }
        })
    }

    return {
        formattedTree: builtTree,
        itemsCount: currentId
    }
    
};

/* Traverses the tree to find an item's Node, given the item's ID */
export const findTreeObject = (items, id) => {
    if (!items) { return; }
  
    for (const item of items) {
      if (item.id === id) { return item; }
  
      const child = findTreeObject(item.children, id);
      if (child) { return child; }
    }
}

export const getUrlParams = history => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    return Object.fromEntries(urlSearchParams.entries()); 
     
}

/* Add a url search param `?item={itemId}` if it is not already present */
export const updateUrlSearch = (history, formValues, rootItemId) => {
    const params = getUrlParams(history);
    if (
        (!params?.item || params.item !== rootItemId)
        && formValues?.modeSelection && formValues?.regionSelection?.value && formValues?.serverSelection?.value
    ) {
        history.replace({
            pathname: '/web-tool',
            search: 
                `?item=${
                    rootItemId
                }&mode=${
                    formValues.modeSelection
                }&region=${
                    formValues.regionSelection.value
                }&realm=${
                    formValues.serverSelection.value
                }`
        })
    }
}

/* Determine the initial values for the search form, prioritizing URL > Local Storage */
export const getInitialFormValues = (localStoragePreferences, history) => {
    const params = getUrlParams(history);
    const allServers = [...usServers, ...euServers, ...twServers, ...krServers];

    /* Default values */
    let values = {
        regionSelection: {label: "US", value: "US"},
        serverSelection: null,
        modeSelection: "p",
        searchQuery: ""
    };
    
    /* If all of the form values are available in the URL search params, initialize with those */
    if (params?.mode && params?.region && params?.realm && params?.item) {
        values = {
            regionSelection: {label: params.region, value: params.region},
            serverSelection: allServers.filter(server => server.value === params.realm)[0],
            modeSelection: params.mode,
            searchQuery: params.item,
        }
    }
    /* If form preferences are available in Local Storage, initialize with those */
    else if (
        localStoragePreferences?.preferredRegion && localStoragePreferences?.preferredServer
        && localStoragePreferences?.preferredMode
    ) {
        values = {
            regionSelection: localStoragePreferences.preferredRegion,
            serverSelection: localStoragePreferences.preferredServer,
            modeSelection: localStoragePreferences.preferredMode,
            searchQuery: "" /* search query deliberately not stored as a preference in localstorage */
        }
    }

    return values;    
}

export const canInitializeFromUrl = history => {
    const params = getUrlParams(history);
    return !!(params?.mode && params?.region && params?.realm && params?.item);
}

export const textIsGoldAmount = text => {
    return text.match(/\d+g \d+s \d+c/);
}

export const sortedMarketValues = values => {
    const lowestBuyout = values.filter(value => value.Title === "Lowest buyout price")[0];
    const twelfthPercentile = values.filter(value => value.Title === "12th percentile average price")[0];
    const averagePrice = values.filter(value => value.Title === "Average price")[0];
    const standardDeviation = values.filter(value => value.Title === "Standard deviation")[0];
    const marketSupply = values.filter(value => value.Title === "Market supply")[0];
    return [lowestBuyout, marketSupply, twelfthPercentile, averagePrice, standardDeviation];
}