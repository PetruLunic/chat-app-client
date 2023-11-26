import React, {FC} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {searchAPI} from "../../../../services/userAPI/searchAPI";
import {useDebounce} from "../../../../hooks/useDebounce";
import ContactList from "../../ContactList";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

const SearchGlobalState: FC = () => {
    const search = useAppSelector(state => state.sider.search);
    const debouncedGlobalSearch = useDebounce(search, 500);
    const {data: contacts, error, isFetching} = searchAPI.useUsersQuery(debouncedGlobalSearch);
    useErrorNotification([error]);

    return (
        <ContactList contacts={contacts} isLoading={isFetching} type='unrelated'/>
    );
};

export default SearchGlobalState;