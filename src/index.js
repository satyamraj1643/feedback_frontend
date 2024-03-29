import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
import { BrowserRouter } from 'react-router-dom';
if(process.env.NODE_ENV === 'production') disableReactDevTools();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>

    </AuthContextProvider>
   
    
  </React.StrictMode>
);


