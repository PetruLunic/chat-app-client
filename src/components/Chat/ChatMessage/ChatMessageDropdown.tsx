import {App, Dropdown, MenuProps} from 'antd';
import React, {FC, useContext, useEffect} from 'react';
import {EditMessageContext, MessageContext} from "../../Contexts";
import {messagesAPI} from "@services/userAPI/messagesAPI";

interface ChatMessageDropdownProps{
    items: MenuProps['items'],
    children: React.ReactNode
}

const ChatMessageDropdown: FC<ChatMessageDropdownProps> = ({items, children}) => {
    const message = useContext(MessageContext);
    const {message: messageNotification} = App.useApp();
    const setEdit = useContext(EditMessageContext);
    const [deleteMessage, {data, error}] = messagesAPI.useDeleteMutation();

    useEffect(() => {
        if (!data) return;

        messageNotification.success("Message deleted");
    }, [data]);

    useEffect(() => {
        if (!error) return;

        messageNotification.error("Message was not deleted");
    }, [error]);

    const copyHandle = () => {
        if (!message) return;

        navigator.clipboard.writeText(message?.text);
        messageNotification.success("Copied!");
    }

    const editHandle = () => {
        setEdit(true);
    }

    const deleteHandle = async () => {
        if (!message?._id) return;

        await deleteMessage(message._id);
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch(key){
            case '0':
                copyHandle();
                break;

            case '1':
                editHandle();
                break;

            case '2':
                deleteHandle();
                break;

        }
    }

    return (
        <Dropdown
            trigger={['contextMenu']}
            menu={{items, onClick}}
            >
            {children}
        </Dropdown>
    );
};

export default ChatMessageDropdown;