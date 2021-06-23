import React from 'react';
import _ from 'lodash';

/* Rendered when there are multiple item results to choose from
    Prompts the user to select an item.
*/
const MultipleResults = props => {
    const {results, didTruncate, numItemsQueried, onItemSelect} = props;
    console.log(results);
    let alphabetizedResults = _.orderBy(results, ['name'],['asc']);
    let resultsCountMessage = didTruncate
        ? `Displaying ${results.length} out of (${numItemsQueried}) total results.`
        : `Found ${results.length} results.`
    
    return (
        <div className="multiple-results-container relative px-8 pb-8 pt-5" key="multiple-results">
            <div className="text-3xl text-white font-medium">
                {resultsCountMessage}
            </div>
            <div className="text-2xl mb-3">
                Select an item or refine your search query.
            </div>
            <div className="inline-flex flex-col">
                {alphabetizedResults.map((result, index) => {
                    return (
                        <button
                            key={index}
                            title={`${result.name} (${result.id})`}
                            className={`results-item-button rarity-${result.quality} block`}
                            onClick={() => onItemSelect({name: result.name, id: result.id})}
                        >
                            <div className="flex">
                                <div className="underline mr-1 result-item-name text-left text-white" >{result.name}</div>
                                <div className="text-gray-500 ml-2 text-right flex-1">({result.id})</div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default MultipleResults;