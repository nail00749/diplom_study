import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import UsersData from "../components/UsersData";
import {openUserFlow, openUserSubscription} from "../store/reducers/modals/modalsSlice";
import {useGetMeDataQuery} from "../services/userAPI";
import GenerateLink from "../components/GenerateLink";


const Admin: FC = () => {
    const {data: user} = useGetMeDataQuery()
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
                pt = {5}
            >
                <Grid
                    item
                    xs = {12}
                    sm = {4}
                    md = {3}
                    px = {3}
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
                                Курс
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerCourseModal}
                            >
                                Модуль
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerLessonModal}
                            >
                                Урок
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerTestModal}
                            >
                                Тест
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerUserFlow}
                            >
                                Поток
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handlerUserSubscription}
                            >
                                Подписка
                            </Button>
                        </Box>
                    </ButtonGroup>
                </Grid>
                {
                    (user && user.role === 'admin') &&
					<GenerateLink/>
                }
                <Grid
                    item
                    xs = {12}
                    sm = {8}
                    md = {6}
                >
                    <UsersData/>
                </Grid>
            </Grid>

        </>
    );
};

export default Admin;

