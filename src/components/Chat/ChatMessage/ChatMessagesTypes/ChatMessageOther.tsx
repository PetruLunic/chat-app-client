import React from 'react';
import {IMessage} from "../../../../types";
import {MenuProps, Typography} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import {useMessageTime} from "../../../../hooks/useMessageTime";
import cl from "../../Chat.module.css";
import {CopyOutlined} from "@ant-design/icons";
import ChatMessageDropdown from "../ChatMessageDropdown";

const {Text} = Typography;

const items: MenuProps['items'] = [
    {
        label: "Copy message",
        icon: <CopyOutlined/>,
        key: "0"
    },
]

interface ChatMessageProps{
    message: IMessage;
}
const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    const {minutes, hours} = useMessageTime(message.date);

    return (
        <ChatMessageDropdown
            items={items}
        >
            <div className={cl.chat__message}>
                <Paragraph
                    ellipsis={{ rows: 7, expandable: true, symbol: 'Expand' }}
                    style={{margin: "0"}}
                >
                    {message.text}
                </Paragraph>
                <Text type='secondary' className={cl.chat__messageTime}>
                    {hours}:{minutes}
                </Text>
            </div>
        </ChatMessageDropdown>
    );
};

export default ChatMessage;