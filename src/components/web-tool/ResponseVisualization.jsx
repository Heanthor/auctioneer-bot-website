import React from 'react'
import Recipe from './Recipe';
import {buildTree, buildMultipleResultsList} from '../../utils/item-utils';
import LoadingSpinner from '../utility/LoadingSpinner';
import MultipleResults from './MultipleResults';
import {getRecentSearches} from '../../utils/recent-searches';
import RecentSearches from './RecentSearches';
const ResponseVisualization = props => {
    const [builtTree, setBuiltTree] = React.useState(null);
    let content = <div />;
    let builtTreeInfo, builtMultipleResults;
    const recentSearches = getRecentSearches();

    const {
        loading,
        errored,
        response,
        handleSearchResultItemSelect,
        handleRecentSearchSelect
    } = props;

    /* If the response was successful, massage the data */
    if (response && !errored && !loading && !builtTree) {
        if (response?.Data?.Root) {
            builtTreeInfo = buildTree(response.Data.Root);
            setBuiltTree(builtTreeInfo);
        } else if (response?.Data?.TruncatedResults) {
            builtMultipleResults = buildMultipleResultsList(response.Data.TruncatedResults);
        }
    }

    /* Determine which visualization to render */
    if (!response && !loading && !errored && !recentSearches) {
        /* user has not executed a search yet */
        /* hidden on < desktop screens */
        content = (
            <div className="w-full results-placeholder-container hidden xl:flex xl:flex-col">
                <div className="placeholder-flavor-head" />
                <div className="placeholder-flavor w-full" />
                <div className="placeholder-filler w-full flex justify-center" />
            </div>
        );
    } else if (recentSearches && !response && !loading && !errored){
        /* user has not executed a search yet, but has recent searches to display  */
        /* hidden on < desktop screens */
        content = (
            <>
                <div className="absolute w-full">
                    <div className="results-placeholder-container hidden xl:flex xl:flex-col">
                        <div className="placeholder-flavor-head" />
                        <div className="placeholder-flavor w-full" />
                    </div>
                </div>
                <RecentSearches
                    recentSearches={recentSearches}
                    onRecentSearchSelect={handleRecentSearchSelect}
                />
            </>
        );
    } else if (!response && loading && !errored) {
        /* request is loading */
        /* hidden on < desktop screens */
        content = (
            <div className="w-full results-placeholder-container hidden xl:flex xl:flex-col">
                <div className="placeholder-flavor-head" />
                <div className="placeholder-flavor w-full" />
                <LoadingSpinner
                    containerClasses="placeholder-filler w-full flex justify-center pt-16"
                    loadingText="Loading ..."
                />
            </div>
        );
    } else if (response && !errored && !loading && builtTree && !response?.Data?.TruncatedResults) {
        /* request was successful with 1 (recipe) result */
        content = (
            <>
                <div className="absolute w-full">
                    <div className="results-placeholder-container hidden xl:flex xl:flex-col">
                        <div className="placeholder-flavor-head" />
                        <div className="placeholder-flavor w-full" />
                    </div>
                </div>
                <Recipe
                    data={builtTree.formattedTree}
                    recipeId="recipe_tree"
                    itemsCount={builtTree.itemsCount}
                />
            </>
        );
    } else if (response?.Data?.TruncatedResults && !loading && !errored) {
        /* Request was successful with multiple results. Prompt the user to select an item */
        content = (
            <>
                <div className="absolute w-full">
                    <div className="results-placeholder-container hidden xl:flex xl:flex-col">
                        <div className="placeholder-flavor-head" />
                        <div className="placeholder-flavor w-full" />
                    </div>
                </div>
                <MultipleResults
                    results={builtMultipleResults}
                    didTruncate={response.Data.DidTruncate}
                    numItemsQueried={response.Data.NumItemsQueried}
                    onItemSelect={handleSearchResultItemSelect}
                />
            </>
        );
    }

    return content;
}

export default ResponseVisualization;