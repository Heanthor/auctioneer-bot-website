import {formatGold} from '../../utils/item-utils';

/* Converts an integer buyPrice (in copper) to an element mimicing the WoW display of Gold/Silver/Copper */
const FormattedGold = props => {
    const {buyPrice} = props;
    let formattedGold = formatGold(buyPrice);

    return (
        <div className="formatted-gold-container">        
            <div className="mr-1/2">{formattedGold.gold}</div>   
            <img src="https://wow.zamimg.com/images/icons/money-gold.gif" alt="gold" />
            <div className="mr-1/2">{formattedGold.silver}</div>
            <img src="https://wow.zamimg.com/images/icons/money-silver.gif" alt="silver" />
            <div className="mr-1/2">{formattedGold.copper}</div>
            <img src="https://wow.zamimg.com/images/icons/money-copper.gif" alt="copper" />
        </div>
    );
}

export default FormattedGold;