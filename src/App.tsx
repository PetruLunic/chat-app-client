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
    const [getUser, {data: user, error, isFetching}] = userAPI.useLazyGetUserQuery();
    const isLoaded = useAppSelector(state => state.user.isLoaded);
    const dispatch = useAppDispatch();

    // getting user when launching app, or reseting global store after log out
    useEffect(() => {
        if (!isLoaded){
            getUser();
        }
    }, [isLoaded])

    useEffect(() => {
        if (user){
            dispatch(actions.connect(user));
            dispatch(actions.setIsLoaded(true));
        }
    }, [user])

    useEffect(() => {
        if (error){
            dispatch(actions.setIsLoaded(true));
        }
    }, [error])

    if (isFetching && !isLoaded) return (
        <LoadingOutlined style={{fontSize: "30px"}}/>
    )

    return (
        <AppWrapper>
            <RouterProvider router={routes}/>
        </AppWrapper>
    );
};

export default App;