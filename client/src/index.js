import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "./context/AuthContext"
import { CardProvider } from "./context/CardContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </AuthProvider>
  </React.StrictMode>
);