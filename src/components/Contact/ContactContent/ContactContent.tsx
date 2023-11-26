import React, {FC} from 'react';
import ContactList from "../ContactList";
import {useAppSelector} from "../../../hooks/redux";
import DefaultState from "./states/DefaultState";
import SearchLocalState from "./states/SearchLocalState";
import SearchGlobalState from "./states/SearchGlobalState";
import ContactRequestInState from "./states/ContactRequestInState";
import ContactRequestOutState from "./states/ContactRequestOutState";

const ContactContent: FC = () => {
    const state = useAppSelector(state => state.sider.state);
    const subState = useAppSelector(state => state.sider.subState);

    if (state === 'default'){
        return <DefaultState/>;
    } else if (state === 'search'){
        if (subState === 'local')
            return <SearchLocalState/>;
        else if (subState === 'global')
            return <SearchGlobalState/>;
    } else if (state === 'contactRequests'){
        if (subState === 'incoming')
            return <ContactRequestInState/>;
        else if (subState === 'outgoing')
            return <ContactRequestOutState/>;
    }
    return (
        <ContactList contacts={undefined} isLoading={false}/>
    );
};

export default ContactContent;