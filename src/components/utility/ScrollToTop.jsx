import React from 'react';
import {useLocation} from 'react-router-dom';

/* A component rendered in the Router which listens for window.pathname changes.
    Scrolls to the top of the page when the path changes.
*/
const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
}

export default ScrollToTop;