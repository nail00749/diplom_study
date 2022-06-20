import React, {FC, useEffect, useMemo} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useGetLessonQuery} from "../services/contentAPI";
import UserTest from "../components/Lesson/UserTest";
import {BaseURL} from "../config";
import WatchLesson from "../components/Lesson/WatchLesson";
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

    const strLessonId = useMemo(() => String(lessonId), [lessonId])
    const isShowTest = useMemo(() => {
        if (lesson && lesson.video_path) {
            return lessonId && resultFlow && resultFlow.lessonVideosTimings && resultFlow.lessonVideosTimings[strLessonId] && resultFlow.lessonVideosTimings[strLessonId] === -1
        } else {
            return true
        }
    }, [resultFlow, lesson, lessonId, strLessonId])

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
							my = {2}
						>
                            {lesson.description}
						</Typography>
                        {
                            (lesson.test && isShowTest) ?
                                <UserTest
                                    test = {lesson.test}
                                    flowId = {String(flowId)}
                                />
                                : (!lesson.test ? '' : 'Досмотрите видеоурок, чтобы сдать тест')
                        }
					</Grid>
                    {
                        <Grid
                            item
                            xs = {12}
                            sm = {6}
                            md = {4}
                        >
                            {
                                (resultFlow && lesson.video_path) &&
								<WatchLesson
									url = {BaseURL + lesson.video_path}
									lessonId = {String(lessonId)}
									flowId = {String(flowId)}
									result = {resultFlow}
									refetchResult = {refetch}
								/>
                            }
                        </Grid>
                    }
				</Grid>
            }
        </Box>
    );
};

export default Lesson;
