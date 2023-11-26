import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {IUser} from "../../../../types";
import ContactList from "../../ContactList";

const SearchLocalState: FC = () => {
    const search = useAppSelector(state => state.sider.search);
    const [contacts, setContacts] = useState<IUser[]>([]);
    const allContacts = useAppSelector(state => state.contacts.contacts);

    useEffect(() => {
        if (!allContacts) return;
        setContacts(allContacts.filter((contact: IUser) => contact.username.toLowerCase().includes(search.toLowerCase())))
    }, [search])

    return (
        <ContactList contacts={contacts} isLoading={false}/>
    );
};

export default SearchLocalState;