import React, {FC, useEffect, useState} from 'react';
import {App, Checkbox, Flex, Modal} from "antd";
import {contactsAPI} from "../../../services/userAPI/contactsAPI";
import type {CheckboxChangeEvent} from "antd/es/checkbox";
import {useErrorNotification} from "../../../hooks/useErrorNotification";

interface ContactDeleteModalProps{
    id: string;
    open: boolean;
    setOpen: (open: boolean) => void
}

const ContactDeleteModal: FC<ContactDeleteModalProps> = ({id, open, setOpen}) => {
    const [deleteContact, {data: deleteData, error: deleteError, isLoading: isDeletingContact}] = contactsAPI.useDeleteMutation();
    const [deleteContactWithMessages,
        {data: deleteWithMessagesData, error: deleteWithMessagesError, isLoading: isDeletingContactWithMessages}] = contactsAPI.useDeleteWithMessagesMutation();
    const [checked, setChecked] = useState(false);
    useErrorNotification([deleteError, deleteWithMessagesError]);
    const {message} = App.useApp();

    useEffect(() => {
        if (!deleteData && !deleteWithMessagesData) return;

        message.success({
            content: "Contact deleted"
        })
    }, [deleteData, deleteWithMessagesData])

    const handleOk = async (e: React.MouseEvent) => {
        if (checked){
            await deleteContactWithMessages(id);
        } else{
            await deleteContact(id);
        }
        setOpen(false);
    }
    const onChangeHandle = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };


    const handleCancel = async (e: React.MouseEvent) => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            title="Delete contact"
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ danger: true }}
            confirmLoading={isDeletingContact || isDeletingContactWithMessages}
            destroyOnClose
        >
            <Flex gap='middle' vertical>
                <p>Permanently delete the contact?</p>
                <Checkbox
                    onChange={onChangeHandle}
                >
                    Delete with messages
                </Checkbox>
            </Flex>
        </Modal>
    );
};

export default ContactDeleteModal;