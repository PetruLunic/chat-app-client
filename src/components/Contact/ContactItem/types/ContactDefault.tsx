import React, {FC} from 'react';
import {IUser} from "../../../../types";
import {useAppSelector} from "../../../../hooks/redux";
import {Link} from "react-router-dom";
import {Dropdown, List, MenuProps, Skeleton} from "antd";
import cl from "../../Contact.module.css";
import ContactAvatar from "../../ContactAvatar";
import DeleteContact from "../ContextItems/DeleteContact";

interface ContactDefaultProps{
    contact: IUser;
}

const ContactDefault: FC<ContactDefaultProps> = ({contact}) => {
    const activeContact = useAppSelector(state => state.contacts.active);

    const items: MenuProps['items'] = [
        {
            label: <DeleteContact contact={contact}/>,
            key: '1'
        }
    ]

    return (
        <Dropdown menu={{items}} trigger={['contextMenu']}>
            <Link to={`/${contact.id}`}>
                <List.Item
                    style={{padding: "10px"}}
                    className={`${cl.contact__item} ${activeContact?.id === contact.id && cl.active}`}
                >
                    <List.Item.Meta
                        avatar={<ContactAvatar name={contact.username}/>}
                        title={contact.username}
                        description="The last message"
                    />
                </List.Item>
            </Link>
        </Dropdown>
    );
};

export default ContactDefault;