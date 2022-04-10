import { render } from 'express/lib/response';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import App from './App';

const MainApp = () => {
    <Routes>
        <Route path="" component={App}/>
    </Routes>
};

export default MainApp;
