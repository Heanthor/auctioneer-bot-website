import _ from 'lodash';

/* Utility functions for the recent searches report */

/* Categorize searches by mode */
export const categorizeRecentSearches = searches => {
    return {
        pSearches: searches.filter(search => search.modeSelection === 'p'),
        bgSearches: searches.filter(search => search.modeSelection === 'bg'),
    }
}

/* Retrieve from localStorage any recent searches, an array of objects */
export const getRecentSearches = () => {
    let parsedRecentSearches = [];
    let recentSearchesString = window.localStorage.getItem('recentSearches') || [];
    try {
        parsedRecentSearches = JSON.parse(recentSearchesString);
    } catch(e) { }

    return parsedRecentSearches;
}

/* Add a recent search (object) to localStorage */
export const recordRecentSearch = searchDetails => {
    let parsedRecentSearches;
    let recentSearchesString = window.localStorage.getItem('recentSearches') || '[]';

    if (!searchDetails) {
        return;
    }

    try {
        parsedRecentSearches = JSON.parse(recentSearchesString);
    } catch(e) {
        /* Something is wrong with the stringified json -- purge it */
        window.localStorage.removeItem('recentSearches');
    }

    /* If there are recent searches, ensure we don't duplicate any before recording */
    if (parsedRecentSearches && parsedRecentSearches.length) {
        /* Remove duplicate searches to this one */
        parsedRecentSearches = parsedRecentSearches.filter(recentSearchDetails => !_.isEqual(searchDetails, recentSearchDetails));
        /* Push to beginning. Slice off the last (least recent) search. */
        parsedRecentSearches.unshift(searchDetails);
        parsedRecentSearches = parsedRecentSearches.slice(0,10);
        window.localStorage.setItem('recentSearches', JSON.stringify(parsedRecentSearches));
    } else {
        window.localStorage.setItem('recentSearches', JSON.stringify([searchDetails]));
    }

    
}

