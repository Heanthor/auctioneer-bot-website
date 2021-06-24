import React from 'react';
import {dismissNewsItem, getDismissedNewsItems} from '../../utils/news';
import _ from 'lodash';

/* Renders News/Alerts, handles dismissal/expiration of alerts */
const News = () => {
    /* Load dismissed news items from local storage */
    const [componentDismissedNewsItems, setComponentDismissedNewsItems] = React.useState(getDismissedNewsItems());
    const newsItemsToRender = [];


    /* When a news item is dissmised, we'll store that dismissal in LocalStorage so it doesn't
        show again the next time the page is loaded. We still need to dismiss from the component context so it takes effect immediately.
    */
    const handleDismiss = id => {
        let componentDismissed = _.cloneDeep(componentDismissedNewsItems);
        componentDismissed.push(id);
        setComponentDismissedNewsItems(componentDismissed);
        dismissNewsItem(id);
    };

    const newsItemIsDismissed = id => {
        if (componentDismissedNewsItems) {
            return componentDismissedNewsItems.filter(newsId => newsId === id).length;
        } else {
            return false;
        }
    }

    const newsItems = [
        {
            id: 42721,
            expireOn: new Date('06/25/21'),
            content: 
                <section className="text-white bg-gray-900 body-font pt-8">
                    <div className="lg:w-2/3 w-full mx-auto">
                    <div className="bg-purple-700 border-t-4 border-purple-900 rounded-b px-4 py-3 shadow-md" role="alert">
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="px-3 mr-5 bg-purple-900 rounded-lg flex items-center ">
                                    <i className="fas fa-bullhorn" />
                                </div>
                                <div>
                                    <p className="font-bold">4/28/21</p>
                                    <p className="text-sm">Some vendor prices were updated, recipes like Codex of the Still Mind are much more accurate now.</p>
                                </div>
                            </div>

                            <div className="flex items-center ml-2">
                                <button
                                    onClick={() => handleDismiss(42721)}
                                    className="bg-white hover:bg-gray-400 text-purple-800 py-2 px-4 bold font-semibold rounded inline-flex items-center max-h-9"
                                >
                                    
                                    <span>Nice</span>
                                    <i className="fas fa-check ml-2" />
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
        }
    ];

    let today = new Date();

    /* Gather all of the news that has not been dismissed and has not expired */
    newsItems.forEach(newsItem => {
        if (!newsItemIsDismissed(newsItem.id) && today < newsItem.expireOn) {
            newsItemsToRender.push(newsItem.content);
        }
    })

    return (
        <div>
            {newsItemsToRender.map(newsItem => newsItem)}
        </div>
    );
}

export default News;