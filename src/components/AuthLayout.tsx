import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/redux";
import {Outlet, useNavigate} from "react-router-dom";

const AuthLayout: React.FC = () => {
    const connected = useAppSelector(state => state.user.connected);
    const isLoaded = useAppSelector(state => state.user.isLoaded);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return;
        if (!connected){
            navigate('/login');
        }
    }, [connected, isLoaded])

    return (
        <Outlet/>
    );
};

export default AuthLayout;