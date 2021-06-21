import React from 'react';
import LogoImage from '../../resources/logo.jpg';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import { PAGE_NAMES } from '../../utils/constants';

const Header = props => {
    const {pageName, classNames} = props;

    return (
        <header className={`${classNames ? classNames + ' ' : ''}text-gray-500 body-font shadow-2xl`}>
            <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
                <div className="flex title-font w-full font-medium items-center text-white mb-4 md:mb-0 justify-between pr-8">
                    <div className="flex items-center">
                        <img src={LogoImage} className="inline-block ml-4 mt-4 mb-4 h-20 rounded-full border-4 border-purple-500"
                            alt="logo with pile of treasure" />
                        <span className="ml-3 text-xl">Buyer's Guide: {pageName}</span>
                    </div>
                    
                    <div className="flex flex-1 justify-end">
                        <div className="flex hidden sm:flex">
                            {/* Underlined and lower opacity if it is the active page */}
                            <div className={pageName === PAGE_NAMES.AUCTION_BOT
                                ? "ml-3 mr-6 border-b border-gray-400 text-gray-400"
                                : "ml-3 mr-6 border-b border-opacity-0 text-white"
                            }>
                                {pageName !== PAGE_NAMES.AUCTION_BOT &&
                                    <Link to="/" className="nav-link">
                                        <i className="fas fa-robot fa-lg mr-2 my-auto hidden md:inline" />
                                        Discord Bot
                                    </Link>
                                }
                                {pageName === PAGE_NAMES.AUCTION_BOT &&
                                    <div className="nav-link">
                                        <i className="fas fa-robot fa-lg mr-2 my-auto hidden md:inline" />
                                        Discord Bot
                                    </div>
                                }
                            </div>

                            {/* Vertical Seperator*/}
                            <div className="w-px bg-gray-600" />

                            {/* Underlined and lower opacity if it is the active page */}
                            <div className={pageName === PAGE_NAMES.WEB_TOOL
                                ? "ml-6 border-b border-gray-400 text-gray-400"
                                : "ml-6 border-b border-opacity-0 text-white"
                            }>
                                {pageName !== PAGE_NAMES.WEB_TOOL &&
                                    <Link to="/web-tool" className="nav-link">
                                        <i className="fas fa-stream mr-2 my-auto hidden md:inline" />
                                        Web Tool
                                    </Link>
                                }
                                {pageName === PAGE_NAMES.WEB_TOOL &&
                                    <div className="nav-link">
                                        <i className="fas fa-stream mr-2 my-auto hidden md:inline" />
                                        Web Tool
                                    </div>
                                }
                            </div>
                        </div>

                        {/* Hamburger menu will only show in <small width */}
                        <div className="app-burger ml-4 block sm:hidden">
                            <Menu right>
                                <div className={pageName === PAGE_NAMES.AUCTION_BOT ? "nav-link-container-active" : ""}>
                                    <Link to="/" className="nav-link nav-link-hamburger w-full block p-4 border-t border-b border-gray-700">
                                        <i className="fas fa-robot fa-lg mr-2 my-auto w-8"></i>
                                        Discord Bot
                                    </Link>
                                </div>
                                <div className={pageName === PAGE_NAMES.WEB_TOOL ? "nav-link-container-active" : ""}>
                                    <Link to="/web-tool" className="nav-link nav-link-hamburger w-full block p-4 border-b border-gray-700">
                                        <div className="flex">
                                            <div className="w-8 flex justify-center mr-2">
                                                <i className="fas fa-stream my-auto" />
                                            </div>
                                            Web Tool
                                        </div>
                                    </Link>
                                </div>
                            </Menu>
                        </div>
                    </div>
                    
                </div>
            </div>
        </header>
    );
}

export default Header;