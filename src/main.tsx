import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './plugins/i18n'; 
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastConfig from './plugins/toastify.ts';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer {...toastConfig} />
  </StrictMode>
);
