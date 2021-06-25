import React from 'react';
import moment from 'moment';
import {textIsGoldAmount, formatGold, sortedMarketValues} from '../../utils/item-utils';

/* Visual represenation of the Price Report */
const PriceReport = props => {
    const {data} = props;
    
    const {
        PriceResult: priceResult,
        DataLastRefreshed: dataLastRefreshed,
        Realm: realm
    } = data; 
    
    return (
        <div className="price-report px-4 py-2 lg:px-8 lg:py-6">
            <div className="item-name-container text-3xl mb-5 text-white flex items-center">
                <img src={priceResult.Icon} alt="item-icon"/>
                <div>
                    <div className="ml-3 font-medium">{priceResult.Name}</div>
                    <div className="ml-3 font-medium capitalize text-2xl text-gray-400">{realm.Realm}-<span className="uppercase">{realm.Region}</span></div>
                </div>
            </div>

            <div className="sm:flex sm:flex-wrap">
                {priceResult?.Results?.Results && sortedMarketValues(priceResult?.Results?.Results).map((result, index) => {
                    let priceObject = result.Value && formatGold(result.Value);

                    return (
                        <div key={index} className="value-container ml-4 p-4 mb-4 bg-dark">
                            <div className="font-medium capitalize">
                                {result.Title}
                            </div>
                            <div className="text-4xl text-white font-bold">
                                {textIsGoldAmount(result.DisplayValue)
                                    ? (
                                        <div>
                                            <span>{priceObject?.gold}</span>
                                            <span className="gold-abbreviation mr-3">g</span>
                                            <span>{priceObject?.silver}</span>
                                            <span className="gold-abbreviation mr-3">s</span>
                                            <span>{priceObject?.copper}</span>
                                            <span className="gold-abbreviation mr-3">c</span>
                                        </div>
                                    ) : (
                                        <div>{result.DisplayValue}</div>
                                    )
                                }
                            </div>
                        </div>
                    );
                })}

            </div>

            <div className="ml-4 mt-4">
                <em>(Data last updated {moment(dataLastRefreshed).fromNow()})</em>
            </div>
            
            


            
            
        </div>
    );
}

export default PriceReport