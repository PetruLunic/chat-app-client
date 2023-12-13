import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/redux";
import { Outlet } from 'react-router-dom';
import {IMessage} from "@types";
import {messagesAPI} from "@services/userAPI/messagesAPI";
import {App} from "antd";

const ChatSocketLayout: FC = () => {
    const [socket, setSocket] = useState<WebSocket>();
    const [socketConnected, setSocketConnected] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const activeContact = useAppSelector(state => state.contacts.active);
    const contacts = useAppSelector(state => state.contacts.contacts);
    const dispatch = useAppDispatch();
    const {notification} = App.useApp();
    const socketUrl = `${process.env.REACT_APP_BACKEND_WS_URL}/${user.id}`;

    // Reconnecting to websocket after refocus on window if it was closed
    useEffect(() => {
        const handleFocus = () => {
            if (socketConnected) return;
            if (socket?.CONNECTING) return;

            setSocketConnected(false);
        }

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        }
    }, [socketConnected, socket])

    useEffect(() => {
        try{
            if (!user.id) return;
            if (socketConnected) return;
            if (socket?.CONNECTING) return;

            const newSocket = new WebSocket(socketUrl);

            setSocket(newSocket);

            newSocket.onopen = () => {
                console.log('Socket opened');
                setSocketConnected(true);
            }

            newSocket.onclose = () => {
                console.log('Socket closed');
                setSocketConnected(false);
            }

            newSocket.onerror = () => {
                console.error('Socket error');
            }
        } catch(e){
            console.log(e);
        }

    }, [user, socketConnected])

    useEffect(() => {
        if (!socket) return;
        if (!activeContact) return;

        socket.onmessage = (event: MessageEvent<string>) => {
            const message: IMessage = JSON.parse(event.data);

            if (activeContact.id !== message.from){
                notification.open({
                    message: contacts.find(cont => cont.id === message.from)?.username,
                    description: message.text,
                    placement: "bottomRight"});

                return;
            }

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