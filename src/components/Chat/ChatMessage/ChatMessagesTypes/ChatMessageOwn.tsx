import React, {useEffect, useRef, useState} from 'react';
import {IMessage} from "../../../../types";
import {App, Dropdown, MenuProps} from "antd";
import EditMessage from "../ContextMenuItems/EditMessage";
import DeleteMessage from "../ContextMenuItems/DeleteMessage";
import {EditMessageContext, MessageContext} from '../../../Contexts';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import TextArea, {TextAreaRef} from "antd/es/input/TextArea";
import {messagesAPI} from "../../../../services/userAPI/messagesAPI";
import {useMessageTime} from "../../../../hooks/useMessageTime";
import cl from "../../Chat.module.css";

const {Text} = Typography;
const {Paragraph} = Typography;

interface ChatMessageProps{
    message: IMessage;
}

const items: MenuProps['items'] = [
    {
        label: <EditMessage/>,
        icon: <EditOutlined/>,
        key: "1"
    },
    {
        label: <DeleteMessage/>,
        icon: <DeleteOutlined/>,
        danger: true,
        key: "2"
    }
]

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    const [editedText, setEditedText] = useState(message.text);
    const [edit, setEdit] = useState(false);
    const [editRequest, {data, error}] = messagesAPI.useEditMutation();
    const {minutes, hours} = useMessageTime(message.date);
    const textArea = useRef<TextAreaRef>(null);
    const {message: messageNotification} = App.useApp();

    useEffect(() => {
        if (!edit) return;

        setEditedText(message.text);
        textArea.current?.focus();
    }, [edit])

    useEffect(() => {
        if (!data) return;

        messageNotification.success("Message edited!")
    }, [data]);

    useEffect(() => {
        if (!error) return;

        messageNotification.error("Message was not edited!")
    }, [error]);


    const finishEditHandle = async () => {
        setEdit(false);

        if (editedText === message.text) return;

        await editRequest({...message, text: editedText});
    }

    return (
        <MessageContext.Provider value={message}>
            <EditMessageContext.Provider value={setEdit}>
                <Dropdown
                    menu={{items}}
                    trigger={['contextMenu']}
                >
                    <div className={`${cl.chat__message} ${cl.own}`}>
                        {edit
                            ? <TextArea
                                ref={textArea}
                                value={editedText}
                                onChange={e => setEditedText(e.target.value)}
                                autoSize
                                style={{width: "1000px"}}
                                bordered={false}
                                onBlur={finishEditHandle}
                                onPressEnter={finishEditHandle}
                            />
                            : <Paragraph
                                ellipsis={{ rows: 7, expandable: true, symbol: 'Expand' }}
                                style={{margin: "0"}}
                            >
                                {message.text}
                            </Paragraph>}

                        <Text type='secondary' className={cl.chat__messageTime}>
                            {hours}:{minutes}
                        </Text>
                    </div>
                </Dropdown>
            </EditMessageContext.Provider>
        </MessageContext.Provider>
    );
};

export default ChatMessage;