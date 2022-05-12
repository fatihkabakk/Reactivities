import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    };

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = () => {
        createOrEdit(activity);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} onChange={handleChange} name='title' />
                <Form.TextArea placeholder='Description' value={activity.description} onChange={handleChange} name='description' />
                <Form.Input placeholder='Category' value={activity.category} onChange={handleChange} name='category' />
                <Form.Input placeholder='Date' value={activity.date} onChange={handleChange} name='date' />
                <Form.Input placeholder='City' value={activity.city} onChange={handleChange} name='city' />
                <Form.Input placeholder='Venue' value={activity.venue} onChange={handleChange} name='venue' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
