import React from 'react'
import Recipe from './Recipe';


/* Builds the JSON object which represents the recipe tree. Eventually passed to react-hyper-tree */
const buildTree = data => {
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

const RecipeBuilder = props => {
    let [builtTree, setBuiltTree] = React.useState(null);
    let content = <div />;
    let builtTreeInfo;

    const {
        loading,
        errored,
        response
    } = props;

    if (response && !errored && !loading && !builtTree) {
        // Build the tree from the API response
        builtTreeInfo = buildTree(response);
        setBuiltTree(builtTreeInfo);
    }

    
    if (!response && !loading && !errored) {
        /* user has not executed a search yet */
        content = (
            <div className="w-full results-placeholder-container hidden xl:flex xl:flex-col">
                <div className="placeholder-flavor-head" />
                <div className="placeholder-flavor w-full" />
                <div className="placeholder-filler w-full flex justify-center" />
            </div>
        );
    } else if (!response && loading && !errored) {
        /* request is loading */
        content = (
            <div className="w-full results-placeholder-container hidden xl:flex xl:flex-col">
                <div className="placeholder-flavor-head" />
                <div className="placeholder-flavor w-full" />
                <div className="placeholder-filler w-full flex justify-center pt-16">
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <div className="sk-chase">
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 text-xl">
                            Loading ...
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (response && !errored && !loading && builtTree) {
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
                    key={/* TODO: Unique Recipe ID*/ ""}
                    recipeId="recipe_tree"
                    itemsCount={builtTree.itemsCount}
                />
            </>
        );
    }

    return content;
}

export default RecipeBuilder;