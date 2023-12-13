import React, {FC} from 'react';
import {List} from "antd";
import {IMessage} from "@types";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatMessageSkeletons from "./ChatMessageSkeletons";

interface ChatListProps{
    messages: IMessage[] | undefined;
    isLoading: boolean;
}


const ChatList: FC<ChatListProps> = ({messages, isLoading}) => {
    return (
        <>
            {isLoading
                ? <ChatMessageSkeletons/>
                : <List
                    size="large"
                    dataSource={messages}
                    renderItem={(item) => <ChatMessage message={item}/>}
                />
            }
        </>
    );
};

export default ChatList;