import React, {FC, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {actions as siderActions} from "../../../store/reducers/SiderSlice";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const ContactSearchInput: FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(state => state.sider.search);
    const siderState = useAppSelector(state => state.sider.state);

    const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(siderActions.setSearchValue(e.target.value));
    }

    // Clearing input after changing state
    useEffect(() => {
        dispatch(siderActions.setSearchValue(""));
    }, [siderState]);

    const onFocusHandle = useCallback(() => {
        // Set search state only from default state
        if (siderState !== 'default') return;
        dispatch(siderActions.setSearchState());
    }, [siderState])

    return (
        <Input onChange={inputChangeHandle}
               size='large'
               prefix={<SearchOutlined />}
               onFocus={onFocusHandle}
               placeholder='Search'
               value={searchValue}
               type="text"
        />
    );
};

export default ContactSearchInput;