import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function HomeLinks() {
    return (
        <>
            <Link to='/readincident'>
                <Button
                    type="danger"
                    size="small"
                    style={{ marginBottom: 16 }}
                >
                    Incident Home
                </Button>
            </Link>
            &nbsp;
            <Link to='/readuser'>
                <Button
                    type="danger"
                    size="small"
                    style={{ marginBottom: 16 }}
                >
                    User Home
                </Button>
            </Link>
        </>
    )
}