import React, {FC, useContext, useEffect} from 'react';
import {messagesAPI} from "../../../../services/userAPI/messagesAPI";
import {MessageContext} from "../../../Contexts";
import {App} from "antd";

const DeleteMessage: FC = () => {
    const [deleteMessage, {data, error}] = messagesAPI.useDeleteMutation();
    const message = useContext(MessageContext);
    const {message: messageNotification} = App.useApp();

    useEffect(() => {
        if (!data) return;

        messageNotification.success("Message deleted");
    }, [data]);

    useEffect(() => {
        if (!error) return;

        messageNotification.error("Message was not deleted");
    }, [error]);

    const clickHandle = async () => {
        if (!message?._id) return;

        await deleteMessage(message._id);
    }

    return (
        <div onClick={clickHandle}>
            Delete message
        </div>
    );
};

export default DeleteMessage;