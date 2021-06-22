import React from 'react';
import _ from 'lodash';

/* Rendered when there are multiple item results to choose from
    Prompts the user to select an item.
*/
const MultipleResults = props => {
    const {results, didTruncate, numItemsQueried, onItemSelect} = props;
    let alphabetizedResults = _.orderBy(results, ['name'],['asc']);
    let resultsCountMessage = didTruncate
        ? `Displaying ${results.length} out of (${numItemsQueried}) total results.`
        : `Found ${results.length} results.`
    
    return (
        <div className="multiple-results-container relative p-8">
            <div className="text-3xl text-white font-medium">
                {resultsCountMessage}
            </div>
            <div className="text-2xl mb-3">
                Select an item or refine your search query.
            </div>
            {alphabetizedResults.map((result, index) => {
                return (
                    <button
                        key={index}
                        className={`results-item-button rarity-${result.quality} block`}
                        onClick={() => onItemSelect({name: result.name, id: result.id})}
                    >
                        <span className="underline mr-1">{result.name}</span>
                        
                        <span className="text-gray-500">({result.id})</span>
                    </button>
                );
            })}
        </div>
    );
}

export default MultipleResults;