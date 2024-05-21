// ReferPage.jsx
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomePage from "./pages/HomePage";

import { Context } from './App';


const ReferPage = () => {
  const { variable } = useParams();
  const { setReferredBy } = useContext(Context);
  useEffect(() => {
    setReferredBy(variable);
  }, [variable, setReferredBy]);

  return (
<HomePage />
  );
};

export default ReferPage;
