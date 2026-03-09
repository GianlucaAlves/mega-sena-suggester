import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import {PalpitesProvider} from './context/PalpitesContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <PalpitesProvider>
      <App />
    </PalpitesProvider>
    </BrowserRouter>
  </React.StrictMode>
);