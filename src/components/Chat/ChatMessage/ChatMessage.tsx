import React from 'react';
import {IMessage} from "@types";
import {useAppSelector} from "@hooks/redux";
import ChatMessageOwn from "./ChatMessagesTypes/ChatMessageOwn";
import ChatMessageOther from "./ChatMessagesTypes/ChatMessageOther";
import {MessageContext} from "@components/Contexts";


interface ChatMessageProps{
    message: IMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    const user = useAppSelector(state => state.user.user);

    if (message.from === user.id){
        return (
            <MessageContext.Provider value={message}>
                <ChatMessageOwn message={message}/>
            </MessageContext.Provider>
        )
    }

    return (
        <MessageContext.Provider value={message}>
            <ChatMessageOther message={message}/>
        </MessageContext.Provider>
    );
};

export default ChatMessage;