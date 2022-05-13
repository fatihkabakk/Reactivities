import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

export default function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const handleActivitySelect = (id: string) => {
        setSelectedActivity(activities.find(a => a.id === id));
    }

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    const handleFormOpen = (id?: string) => {
        id ? handleActivitySelect(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleCreateOrEditActivity = (activity: Activity) => {
        activity.id
            ? setActivities([...activities.filter(a => a.id !== activity.id), activity])
            : setActivities([...activities, { ...activity, id: uuid() }]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    const handleDeleteActivity = (id: string) => {
        setActivities(activities.filter(e => e.id !== id));
    }

    useEffect(() => {
        agent.Activities.list().then(response => {
            setActivities(response);
        })
    }, [])

    return (
        <>
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    selectedActivity={selectedActivity}
                    selectActivity={handleActivitySelect}
                    cancelSelectActivity={handleCancelSelectActivity}
                    activities={activities}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </>
    );
}
