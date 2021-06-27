/* Utility functions for the News/Alerts system */


/* Retrieve from localStorage any news items that have been dismissed -- an array of IDs */
export const getDismissedNewsItems = () => {
    let parsedDismissedNews = [];
    let dismissedNewsString = window.localStorage.getItem('buyersGuideNewsDismissed') || [];
    try {
        parsedDismissedNews = JSON.parse(dismissedNewsString);
    } catch(e) { }

    return parsedDismissedNews;
}

/* Add the ID of a news item to localStorage to indicate that it has been dismissed (to not show it again) */
export const dismissNewsItem = id => {
    let parsedDismissedNews;
    let dismissedNewsString = window.localStorage.getItem('buyersGuideNewsDismissed') || '[]';
    
    try {
        parsedDismissedNews = JSON.parse(dismissedNewsString);
    } catch(e) {
        window.localStorage.removeItem('buyersGuideNewsDismissed');
    }

    if (parsedDismissedNews && parsedDismissedNews.length) {
        parsedDismissedNews.push(id);
        window.localStorage.setItem('buyersGuideNewsDismissed', JSON.stringify(parsedDismissedNews));
    } else {
        window.localStorage.setItem('buyersGuideNewsDismissed', JSON.stringify([id]));
    }

    
}

