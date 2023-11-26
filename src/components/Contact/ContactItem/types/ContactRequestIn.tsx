import React, {FC, useEffect} from 'react';
import {IUser} from "../../../../types";
import {App, Button, List, Skeleton, Space} from "antd";
import cl from "../../Contact.module.css";
import ContactAvatar from "../../ContactAvatar";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {contactsRequestAPI} from "../../../../services/userAPI/contactRequestAPI";
import {contactsAPI} from "../../../../services/userAPI/contactsAPI";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

interface ContactRequestInProps{
    contact: IUser;
}

const ContactRequestIn: FC<ContactRequestInProps> = ({contact}) => {
    const [accept, {data, isLoading: isLoadingAccept, error: acceptError}] = contactsAPI.useAddMutation();
    const [reject, {isLoading: isLoadingReject, error: rejectError}] = contactsRequestAPI.useDeleteMutation();
    useErrorNotification([acceptError, rejectError]);
    const {message} = App.useApp();

    useEffect(() => {
        if (!data) return;

        message.success({
            content: "Contact added"
        })
    }, [data])

    const acceptHandle = async () => {
        await accept(contact.id);
        await reject(contact.id);
    }

    const rejectHandle = async () => {
        await reject(contact.id);
    }

    return (
        <List.Item
            style={{padding: "10px"}}
            className={`${cl.contact__item}`}
            actions={[
                <Space>
                    <Button
                        onClick={acceptHandle}
                        loading={isLoadingAccept || isLoadingReject}
                        type="default"
                        size='large'
                        shape='circle'
                        icon={<CheckOutlined/>}
                    />
                    <Button
                        onClick={rejectHandle}
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

export default ContactRequestIn;