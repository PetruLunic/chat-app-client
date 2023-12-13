import {IUser} from "@types";
import {useEffect} from "react";
import {actions} from "@store/reducers/UserSlice";
import {useAppDispatch} from "./redux";
import {useNavigate} from "react-router-dom";


export const useAuthUser = (data: IUser | undefined, username: string) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;

        if (data.token) localStorage.setItem('token', data.token);

        dispatch(actions.connect({
            id: data.id,
            username,
            token: data?.token
        } as IUser));

        navigate('/');
    }, [data]);
}