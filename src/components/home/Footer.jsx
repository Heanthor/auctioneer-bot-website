import React from 'react';
import MoneyAndCoinsImage from '../../resources/money_and_coins_white.png';

const Footer = () => {
    return (
        <footer className="text-gray-600 bg-gray-900 body-font px-6 w-full border-t border-gray-700">
            <div className="container py-5  flex items-center sm:flex-row flex-col">
                <span className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-purple-400">
                        <img className="h-8" src={MoneyAndCoinsImage} alt="logo" />
                    </div>
                    <span className="ml-3 my-auto text-xl">Buyer's Guide: Auction Bot</span>
                </span>
                <div className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4 flex">
                    <div>© 2018-2021 Made with <span style={{color: '#DC2626'}}>❤</span> by</div>
                    <a className="hover:underline text-purple-300 ml-1" href="https://github.com/Heanthor">Reed</a>
                    <span className="mr-1.5">,</span>
                    <a className="hover:underline text-purple-300" href="https://github.com/unlockedSound">David</a>
                    <span className="mr-1.5">, and</span>
                    <a className="hover:underline text-purple-300" href="https://github.com/toup162">Matt</a>     
                </div>
            </div>
        </footer>
    );
}

export default Footer;