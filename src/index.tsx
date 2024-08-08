// index.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />  {/* Only one instance here */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
