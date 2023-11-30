import React, {FC, useEffect, useState} from 'react';
import {actions as userActions} from "../../store/reducers/UserSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import { Outlet } from 'react-router-dom';
import {IMessage} from "../../types";
import {messagesAPI} from "../../services/userAPI/messagesAPI";
import {App} from "antd";

const ChatSocketLayout: FC = () => {
    const [socket, setSocket] = useState<WebSocket>();
    const user = useAppSelector((state) => state.user.user);
    const activeContact = useAppSelector(state => state.contacts.active);
    const contacts = useAppSelector(state => state.contacts.contacts);
    const dispatch = useAppDispatch();
    const {notification} = App.useApp();
    const socketUrl = `${process.env.REACT_APP_BACKEND_URL}/${user.id}`;

    useEffect(() => {
        try{
            if (!user.id) return;

            const newSocket = new WebSocket(socketUrl);

            setSocket(newSocket);

            newSocket.onopen = () => {
                console.log('Socket opened');
            }

            newSocket.onclose = () => {
                console.log('Socket closed');
                dispatch(userActions.disconnect());
            }

            newSocket.onerror = () => {
                console.error('Socket error');
            }
        } catch(e){
            console.log(e);
        }

    }, [user])

    useEffect(() => {
        if (!socket) return;
        if (!activeContact) return;

        socket.onmessage = (event: MessageEvent<string>) => {
            const message: IMessage = JSON.parse(event.data);

            notification.open({
                message: contacts.find(cont => cont.id === message.from)?.username,
                description: message.text,
                placement: "bottomRight"});

            if (activeContact.id !== message.from) return;

            dispatch(messagesAPI.util.updateQueryData('get', message.from, (draft: IMessage[]) => {
                draft.push(message);
            }))
        }
    }, [activeContact, socket]);

    return (
        <Outlet context={socket satisfies WebSocket | undefined}/>
    );
};

export default ChatSocketLayout;