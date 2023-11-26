import React, {FC, useState} from 'react';
import {IUser} from "../../../../types";
import ContactDeleteModal from "../../ContactModals/ContactDeleteModal";

interface DeleteContactProps{
    contact: IUser;
}

const DeleteContact: FC<DeleteContactProps> = ({contact}) => {
    const [open, setOpen] = useState(false);

    const onClickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <>
            <div onClick={onClickHandle}>
                Delete contact
            </div>
            <ContactDeleteModal id={contact.id} open={open} setOpen={setOpen}/>
        </>
    );
};

export default DeleteContact;