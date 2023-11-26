import React, {FC} from 'react';
import Contact from "./ContactItem/Contact";
import {List} from "antd";
import {ContactType, IUser} from "../../types";
import ContactSkeletons from "./ContactSkeletons";

interface ContactListProps{
    contacts: IUser[] | undefined;
    isLoading: boolean;
    type?: ContactType;
}

const ContactList: FC<ContactListProps> = ({contacts, isLoading, type = 'default'}) => {

    return (
        <>
            {isLoading
                ? <ContactSkeletons/>
                : <List
                    size="large"
                    dataSource={contacts}
                    renderItem={(item) => <Contact type={type} contact={item}/>}
                />
            }
        </>
    );
};

export default ContactList;