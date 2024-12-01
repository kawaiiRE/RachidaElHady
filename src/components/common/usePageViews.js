/* global gtag */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageViews = () => {
  const location = useLocation();

  useEffect(() => {
    gtag('config', 'G-SYP80JYZQ9', {
      page_path: location.pathname,
    });
  }, [location]);
};

export default usePageViews;
