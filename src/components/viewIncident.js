import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import HomeLinks from '../utility/home-links';

export default function ViewIncident() {
    const [incidentTitle, setIncidentTitle] = useState('');
    const [incidentDesc, setIncidentDesc] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [isAckd, setIsAckd] = useState('');

    useEffect(() => {
        setIncidentTitle(localStorage.getItem('INC_TITLE'));
        setIncidentDesc(localStorage.getItem('INC_DESC'));
        setIncidentType(localStorage.getItem('INC_TYPE'));
        setAssignedTo(localStorage.getItem('INC_ASSIGNEDTO'));
        setIsAckd(localStorage.getItem('IS_ACKD'))
    }, [])

    return (
        <div style={{ marginTop: '40px' }} className="site-card-border-less-wrapper">
            <HomeLinks />
            <Card
                title={'Title : ' + incidentTitle}
                bordered={false}
            >
                <Card
                    bordered={false}
                >
                    <Card
                        title='Incident Description'
                        bordered={false}
                    >
                        {incidentDesc}
                    </Card>

                    <Card
                        title='Incident Type'
                        bordered={false}
                    >
                        {incidentType}
                    </Card>

                    <Card
                        title='Assigned to'
                        bordered={false}
                    >
                        {assignedTo}
                    </Card>

                    <Card
                        title='Is Acknowledged'
                        bordered={false}
                    >
                        {isAckd}
                    </Card>
                </Card>

                <Card bordered={false}>
                    <Link to='/readincident'>
                        <Button type='primary'>Cancel</Button>
                    </Link>
                </Card>
            </Card>
        </div>
    )
}