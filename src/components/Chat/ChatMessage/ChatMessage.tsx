import React from 'react';
import {IMessage} from "../../../types";
import {useAppSelector} from "../../../hooks/redux";
import ChatMessageOwn from "./ChatMessagesTypes/ChatMessageOwn";
import ChatMessageOther from "./ChatMessagesTypes/ChatMessageOther";


interface ChatMessageProps{
    message: IMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    const user = useAppSelector(state => state.user.user);

    if (message.from === user.id){
        return <ChatMessageOwn message={message}/>
    }

    return (
        <ChatMessageOther message={message}/>
    );
};

export default ChatMessage;