import React, {useEffect} from 'react'
import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useGetFlowLessonQuery} from "../services/lessonAPI";
import {openModal as openLessonModal} from "../store/reducers/admin/lessonSlice";
import {openModal as openTestModal} from "../store/reducers/admin/testSlice";
import {useAppDispatch} from "../hooks/redux";
import {useGetAllLessonsQuery} from "../services/contentAPI";
import {useGetMeDataQuery} from "../services/userAPI";

const TeacherLesson = () => {
    const {lessonId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: lesson} = useGetFlowLessonQuery({lessonId: String(lessonId), flowId: String(flowId)})
    const dispatch = useAppDispatch()
    const {data: lessons} = useGetAllLessonsQuery()
    const {data: user} = useGetMeDataQuery()

    useEffect(() => {
        if (!lessonId || !flowId) {
            navigate('/')
        }
    }, [])

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

    return (
        <Box
            p = {3}
        >
            {
                lesson &&
				<Grid
					container
				>
					<Grid
						item
					>
						<Typography>{lesson.title}</Typography>
						<Box>
                            {
                                (user && (user.role === 'teacher' || user.role === 'admin')) &&
								<>
									<Button
										variant = 'outlined'
										onClick = {handlerLessonEdit}
									>
										Edit lesson
									</Button>
									<Button
										variant = 'outlined'
										onClick = {handlerTestEdit}
									>
										Edit test
									</Button>
								</>
                            }
						</Box>
					</Grid>

				</Grid>
            }
        </Box>
    )
}

export default TeacherLesson
