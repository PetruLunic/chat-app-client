import {Radio, RadioChangeEvent} from 'antd';
import React, {FC, memo} from 'react';
import {actions} from "../../../store/reducers/SiderSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

interface ContactSearchOptionsProps{
    options: string[]
}

const ContactOptions: FC<ContactSearchOptionsProps> = memo(({options}) => {
    const subState = useAppSelector(state => state.sider.subState);
    const dispatch = useAppDispatch();

    const changeHandle = (e: RadioChangeEvent) => {
        dispatch(actions.setSubState(e.target.value));
    }

    return (
        <Radio.Group
            onChange={changeHandle}
            defaultValue={subState}
        >
            {options.map((option) =>
                <Radio.Button
                    key={option}
                    value={option}
                    style={{width: `${100/options.length}%`}}
                >
                    {option}
                </Radio.Button>
            )}
        </Radio.Group>

    );
});

export default ContactOptions;