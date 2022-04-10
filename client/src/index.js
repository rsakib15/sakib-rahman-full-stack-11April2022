// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';

const glints = document.getElementById('glints-site');

let render = () => {
  const MainApp = require('./MainApp').default;
  ReactDOM.render(<MainApp/>, glints);
};
