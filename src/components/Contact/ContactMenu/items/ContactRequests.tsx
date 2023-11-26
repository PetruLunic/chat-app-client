import React, {FC} from 'react';
import {useAppDispatch} from "../../../../hooks/redux";
import {actions} from "../../../../store/reducers/SiderSlice";

const ContactRequests: FC = () => {
    const dispatch = useAppDispatch();

    const onClickHandle = () => {
        dispatch(actions.setContactRequestsState())
    }
    return (
        <div onClick={onClickHandle}>
            Contact requests
        </div>
    );
};

export default ContactRequests;