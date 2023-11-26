import React, {FC, useEffect} from 'react';
import {contactsAPI} from "../../../../services/userAPI/contactsAPI";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {actions} from "../../../../store/reducers/ContactsSlice";
import ContactList from "../../ContactList";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

const DefaultState: FC = () => {
    const connected = useAppSelector(state => state.user.connected)
    const {data: contacts, error, isLoading} = contactsAPI.useGetQuery(undefined, {skip: !connected});
    const dispatch = useAppDispatch();
    useErrorNotification([error]);

    useEffect(() => {
        if (!contacts) return;
        dispatch(actions.setContacts(contacts));
    }, [contacts])

    return (
        <div>
            <ContactList contacts={contacts} isLoading={isLoading}/>
        </div>
    );
};

export default DefaultState;