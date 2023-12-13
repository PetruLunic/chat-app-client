import React, {FC, useEffect, useLayoutEffect} from 'react';
import ChatMessageList from "./ChatMessageList";
import ChatSendForm from "./ChatSendForm";
import {useAppDispatch, useAppSelector} from "@hooks/redux";
import {messagesAPI} from "@services/userAPI/messagesAPI";
import {useSiderCollapsible} from "@hooks/useSiderCollapsible";
import {actions as siderActions} from "@store/reducers/SiderSlice";
import {actions as messagesActions} from "@store/reducers/MessagesSlice";
import { Content } from 'antd/es/layout/layout';
import {useOutletContext} from "react-router-dom";
import cl from "./Chat.module.css";
import {useErrorNotification} from "@hooks/useErrorNotification";
import {useIsChangingContact} from "@hooks/useIsChangingContact";
import { skipToken } from '@reduxjs/toolkit/query/react'

const ChatContent: FC = () => {
    const contactId = useAppSelector(state => state.contacts.active?.id);
    const dispatch = useAppDispatch();
    const {data: messages, isFetching: isFetchingMessages, error: messagesError} = messagesAPI.useGetQuery(contactId ?? skipToken
        , {pollingInterval: 60000});
    const [sendMessage, {data: sendResponse, isLoading: isSendingMessage}] = messagesAPI.useAddMutation();
    const collapsible = useSiderCollapsible();
    const socket = useOutletContext<WebSocket | undefined>();
    const isChangingContact = useIsChangingContact(isFetchingMessages);
    useErrorNotification([messagesError]);

    useEffect(() => {
        if (!contactId) return;

        dispatch(messagesActions.setIsLoading(isChangingContact));
    }, [isChangingContact]);

    const collapseSiderHandle = () => {
        if (collapsible){
            dispatch(siderActions.setCollapsed(true));
        }
    }

    // loading messages in global state
    useLayoutEffect(() => {
        if (!messages) return;
        if (!contactId) return;

        dispatch(messagesActions.loadMessages(messages));
    }, [messages])

    // Sending message in socket after getting id from http DB
    useEffect(() => {
        if (!sendResponse) return;

        socket?.send(JSON.stringify(sendResponse));
    }, [sendResponse])


    return (
        <Content onClick={collapseSiderHandle} className={cl.chat__content}>
            <ChatMessageList isSendingMessage={isSendingMessage}/>
            <ChatSendForm sendMessage={sendMessage}/>
        </Content>
    );
};

export default ChatContent;