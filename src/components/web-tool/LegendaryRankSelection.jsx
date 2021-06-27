import React from 'react';
import {getLegendaryFromIdOrName} from '../../utils/item-utils';

/* Allows the user to select a rank of a Legendary to search for */
const LegendaryRankSelection = props => {
    const {handleRankSelect, formValues} = props;

    let legendaryInfo = getLegendaryFromIdOrName(formValues?.searchQuery?.toString());
    const iLvls = [190, 210, 225, 235, 249, 262];

    return (
        <div className="multiple-results-container relative px-8 pb-8 pt-5 " key="multiple-results">
            <div className="text-lg mb-3 text-white">
                Select a rank of <span className="font-bold ml-1">{legendaryInfo.name}</span>.
            </div>

            <div className="inline-flex flex-col">
                {[1,2,3,4,5,6].map((rank, index) => {
                    return (
                        <button
                            key={index}
                            className={`results-item-button block mt-1`}
                            onClick={() => handleRankSelect({
                                rank: rank,
                                itemId: legendaryInfo.id,
                                itemName: legendaryInfo.name,
                                searchQuery: legendaryInfo.id,
                                ...formValues
                            })}
                        >
                            <div className="flex">
                                <div className="mr-1 result-item-name text-left p-2 flex">
                                    <div className="text-white mr-1">Rank {rank}</div>
                                    <div>- (ilvl {iLvls[rank - 1]})</div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LegendaryRankSelection