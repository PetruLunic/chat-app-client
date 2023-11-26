import React from 'react';
import ChatList from "./ChatList";
import {useAppSelector} from "../../hooks/redux";
import ChatListFrame from "./ChatListFrame";

interface ChatMessageListProps{
    isSendingMessage: boolean | undefined;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({isSendingMessage}) => {
    const messages = useAppSelector(state => state.messages.messages);
    const isLoading = useAppSelector(state => state.messages.isLoading);

    return (
        <ChatListFrame scrollDownTrigger={[isSendingMessage, !isLoading]}>
            <ChatList
                messages={messages}
                isLoading={isLoading}
                />
        </ChatListFrame>
    );
};

export default ChatMessageList;