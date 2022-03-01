import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../service/user';

import { Form, Input, Button, notification, Divider, Card, Select } from 'antd';
import HomeLinks from '../utility/home-links';

export default function CreateUser() {
    const [form] = Form.useForm();
    let navigateTo = useNavigate();

    const handleOnSave = () => {
        let values, firstname, lastname, role
        try {
            values = form.validateFields().then((res) => {
                firstname = res.firstname
                lastname = res.lastname
                role = res.role
                
                UserService.create({
                    firstname, lastname, role
                })
                    .then(() => {
                        openNotificationWithIcon('info');
                        navigateTo('/readuser')
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        } catch (errorInfo) {
            return;
        }
    }

    const handleOnCancel = (e) => {
        navigateTo('/readuser')
    }

    const openNotificationWithIcon = (type, id) => {
        notification[type]({
            message: 'Status',
            description:
                `New user created successfully`,
        })
    }

    const { TextArea } = Input;

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 5,
            span: 16,
        },
    };

    const Option = Select.Option;

    return (
        <div style={{ marginTop: '40px' }} className="site-card-border-less-wrapper">
            <HomeLinks />

            <Card
                title={'Create User'}
                bordered={false}
            >
                <Form
                    {...layout}
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select user role!' }]}
                    >
                        <Select placeholder="Please select user role">
                            <Option value="ADMIN">Admin</Option>
                            <Option value="USER">User</Option>
                        </Select>
                    </Form.Item>

                    <Divider />

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={handleOnSave}>
                            Submit
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Link to='/readuser'>
                            <Button type="primary" onClick={handleOnCancel}>Cancel</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}