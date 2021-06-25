import React from 'react'
import Recipe from './Recipe';
import {buildTree, buildMultipleResultsList} from '../../utils/item-utils';
import LoadingSpinner from '../utility/LoadingSpinner';
import MultipleResults from './MultipleResults';
import {getRecentSearches} from '../../utils/recent-searches';
import RecentSearches from './RecentSearches';
import ServiceError from './ServiceError';
import PriceReport from './PriceReport';

const ResponseVisualization = props => {
    let content = <div />;
    let builtTreeInfo, builtMultipleResults;
    const recentSearches = getRecentSearches();

    const {
        loading,
        errored,
        response,
        handleSearchResultItemSelect,
        handleRecentSearchSelect,
        setBuiltTree,
        builtTree,
        formValues
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
        content = (
            <div />
        );
    } else if (recentSearches?.length && !response && !loading && !errored){
        /* user has not executed a search yet, but has recent searches to display  */
        /* hidden on < desktop screens */
        content = (
            <>
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
            <div className="w-full lg:flex lg:flex-col">
                <LoadingSpinner
                    containerClasses="placeholder-filler w-full flex justify-center pt-16"
                    loadingText="Searching ..."
                />
            </div>
        );
    } else if (response && !errored && !loading && builtTree
        && !response?.Data?.TruncatedResults
    ) {
        /* bg request was successful with 1 (recipe) result */
        content = (
            <>
                <Recipe
                    data={builtTree.formattedTree}
                    itemsCount={builtTree.itemsCount}
                    formValues={formValues}
                />
            </>
        );
    } else if (response?.Data?.PriceResult && response && !errored && !loading && response?.Data
        && !response?.Data?.TruncatedResults
    ) {
        /* p request was successful with 1 (item) result */
        content = (
            <>
                <PriceReport
                    data={response.Data}
                    formValues={formValues}
                />
            </>
        );
    } else if (response?.Data?.TruncatedResults && !loading && !errored && !builtTree) {
        /* Request was successful with multiple results. Prompt the user to select an item */
        content = (
            <>
                <MultipleResults
                    results={builtMultipleResults}
                    didTruncate={response.Data.DidTruncate}
                    numItemsQueried={response.Data.NumItemsQueried}
                    onItemSelect={handleSearchResultItemSelect}
                />
            </>
        );
    } else if (errored && !loading) {
        content = (
            <ServiceError error={errored} />
        )
    }

    return content;
}

export default ResponseVisualization;