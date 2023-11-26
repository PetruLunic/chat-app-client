import React, {FC, ReactNode, useEffect, useRef} from 'react';

interface ChatListFrameProps{
    scrollDownTrigger: any[];
    children: ReactNode
}

const ChatListFrame: FC<ChatListFrameProps> = ({scrollDownTrigger, children}) => {
    const messagesContainer = useRef<HTMLDivElement>(null);
    const messagesList = useRef<HTMLDivElement>(null);

    // scrolling down on trigger
    useEffect(() => {
        if (!scrollDownTrigger.find(el => !!el)) return;

        const scrollHeight = messagesList.current?.scrollHeight;
        messagesContainer.current?.scrollTo(0, scrollHeight || 0);
    }, scrollDownTrigger);

    return (
        <div ref={messagesContainer} style={{overflowX: "hidden"}}>
            <div ref={messagesList}>
                {children}
            </div>
        </div>
    );
};

export default ChatListFrame;