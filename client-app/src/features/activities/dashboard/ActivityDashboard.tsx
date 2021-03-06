import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";

interface Props {
    activities: Activity[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({ activities, createOrEdit, deleteActivity, submitting }: Props) {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {!editMode && selectedActivity &&
                    <ActivityDetails />}
                {activityStore.editMode &&
                    <ActivityForm
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
})