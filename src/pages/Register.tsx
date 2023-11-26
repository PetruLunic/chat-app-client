import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {actions} from '../store/reducers/UserSlice';
import {IUser} from "../types";
import {authAPI} from "../services/authAPI";
import '../styles/auth.css'
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useCurrentBreakpoint} from "../hooks/useCurrentBreakpoint";
import {useNavigate} from "react-router-dom";
import {useErrorNotification} from "../hooks/useErrorNotification";


const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const [register, {data, error, isLoading}] = authAPI.useRegistrationMutation();
    const [form] = Form.useForm();
    const username = Form.useWatch('username', form);
    const breakpoint = useCurrentBreakpoint();
    const navigate = useNavigate();
    useErrorNotification([error]);

    useEffect(() => {
        if (data){
            if (data.token) localStorage.setItem('token', data.token);

            dispatch(actions.connect({
                id: data.id,
                username,
                token: data?.token
            } as IUser));

            navigate('/');
        }
    }, [data]);

    return (
        <Form
            form={form}
            name="login"
            className="auth__form"
            initialValues={{ remember: true }}
            disabled={isLoading}
            size="large"
            onFinish={(data) => register (data)}
        >
            <Form.Item>
                <h1>Sign In</h1>
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
            <Form.Item
                name="confirm"
                className="auth__input"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="auth__input-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" size={breakpoint === 'xs' ? 'large' : 'middle'} htmlType="submit" block loading={isLoading}>
                    Sign in
                </Button>
            </Form.Item>
            <Form.Item>
                Or <a href="/login">login!</a>
            </Form.Item>
        </Form>
    );
};

export default Register;