import React, {FC} from 'react';
import {IUser} from "../../../../types";
import {Dropdown, List, MenuProps, Skeleton} from "antd";
import cl from "../../Contact.module.css";
import ContactAvatar from "../../ContactAvatar";
import RequestContact from "../ContextItems/RequestContact";

interface ContactUnrelatedProps{
    contact: IUser;
}

const ContactUnrelated: FC<ContactUnrelatedProps> = ({contact}) => {

    const items: MenuProps['items'] = [
        {
            label: <RequestContact contact={contact}/>,
            key: '1'
        }
    ]

    return (
        <Dropdown menu={{items}} trigger={['contextMenu']}>
            <List.Item
                style={{padding: "10px"}}
                className={`${cl.contact__item}`}
            >
                <List.Item.Meta
                    avatar={<ContactAvatar name={contact.username}/>}
                    title={contact.username}
                />
            </List.Item>
        </Dropdown>
    );
};

export default ContactUnrelated;