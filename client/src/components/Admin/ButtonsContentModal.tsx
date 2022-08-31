import React from 'react'
import {useAppDispatch} from "../../hooks/redux";
import {openModal as openCourse} from "../../store/reducers/admin/courseSlice";
import {openModal as openModule} from "../../store/reducers/admin/moduleSlice";
import {openModal as openLesson} from "../../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../../store/reducers/admin/testSlice";
import {openModuleTask, openUserFlow, openUserSubscription} from "../../store/reducers/modals/modalsSlice";
import {Box, Button, ButtonGroup} from "@mui/material";

const ButtonsContentModal = () => {
    const dispatch = useAppDispatch()

    const handleCourseModal = () => dispatch(openCourse())

    const handleModuleModal = () => dispatch(openModule())

    const handleLessonModal = () => dispatch(openLesson())

    const handleTestModal = () => dispatch(openTest())

    const handleUserFlow = () => dispatch(openUserFlow())

    const handleUserSubscription = () => dispatch(openUserSubscription())

    const handleModuleTask = ()  => dispatch(openModuleTask())
    return (
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
                    onClick = {handleModuleTask}
                >
                    Задание по модулю
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
    )
}

export default ButtonsContentModal
