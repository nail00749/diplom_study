import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {openModal as openLessonModal} from "../store/reducers/admin/lessonSlice";
import {useGetAllLessonsQuery, useGetLessonQuery} from "../services/contentAPI";
import {useAppDispatch} from "../hooks/redux";
import PassTest from "../components/modals/PassTest";
import {openModal as openTestModal} from "../store/reducers/admin/testSlice";
import {useGetMeDataQuery} from "../services/userAPI";
import {useGetAllCoursesQuery} from "../services/courseAPI";
import {useGetMyTestResultQuery} from "../services/userTestResultAPI";
import UserTest from "../components/Lesson/UserTest";

const Lesson: FC = () => {
    const {lessonId} = useParams()
    const navigate = useNavigate()
    const {data: lesson, refetch} = useGetLessonQuery(String(lessonId))
    const {data: user} = useGetMeDataQuery()


    useEffect(() => {
        if (!lessonId) {
            navigate('/')
        } else {
            refetch()
        }

    }, [lessonId, navigate])


    return (
        <Box
            p = {3}
        >
            <Box>
                {
                    lesson &&
					<>
						<Typography> {lesson.title}</Typography>
						<Typography>{lesson.description}</Typography>
					</>
                }
                {
                    (lesson && lesson.test && user && user.role === 'user') &&
					<UserTest
						test = {lesson.test}
					/>
                }
            </Box>
        </Box>
    );
};

export default Lesson;
