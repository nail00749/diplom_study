import React, {useEffect, useState} from 'react'
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {lessonAPI, useGetFlowLessonQuery} from "../services/lessonAPI";
import {openModal as openLessonModal} from "../store/reducers/admin/lessonSlice";
import {openModal as openTestModal} from "../store/reducers/admin/testSlice";
import {useAppDispatch} from "../hooks/redux";
import {useGetAllLessonsQuery} from "../services/contentAPI";
import {BaseURL} from "../config";
import CheckingTest from "../components/modals/CheckingTest";
import {IUserSubscription} from "../models/IUserSubscription";

const TeacherLesson = () => {
    const {lessonId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: {lesson, subscriptions} = {}} = useGetFlowLessonQuery({
        lessonId: String(lessonId),
        flowId: String(flowId)
    })
    const dispatch = useAppDispatch()
    const {data: lessons} = useGetAllLessonsQuery()
    const [modalCheckTest, setModalCheckTest] = useState(false)
    const [resultUser, setResultUser] = useState<any>(null)

    useEffect(() => {
        if (!lessonId || !flowId) {
            navigate('/')
        }
    }, [lessonId, navigate, flowId])

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
        setResultUser(res)
        setModalCheckTest(true)
    }

    const handleCloseModal = (data?: any) => {
        setModalCheckTest(false)

        if (data) {
            dispatch(lessonAPI.util.updateQueryData('getFlowLesson', {
                lessonId: String(lessonId),
                flowId: String(flowId)
            }, (draft) => {
                const copy = {...draft}
                let sub = copy.subscriptions.find(subscription => subscription.student!.resultFlow!._id === resultUser.resultFlowId)
                if (sub && sub.student) {
                    sub.student.resultFlow = data
                }
            }))
        }
        setTimeout(() => {
            setResultUser(null)
        }, 300)
    }

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
                        (lesson && lesson.test && subscriptions) &&
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
								Результаты урока
							</Typography>
                            {
                                subscriptions.map((subscription: IUserSubscription) => {
                                        const {resultFlow} = subscription.student
                                        const isSub = subscription && resultFlow
                                        const timingVideo = isSub && resultFlow! && resultFlow.lessonVideosTimings && resultFlow.lessonVideosTimings[lesson._id]
                                        const isPassTest = isSub && resultFlow.testsResult && resultFlow.testsResult[lesson!.test!._id]
                                        const isCheckTeacher = isPassTest && resultFlow!.testsResult[lesson!.test!._id].mark !== -1

                                        return (
                                            <Box
                                                key = {subscription._id}
                                                my = {2}
                                            >
                                                <Typography
                                                    color = 'text.primary'
                                                >
                                                    {subscription.student.name && subscription.student.surname ? subscription.student.name + ' ' + subscription.student.surname : subscription.student.email}
                                                </Typography>
                                                {
                                                    lesson.video_path &&
                                                    <Typography
                                                        color = 'text.primary'
                                                    >
                                                        {timingVideo === -1 ? 'посмотрел видеоурок' : !timingVideo ? 'Не начал смотреть урок' : `Остановился на ${timingVideo}`}
                                                    </Typography>
                                                }
                                                {
                                                    isPassTest &&
													<Button
														variant = 'outlined'
														onClick = {handleCheckTestUser({
                                                            ...isPassTest,
                                                            resultFlowId: resultFlow!._id
                                                        })}
														color = {isCheckTeacher ? 'success' : 'error'}
														disabled = {!Boolean(isPassTest)}
													>
														Посмотреть тест
													</Button>
                                                }
                                            </Box>
                                        )
                                    }
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
