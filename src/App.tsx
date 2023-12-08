import React, {useEffect} from 'react';
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {userAPI} from "./services/userAPI";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {actions} from "./store/reducers/UserSlice";
import './App.css';
import {LoadingOutlined} from "@ant-design/icons";
import { App as AppWrapper } from 'antd';

const App: React.FC = () => {


    return (
        <AppWrapper>
            <RouterProvider router={routes}/>
        </AppWrapper>
    );
};

export default App;