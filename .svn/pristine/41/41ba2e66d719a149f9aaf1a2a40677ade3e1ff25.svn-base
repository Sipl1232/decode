import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './custom.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from 'react-hot-toast';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename={baseUrl}>
            <App />
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </BrowserRouter>
    </StrictMode>,
)


