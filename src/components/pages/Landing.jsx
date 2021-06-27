import React from 'react';
import Discord from '../home/Discord';
import Footer from '../home/Footer';
import CommandList from '../home/CommandList'; 
import { PAGE_NAMES } from '../../utils/constants';
import News from '../home/News';

/* The Landing Page for the web app */
const Landing = () => {
    return (
        <>
            <div></div>
            <News />
            <Discord />
            <CommandList />
            <Footer pageName={PAGE_NAMES.AUCTION_BOT} />
        </>
    );
}

export default Landing;