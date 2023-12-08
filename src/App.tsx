import React from 'react';
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import './App.css';
import { App as AppWrapper } from 'antd';

const App: React.FC = () => {

    return (
        <AppWrapper>
            <RouterProvider router={routes}/>
        </AppWrapper>
    );
};

export default App;