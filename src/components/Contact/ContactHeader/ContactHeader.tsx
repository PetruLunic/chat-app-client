import React, {FC, useEffect, useState} from 'react';
import {Flex} from "antd"
import ContactSearchInput from "./ContactSearchInput";
import ContactMenuButton from "../ContactMenu/ContactMenuButton";
import ContactBackButton from "./ContactBackButton";
import ContactOptions from "./ContactOptions";
import {useAppSelector} from "../../../hooks/redux";

const searchOptions = ['local', 'global'];
const requestOptions = ['incoming', 'outgoing'];

const ContactHeader: FC = () => {
    const state = useAppSelector(state => state.sider.state);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        if (state === 'search'){
            setOptions(searchOptions);
        } else if (state === 'contactRequests'){
            setOptions(requestOptions);
        }
    }, [state])

    return (
        <Flex gap="small" vertical>
            <Flex gap="small">
                {state === 'default'
                    ? <ContactMenuButton/>
                    : <ContactBackButton/>}
                <ContactSearchInput />
            </Flex>
            {state !== 'default'
                && <ContactOptions options={options}/>}
        </Flex>
    );
};

export default ContactHeader;