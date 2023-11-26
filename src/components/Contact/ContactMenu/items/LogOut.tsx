import React, {FC} from 'react';
import {useAppDispatch} from "../../../../hooks/redux";
import {actions} from "../../../../store/reducers/UserSlice";
import {useNavigate} from "react-router-dom";

const LogOut: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const logOutHandle = () => {
        localStorage.removeItem("token")
        dispatch(actions.disconnect());
        // navigate('/login')
    }
    return (
        <div onClick={logOutHandle}>
            Log Out
        </div>
    );
};

export default LogOut;