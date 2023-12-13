import React, {FC, memo} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@hooks/redux";
import {Button, Flex, Layout} from 'antd';
import {actions as siderActions} from "@store/reducers/SiderSlice";
import {useCurrentBreakpoint} from "@hooks/useCurrentBreakpoint";
import {useSiderCollapsible} from "@hooks/useSiderCollapsible";
import {ArrowLeftOutlined, CloseOutlined} from "@ant-design/icons";
import cl from "./Chat.module.css";

const {Header} = Layout;

const ChatHeader: FC = () => {
    const activeContact = useAppSelector(state => state.contacts.active);
    const collapsed = useAppSelector(state => state.sider.collapsed);
    const collapsible = useSiderCollapsible();
    const breakpoint = useCurrentBreakpoint();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const showSiderHandle = () => {
        dispatch(siderActions.setCollapsed(false))

        // for mobile size delete contact from active contact
        if (breakpoint === 'xs')
            navigate('/')
    }

    return (
        <Header className={cl.chat__header}>
            <Flex gap='small' align="center">
                {collapsible
                    ? collapsed
                        ? <Button
                            icon={<ArrowLeftOutlined/>}
                            shape='circle'
                            size='large'
                            type='text'
                            onClick={showSiderHandle} />
                        : <Button
                            icon={<CloseOutlined/>}
                            shape='circle'
                            size='large'
                            type='text'
                            onClick={() => navigate('/')} />
                    : ''
                }
                <h3 style={{paddingLeft: "10px"}}>
                    {activeContact?.username}
                </h3>
            </Flex>
        </Header>
    );
};

export default memo(ChatHeader);