import React, {FC, useContext} from 'react';
import {EditMessageContext} from "../../../Contexts";

const EditMessage: FC = () => {
    const setEdit = useContext(EditMessageContext);

    const clickHandle = () => {
        setEdit(true);
    }

    return (
        <div onClick={clickHandle}>
            Edit message
        </div>
    );
};

export default EditMessage;