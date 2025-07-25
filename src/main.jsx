import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position='top-center' toastOptions={{duration: 1500}}/>
    </BrowserRouter>
  </Provider>
);