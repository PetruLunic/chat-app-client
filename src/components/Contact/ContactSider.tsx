import React, {useEffect} from 'react';
import cl from "./Contact.module.css";
import ContactHeader from "./ContactHeader/ContactHeader";
import {Flex, Layout} from 'antd';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useSiderWidth} from "../../hooks/useSiderWidth";
import {useSiderCollapsible} from "../../hooks/useSiderCollapsible";
import {actions as siderActions, actions} from "../../store/reducers/SiderSlice";
import {useCurrentBreakpoint} from "../../hooks/useCurrentBreakpoint";
import ContactContent from "./ContactContent/ContactContent";

const {Sider} = Layout;

const ContactSider: React.FC = () => {
    const activeContact = useAppSelector(state => state.contacts.active);
    const collapsed = useAppSelector(state => state.sider.collapsed);
    const collapsible = useSiderCollapsible();
    const breakpoint = useCurrentBreakpoint();
    const dispatch = useAppDispatch();
    const width = useSiderWidth();

    // show sider when is large screen
    useEffect(() => {
        if (!collapsible){
            dispatch(actions.setCollapsed(false));
        }
    }, [collapsible])

    // closing sider when there is contact active
    useEffect(() => {
        if (!activeContact) return;

        if (breakpoint === 'xs'){
            dispatch(siderActions.setCollapsed(true));
        }
    }, [breakpoint])

    // Collapse sider, if it is collapsible, when changing contact
    useEffect(() => {
        if (!activeContact) return;

        if (collapsible){
            dispatch(siderActions.setCollapsed(true))
        }
    }, [activeContact])

    // Show sider if there is no active contact
    useEffect(() => {
        if (activeContact) return;

        dispatch(siderActions.setCollapsed(false))
    }, [activeContact]);

    return (
        <Sider
            className={cl.contact__container}
            style={{padding: collapsed ? 0 : ""}}
            theme='light'
            width={width}
            collapsedWidth={0}
            collapsed={collapsed}
            trigger={null}
        >
            <Flex gap='middle' vertical>
                <ContactHeader/>
                <ContactContent/>
            </Flex>
        </Sider>
    );
};

export default ContactSider;