import React, {useEffect} from 'react';
import ContactSider from "../components/Contact/ContactSider";
import {useMatch} from "react-router-dom";
import { Layout } from 'antd';
import {actions as contactsActions} from "../store/reducers/ContactsSlice";
import {useAppDispatch} from "@hooks/redux";
import ChatSocketLayout from "../components/Chat/ChatSocketLayout";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const match = useMatch('/');

    // Deleting active contact when the :contactId path is empty
    useEffect(() => {
        if (match){
            dispatch(contactsActions.setActive(null));
        }
    }, [match])

    return (
        <Layout className='home'>
            <ContactSider/>
            <ChatSocketLayout/>
        </Layout>
    );
};

export default Home;