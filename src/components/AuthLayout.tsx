import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/redux";
import {Outlet, useNavigate} from "react-router-dom";
import {userAPI} from "@services/userAPI";
import {actions} from "@store/reducers/UserSlice";
import {LoadingOutlined} from "@ant-design/icons";

const AuthLayout: React.FC = () => {
    const connected = useAppSelector(state => state.user.connected);
    const isLoaded = useAppSelector(state => state.user.isLoaded);
    const navigate = useNavigate();
    const [getUser, {data: user, error, isFetching}] = userAPI.useLazyGetUserQuery();
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

    useEffect(() => {
        if (!isLoaded) return;
        if (!connected){
            navigate('/login');
        }
    }, [connected, isLoaded])

    if (isFetching && !isLoaded) return (
        <LoadingOutlined style={{fontSize: "30px"}}/>
    )

    return (
        <Outlet/>
    );
};

export default AuthLayout;