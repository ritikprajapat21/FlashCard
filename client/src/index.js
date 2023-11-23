import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./context/AuthContext"
import { CardProvider } from "./context/CardContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CardProvider>
          <App />
        </CardProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);