import React, {FC} from 'react';
import {Button, Tooltip} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../../hooks/redux";
import {actions} from "../../../store/reducers/SiderSlice";

const ContactBackButton: FC = () => {
    const dispatch = useAppDispatch();

    const onClickHandle = () => {
        dispatch(actions.setDefaultState());
    }

    return (
        <Tooltip title="back">
            <Button
                type='text'
                shape="circle"
                size='large'
                icon={<ArrowLeftOutlined />}
                onClick={onClickHandle}
            />
        </Tooltip>
    );
};

export default ContactBackButton;