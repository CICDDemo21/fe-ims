import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, notification, Divider, Switch } from 'antd';
import { Space } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

import HeaderButtons from '../utility/links';
import IncidentDataService from '../service/incident';

export default function ReadIncident() {
    const [incidentData, setIncidentData] = useState([]);

    const getFreshData = () => {
        IncidentDataService.getAll()
            .then((res) => {
                setIncidentData(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getFreshData()
    }, [])

    // Using useState & useEffect, to store value
    const setIncidentInfo = (data) => {
        let { id, inc_title, inc_desc, inc_type, acked_name, is_acked } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('INC_TITLE', inc_title);
        localStorage.setItem('INC_DESC', inc_desc);
        localStorage.setItem('INC_TYPE', inc_type);
        localStorage.setItem('INC_ASSIGNEDTO', acked_name);
        localStorage.setItem('IS_ACKD', is_acked === true ? ' Yes' : 'No');
    }

    // Handler to delete
    const handleOnDelete = (id) => {
        IncidentDataService.delete(id)
            .then((res) => {
                getFreshData();
            }).then(() => {
                openNotificationWithIcon('info');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // notify to user
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Status',
            description:
                `Record deleted successfully`,
        })
    }

    const columns = [
        {
            title: 'Incident Title',
            dataIndex: 'inc_title',
            key: 'inc_title',
            width: 250,
            sorter: (a, b) => a.inc_title.length - b.inc_title.length,
        },
        {
            title: 'Incident Desc.',
            dataIndex: 'inc_desc',
            key: 'inc_desc',
            sorter: (a, b) => a.inc_desc.length - b.inc_desc.length,
        },
        {
            title: 'Assigned to',
            dataIndex: 'acked_name',
            key: 'acked_name',
            width: 200,
            sorter: (a, b) => a.acked_name.length - b.acked_name.length,
        },
        {
            title: 'Is Acknowled',
            dataIndex: 'is_acked',
            key: 'is_acked',
            width: 200,
            render: (val) => val === true ? 'Yes' : 'No'
        },
        {
            title: 'Incident Type',
            dataIndex: 'inc_type',
            key: 'inc_type',
            width: 200,
            sorter: (a, b) => a.inc_type.length - b.inc_type.length,
        },
        {
            title: 'Update',
            key: 'Update',
            width: 70,
            render: (record) => <Link to='/updateincident' onClick={() => setIncidentInfo(record)}>
                <Space>
                    <EditTwoTone />
                </Space>
            </Link>
        },
        {
            title: 'View',
            key: 'View',
            width: 70,
            render: (record) => (
                <Link to='/viewincident' onClick={() => setIncidentInfo(record)}>View</Link>
            )
        },
        {
            title: 'Delete',
            key: 'Delete',
            width: 70,
            render: (record) => <Link to='/' onClick={() => handleOnDelete(record.id)}>
                <Space>
                    <DeleteTwoTone />
                </Space>
            </Link>
        },
    ];

    return (
        <div style={{ marginTop: '40px' }} className="site-card-border-less-wrapper">

            <HeaderButtons />
            <Divider style={{ margin: '0px' }} />

            <Table
                className="components-table-demo-nested"
                dataSource={incidentData}
                columns={columns}
                rowKey={record => record.id}
                size="middle"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}
