import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';
import './Styles/index.css';
const glints = document.getElementById('glints-site');

ReactDOM.createRoot(glints).render(<MainApp />);