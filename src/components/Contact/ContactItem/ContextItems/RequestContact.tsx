import React, {FC, useEffect} from 'react';
import {contactsRequestAPI} from "../../../../services/userAPI/contactRequestAPI";
import {IUser} from "../../../../types";
import {App} from "antd";
import {useErrorNotification} from "../../../../hooks/useErrorNotification";

interface RequestContactProps{
    contact: IUser;
}

const RequestContact: FC<RequestContactProps> = ({contact}) => {
    const [request, {data, error}] = contactsRequestAPI.useAddMutation();
    useErrorNotification([error]);
    const {message} = App.useApp();

    useEffect(() => {
        if (!data) return;

        message.success({
            content: "Contact requested"
        })
    }, [data])

    return (
        <div onClick={() => request(contact.id)}>
            Request contact
        </div>
    );
};

export default RequestContact;