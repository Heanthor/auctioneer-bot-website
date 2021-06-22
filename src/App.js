import React from 'react'
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './components/pages/Landing';
import WebTool from './components/pages/WebTool';
import featureFlags from './utils/feature-flags';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const App = () => {
    return (
        
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />         


            <Router>
                <Switch>
                    {/* We can't use the utility Feature component here. Only Route components can be rendered in a Switch. */}
                    {featureFlags.webTool &&
                        <Route path="/web-tool">
                            <WebTool />
                        </Route>
                    }
                    
                    <Route path="/">
                        <Landing />
                    </Route>
                    
                </Switch>
            </Router>

        </div>
    );
}

export default App;
