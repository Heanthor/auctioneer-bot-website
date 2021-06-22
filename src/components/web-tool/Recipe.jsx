import React from 'react';
import Item from './Item';
import Tree, { useTreeState } from 'react-hyper-tree';
import {MinusCircleIcon} from '@heroicons/react/outline';
import {PlusCircleIcon} from '@heroicons/react/solid'
import {findTreeObject} from '../../utils/item-utils';

/* Renders a 'tree' of items for a recipe */
const Recipe = props => {
    const [initialized, setInitialized] = React.useState(false);
    const {data, recipeId, itemsCount} = props;
    const {required, handlers, instance} = useTreeState({
        data: data,
        defaultOpened: false,
        id: recipeId,
    })

    /* Given a constraint with react-hyper-tree, we're effectively forced to initially render the tree as
        completely collapsed. We iterate through each node to determine if it should be expanded. Items that
        are recommended to Craft should be expanded.
    */
    if (!initialized && instance.data && instance.data.length > 0) {
        for (let i = 1; i <= itemsCount; i++) {
            let node = findTreeObject(instance.enhancedData, i);
            let nodeData = handlers.getNodeData(i);
            if (nodeData && nodeData.name.isRoot && !node.options.opened) {
                handlers.setOpen(i);
            } else if (nodeData && nodeData.name && nodeData.name.itemInfo
                && nodeData.name.itemInfo.BGRecommendation === "Craft"
                && !node.options.opened
            ) {
                handlers.setOpen(i);
            }
        }
        setInitialized(true);
    }    

    const setNodeOpen = id => {
        setInitialized(true);
        handlers.setOpen(id)
    }

    return (
        <div className="xl:pt-8 xl:pl-8 pb-16">
            <Tree
                {...required}
                {...handlers}
                staticNodeHeight={70}
                renderNode={nodeData => {
                    let {itemInfo, isRoot, hasComponents} = nodeData.node.data.name;
                    let {opened} = nodeData.node.options;
                    
                    let id = nodeData.node.id;
                    return (
                        <div className="flex">
                            {hasComponents && !isRoot && (
                                <button className="expand-tree-icon-container" onClick={() => setNodeOpen(id)}>
                                    {opened && 
                                        <MinusCircleIcon className="ml-1 text-purple-400 expand-tree-icon"/>
                                    }
                                    {!opened && 
                                        <PlusCircleIcon className="ml-1 text-purple-400 expand-tree-icon"/>
                                    }
                                    </button>
                            )}
                            <Item
                                itemInfo={itemInfo}
                                isRoot={isRoot}
                                hasComponents={hasComponents}
                            />
                        </div>
                    );
                }}
                horizontalLineStyles={{
                    stroke: '#2d3748',
                    strokeWidth: 4,
                    
                }}
                verticalLineStyles={{
                        stroke: '#2d3748',
                        strokeWidth: 4,
                }}
                gapMode={"padding"}
                depthGap={60}
                disableLines={false}
                disableHorizontalLines={false}
                disableVerticalLines={false}
                verticalLineTopOffset={0}
                verticalLineOffset={35} 
            />
        </div>
        
    );
}

export default Recipe;