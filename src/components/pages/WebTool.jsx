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

            <section className="text-gray-400 bg-gray-900 body-font pt-8">
                <div className="container px-5 pt-5 mx-auto lg:w-3/4 xl:w-3/5 2xl:w-1/2 mb-16">
                    
                    <h2 className="text-white title-font font-medium mb-3 capitalize text-3xl mb-5">
                        Buyer's Guide Web Tool
                    </h2>

                    <SearchForm />

                    <div className="item-tree sm:pl-3 md:pl-3 lg:pl-6 mt-8">
                        
                        <RecipeBuilder />

                        {/*

                        <h2 className="text-white font-semibold">id=178926 </h2>
                        <Recipe data={treeData2} key="ring" id="456"/>
                        
                        */}
                    </div>
                </div>

                <Footer />
                
            </section>
        </>
    );
}

export default WebTool;