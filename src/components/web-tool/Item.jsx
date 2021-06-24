import React from 'react';
import FormattedGold from '../utility/FormattedGold';
import {ClipboardCopyIcon, ExternalLinkIcon} from '@heroicons/react/outline'
import {toast} from 'react-toastify';
import {mobileViewport} from '../../utils/generic-utils';

/* Show a toast message when the item name text has been successfully copied to clipboard */
const getToast = copyText => {
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(copyText).then(function() {
            toast.success(
                <div className="clipboard-toast-message">
                    Copied <tt>{copyText}</tt> to clipboard.
                </div>
            )
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }    
}

/* A single Item to be displayed in a Recipe */
const Item = props => {
    const {isRoot, hasComponents} = props;
    const {icon, name, id, IsVendored: isVendored} = props.itemInfo.Item;
    const {
        Quantity: quantity,
        AHPrice: auctionHousePrice,
        BGRecommendation: bgRecommendation,
        CheapestRecipe: cheapestRecipe,
    } = props.itemInfo;

    let craftedPrice, renderedPrice;
    if (cheapestRecipe) {
        craftedPrice = cheapestRecipe.ComponentPrice
    }

    /* Render the prices (crafting vs. buying) a la in-game WoW. e.g. {gold_icon}1 {silver_icon}50 {copper_icon}20 */
    renderedPrice = (
        <>
            {/* If the item is made up of components, show two prices: Buy and Craft */}
            {!isVendored && hasComponents &&
                <div className="flex items-center">

                    <div className={bgRecommendation === 'Buy'
                        ? "price-note mr-1 flex items-center line-through"
                        : "price-note mr-1 flex items-center"
                    }>
                        Craft:
                    </div>
                    <div className={bgRecommendation === 'Buy' ? 'line-through' : ''}>
                        <FormattedGold buyPrice={craftedPrice}/>
                    </div>
                </div>
            }

            {/* Strike-through the price that is not recommended (higher price) by Buyer's Guide */}
            <div className="flex items-center">
                <div className={bgRecommendation === 'Craft'
                    ? "price-note mr-1 flex items-center line-through"
                    : "price-note mr-1 flex items-center"
                }>
                    Buy:
                </div>
                <div className={bgRecommendation === 'Craft' ? 'line-through' : ''}>
                    <FormattedGold buyPrice={auctionHousePrice}/>
                </div>

                {/* Note next to the price if it comes from a vendor */}
                {isVendored && 
                    <div className="price-note ml-1 italic flex items-center">
                        (from vendor)
                    </div>
                }
                
            </div>
        </>
    );

    return (
        <div className="item-container">
            <div
                key={id}
                onClick={
                    () => mobileViewport()
                        && window.open(`https://www.wowhead.com/item=${id}`, '_blank')
                }
                className={bgRecommendation === 'Craft'
                    ? "item text-white item-dotted shadow-lg cursor-pointer sm:cursor-default mr-4 lg:mr-0"
                    : "item text-white item-solid shadow-lg cursor-pointer sm:cursor-default mr-4 lg:mr-0" 
                }
            >
                <div className="item-icon">
                    <img src={icon} alt="item-icon"/>
                </div>

                {/* Container for both the Name, Quantity, and Price of the item */}
                <div className="item-name-price">
                    <div>
                        <div className="item-name-container flex justify-between">
                            <div className="flex">
                                <div className="item-name" title={name}>{name}</div>
                                {!isRoot && 
                                    <div className="item-quantity ml-1 italic">
                                        x {quantity}
                                    </div>
                                }
                            </div>
                        </div>         
                    </div>
                    
                    <div className="item-price">
                        {renderedPrice}
                    </div>
                    
                </div>
                
                {/* Item "actions", i.e. open new tab to wowhead page for this item, and copy the name of the item to clipboard */}
                <div className="item-action-container hidden sm:flex">
                        <a
                            href={`https://www.wowhead.com/item=${id}`}
                            className="item-name-copy-container flex"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Wowhead"
                        >
                            <ExternalLinkIcon className="ml-1"/>
                        </a>
                        
                        <button
                            className="item-name-copy-container flex"
                            onClick={() => getToast(name)}
                            title="Copy Item Name to Clipboard"
                        >
                            <ClipboardCopyIcon className="ml-1"/>
                        </button>

                            
                </div>
            </div>
        </div>
    );
}

export default Item;