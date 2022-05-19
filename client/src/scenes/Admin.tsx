import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Container} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import {toggleUsersData} from "../store/reducers/service/ServiceSlice";

const Admin: FC = () => {
    const dispatch = useAppDispatch()

    const handlerCourseModal = () => dispatch(openCourse())

    const handlerLessonModal = () => dispatch(openLesson())

    const handlerTestModal = () => dispatch(openTest())

    const handlerUsersModal = () => dispatch(toggleUsersData())

    return (
        <>
            <Box>
                <Container
                >
                    <ButtonGroup
                        orientation = 'vertical'
                    >
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {handlerCourseModal}
                            >
                                Create course
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {handlerLessonModal}
                            >
                                Create lesson
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {handlerTestModal}
                            >
                                Create test
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {handlerUsersModal}
                            >
                                Edit users data
                            </Button>
                        </Box>
                    </ButtonGroup>


                </Container>
            </Box>

        </>
    );
};

export default Admin;

