import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import './Styles/index.css';
const glints = document.getElementById('glints-site');

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,glints
);