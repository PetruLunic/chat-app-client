import React from 'react';
import {authAPI} from "../services/authAPI";
import '../styles/auth.css'
import {Button, Form, Input} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useCurrentBreakpoint} from "../hooks/useCurrentBreakpoint";
import {useErrorNotification} from "../hooks/useErrorNotification";
import {useAuthUser} from "../hooks/useAuthUser";

const LogIn: React.FC = () => {
    const [login, {data, error, isLoading}] = authAPI.useLoginMutation();
    const [form] = Form.useForm();
    const username = Form.useWatch('username', form);
    const breakpoint = useCurrentBreakpoint();
    useErrorNotification([error]);
    useAuthUser(data, username);

    return (
        <Form
            form={form}
            name="login"
            className="auth__form"
            initialValues={{ remember: true }}
            disabled={isLoading}
            size="large"
            onFinish={(data) => login (data)}
        >
            <Form.Item>
                <h1>Log In</h1>
            </Form.Item>
            <Form.Item
                name="username"
                className="auth__input"
                hasFeedback
                rules={[{ required: true, message: 'Please input your Username!' },
                    {min: 2, max: 30, message: 'Username should be longer than 2 and shorter than 30 characters'}]}
            >
                <Input prefix={<UserOutlined className="auth__input-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                className="auth__input"
                hasFeedback
                rules={[{ required: true, message: 'Please input your Password!' },
                    {min: 6, max: 14, message: 'Password should be longer than 6 and shorter than 14 characters'}]}
            >
                <Input.Password
                    prefix={<LockOutlined className="auth__input-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" size={breakpoint === 'xs' ? 'large' : 'middle'} htmlType="submit" block loading={isLoading}>
                    Log in
                </Button>
            </Form.Item>
            <Form.Item>
                Or <a href="/register">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default LogIn;