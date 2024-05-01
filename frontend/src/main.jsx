
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom';


// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />,
    </BrowserRouter>
    
)
serviceWorker.unregister();