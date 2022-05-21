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

const Lesson: FC = () => {
    const {lessonId} = useParams()
    const navigate = useNavigate()
    const {data: lesson} = useGetLessonQuery(String(lessonId))
    const {data: courses} = useGetAllCoursesQuery()
    const {data: lessons} = useGetAllLessonsQuery()
    const {data: user} = useGetMeDataQuery()
    const dispatch = useAppDispatch()
    const [openTest, setOpenTest] = useState(false)

    useEffect(() => {
        if (!lessonId) {
            navigate('/')
        }
    }, [lessonId, navigate])

    const handlerTestModal = () => {
        setOpenTest(prev => !prev)
    }

    const handlerLessonEdit = () => {
        if (lesson) {
            dispatch(openLessonModal({
                lesson,
                courses,
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
      <Box>
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
          <Box>
              {
                lesson &&
                <>
                    <Typography>{lesson.title}</Typography>
                    <Typography>{lesson.description}</Typography>
                    <Button
                      variant = 'outlined'
                      onClick = {handlerTestModal}
                    >
                        Pass test
                    </Button>
                </>
              }
          </Box>
          {
            (lesson && lesson.test) &&
            <PassTest
              open = {openTest}
              onClose = {handlerTestModal}
              test={lesson.test}
            />
          }

      </Box>
    );
};

export default Lesson;
