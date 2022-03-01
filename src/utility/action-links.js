import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function ActionLinks() {
    return (
        <>
            <Link to='/createincident'>
                <Button
                    type="primary"
                    size="small"
                    style={{ marginBottom: 16 }}
                >
                    New Incident
                </Button>
            </Link>
            &nbsp;
            <Link to='/createuser'>
                <Button
                    type="primary"
                    size="small"
                    style={{ marginBottom: 16 }}
                >
                    New User
                </Button>
            </Link>
        </>
    )
}