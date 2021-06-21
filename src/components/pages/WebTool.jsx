import React from 'react';
import RecipeBuilder from '../item-tree/RecipeBuilder';
import Header from '../home/Header';
import Footer from '../home/Footer';
import './WebTool.scss';
import SearchForm from '../search-tool/SearchForm';
import { PAGE_NAMES } from '../../utils/constants';

/* The 'web tool' page. Allows users to interact with the API through a web interface rather than the discord bot. */
const WebTool = () => {
    return (
        <>
            <Header pageName={PAGE_NAMES.WEB_TOOL} classNames="bg-header" />

            <section className="web-tool-container text-gray-400 bg-gray-900 body-font pt-8 xl:pt-0">
                <div className="container xl:w-100 px-5 xl:px-0 pt-5 xl:pt-0 mx-auto xl:mx-0 lg:w-3/4 mb-16 xl:mb-0 xl:flex">
                    <SearchForm />

                    <div className="item-tree sm:pl-3 md:pl-3 lg:pl-6 mt-8 pb-16 xl:flex-auto">  
                        <RecipeBuilder />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default WebTool;