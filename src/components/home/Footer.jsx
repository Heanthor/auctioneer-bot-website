import React from 'react';
import MoneyAndCoinsImage from '../../resources/money_and_coins_white.png';

const Footer = props => {
    const {pageName, shrinkOnDesktop} = props;

    return (
        <footer className={shrinkOnDesktop
            ? "footer-container text-gray-600 bg-header body-font px-6 w-full"
            : "text-gray-600 bg-header body-font px-6 w-full"
        }>
            <div className={shrinkOnDesktop
                ? "container py-5 lg:py-1 flex items-center sm:flex-row flex-col"
                : "container py-5  flex items-center sm:flex-row flex-col"
            }>
                {shrinkOnDesktop ? (
                    <span className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <div className="w-12 lg:w-6 h-12 lg:h-6 inline-flex items-center justify-center rounded-full bg-purple-400">
                            <img className="h-8 lg:h-4" src={MoneyAndCoinsImage} alt="logo" />
                        </div>
                        <span className="ml-3 my-auto text-xl lg:text-sm">Buyer's Guide: {pageName}</span>
                    </span>
                ) : (
                    <span className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-purple-400">
                            <img className="h-8" src={MoneyAndCoinsImage} alt="logo" />
                        </div>
                        <span className="ml-3 my-auto text-xl">Buyer's Guide: {pageName}</span>
                    </span>
                )}
                <div className={shrinkOnDesktop
                        ? "text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 lg:py-0 sm:mt-0 mt-4 flex flex-wrap justify-center sm:justify-start"
                        : "text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4 flex flex-wrap justify-center sm:justify-start"
                    }>
                    <div className="whitespace-nowrap">
                        © 2018-2021 Made with <span style={{color: '#DC2626'}}>❤</span> by
                    </div>
                    <div className="whitespace-nowrap">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-purple-300 ml-1"
                        href="https://github.com/Heanthor"
                    >Reed</a>
                    <span className="mr-1.5">,</span>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-purple-300"
                        href="https://github.com/unlockedSound"
                    >
                        David
                    </a>
                    <span className="mr-1.5">, and</span>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-purple-300"
                        href="https://www.reddit.com/user/completely_appalled"
                    >
                        Matt
                    </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;