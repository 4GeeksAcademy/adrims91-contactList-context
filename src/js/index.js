import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';


const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
        <StrictMode>
                <Layout />
        </StrictMode>
        
    
);