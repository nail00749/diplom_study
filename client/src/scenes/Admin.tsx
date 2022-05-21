import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Grid} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import UsersData from "../components/UsersData";
import {openUserFlow, openUserSubscription} from "../store/reducers/modals/modalsSlice";

const Admin: FC = () => {
    const dispatch = useAppDispatch()

    const handlerCourseModal = () => dispatch(openCourse())

    const handlerLessonModal = () => dispatch(openLesson())

    const handlerTestModal = () => dispatch(openTest())

    const handlerUserFlow = () => dispatch(openUserFlow())

    const handlerUserSubscription = () => dispatch(openUserSubscription())

    return (
        <>
            <Grid
                container
            >
                <Grid
                    item
                    xs = {12}
                    md = {2}
                    pt = {5}
                    pl = {3}
                >
                    <ButtonGroup
                        orientation = 'vertical'
                        variant = 'contained'
                        fullWidth
                        sx = {{
                            p: 3
                        }}
                        disableElevation
                    >
                        <Box mb = {2}>
                            <Button

                                onClick = {handlerCourseModal}
                            >
                                course
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button

                                onClick = {handlerLessonModal}
                            >
                                lesson
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button

                                onClick = {handlerTestModal}
                            >
                                test
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerUserFlow}
                            >
                                user flow
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerUserSubscription}
                            >
                                subscribe
                            </Button>
                        </Box>
                    </ButtonGroup>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <UsersData/>
                </Grid>
            </Grid>

        </>
    );
};

export default Admin;

