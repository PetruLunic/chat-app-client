import React, {FC, useState} from 'react';
import {IMessage} from "@types";
import {useAppSelector} from "@hooks/redux";
import {Button, Form, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {TextAreaRef} from "antd/es/input/TextArea";
import {useFocusedRef} from "@hooks/useFocusedRef";

interface ChatSendMenuProps{
    sendMessage: (message: IMessage) => void;
}

const ChatSendForm: FC<ChatSendMenuProps> = ({sendMessage}) => {
    const ref = useFocusedRef<TextAreaRef>(["input", "textarea"])
    const [text, setText] = useState<string>("");
    const activeContact = useAppSelector(state => state.contacts.active);
    const user = useAppSelector((state) => state.user.user);

    const sendMessageHandle = () => {
        if (!text.trim()) return;
        if (!activeContact) return;

        const message: IMessage = {
            from: user.id,
            to: activeContact.id,
            text,
            date: new Date()
        }

        sendMessage(message);
        setText('');
    }

    return (
        <Form
            layout='inline'
            style={{alignItems: 'center', marginTop: '10px'}}
        >
            <Form.Item
                style={{flex: '1'}}
            >
                <Input.TextArea
                    ref={ref}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Message"
                    onPressEnter={(e) => {
                        e.preventDefault();
                        sendMessageHandle();
                    }}
                    autoSize={{ minRows: 1, maxRows: 10  }}
                    size='large'
                    maxLength={2000}
                    style={{border: 'none', padding: '15px', borderRadius: '15px'}}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={() => sendMessageHandle()}
                    type="primary"
                    size='large'
                    shape="circle"
                    icon={<SendOutlined />}
                    disabled={!text.trim()}
                />
            </Form.Item>
        </Form>
    );
};

export default ChatSendForm;