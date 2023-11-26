import React, {FC} from 'react';
import {Button, Dropdown} from "antd";
import type { MenuProps } from 'antd';
import {LogoutOutlined, MenuOutlined, UserAddOutlined} from "@ant-design/icons";
import ContactRequests from "./items/ContactRequests";
import LogOut from "./items/LogOut";

const items: MenuProps['items'] = [
    {
        label: <ContactRequests/>,
        icon: <UserAddOutlined />,
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: <LogOut/>,
        icon: <LogoutOutlined />,
        danger: true,
        key: '3',
    }
];

const ContactMenuButton: FC = () => {
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <Button
                type='text'
                size='large'
                shape="circle"
                icon={<MenuOutlined />}
            />
        </Dropdown>
    );
};

export default ContactMenuButton;