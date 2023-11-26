import React, {FC} from 'react';
import ContactList from "../../ContactList";
import {contactsRequestAPI} from "../../../../services/userAPI/contactRequestAPI";
import {useAppSelector} from "../../../../hooks/redux";
import {useDebounce} from "../../../../hooks/useDebounce";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

const ContactRequestInState: FC = () => {
    const search = useAppSelector(state => state.sider.search);
    const debouncedSearch = useDebounce(search, 500);
    const {data, error, isLoading} = contactsRequestAPI.useGetInQuery(debouncedSearch);
    useErrorNotification([error]);



    return (
        <ContactList type='requestIn' contacts={data} isLoading={isLoading}/>
    );
};

export default ContactRequestInState;