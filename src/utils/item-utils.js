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