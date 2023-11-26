import React, {useEffect} from 'react';
import '../../App.css'
import ChatHeader from "./ChatHeader";
import { Layout } from 'antd';
import ChatContent from "./ChatContent";
import {actions as contactsActions} from "../../store/reducers/ContactsSlice";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import cl from "./Chat.module.css"

const ChatContainer: React.FC = () => {
    const {id: contactId} = useParams();
    const {contacts, loaded: contactsLoaded} = useAppSelector(state => state.contacts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // This is controller for handling changing :contactId param in url
    useEffect(() => {
        // Checking if contacts were loaded before checking :contactId from url
        if (!contactsLoaded) return;

        const contact = contacts.find(contact => contact.id === contactId);

        if (!contact){
            dispatch(contactsActions.setActive(null));
            navigate('/');
            return;
        }

        dispatch(contactsActions.setActive(contact));
    }, [contactId, contactsLoaded])

    return (
        <Layout className={cl.chat__container}>
            <ChatHeader/>
            <ChatContent/>
        </Layout>
    );
};

export default ChatContainer;