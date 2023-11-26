import React, {FC} from 'react';
import {IUser} from "../../../../types";
import {Button, List, Skeleton, Space} from "antd";
import cl from "../../Contact.module.css";
import ContactAvatar from "../../ContactAvatar";
import {CloseOutlined} from "@ant-design/icons";
import {contactsRequestAPI} from "../../../../services/userAPI/contactRequestAPI";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

interface ContactRequestOutProps{
    contact: IUser;
}

const ContactRequestOut: FC<ContactRequestOutProps> = ({contact}) => {
    const [reject, {isLoading: isLoadingReject, error}] = contactsRequestAPI.useDeleteMutation();
    useErrorNotification([error]);

    return (
        <List.Item
            style={{padding: "10px"}}
            className={`${cl.contact__item}`}
            actions={[
                <Space>
                    <Button
                        onClick={() => reject(contact.id)}
                        loading={isLoadingReject}
                        type="default"
                        size='large'
                        shape='circle'
                        icon={<CloseOutlined/>}
                        danger
                    />
                </Space>
            ]}
        >
            <List.Item.Meta
                avatar={<ContactAvatar name={contact.username}/>}
                title={contact.username}
            />
        </List.Item>
    );
};

export default ContactRequestOut;