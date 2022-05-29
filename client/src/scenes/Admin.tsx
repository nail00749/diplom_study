import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openModule} from "../store/reducers/admin/moduleSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import UsersData from "../components/UsersData";
import {openUserFlow, openUserSubscription} from "../store/reducers/modals/modalsSlice";
import {useGetMeDataQuery} from "../services/userAPI";
import GenerateLink from "../components/GenerateLink";


const Admin: FC = () => {
    const {data: user} = useGetMeDataQuery()
    const dispatch = useAppDispatch()

    const handleCourseModal = () => dispatch(openCourse())

    const handleModuleModal = () => dispatch(openModule())

    const handleLessonModal = () => dispatch(openLesson())

    const handleTestModal = () => dispatch(openTest())

    const handleUserFlow = () => dispatch(openUserFlow())

    const handleUserSubscription = () => dispatch(openUserSubscription())

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
                                onClick = {handleCourseModal}
                            >
                                Курс
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handleModuleModal}
                            >
                                Модуль
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handleLessonModal}
                            >
                                Урок
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handleTestModal}
                            >
                                Тест
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handleUserFlow}
                            >
                                Поток
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                onClick = {handleUserSubscription}
                            >
                                Подписка
                            </Button>
                        </Box>
                    </ButtonGroup>
                </Grid>
                {
                    (user && user.role === 'admin') &&
					<>
						<GenerateLink/>
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {6}
						>
							<UsersData/>
						</Grid>
					</>
                }
            </Grid>

        </>
    );
};

export default Admin;

