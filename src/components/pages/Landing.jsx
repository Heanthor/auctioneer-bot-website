import React from 'react';
import Discord from '../home/Discord';
import Header from '../home/Header';
import News from '../home/News';
import Footer from '../home/Footer';
import CommandList from '../home/CommandList'; 
import { PAGE_NAMES } from '../../utils/constants';

/* The Landing Page for the web app */
const Landing = () => {
    return (
        <>
            <Header pageName={PAGE_NAMES.AUCTION_BOT} classNames="bg-header" />
            <News />
            <Discord />
            <CommandList />
            <Footer />
        </>
    );
}

export default Landing;