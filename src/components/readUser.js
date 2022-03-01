import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, notification, Divider } from 'antd';
import { Space } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

import HeaderButtons from '../utility/links';
import UserDataService from '../service/user';

export default function ReadUser() {
    const [userData, setUserData] = useState([]);

    const getFreshData = () => {
        UserDataService.getAll()
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getFreshData()
    }, [])

    // Using useState & useEffect, to store value
    const setUserInfo = (data) => {
        let { id, firstname, lastname } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
    }

    // Handler to delete
    const handleOnDelete = (id) => {
        UserDataService.delete(id)
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
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
            sorter: (a, b) => a.firstname.length - b.firstname.length,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
            sorter: (a, b) => a.lastname.length - b.lastname.length,
        },
        // {
        //     title: 'Update',
        //     key: 'Update',
        //     width: 75,
        //     render: (record) => <Link to='/updateuser' onClick={() => setUserInfo(record)}>Update</Link>
        // },
        // {
        //     title: 'View',
        //     key: 'View',
        //     width: 75,
        //     render: (record) => (
        //         <Link to='/viewuser' onClick={() => setUserInfo(record)}>View</Link>
        //     )
        // },
        {
            title: 'Delete',
            key: 'Delete',
            width: 75,
            render: (record) => <Link to='/readuser' onClick={() => handleOnDelete(record.id)}>
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
                dataSource={userData}
                columns={columns}
                rowKey={record => record.id}
                size="middle"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}
