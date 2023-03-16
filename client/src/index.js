import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CharityProvider } from './utils/GlobalState';
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(

<React.StrictMode>
    <CharityProvider>
      <App />
    </CharityProvider>
  </React.StrictMode>

)
// ReactDOM.render(
//   <React.StrictMode>
//     <CharityProvider>
//       <App />
//     </CharityProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// this is for the stuff
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
