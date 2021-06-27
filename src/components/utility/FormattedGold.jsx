import {formatGold} from '../../utils/item-utils';
import GoldCoin from '../../resources/gold_coin.svg';
import SilverCoin from '../../resources/silver_coin.svg';
import CopperCoin from '../../resources/copper_coin.svg';

/* Converts an integer buyPrice (in copper) to an element mimicing the WoW display of Gold/Silver/Copper */
const FormattedGold = props => {
    const {buyPrice} = props;
    let formattedGold = formatGold(buyPrice);

    return (
        <div className="formatted-gold-container">        
            <div className="mr-1/2">{formattedGold.gold}</div>   
            <img src={GoldCoin} alt="Gold Coin" />
            <div className="mr-1/2">{formattedGold.silver}</div>
            <img src={SilverCoin} alt="Silver Coin" />
            <div className="mr-1/2">{formattedGold.copper}</div>
            <img src={CopperCoin} alt="Copper Coin" />
        </div>
    );
}

export default FormattedGold;