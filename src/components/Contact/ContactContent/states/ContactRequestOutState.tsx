import React, {FC} from 'react';
import ContactList from "../../ContactList";
import {contactsRequestAPI} from "../../../../services/userAPI/contactRequestAPI";
import {useAppSelector} from "../../../../hooks/redux";
import {useDebounce} from "../../../../hooks/useDebounce";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

const ContactRequestOutState: FC = () => {
    const search = useAppSelector(state => state.sider.search);
    const debouncedSearch = useDebounce(search, 500);
    const {data, error, isLoading} = contactsRequestAPI.useGetOutQuery(debouncedSearch);
    useErrorNotification([error]);

    return (
        <ContactList contacts={data} isLoading={isLoading} type='requestOut'/>
    );
};

export default ContactRequestOutState;