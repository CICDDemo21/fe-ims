import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import IncidentDataService from '../service/incident';
import UserDataService from '../service/user';

import { Form, Input, Button, notification, Divider, Card, Select, Switch } from 'antd';
import HomeLinks from '../utility/home-links';

export default function UpdateIncident() {
    const [form] = Form.useForm()
    const [userData, setUserData] = useState([])
    const [incidentId, setIncidentId] = useState('')

    useEffect(() => {
        setIncidentId(localStorage.getItem('ID'))
        getUserData()
        getIncidentDataById()
    }, [incidentId]);

    const getUserData = () => {
        UserDataService.getAll()
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getIncidentDataById = () => {
        if (incidentId != null) {
            IncidentDataService.getById(incidentId)
                .then((res) => {
                    form.setFieldsValue({ incidentTitle: res.data.inc_title })
                    form.setFieldsValue({ incidentDesc: res.data.inc_desc })
                    form.setFieldsValue({ incidentType: res.data.inc_type })
                    form.setFieldsValue({ ackdName: res.data.acked_name })
                    form.setFieldsValue({ ackdState: res.data.is_acked })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    let navigateTo = useNavigate();
    const handleOnUpdate = () => {
        let values, incidentTitle, incidentDesc, incidentType, ackdName, ackdState
        try {
            let values = form.validateFields()
                .then((res) => {
                    incidentTitle = res.incidentTitle
                    incidentDesc = res.incidentDesc
                    incidentType = res.incidentType
                    ackdName = res.ackdName
                    ackdState = res.ackdState

                    IncidentDataService.update(incidentId, {
                        incidentTitle, incidentDesc, incidentType, ackdName, ackdState
                    })
                        .then((res) => {
                            openNotificationWithIcon('info');
                            navigateTo('/readincident')
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
        navigateTo('/readincident')
    }

    const openNotificationWithIcon = (type, id) => {
        notification[type]({
            message: 'Status',
            description:
                `Record updated successfully`,
        })
    }

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

    const { TextArea } = Input;
    const Option = Select.Option;

    return (
        <div style={{ marginTop: '40px' }} className="site-card-border-less-wrapper">
            <HomeLinks />

            <Card
                title={'Update Incident'}
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
                        label="Incident Title"
                        name="incidentTitle"
                        rules={[{ required: true, message: 'Please input your Incident Title!' }]}
                    >
                        <Input rows={3} allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Incident Desc."
                        name="incidentDesc"
                        rules={[{ required: true, message: 'Please input your Incident Desc.!' }]}
                    >
                        <TextArea rows={3} allowClear />
                    </Form.Item>

                    <Form.Item
                        label="Incident Type"
                        name="incidentType"
                        rules={[{ required: true, message: 'Please input your Incident Type!' }]}
                    >
                        <Select placeholder="Please select incident type!">
                            <Option value="Simple">Simple</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="Complex">Complex</Option>
                            <Option value="Highly Complex">Highly Complex</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Assigned to"
                        name="ackdName"
                        rules={[{ required: false, message: 'Please select user to assign!' }]}
                    >
                        <Select placeholder="Please select user to assign!">
                            {userData.map((option) => (
                                <Option key={option.id} value={option.firstname + ' ' + option.lastname}>{option.firstname} {option.lastname}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="ackdState"
                        label="Is Acknowledged?"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch />
                    </Form.Item>

                    <Divider />

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={handleOnUpdate}>
                            Submit
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Link to='/readincident'>
                            <Button type="primary" onClick={handleOnCancel}>Cancel</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}