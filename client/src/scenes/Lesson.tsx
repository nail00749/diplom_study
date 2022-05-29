import React, {FC, useEffect, useState, useRef, useMemo} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {openModal as openLessonModal} from "../store/reducers/admin/lessonSlice";
import {useGetAllLessonsQuery, useGetLessonQuery} from "../services/contentAPI";
import {useAppDispatch} from "../hooks/redux";
import PassTest from "../components/modals/PassTest";
import {openModal as openTestModal} from "../store/reducers/admin/testSlice";
import {useGetAllCoursesQuery} from "../services/courseAPI";
import {useGetMyTestResultQuery} from "../services/userTestResultAPI";
import UserTest from "../components/Lesson/UserTest";
import {BaseURL} from "../config";
import WatchLesson from "../components/WatchLesson";
import {useGetMyResultFlowQuery} from "../services/userFlowAPI";

const Lesson: FC = () => {
    const {lessonId, flowId} = useParams()
    const navigate = useNavigate()
    const {data: lesson} = useGetLessonQuery(String(lessonId))
    const {data: resultFlow, refetch} = useGetMyResultFlowQuery(String(flowId))


    useEffect(() => {
        if (!lessonId) {
            navigate('/')
        }
    }, [lessonId, navigate])


    const strLessonId = useMemo(() => String(lessonId), [])
    const conditionShowTest = useMemo(() => lessonId && resultFlow && resultFlow.lessonVideosTimings && resultFlow.lessonVideosTimings[strLessonId] && resultFlow.lessonVideosTimings[strLessonId] === -1,
        [resultFlow])

    return (
        <Box
            p = {3}
        >
            {lesson &&
				<Grid
					container
				>
					<Grid
						item
						xs = {12}
						sm = {8}
						md = {4}
					>
						<Typography
							variant = 'h3'
							component = 'h1'
							color = 'text.primary'
						>
                            {lesson.title}
						</Typography>
						<Typography
							variant = 'body1'
							component = 'p'
							color = 'text.primary'
							mt = {2}
						>
                            {lesson.description}
						</Typography>
					</Grid>
                    {
                        (lesson.video_path && resultFlow) &&
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {4}
						>
							<WatchLesson
								url = {BaseURL + lesson.video_path}
								lessonId = {String(lessonId)}
								flowId = {String(flowId)}
								result = {resultFlow}
								refetchResult = {refetch}
							/>
						</Grid>
                    }


					<Grid
						item
					>
                        {
                            (lesson && lesson.test && conditionShowTest) ?
                                <UserTest
                                    test = {lesson.test}
                                    flowId = {String(flowId)}
                                />
                                : 'Досмотрите видеоурок, чтобы сдать тест'
                        }
					</Grid>

				</Grid>
            }
        </Box>
    );
};

export default Lesson;
