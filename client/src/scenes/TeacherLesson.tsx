import React, {useEffect, useState} from 'react'
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useGetFlowLessonQuery} from "../services/lessonAPI";
import {openModal as openLessonModal} from "../store/reducers/admin/lessonSlice";
import {openModal as openTestModal} from "../store/reducers/admin/testSlice";
import {useAppDispatch} from "../hooks/redux";
import {useGetAllLessonsQuery} from "../services/contentAPI";
import {BaseURL} from "../config";
import {userTestResultAPI} from "../services/userTestResultAPI";
import CheckingTest from "../components/modals/CheckingTest";

const TeacherLesson = () => {
    const {lessonId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: {lesson, subscriptions} = {}} = useGetFlowLessonQuery({
        lessonId: String(lessonId),
        flowId: String(flowId)
    })
    const dispatch = useAppDispatch()
    const {data: lessons} = useGetAllLessonsQuery()
    const [trigger, {data: results}] = userTestResultAPI.endpoints.getStudentsResult.useLazyQuery()
    const [modalCheckTest, setModalCheckTest] = useState(false)
    const [resultUser, setResultUser] = useState<any>(null)

    useEffect(() => {
        if (!lessonId || !flowId) {
            navigate('/')
        }
    }, [lessonId, navigate, flowId])

    useEffect(() => {
        if (lesson && lesson.test) {
            trigger({
                testId: String(lesson!.test!._id),
                flowId: String(flowId)
            })
        }
    }, [lesson])

    const handlerLessonEdit = () => {
        if (lesson) {
            dispatch(openLessonModal({
                lesson,
                isUpdate: true,
            }))
        }
    }

    const handlerTestEdit = () => {
        if (lesson && lesson.test) {
            dispatch(openTestModal({
                isUpdate: true,
                test: lesson.test,
                lessons
            }))
        }
    }

    const handleCheckTestUser = (res: any) => () => {
        setModalCheckTest(true)
        setResultUser(res)
    }

    const handleCloseModal = () => setModalCheckTest(false)

    return (
        <Box
            p = {3}
        >
            {
                lesson &&
				<Grid
					container
					spacing = {1}
				>
					<Grid
						item
						xs = {12}
						sm = {6}
						md = {3}
					>
						<Typography
							color = 'text.primary'
							variant = 'h4'
						>
                            {lesson.title}
						</Typography>
						<Typography
							color = 'text.primary'
							variant = 'body1'
							my = {2}
						>
                            {lesson.description}
						</Typography>
						<ButtonGroup
							orientation = 'vertical'
						>
							<Button
								variant = 'outlined'
								onClick = {handlerLessonEdit}
							>
								Редактировать урок
							</Button>
                            {
                                (lesson && lesson.test) &&
								<Button
									variant = 'outlined'
									onClick = {handlerTestEdit}
								>
									Редактировать тест
								</Button>
                            }
						</ButtonGroup>
					</Grid>
                    {
                        lesson.video_path &&
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {5}
						>
							<video
								src = {BaseURL + lesson.video_path}
								style = {{
                                    maxHeight: 240,
                                    maxWidth: 320
                                }}
								controls
							/>
						</Grid>
                    }
                    {
                        results &&
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {4}
						>
							<Typography
								color = 'text.primary'
								mb = {2}
							>
								Результаты учеников
							</Typography>
                            {
                                results.map((res: any) =>
                                    <Box
                                        key = {res._id}
                                        mb = {2}
                                    >
                                        <Button
                                            variant = 'outlined'
                                            onClick = {handleCheckTestUser(res)}
                                        >
                                            {res.user.email}
                                        </Button>
                                    </Box>
                                )
                            }
						</Grid>
                    }
				</Grid>
            }

            {
                resultUser &&
				<CheckingTest
					open = {modalCheckTest}
					resultUser = {resultUser}
					onClose = {handleCloseModal}
					test = {lesson!.test!}
				/>
            }
        </Box>
    )
}

export default TeacherLesson
